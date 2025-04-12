import express from 'express';
import { Profile } from '../models/Profile.model.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
// import { upload } from "../utils/cloudinary.js"
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Request } from '../models/Request.model.js';


export const sendRequest = asyncHandler(async (req, res) => {
    const { receiverId } = req.body
    if (!receiverId) {
        throw new ApiError(400, "Receiver is required")
    }

    const receiver = await Profile.findById(receiverId)
    if (!receiver) {
        throw new ApiError(404, "Receiver not found")
    }

    const requestExists = await Request.findOne({ sender: req.profile._id, receiver: receiverId })
    if (requestExists) {
        return res.
            status(201)
            .json(
                new ApiResponse(
                    201,
                    {},
                    "Request already sent"
                )
            )
    }

    const request = await Request.create({ sender: req.profile._id, receiver: receiverId })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    request
                },
                "Request sent successfully"
            )
        )
}
);

export const getRequests = asyncHandler(async (req, res) => {
    const requests = await Request.find({ receiver: req.profile._id }).populate('sender', 'email firstName lastName image')

    if (!requests) {
        throw new ApiError(404, "Requests not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    requests
                },
                "Requests fetched successfully"
            )
        )
}
);

export const updateRequest = asyncHandler(async (req, res) => {
    const { requestId, status } = req.body
    if (!requestId || !status) {
        throw new ApiError(400, "Request id and status are required")
    }

    const request = await Request.findById(requestId)
    if (!request) {
        throw new ApiError(404, "Request not found")
    }

    if (request.receiver.toString() !== req.profile._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this request")
    }

    request.status = status
    await request.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    request
                },
                "Request updated successfully"
            )
        )
}
);

export const validRequest = asyncHandler(async (req, res) => {
        const { recieverId } = req.body
        if (!recieverId) {
            throw new ApiError(400, "Request id is required")
        }
        const request = await Request.findOne({ sender:req.profile._id, receiver: recieverId })

        if (!request) {
            throw new ApiError(404, "Request not found")
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        request
                    },
                    "Request fetched successfully"
                )
            )
        
});

export const contacts = asyncHandler(async (req, res) => {
    const requests = await Request.find({
      $or: [{ sender: req.profile._id }, { receiver: req.profile._id }],
      status: "Approved"
    });
  
    if (!requests || requests.length === 0) {
      throw new ApiError(404, "No approved requests found");
    }
  
    const contactIds = requests.map(request => {
      return request.sender.toString() === req.profile._id.toString()
        ? request.receiver
        : request.sender;
    });
  
    
    const contactInfo = await Profile.find({ _id: { $in: contactIds } })
      .select("email firstName lastName image"); 
  
    return res.status(200).json(
      new ApiResponse(
        200,
        { contactInfo },
        "Contacts fetched successfully"
      )
    );
  });
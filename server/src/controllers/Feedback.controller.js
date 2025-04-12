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
import { Feedback } from '../models/Feedback.model.js';



export const createFeedback = asyncHandler(async (req, res) => {
    const { message } = req.body
    if (!message) {
        throw new ApiError(400, "Message is required")
    }

    const feedback = await Feedback.create({ sender: req.profile._id, message })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    feedback
                },
                "Feedback created successfully"
            )
        )
})


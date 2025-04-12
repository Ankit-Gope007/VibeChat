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


export const searchContacts = asyncHandler(async (req, res) => {
    const {searchTerm} = req.body
    if (!searchTerm) {
        throw new ApiError(400, "Search term is required")
    }
    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(sanitizedSearchTerm, 'i');

    const contacts = await Profile.find(
        {
            $and: [
                { _id: { $ne: req.profile._id } },
                {
                    $or: [
                        {firstName:regex },
                        {lastName:regex },
                        {email:regex },
                    ],
                },
            ],
        }).select("-password -refreshToken -accessToken -createdAt -updatedAt -refreshToken")

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    contacts
                },
                "Contacts fetched successfully"
            )
        )


});


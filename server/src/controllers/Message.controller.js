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
import { Message } from '../models/Message.model.js';


export const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({ room: req.params.roomID }).sort({ timestamp: 1 })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    messages
                },
                "Messages fetched successfully"
            )
        )
}) 
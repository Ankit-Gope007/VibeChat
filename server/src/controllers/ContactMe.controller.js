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
import { ContactMe } from '../models/ContactMe.model.js';


export const createContactMe = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
        throw new ApiError(400, "Name, Email and Message are required")
    }

    const contactMe = await ContactMe.create({ name, email, message })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    contactMe
                },
                "Contact Me created successfully"
            )
        )
})


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


const generateAccessAndRefreshToken = async (profileId) => {
    try {
        const profile = await Profile.findById(profileId)
        const accessToken = profile.generateAccessToken()
        const refreshToken = profile.generateRefreshToken()
        profile.refreshToken = refreshToken
        await profile.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while genrating access and refresh token")
    }
}

export const signUp = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }

    const profile = await Profile.create({ email, password })
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(profile._id);

    const createdProfile = await Profile.findById(profile._id).select(
        "-password -refreshToken -accessToken -createdAt -updatedAt -refreshToken"
    )
    if (!createdProfile) {
        throw new ApiError(500, "Something went wrong while creating profile, Please try again")
    }

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    };


    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                {
                    createdProfile,
                    accessToken,
                    refreshToken
                },
                "Profile created successfully"
            )
        )

})

export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }


    const profile = await Profile.findOne({ email });
    if (!profile) {
        throw new ApiError(404, "Profile not found , To login please Sign Up")
    }


    const isPasswordCorrect = await profile.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(profile._id)

    const loggedInProfile = await Profile.findById(profile._id)
        .select("-password -refreshToken -accessToken -createdAt -updatedAt -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    };

    // console.log("Access Token :",accessToken);
    // console.log("Refersh Token :",refreshToken);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    profile: loggedInProfile, accessToken,
                    refreshToken
                },
                "Profile logged in successfully"
            )
        )

});

export const updateProfile = asyncHandler(async (req, res) => {
    const profileId = req.profile._id;

    const { firstName, lastName, image} = req.body;
    if (!firstName || !lastName || !image) {
        throw new ApiError(400, "First name, Last name  are required")
    }

        // const imageUrl = req.file ? req.file.path : null
        // const image = await uploadOnCloudinary(imageUrl)
        // const imageLink = image ? image.url : null



        const profile = await Profile.findByIdAndUpdate(profileId, { firstName, lastName, image,profileSetup: true }, { new: true, runValidators: true })
        if (!profile) {
            throw new ApiError(404, "Profile not found")
        }

         const { accessToken, refreshToken } = await generateAccessAndRefreshToken(profile._id)
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                     profile,
                    accessToken,
                    refreshToken,
                    "Profile updated successfully"
                )
            )

    
});

export const getProfile = asyncHandler(async (req, res) => {
    const profileId = req.profile._id;

    const profile = await Profile.findById(profileId).select("-password -refreshToken -accessToken")
    if (!profile) {
        throw new ApiError(404, "Profile not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                profile,
                "Profile fetched successfully"
            )
        )
})

export const logout = asyncHandler(async (req, res) => {
    const profileId = req.profile._id;
    // console.log("Profile ID :",profileId);
    const profile = await Profile.findByIdAndUpdate(
        profileId,
        {
            $set: {
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    if (!profile) {
        throw new ApiError(404, "Profile not found")
    }

    const options = {
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200 , {} , "User Logged Out"))
});

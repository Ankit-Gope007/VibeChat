import mongoose from "mongoose";
import { Schema } from "mongoose";

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        message: {
            type: String,
            required: [true, 'Message is required']
        },
    },
    {
        timestamps: true
    }
)

export const ContactMe = mongoose.model("ContactMe", contactSchema);
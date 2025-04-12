import mongoose from "mongoose";
import { Schema } from "mongoose";

const feedbackSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "Profile",
            required: [true, 'User is required']
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

export const Feedback = mongoose.model("Feedback", feedbackSchema);
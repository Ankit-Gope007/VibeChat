import mongoose from "mongoose";
import { Schema } from "mongoose";

const requestSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "Profile",
            required: [true, 'User is required']
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "Profile",
            required: [true, 'User is required']
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        }
    },
    {
        timestamps: true
    }
)

export const Request = mongoose.model("Request", requestSchema);
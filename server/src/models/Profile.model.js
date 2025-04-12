import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const profileSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required:false
        }, 
        profileSetup: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

profileSchema.pre("save",async function (next){
    if (!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

profileSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}

profileSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id :this._id,
            email:this.email,
            lastname:this.lastname,
            fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

profileSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id :this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const Profile =  mongoose.model("Profile", profileSchema);
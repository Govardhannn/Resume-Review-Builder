import mongose from "mongoose";

const userSchema = new mongose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    verificationCode: {
        type: String,
    },
    verificationExpiry: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});


const userModel = mongose.model("user",userSchema);
export default userModel;
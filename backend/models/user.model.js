import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },  
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        
    },
    age: {
        type: Number,
        
    },
    profilePicture: {
        type: String,
        default: "https://f4.bcbits.com/img/0019281740_10.jpg",
    },
    password: {
        type: String,
        required: true
    },
    isStudent: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
const User = new mongoose.model("User", userSchema);
export default User;
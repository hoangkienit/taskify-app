import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';

const nanoidCustom = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 8);
const userId = nanoidCustom();

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: userId
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    profileImg: {
        type: String,
        default: "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-1024.png"
    },
    isBanned: {
        type: String,
        default: false
    },
    role: {
        enum: ['employee', 'manager', 'admin', 'not_assign'],
        default: 'not_assign',
    },
    plan: {
        enum: ['basic', 'premium', 'enterprise'],
        default: 'basic'
    }
});

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose'
import validator from "validator";

const AccountSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
}, {timestamps: true})

export default mongoose.model('Account', AccountSchema)
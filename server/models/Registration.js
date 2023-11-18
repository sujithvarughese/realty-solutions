import mongoose from 'mongoose'
import validator from "validator";

const RegistrationSchema = new mongoose.Schema({
    account : {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    unit: {
        type: mongoose.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
    },
    balance: {
        type: Number,
    },
    code: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
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

export default mongoose.model('RegistrationCode', RegistrationSchema)
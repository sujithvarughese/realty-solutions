import mongoose from 'mongoose'
import validator from "validator";

const MessageSchema = new mongoose.Schema({
	sender :{
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	recipient: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	subject: {
		type: String
	},
	body: {
		type: String
	},
	read: {
		type: Boolean,
		default: false
	},
	flag: {
		type: Boolean,
		default: false
	},
	previousMessage: {
		type: mongoose.Types.ObjectId,
		ref: 'Message'
	},
	date: {
		type: Date,
		default: () => Date.now(),
		immutable: true
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

export default mongoose.model('Message', MessageSchema)
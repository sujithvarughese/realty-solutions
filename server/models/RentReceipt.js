import mongoose from 'mongoose'
import validator from "validator";

const RentReceiptSchema = new mongoose.Schema({
	user : {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	year: {
		type: String,
		default: "2023",
	},
	month: {
		type: String,
		default: "January",
		immutable: true
	},
	date: {
		type: String,
		default: "1"
	},
	amountPaid: {
		type: Number
	},
	balance: {
		type: Number
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

export default mongoose.model('RentReceipt', RentReceiptSchema)
import mongoose from 'mongoose'

const FinanceSchema = new mongoose.Schema({
	unit: {
		type: mongoose.Types.ObjectId,
		ref: "Unit"
	},
	purchasePrice: {
		type: "Number"
	},
	rent: {
		type: Number
	},
	fairMarketRent: {
		type: Number
	},
	mortgage: {
		bank: {
			type: String
		},
		loanAmount: {
			type: Number
		},
		balance: {
			type: Number
		},
		interest: {
			type: Number
		},
		payment: {
			type: Number
		},
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
}, { timestamps: true })

export default mongoose.model('Finance', FinanceSchema)
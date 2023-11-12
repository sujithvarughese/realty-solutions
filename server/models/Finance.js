import mongoose from 'mongoose'

const FinanceSchema = new mongoose.Schema({
	unit: {
		type: mongoose.Types.ObjectId,
		ref: "Unit"
	},
	purchasePrice: {
		type: Number
	},
	rent: {
		type: Number
	},
	fairMarketRent: {
		type: Number
	},
	propertyTax: {
		type: Number
	},
	insurance: {
		company: {
			type: String
		},
		agent: {
			type: String
		},
		phone: {
			type: String
		},
		email: {
			type: String
		},
		payment: {
			type: Number
		},
		coverage: {
			type: String
		}
	},
	mortgage: {
		bank: {
			type: String
		},
		principal: {
			type: Number
		},
		interest: {
			type: Number
		},
		term: {
			type: Number,
		},
		paymentsMade: {
			type: Number
		},
		payment: {
			type: Number
		},
	},
	hoa: {
		company: {
			type: String
		},
		agent: {
			type: String
		},
		phone: {
			type: String
		},
		email: {
			type: String
		},
		payment: {
			type: Number
		}
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
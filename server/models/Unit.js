import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	unitID: {
		type: String,
		required: [true, "Please provide unit"]
	},
	street: {
		type: String,
		required: [true, "Please provide street"]
	},
	city: {
		type: String,
		required: [true, "Please provide city"]
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: [true, "Please provide zip"]
	},
	image: {
		type: String,
	},
	occupied: {
		type: Boolean,
		default: false
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	tenant: {
		lastName: {
			type: String
		},
		firstName: {
			type: String
		},
		rent: {
			type: Number
		}
	},
	bedrooms : {
		type: Number,
	},
	bathrooms: {
		type: Number,
	},
	fairMarketRent: {
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
}, { timestamps: true })


export default mongoose.model('Unit', UnitSchema)
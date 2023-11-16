import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	houseNumber: {
		type: String,
		required: [true, "Please provide house number"]
	},
	street: {
		type: String,
		required: [true, "Please provide street"]
	},
	apartment: {
		type: String,
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
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	finances: {
		type: mongoose.Types.ObjectId,
		ref: "Finance"
	},
	bedrooms : {
		type: Number,
	},
	bathrooms: {
		type: Number,
	},
	tenant: {
		lastName: {
			type: String
		},
		firstName: {
			type: String
		},
		email: {
			type: String
		},
		phone: {
			type: String
		},
		rent: {
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


export default mongoose.model('Unit', UnitSchema)
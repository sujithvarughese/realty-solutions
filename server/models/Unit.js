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
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	finances: {
		type: mongoose.Types.ObjectId,
		ref: "Finance"
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
	bedrooms : {
		type: Number,
	},
	bathrooms: {
		type: Number,
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
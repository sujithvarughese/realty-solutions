import Unit from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Finance from "../models/Finance.js";

const getMyUnit = async (req, res) => {
	const myUnit = await Unit.findOne({ user: req.user.userID }).populate("user")
	res.status(StatusCodes.OK).json({ myUnit })
}
// get all units, and populate each with tenant information
const getUnits = async (req, res) => {
	const units = await Unit.find().populate("user")
	res.status(StatusCodes.OK).json({ units })
}

const createUnit = async (req, res) => {
	// check if unit already exists
	const duplicate = await Unit.findOne({
		unitID: req.body.unitID,
		address: req.body.address
	})
	if (duplicate) {
		throw new BadRequestError("MyUnit already exists!")
	}

	// create new unit using UnitDetails model method
	const newUnit = await Unit.create(req.body)

	// create empty Finance object for unit
	const newFinancialData = {
		unit: newUnit,
		purchasePrice: "",
		rent: "",
		fairMarketRent: "",
		propertyTax: "",
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
			balance: {
				type: Number
			},
			monthlyPayment: {
				type: Number
			}
		}
	}
	// create mongoose model
	const newFinance = await Finance.create(newFinancialData)
	// update unit model with Finance
	const unit = await Unit.findByIdAndUpdate(newUnit, { finances: newFinance })
	// send response JSON to include new unit
	res.status(StatusCodes.CREATED).json({
		unit: unit,
		msg: 'Create Unit Success'
	})
}

const updateUnit = async (req, res) => {
	const unit = await Unit.findByIdAndUpdate(req.body._id, req.body )
	if (!unit) {
		throw new NotFoundError(`No unit with id :${req.body._id}`);
	}
	res.status(StatusCodes.OK).json({ msg: 'unit update success' })
}

const deleteUnit = async (req, res) => {
	const unit = await Unit.findByIdAndDelete(req.body._id)
	if (!unit) {
		throw new NotFoundError(`No unit with id :${_id}`);
	}
	res.status(StatusCodes.OK).json({ msg: 'unit delete success' })
}

export { getUnits, getMyUnit, createUnit, updateUnit, deleteUnit }
import Unit from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

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
	console.log(req.body);
	// unit values sent from front end
	const unit = req.body
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

	// send response JSON to include new unit
	res.status(StatusCodes.CREATED).json({
		unit: newUnit,
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
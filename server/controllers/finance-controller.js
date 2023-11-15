import RentReceipt from "../models/RentReceipt.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import Finance from "../models/Finance.js";

const getYearlyRentReceipts = async (req, res) => {
	if (!req.user.isAdmin) {
		if (req.user.userID !== req.params.id) {
			throw new UnauthenticatedError("Error validating user");
		}
	}

	const rentReceipts = await RentReceipt.find({ user: req.params.id, year: req.params.year })
	res.status(StatusCodes.OK).json({ rentReceipts })
}
const getMonthlyRentReceipts = async (req, res) => {
	if (!req.user.isAdmin) {
		if (req.user.userID !== req.params.id) {
			throw new UnauthenticatedError("Error validating user");
		}
	}

	const rentReceipts = await RentReceipt.find({ user: req.params.id, year: req.params.year, month: req.params.month })
	res.status(StatusCodes.OK).json({ rentReceipts })
}
const createRentReceipt = async (req, res) => {
	//req.body = {user, year, month, date, amountPaid, balance}
	const newRentReceipt = await RentReceipt.create(req.body)
	res.status(StatusCodes.CREATED).json({ newRentReceipt });
}

const createUnitFinances = async (req, res) => {
	const newUnitFinance = await Finance.create(req.body)
	res.status(StatusCodes.CREATED).json({ newUnitFinance });
}

const updateUnitFinances = async (req, res) => {
	// req.body = { ...Finance }
	await Finance.findByIdAndUpdate(req.body.id, req.body)
	res.status(StatusCodes.OK).json( { message: "Unit Finance Updated" } )
}

const getUnitFinances = async (req, res) => {
	const unitFinances = await Finance.findOne({ unit: req.params.unit })
	res.status(StatusCodes.OK).json({ unitFinances });
}

const getAllFinances = async (req, res) => {
	const finances = await Finance.find()
	res.status(StatusCodes.OK).json({ finances });
}

export { getYearlyRentReceipts, getMonthlyRentReceipts, createRentReceipt, createUnitFinances, getUnitFinances, getAllFinances }
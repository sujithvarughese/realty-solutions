import RentReceipt from "../models/RentReceipt.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";

const getRentReceipts = async (req, res) => {
	console.log(req.params);
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
	console.log(newRentReceipt);
	res.status(StatusCodes.CREATED).json({ newRentReceipt });
}

export { getRentReceipts, createRentReceipt }
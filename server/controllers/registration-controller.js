import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import RegistrationCode from "../models/Registration.js";
import User from "../models/User.js";

// account admin function to create user eligible to register
const createRegistration = async (req, res) => {
    // if any fields missing from user front end, throw error
    if (!req.body.lastName || !req.body.firstName || !req.body.email || req.body.unit) {
        throw new BadRequestError("Please provide all values");
    }
    // validate that user not already in database
    const userAlreadyExists = await User.findOne({ email: req.body.email });
    if (userAlreadyExists) {
        throw new BadRequestError("User already exists");
    }
    const randomCode = crypto.randomBytes(8).toString("hex")

    const registration = {
        account: req.user.account,
        unit: req.body.unit,
        email: req.body.email,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        rent: req.body.rent,
        balance: req.body.balance,
        code: randomCode,
        isAdmin: false
    }

    const newRegistration = await RegistrationCode.create(registration)

    res.status(StatusCodes.CREATED).json({
        message: "Registration Code created. Please give code to user for registration",
        registration: newRegistration
    });
}

const verifyRegistration = async (req, res) => {
    // { email, registrationCode } = req.body

    const registration = RegistrationCode.findOne({ email: req.body.email }).select("+password");
    if (!registration) {
        throw new UnauthenticatedError("Email not found. Check credentials or contact an administrator");
    }
    const registrationCodeVerified = await registration.compareRegistrationCode(req.body.registrationCode)
    if (!registrationCodeVerified) {
        throw new UnauthenticatedError("Invalid registration code");
    }
    const user = {
        account: registration.account,
        unit: registration.unit,
        email: registration.email,
        lastName: registration.lastName,
        firstName: registration.firstName,
        rent: registration.rent,
        balance: registration.balance

    }
    res.status(StatusCodes.OK).json({
        message: "Registration Found",
        user: user
    });

}
export { createRegistration, verifyRegistration }
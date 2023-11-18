import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import RegistrationCode from "../models/Registration.js";
import User from "../models/User.js";
import Unit from "../models/Unit.js";

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
        role: "user"
    }

    const newRegistration = await RegistrationCode.create(registration)

    res.status(StatusCodes.CREATED).json({
        message: "Registration Code created. Please give code to user to complete registration",
        registration: newRegistration
    });
}

const verifyRegistration = async (req, res) => {
    // { email, registrationCode, password } = req.body

    const registration = await RegistrationCode.findOne({ email: req.body.email }).select("+code");
    if (!registration) {
        throw new UnauthenticatedError("Email not found. Check credentials or contact an administrator");
    }
    const registrationCodeVerified = await registration.compareRegistrationCode(req.body.registrationCode)
    if (!registrationCodeVerified) {
        throw new UnauthenticatedError("Invalid registration code");
    }
    const newUser = {
        account: registration.account,
        unit: registration.unit,
        email: registration.email,
        password: req.body.password,
        lastName: registration.lastName,
        firstName: registration.firstName,
        phone: registration.phone,
        rent: registration.rent,
        balance: registration.balance,
        role: "user"
    }

    const user = await User.create(newUser)

    // user variable with just the fields we want to send to attach (will also be saved in front end state)
    const userInfo = {
        userID: user._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };

    const tenant = {
        lastName: registration.lastName,
        firstName: registration.firstName,
        email: registration.email,
        phone: registration.phone,
        rent: registration.rent,
    }
    // create jwt with jwt.sign
    const token = createJWT({ payload: userInfo })

    // create cookie in the response, where we attach token
    attachCookies({ res, token })

    await Unit.findByIdAndUpdate(registration.unit,
        { user: user, tenant: tenant })

    // delete instance because it is not needed since user is created
    await RegistrationCode.findByIdAndDelete(registration._id)
    res.status(StatusCodes.OK).json({
        message: "Registration Verified",
        user: userInfo
    });

}
export { createRegistration, verifyRegistration }
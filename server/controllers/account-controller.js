import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

// hidden function for admin only to create new accounts(account has its own admin and users)
// when creating account, account admin should also be set up
const createAccount = async (req, res) => {
    // { account, email, phone, password, lastName, firstName } = req.body
    const accountAdmin = await User.create({ ...req.body, role: "account-admin" })
    const account = await Account.create({ admin: accountAdmin._id })
    res.status(StatusCodes.CREATED).json({
        message: "Account created",
        account: account
    });
}

const createSystemAdmin = async (req, res) => {
    // { lastName: "Administrator", firstName: "System", email, phone, password }
    const systemAdmin = await User.create({ ...req.body, role: "system-admin" })
    res.status(StatusCodes.CREATED).json({
        message: "System Admin Created",
        systemAdmin: systemAdmin
    })
}

export { createAccount, createSystemAdmin }
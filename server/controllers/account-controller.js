import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

// hidden function for admin only to create new accounts(account has its own admin and users)
// when creating account, account admin should also be set up
const createAccount = async (req, res) => {
    // { email, phone, password, lastName, firstName } = req.body
    const accountAdmin = await User.create({ ...req.body, role: "account-admin" })
    const account = await Account.create({ admin: accountAdmin._id })
    await User.findByIdAndUpdate(accountAdmin._id, { account: account._id })
    res.status(StatusCodes.CREATED).json({
        message: "Account created",
        account: account,
        admin: accountAdmin
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

const getAccounts = async (req,res) => {
    const accounts = await Account.find().populate("admin")
    res.status(StatusCodes.CREATED).json({
        message: "Accounts successfully retrieved",
        accounts: accounts
    })
}

export { createAccount, createSystemAdmin, getAccounts }
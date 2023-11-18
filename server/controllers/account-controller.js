import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import Account from "../models/Account.js";

// hidden function for admin only to create new accounts(account has its own admin and users)
// when creating account, admin account should also be set up
const createAccount = async (req, res) => {

}

export { createAccount }
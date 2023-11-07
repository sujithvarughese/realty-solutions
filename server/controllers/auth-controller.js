import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import Unit from "../models/Unit.js";
import { attachCookies, createJWT } from "../utils/index.js";

// admin function to create user
const createUser = async (req, res) => {
	// if any fields missing from user front end, throw error
	if (!req.body.lastName || !req.body.firstName || !req.body.email) {
		throw new BadRequestError("Please provide all values");
	}
	// validate that user not already in database
	const userAlreadyExists = await User.findOne({ email: req.body.email });
	if (userAlreadyExists) {
		throw new BadRequestError("User already exists");
	}
	const newUser = {
		lastName: req.body.lastName,
		firstName: req.body.firstName,
		email: req.body.email,
		// temporary password which user can change once admin gives account info
		password: `${req.body.lastName}${req.body.firstName}`,
		unit: req.body.unit,
		messages: [],
		phone: req.body.phone,
		rent: req.body.rent,
		balance: req.body.balance,
		isAdmin: false
	}
	// create new user in mongodb
	const user = await User.create(newUser);

	// update unit to include user
	await Unit.findByIdAndUpdate(req.body.unit._id, { user: user, occupied: true })
	// send response JSON to include user fields
	res.status(StatusCodes.CREATED).json({
		message: "user registered",
		user: user
	});
}

const register = async (req, res) => {
	console.log(req.body);
	// first registered user must be set to admin
	const isFirstUser = (await User.countDocuments({})) === 0
	if (isFirstUser) {
		// field must be labeled as admin and password must password
		if (req.body.lastName !== "admin" && req.body.password !== "password") {
			throw new BadRequestError("Please provide correct values for admin");
		}
		const newAdmin = {
			lastName: req.body.lastName,
			firstName: req.body.firstName,
			email: req.body.email,
			password: req.body.newPassword,
			messages: [],
			phone: req.body.phone,
			isAdmin: true
		}
		// create new admin in mongodb
		const admin = await User.create(newAdmin);
		// send response JSON
		res.status(StatusCodes.CREATED).json({
			message: "admin registered",
			user: admin,
			lastName: user.lastName,
			firstName: user.firstName
		});
	}

	// if any fields missing from user front end, throw error
	if (!req.body.lastName || !req.body.firstName || !req.body.email || !req.body.password || !req.body.newPassword) {
		throw new BadRequestError("Please provide all values");
	}
	// check UserHome model in database for entered email
	// select('+password') needed since password property in UserHome is hidden
	const user = await User.findOne({ email: req.body.email }).select("+password");
	if (!user) {
		throw new UnauthenticatedError("No User Found");
	}
	// verify entered password using function we created in UserHome.js
	// to compare with this.password
	const passwordVerified = await user.comparePassword(req.body.password);
	if (!passwordVerified) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	const updatedUser = await User.findOneAndUpdate({ _id: user.id }, { password: req.body.newPassword }).select("+password");
	console.log("user");
	console.log(user);
	console.log("updated user");
	console.log(updatedUser);


	// userInfo variable with just the fields we want to send for token
	const userInfo = { userID: user._id, isAdmin: false };

	// create jwt with jwt.sign
	const token = createJWT({ payload: userInfo });

	// create cookie in the response, where we attach token
	attachCookies({ res, token });

	// send response JSON to include user fields
	res.status(StatusCodes.CREATED).json({
		message: "user registered",
		user: userInfo
	});
}

const login = async (req, res) => {
	// if any fields missing from user front end, throw error
	if (!req.body.email || !req.body.password) {
		throw new BadRequestError("please provide email and password");
	}

	// check UserHome model in database for entered email
	// select('+password') needed since password property in UserHome is hidden
	const user = await User.findOne({ email: req.body.email }).select("+password");
	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	// verify entered password using function we created in UserHome.js
	// to compare with this.password
	const passwordVerified = await user.comparePassword(req.body.password);
	if (!passwordVerified) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	// user variable with just the fields we want to send
	const userInfo = { userID: user._id, isAdmin: user.isAdmin };

	// create jwt with jwt.sign
	const token = createJWT({ payload: userInfo });

	// create cookie in the response, where we attach token
	attachCookies({ res, token });
	res.status(StatusCodes.OK).json({
		message: "user logged in success",
		user: userInfo,
		lastName: user.lastName,
		firstName: user.firstName
	});
}

const logout = async (req, res) => {
	// change token name to anything, then expire it
	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now())
	});

	res.status(StatusCodes.OK).json({ message: "user logged out" });
}

const getUserList = async (req, res) => {
	const users = await User.find({ isAdmin: false }).sort({ lastName: -1})
	// format to display front end
	const userList = users.map(user => {
		return {
			text: `${user.lastName}, ${user.firstName}`,
			value: user.id
		}

	})
	console.log(userList);
	res.status(StatusCodes.OK).json({ userList })
}

const getAdminInfo = async (req, res) => {
	const admin = await User.findOne({ isAdmin: true })
	const adminInfo = [{
		text: "Admin",
		value: admin.id
	}]
	res.status(StatusCodes.OK).json({ adminInfo })
}

const updateUser = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.body._id, req.body)
	if (!user) {
		throw new NotFoundError(`No user with id :${req.body._id}`);
	}
	console.log(user);
	res.status(StatusCodes.OK).json({ msg: 'Update success' })
}

export { register, login, logout, createUser, getUserList, getAdminInfo, updateUser }
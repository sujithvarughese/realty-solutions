import Message from "../models/Message.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const createMessage = async (req, res) => {
	// { sender, recipient, subject, body } = req.body
	// validate just in case (schema already validates)
	if (!req.body.recipient) {
		throw new BadRequestError('please provide recipient')
	}
	if (!req.body.body) {
		throw new BadRequestError('please provide body')
	}
	// create new message using Message model
	const message = await Message.create(req.body)

	res.status(StatusCodes.CREATED)
		.json({
			msg: "New Message successfully sent",
			message: message
		})
}
const getInbox = async (req,res) => {
	// fetch using req.user.userID
	const inbox = await Message
		.find({ recipient: req.user.userID })
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	res.status(StatusCodes.OK)
		.json({
			msg: "Inbox successfully retrieved",
			inbox: inbox
		})
}

const getOutbox = async (req, res) => {
	// fetch using req.user.userID
	const outbox = await Message
		.find({ sender: req.user.userID })
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	res.status(StatusCodes.OK)
		.json({
			msg: "Outbox successfully retrieved",
			outbox: outbox
		})

}

const getAllMessages = async (req, res) => {
	// fetch using req.user.userID
	const inbox = await Message
		.find({ recipient: req.user.userID })
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	const outbox = await Message
		.find({ sender: req.user.userID })
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	const messages = { inbox, outbox }
	res.status(StatusCodes.OK)
		.json({
			msg: "Messages successfully retrieved",
			messages: messages
		})
}

const markMessageRead = async (req, res) => {
	await Message.findByIdAndUpdate(req.body, { read: true })
	res.status(StatusCodes.OK)
		.json({ msg: 'message read status update success'})
}

const toggleFlag = async (req,res) => {
	//  { message } = req.body
	const message = await Message.findById(req.body)
	await Message.findByIdAndUpdate(req.body, { flag: !message.flag})
	res.status(StatusCodes.OK)
		.json({ msg: 'message flag update success'})
}

const getMessage = async (req, res) => {
	// { message } = req.params
	const message = await Message
		.findById(req.params.message)
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	res.status(StatusCodes.OK)
		.json({
			msg: "Message successfully retrieved",
			message: message
		})
}

const deleteMessage = async (req, res) => {
	//  { message } = req.body
	await Message.findByIdAndDelete(req.body)
	res.status(StatusCodes.OK).json({ msg: 'message delete success'})
}

export {
	createMessage,
	getAllMessages,
	markMessageRead,
	toggleFlag,
	deleteMessage,
	getInbox,
	getOutbox,
	getMessage
}
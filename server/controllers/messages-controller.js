import Message from "../models/Message.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const createMessage = async (req, res) => {
	// req.body = { sender, recipient, subject, body }
	// validate just in case (schema already validates)
	if (!req.body.recipient) {
		throw new BadRequestError('please provide recipient')
	}
	if (!req.body.body) {
		throw new BadRequestError('please provide body')
	}
	// create new message using Message model
	const newMessage = await Message.create(req.body)
	// get recipient's inbox to add new message to it
	const recipientInbox = await User.findById(req.body.recipient).select("inbox")
	// get senders outbox
	const senderOutbox = await User.findById(req.body.sender).select("outbox")
	// push new message into appropriate array
	recipientInbox.inbox.push(newMessage)
	senderOutbox.outbox.push(newMessage)

	// update both users with updated array containing the new message
	await User.findByIdAndUpdate(req.body.recipient, { inbox: recipientInbox.inbox })
	await User.findByIdAndUpdate(req.body.sender, { outbox: senderOutbox.outbox })
	// send response JSON to include appliance
	res.status(StatusCodes.CREATED).json({ newMessage })
}
const getInbox = async (req,res) => {
	const inbox = await Message
		.find({ recipient: req.user.userID })
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	res.status(StatusCodes.OK).json({ inbox })
}

const getOutbox = async (req, res) => {
	const outbox = await Message
		.find({ sender: req.user.userID })
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	res.status(StatusCodes.OK).json({ outbox })

}

const getAllMessages = async (req, res) => {
	const inbox = await Message
		.find({ recipient: req.user.userID })
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	const outbox = await Message
		.find({ sender: req.user.userID })
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	const messages = { inbox, outbox }
	res.status(StatusCodes.OK).json({ messages })
}

const markMessageRead = async (req, res) => {
	await Message.findByIdAndUpdate(req.body, { read: true })
	res.status(StatusCodes.OK).json({ msg: 'message read status update success'})
}

const toggleFlag = async (req,res) => {
	// req.body = { message }
	const message = await Message.findById(req.body)
	await Message.findByIdAndUpdate(req.body, { flag: !message.flag})
	res.status(StatusCodes.OK).json({ msg: 'message flag update success'})
}

const deleteMessage = async (req, res) => {
	// req.body = { message }
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
	getOutbox

}
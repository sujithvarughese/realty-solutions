import classes from "./styles/Messages.module.css";
import { axiosDB } from "../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { CreateMessageForm, MessageExpanded, MessageCollapsed } from "../components";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { BiMessageSquareEdit } from "react-icons/bi"
import { TfiControlBackward } from "react-icons/tfi"

const Messages = () => {
	// messages = { inbox, outbox }
	// message =
	// 	{ sender: { lastName, firstName, _id },
	// 	recipient: { lastName, firstName, _id} },
	// 	subject, body, read, flag, date
	const messages = useLoaderData()
	const { inbox, outbox } = messages

	const { user } = useGlobalContext()

	// set in state to render changes in real time
	const [myInbox, setMyInbox] = useState(inbox)
	const [myOutbox, setMyOutbox] = useState(outbox)

	// default to show inbox
	const [currentMailbox, setCurrentMailbox] = useState(myInbox)
	const [currentLink, setCurrentLink] = useState("inbox")


	const [showCreateMessageForm, setShowCreateMessageForm] = useState(false)
	const [addressBook, setAddressBook] = useState([])
	const [expandedMessage, setExpandedMessage] = useState(inbox[0] || null)
	const [mobileExpanded, setMobileExpanded] = useState(false)

	// fetch address book for admin
	const getUserList = async () => {
		try {
			const response = await axiosDB("/auth/getUserList")
			const { userList } = response.data
			setAddressBook(userList)
		} catch (error) {
			console.log(error);
		}
	}

	// fetch admin info so user can send messages
	const getAdminInfo = async () => {
		try {
			const response = await axiosDB("/auth/getAdminInfo")
			const { adminInfo } = response.data
			setAddressBook(adminInfo)
		} catch (error) {
			console.log(error);
		}
	}

	const toggleFlag = async (message) => {
		try {
			await axiosDB.patch("/messages/flag", message)
			const updatedMailbox = [...currentMailbox]
			// replace message in state with updated message with appropriate flag for both collapsed/expanded message
			const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
			updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], flag: !updatedMailbox[messageIndex].flag}
			setCurrentMailbox(updatedMailbox)
			setExpandedMessage(updatedMailbox[messageIndex])
		} catch (error) {
			throw new Error(error)
		}
	}

	const markMessageRead = async (message) => {
		try {
			await axiosDB.patch("/messages/read", message)
			const updatedMailbox = [...currentMailbox]
			// replace message in state with updated message with appropriate read status
			const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
			updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: true}
			setCurrentMailbox(updatedMailbox)
			setExpandedMessage(updatedMailbox[messageIndex])

		} catch (error) {
			throw new Error(error)
		}
	}

	// determine which address book to get based on role (we don't want to give tenant access to other user data)
	// addr book returned from backend as array of objects { text: "lastName, firstName", value: user._id }
	useEffect(() => {
		if (user.isAdmin) {
			getUserList()
		} else {
			getAdminInfo()
		}
	}, [])

	// retrieve new messages as user clicks and set state to render inbox or outbox
	const clickInbox = async () => {
		setCurrentLink("inbox")
		try {
			const response = await axiosDB("/messages/inbox")
			const { inbox } = response.data
			setMyInbox(inbox)
		} catch (error) {
			console.log(error)
		}

	}
	const clickOutbox = async () => {
		setCurrentLink("outbox")
		try {
			const response = await axiosDB("/messages/outbox")
			const { outbox } = response.data
			setMyOutbox(outbox)
		} catch (error) {
			console.log(error)
		}
	}
	// when user clicks inbox or outbox, set currentMailbox
	// displayed expanded message should be first (latest) message in array
	useEffect(() => {
		setExpandedMessage(myOutbox[0] || null)
		setCurrentMailbox(myOutbox)
	}, [myOutbox])

	useEffect(() => {
		setExpandedMessage(myInbox[0] || null)
		setCurrentMailbox(myInbox)
	}, [myInbox])

	return (
		<div className={classes.container}>

			{/* render create message modal when triggered */}
			{ showCreateMessageForm &&
				<CreateMessageForm
					cancel={()=>setShowCreateMessageForm(false)}
					addressBook={addressBook}
				/>
			}

			<div className={classes.links}>
				{/* New message icon */}
				<div className={classes.create} onClick={()=>setShowCreateMessageForm(true)}>
					<BiMessageSquareEdit />
				</div>

				{/* for small screens, render back button since expanded messages will be rendered full screen */}
				{/* for large screen, tabs for inbox and outbox; no back button */}
				{
					mobileExpanded ?
						<div className={classes.back} onClick={()=>setMobileExpanded(false)}>
							<TfiControlBackward />
						</div>
						:
						<div className={classes.links}>
							<div
								className={currentLink === "inbox" ? classes.active : classes.link}
								onClick={clickInbox}>
								Inbox
							</div>
							<div
								className={currentLink === "outbox" ? classes.active : classes.link}
								onClick={clickOutbox}>
								Outbox
							</div>
						</div>
				}
			</div>

			<div className={classes.mailbox}>
				{/* collapsed and expanded classes hidden on small screens */}
				<div className={classes.collapsed}>
					{
						currentMailbox.length > 0 ?
							currentMailbox.map(message =>
								<MessageCollapsed
									key={message._id}
									message={message}
									setExpandedMessage={setExpandedMessage}
									markMessageRead={markMessageRead}
									toggleFlag={toggleFlag}
									showExpanded={()=>{}}
								/>)
							:
							<div className={classes.empty}>No Messages in this Mailbox</div>
					}
				</div>

				<div className={classes.expanded}>
					{
						expandedMessage &&
						<MessageExpanded message={expandedMessage} toggleFlag={toggleFlag}/>
					}
				</div>

				{
					// mobileExpanded=true when message is open, so only show collapsed list when no msg selected
					!mobileExpanded &&
					<div className={classes.mobileCollapsed}>
						{
							currentMailbox.length > 0 ?
								currentMailbox.map(message =>
									<MessageCollapsed
										key={message._id}
										message={message}
										setExpandedMessage={setExpandedMessage}
										markMessageRead={markMessageRead}
										toggleFlag={toggleFlag}
										showExpanded={()=>setMobileExpanded(true)}
									/>)
								:
								<div>No Messages in this Mailbox</div>
						}
					</div>
				}

				{
					// when message is expanded in mobile, component will be rendered full screen
					mobileExpanded &&
					<div className={classes.mobileExpanded}>
						{
							expandedMessage &&
							<MessageExpanded
								message={expandedMessage}
								toggleFlag={toggleFlag}
							/>
						}
					</div>
				}
			</div>
		</div>
	);
};

export const myMessagesLoader = async () => {
	try {
		// retrieve all messages where sender or recipient matches using req.user info that is stored at login
		const response = await axiosDB("/messages")
		const { messages } = response.data
		// messages = { inbox, outbox }
		return messages
	} catch (error) {
		throw new Error(error)
	}
}

export default Messages;
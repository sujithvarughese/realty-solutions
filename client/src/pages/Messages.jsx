import classes from "./styles/Messages.module.css";
import { axiosDB } from "../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { CreateMessageForm, MessageExpanded, MessageCollapsed } from "../components";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { BiMessageSquareEdit } from "react-icons/bi"
import { TfiControlBackward } from "react-icons/tfi"

const Messages = () => {
	// messages = { inbox, outbox }	// message = { sender: { lastName, firstName, _id }, recipient, subject, body, read, flag, date, previousMessage
	const messages = useLoaderData()
	const { user } = useGlobalContext()

	const [currentMailbox, setCurrentMailbox] = useState([])
	const [myIncoming, setMyIncoming] = useState([])
	const [myOutgoing, setMyOutgoing] = useState([])
	const [myMessages, setMyMessages] = useState([])
	const [currentLink, setCurrentLink] = useState("all")
	const [showCreateMessageForm, setShowCreateMessageForm] = useState(false)
	const [addressBook, setAddressBook] = useState([])
	const [expandedMessage, setExpandedMessage] = useState(null)
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

	useEffect(() => {
		// determine which address book to get based on role (we don't want to give tenant access to other user data)
		// addr book returned from backend as array of objects { text: "lastName, firstName", value: user._id }
		if (user.isAdmin) {
			getUserList()
		} else {
			getAdminInfo()
		}
		const conversations = messages.filter(message => message.headNode && (message.recipient._id === user.userID || message.sender._id === user.userID))
		const incoming = messages.filter(message => message.recipient._id === user.userID)
		const outgoing = messages.filter(message => message.sender._id === user.userID)
		setCurrentMailbox(conversations)
		setMyMessages(conversations)
		setMyIncoming(incoming)
		setMyOutgoing(outgoing)
	}, []);

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
								className={currentLink === "all" ? classes.active : classes.link}
								onClick= {()=> {
									setExpandedMessage(null)
									setCurrentMailbox(myMessages)
									setCurrentLink("all")
								}}>
								All Messages
							</div>
							<div
								className={currentLink === "incoming" ? classes.active : classes.link}
								onClick= {()=> {
									setExpandedMessage(null)
									setCurrentMailbox(myIncoming)
									setCurrentLink("incoming")
								}}>
								Incoming
							</div>
							<div
								className={currentLink === "outgoing" ? classes.active : classes.link}
								onClick= {()=> {
									setExpandedMessage(null)
									setCurrentMailbox(myOutgoing)
									setCurrentLink("outgoing")
								}}>
								Outgoing
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
									userID={user.userID}
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
										userID={user.userID}
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
							<MessageExpanded message={expandedMessage} toggleFlag={toggleFlag} />
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
		return messages
	} catch (error) {
		throw new Error(error)
	}
}

export default Messages;
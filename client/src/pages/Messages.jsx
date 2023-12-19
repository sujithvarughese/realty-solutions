import classes from "./styles/Messages.module.css";
import { axiosDB } from "../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { CreateMessageForm, MessageExpanded, MessageCollapsed } from "../components";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { BiMessageSquareEdit } from "react-icons/bi"
import { TfiControlBackward } from "react-icons/tfi"
import {ButtonIcon, ButtonPlain} from "../ui/index.js";

const Messages = () => {
	// messages = { inbox, outbox }	// message = { sender: { lastName, firstName, _id }, recipient, subject, body, read, flag, date, previousMessage
	const messages = useLoaderData()
	const { user } = useGlobalContext()

	const [messagesState, setMessagesState] = useState(messages)
	const [currentMailbox, setCurrentMailbox] = useState([])
	const [myIncoming, setMyIncoming] = useState([])
	const [myOutgoing, setMyOutgoing] = useState([])
	const [myMessages, setMyMessages] = useState([])
	const [currentLink, setCurrentLink] = useState("all")
	const [showCreateMessageForm, setShowCreateMessageForm] = useState(false)
	const [addressBook, setAddressBook] = useState([])
	const [expandedMessage, setExpandedMessage] = useState(null)
	const [mobileExpanded, setMobileExpanded] = useState(false)
	const [showCreateReply, setShowCreateReply] = useState(false)
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
	const getMessages = async () => {
		try {
			// retrieve all messages where sender or recipient matches using req.user info that is stored at login
			const response = await axiosDB("/messages")
			const { messages } = response.data
			setMessagesState(messages)
		} catch (error) {
			throw new Error(error)
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

	const markMessageUnread = async (message) => {
		try {
			await axiosDB.patch("/messages/unread", message)
			const updatedMailbox = [...currentMailbox]
			// replace message in state with updated message with appropriate read status
			const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
			updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: false}
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
		// conversations will be messages in which the most recent message in the conversation is either to or from the user
		const conversations = messagesState.filter(message => message.headNode && (message.recipient._id === user.userID || message.sender._id === user.userID))
		const incoming = messagesState.filter(message => message.recipient._id === user.userID)
		const outgoing = messagesState.filter(message => message.sender._id === user.userID)
		setCurrentMailbox(conversations)
		setMyMessages(conversations)
		setMyIncoming(incoming)
		setMyOutgoing(outgoing)
		window.scrollTo(0, 0)
	}, [messagesState]);

	return (
		<div className={classes.container}>

			{
				// render create message modal when triggered
				showCreateMessageForm &&
				<CreateMessageForm
					cancel={()=>setShowCreateMessageForm(false)}
					addressBook={addressBook}
					getMessages={getMessages}
				/>
			}

			<div className={classes.nav}>
				{
					// Create new message icon is hidden in mobile when message is expanded
					// Back button is only displayed in mobile when message is expanded
					mobileExpanded ?
					<div className={classes.back}>
						<ButtonIcon onClick={()=>setMobileExpanded(false)}><TfiControlBackward /></ButtonIcon>
					</div>
						:
						<ButtonIcon
							onClick={()=>setShowCreateMessageForm(prevState => !prevState)}
							fontSize="56px"
						>
							<BiMessageSquareEdit />
						</ButtonIcon>
				}

					<div className={classes.links}>
						<div className={currentLink === "all" ? classes.active : classes.link}>
							<ButtonPlain
								onClick= {()=> {
									setExpandedMessage(null)
									setCurrentMailbox(myMessages)
									setCurrentLink("all")
								}
							}>All</ButtonPlain>
						</div>
						<div className={currentLink === "incoming" ? classes.active : classes.link}>
							<ButtonPlain
								onClick= {()=> {
									setExpandedMessage(null)
									setCurrentMailbox(myIncoming)
									setCurrentLink("incoming")
								}
							}>Incoming</ButtonPlain>
						</div>

						<div className={currentLink === "outgoing" ? classes.active : classes.link}>
							<ButtonPlain
								onClick={() => {
									setExpandedMessage(null)
									setCurrentMailbox(myOutgoing)
									setCurrentLink("outgoing")
								}
							}>Outgoing</ButtonPlain>
						</div>

					</div>

			</div>

			<div className={classes.mailbox}>
				{/* collapsed and expanded classes hidden on small screens */}

				<div className={classes.largeScreen}>
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
										closeReply={()=>setShowCreateReply(false)}
									/>)
								:
								<div className={classes.empty}>No Messages in this Mailbox</div>
						}
					</div>
					<div className={classes.expanded}>
						{
							expandedMessage ?
								<MessageExpanded
									message={expandedMessage}
									messages={messages}
									toggleFlag={toggleFlag}
									userID={user.userID}
									markMessageUnread={markMessageUnread}
									showCreateReply={showCreateReply}
									setShowCreateReply={setShowCreateReply}
									getMessages={getMessages}
								/>
								:
								<div className={classes.noMessage}>
									No Message Selected
								</div>
						}
					</div>
				</div>

				<div className={classes.mobile}>
					{
						mobileExpanded ?
							// when message is expanded in mobile, component will be rendered full screen
							<div className={classes.mobileExpanded}>
								{
									expandedMessage &&
									<MessageExpanded
										message={expandedMessage}
										messages={messages}
										toggleFlag={toggleFlag}
										userID={user.userID}
										markMessageUnread={markMessageUnread}
										showCreateReply={showCreateReply}
										setShowCreateReply={setShowCreateReply}
										getMessages={getMessages}
									/>
								}
							</div>
						:
							// mobileExpanded=true when message is open, so only show collapsed list when no msg selected
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
												closeReply={()=>setShowCreateReply(false)}
											/>)
										:
										<div>No Messages in this Mailbox</div>
								}
							</div>
					}
				</div>
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
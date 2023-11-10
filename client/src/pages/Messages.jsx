import classes from "./styles/Messages.module.css";
import { axiosDB } from "../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { CreateMessageForm, MessageExpanded, MessageCollapsed } from "../components";
import { Button } from "../UI/index.js";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { BiSolidMessageAltEdit, BiMessageSquareEdit } from "react-icons/bi"
import { TfiControlBackward } from "react-icons/tfi"

const Messages = () => {
	// messages = { inbox, outbox }
	const messages = useLoaderData()
	const { inbox, outbox } = messages
	const [myInbox, setMyInbox] = useState(inbox)
	const [myOutbox, setMyOutbox] = useState(outbox)

	const { user } = useGlobalContext()

	const [showCreateMessageForm, setShowCreateMessageForm] = useState(false)
	const [addressBook, setAddressBook] = useState([])
	const [expandedMessage, setExpandedMessage] = useState(inbox[0] || null)
	const [mobileExpanded, setMobileExpanded] = useState(false)
	// default to show inbox
	const [currentMailbox, setCurrentMailbox] = useState(myInbox)
	const [currentLink, setCurrentLink] = useState("inbox")

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

	// fetch admin info to user can send messages
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
			const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
			updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: true}
			setCurrentMailbox(updatedMailbox)
			setExpandedMessage(updatedMailbox[messageIndex])
			// messages = { inbox, outbox }
		} catch (error) {
			throw new Error(error)
		}
	}
	const clickInbox = async () => {
		setCurrentLink("inbox")
		const response = await axiosDB("/messages/inbox")
		const { inbox } = response.data
		setMyInbox(inbox)
	}

	const clickOutbox = async () => {
		setCurrentLink("outbox")
		const response = await axiosDB("/messages/outbox")
		const { outbox } = response.data
		setMyOutbox(outbox)
	}
	// determine which address book to get based on role (we don't want to give tenant access to other user data)
	// address book will be returned as an array of objects { text: "lastName, firstName" or "admin", value: user._id }
	useEffect(() => {
		if (user.isAdmin) {
			getUserList()
		} else {
			getAdminInfo()
		}
	}, [])

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


			{ showCreateMessageForm &&
				<CreateMessageForm
					cancel={()=>setShowCreateMessageForm(false)}
					addressBook={addressBook}
				/>
			}

			<div className={classes.links}>
				<div className={classes.create} onClick={()=>setShowCreateMessageForm(true)}>
					<BiMessageSquareEdit />
				</div>
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
							<div className={classes.empty}>No Messages in Inbox</div>
					}
				</div>

				<div className={classes.expanded}>
					{
						expandedMessage &&
						<MessageExpanded message={expandedMessage} toggleFlag={toggleFlag}/>
					}
				</div>

				{
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
								<div>No Messages in Inbox</div>
						}
					</div>
				}

				{
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
		const response = await axiosDB("/messages")
		const { messages } = response.data
		// messages = { inbox, outbox }
		return messages
	} catch (error) {
		throw new Error(error)
	}
}

export default Messages;
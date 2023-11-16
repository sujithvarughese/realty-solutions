import classes from "./styles/MessageExpanded.module.css";
import {MessageActions, MessageContents, ReplyMessageForm} from "../";
import { axiosDB } from "../../utils/axios.js";
import {useEffect, useState} from "react";

const MessageExpanded = ({ message, toggleFlag }) => {

	const { date, sender, recipient, subject, body, read, flag } = message

	const [previousMessagesArray, setPreviousMessagesArray] = useState([])

	const fetchPreviousMessages = async () => {
		try {
			const response = await axiosDB(`/messages/previous/${message._id}`)
			const { previousMessages } = response.data
			console.log(previousMessages)
			setPreviousMessagesArray(previousMessages)
		} catch (error) {
			console.log(error)
		}
	}

	// clear state when new message is clicked
	useEffect(() => {
		if (message.previousMessage) {
			fetchPreviousMessages()
		} else {
			setPreviousMessagesArray([])
		}
	}, [message]);


	const [showCreateReply, setShowCreateReply] = useState(false)

	return (
		<div className={classes.message}>

			{/* component renders create message icon and toggle flag icon */}
			<MessageActions
				message={message}
				reply={()=>setShowCreateReply(true)}
				toggleFlag={toggleFlag}
			/>


			<div className={classes.subjectContainer}>
				Subject: <span className={classes.subject}>{subject}</span>
			</div>


			<div className={classes.messages}>
				{
					showCreateReply &&
					<div className={classes.replyForm}>
						<ReplyMessageForm
							message={message}
							closeReply={()=>setShowCreateReply(false)}
						/>
					</div>
				}

				<div className={classes.currentMessage}>
					<MessageContents
						lastName={sender.lastName}
						firstName={sender.firstName}
						date={date}
						subject={subject}
						body={body}
					/>
				</div>

				{
					previousMessagesArray.length > 0 &&
					<div className={classes.previousMessages}>
						{
							previousMessagesArray.map(previousMessage => {
								return (
									<div className={classes.previousMessage} key={previousMessage._id}>
										<MessageContents
											lastName={previousMessage.sender.lastName}
											firstName={previousMessage.sender.firstName}
											date={previousMessage.date}
											subject={previousMessage.subject}
											body={previousMessage.body}
										/>
									</div>
								)
							})
						}

					</div>


				}
			</div>





		</div>
	);
};

const markMessageRead = async (message) => {
	try {
		const response = await axiosDB.post("/messages/read", message)
		const { messages } = response.data
		// messages = { inbox, outbox }
		return messages
	} catch (error) {
		throw new Error(error)
	}
}

export default MessageExpanded;
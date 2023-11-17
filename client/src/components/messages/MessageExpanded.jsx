import classes from "./styles/MessageExpanded.module.css";
import {MessageActions, MessageContents, ReplyMessageForm} from "../";
import { axiosDB } from "../../utils/axios.js";
import {useEffect, useState} from "react";

const MessageExpanded = ({ message, messages, toggleFlag, userID, markMessageUnread }) => {

	const { date, sender, recipient, subject, body, read, flag } = message
	const [previousMessages, setPreviousMessages] = useState([])

	useEffect(() => {
		const previousMessagesArray = []
		let currentMessage = message
		while (currentMessage.previousMessage) {
			const previousMessage = messages.find(message => message._id === currentMessage.previousMessage)
			previousMessagesArray.push(previousMessage)
			currentMessage = previousMessage
		}
		setPreviousMessages(previousMessagesArray)

	}, [message])


	const [showCreateReply, setShowCreateReply] = useState(false)

	return (
		<div className={classes.message}>

			{
				// component renders create message icon and toggle flag icon only for incoming messages
				recipient._id === userID &&
				<MessageActions
					message={message}
					reply={()=>setShowCreateReply(true)}
					toggleFlag={toggleFlag}
				/>
			}



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
						senderID={sender._id}
						date={date}
						subject={subject}
						body={body}
					/>
				</div>

				{
					previousMessages.length > 0 &&
					<div className={classes.previousMessages}>
						{
							previousMessages.map(previousMessage => {
								return (
									<div className={classes.previousMessage} key={previousMessage._id}>
										<MessageContents
											lastName={previousMessage.sender.lastName}
											firstName={previousMessage.sender.firstName}
											senderID={sender._id}
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
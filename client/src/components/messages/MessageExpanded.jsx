import classes from "./styles/MessageExpanded.module.css";
import {MessageActions, MessageContents, ReplyMessageForm} from "../";
import { axiosDB } from "../../utils/axios.js";
import {useEffect, useState} from "react";

const MessageExpanded = ({ message, toggleFlag }) => {

	const { date, sender, recipient, subject, body, status, flag, prevMessage } = message

	const [prevMessageContents, setPrevMessageContents] = useState(null)

	const fetchPrevMessage = async () => {
		try {
			const response = await axiosDB(`/messages/${prevMessage}`)
			const { message } = response.data
			console.log(message)
			setPrevMessageContents(message)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (prevMessage) {
			fetchPrevMessage()
		} else {
			setPrevMessageContents(null)
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
					prevMessageContents &&
					<div className={classes.prevMessage}>
						Previous Message
						<MessageContents
							lastName={prevMessageContents.sender.lastName}
							firstName={prevMessageContents.sender.firstName}
							date={prevMessageContents.date}
							subject={prevMessageContents.subject}
							body={prevMessageContents.body}
						/>
					</div>

				}
			</div>



			{
				showCreateReply &&
				<ReplyMessageForm
					message={message}
					closeReply={()=>setShowCreateReply(false)}
				/>
			}


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
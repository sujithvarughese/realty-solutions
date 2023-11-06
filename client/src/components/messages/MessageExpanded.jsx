import classes from "./styles/MessageExpanded.module.css";
import { RiReplyFill } from "react-icons/ri"
import { GrClose } from "react-icons/gr"
import { TbFlag, TbFlagFilled } from "react-icons/tb";
import { MessageActions, ReplyMessageForm } from "../";
import { axiosDB } from "../../utils/axios.js";
import { useEffect, useState } from "react";
import { Button } from "../../UI/index.js";

const MessageExpanded = ({ message, toggleFlag }) => {

	const { date, sender, recipient, subject, body, status, flag, prevMessage } = message

	const [showCreateReply, setShowCreateReply] = useState(false)

	return (
		<div className={classes.message}>

			<MessageActions
				message={message}
				reply={()=>setShowCreateReply(true)}
				toggleFlag={toggleFlag}
			/>

			{
				prevMessage &&
				<div className={classes.prevMessage}>
					{prevMessage}
				</div>
			}

			<div className={classes.info}>

				<div className={classes.senderDate}>
					<div className={classes.sender}>
						{sender.lastName} {sender.firstName}
					</div>
					<div className={classes.date}>
						{date.substring(0, 10)} -- {date.substring(11, 19)}
					</div>
				</div>

				<div className={classes.subjectFlag}>
					<div className={classes.subject}>
						{subject}
					</div>
					<div className={classes.flag}>
						{flag}
					</div>
				</div>


				<div className={classes.recipient}>

				</div>

			</div>

			<div className={classes.body}>
				{body}
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
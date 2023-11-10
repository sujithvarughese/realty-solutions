import classes from "./styles/ReplyMessageForm.module.css";
import { Button, Form, Input, InputSelect, Modal } from "../../UI";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosDB } from "../../utils/axios.js";

const ReplyMessageForm = ({ message, closeReply }) => {

	const { date } = message
	const { user } = useGlobalContext()
	// recipient is initially set to first name in address book (user has only one name in address book so default to admin)
	const [body, setBody] = useState("")

	const handleChange = (e) => {
		setBody(e.target.value);
	}

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		// add sender info before passing to server
		await replyMessage({
			sender: user.userID,
			recipient: message.sender._id,
			subject: message.subject,
			body: body,
			prevMessage: message._id
		})
		// navigate back to messages to update messages display
		navigate("/messages");
		closeReply()
	}

	return (
		<Modal>
		<Form onSubmit={handleSubmit} title="Reply">
			<div className={classes.form}>
				<div>
					To: {message.sender.lastName}, {message.sender.firstName}
				</div>
				<div>
					Subject: {message.subject}
				</div>
				<textarea
					placeholder="Type reply here..."
					name="body"
					value={body}
					rows="15"
					onChange={handleChange}
				></textarea>
				<div className={classes.prevMessage}>
					<div>
						On {date.substring(0, 10)} at {date.substring(11,19)}, {message.sender.firstName} {message.sender.lastName} wrote:
					</div>
					<div className={classes.prevMessageBody}>
						{message.body}
					</div>

				</div>
				<div className={classes.buttons}>
					<Button type="submit">Send</Button>
					<Button type="button" onClick={closeReply}>Cancel</Button>
				</div>
			</div>
		</Form>
		</Modal>
	);
};

const replyMessage = async (message) => {
	try {
		const response = await axiosDB.post("/messages", message)
		console.log(response.data);
	} catch (error) {
		throw new Error(error)
	}
}

export default ReplyMessageForm;
import classes from "./styles/ReplyMessageForm.module.css";
import { Button, Form, Input, InputSelect, Modal } from "../../UI/index.js";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosDB } from "../../utils/axios.js";

const ReplyMessageForm = ({ message, closeReply }) => {

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
			recipient: message.sender.id,
			subject: message.subject,
			body: body,
			prevMessage: message.prevMessage.id
		})
		// navigate back to messages to update messages display
		navigate("/messages");
		closeReply()
	}

	return (
		<Modal>
			<Form onSubmit={handleSubmit} title="create message">
				Message:
				<textarea
					name="body"
					value={body}
					rows="20"
					onChange={handleChange}
				></textarea>
				<div>
					<Button type="submit">Send</Button>
					<Button type="button" onClick={closeReply}>Cancel</Button>
				</div>
			</Form>
		</Modal>
	);
};

const replyMessage = async (message) => {
	try {
		const response = await axiosDB.post("/messages/reply", message)
		const { messages } = response.data
		// messages = { inbox, outbox }
		return messages
	} catch (error) {
		throw new Error(error)
	}
}

export default ReplyMessageForm;
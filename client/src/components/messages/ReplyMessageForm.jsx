import classes from "./styles/ReplyMessageForm.module.css";
import { Button, Form, Card, Textarea } from "../../ui";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosDB } from "../../utils/axios.js";
import { TfiClose } from "react-icons/tfi";

const ReplyMessageForm = ({ message, closeReply, getMessages }) => {

	const { date } = message
	const { user } = useGlobalContext()
	// recipient is initially set to first name in address book (user has only one name in address book so default to admin)
	const [body, setBody] = useState("")
	const [buttonText, setButtonText] = useState("Send")
	const handleChange = (e) => {
		setBody(e.target.value);
	}

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		// add sender info before passing to server
		try {
			const msg = await replyMessage({
				sender: user.userID,
				recipient: message.sender._id,
				subject: message.subject,
				body: body,
				previousMessage: message._id
			})
			if (msg === 'success') {
				setButtonText("Sent!")
			} else {
				setButtonText("Error")
			}
			await getMessages()
			setTimeout(() => {
				// navigate back to messages to update messages display
				navigate("/messages");
				closeReply()
			}, 1000)
		} catch (error) {
			throw new Error(error)
		}
	}

	return (
		<div className={classes.container}>
			<div className={classes.cancel} onClick={closeReply}>
				< TfiClose />
			</div>
			<Card>
				<Form onSubmit={handleSubmit}>
					<div className={classes.form}>
						<Textarea
							placeholder="Type reply here..."
							name="body"
							value={body}
							rows="15"
							onChange={handleChange}
						></Textarea>

						<div className={classes.button}>
							<Button type="submit">{buttonText}</Button>
						</div>
					</div>
				</Form>
			</Card>
		</div>

	);
};

const replyMessage = async (message) => {
	try {
		const response = await axiosDB.post("/messages", message)
		const { msg } = response.data
		return msg
	} catch (error) {
		throw new Error(error)
	}
}

export default ReplyMessageForm;
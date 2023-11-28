import classes from "./styles/CreateMessageForm.module.css";
import {Button, Form, Input, Textarea, Modal, Card, Select} from "../../ui";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { axiosDB } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import FormRow from "../../ui/FormRow.jsx";

const initialState = {
	sender: "",
	recipient: "",
	subject: "",
	body: ""
}

const CreateMessageForm = ({ addressBook, cancel }) => {

	const { user } = useGlobalContext()
	// recipient is initially set to first name in address book (user has only one name in address book so default to admin)
	const [values, setValues] = useState({ ...initialState, recipient: addressBook[0].value })

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		// add sender info before passing to server
		await createMessage({ ...values, sender: user.userID })
		// navigate back to messages to update messages display
		navigate("/messages");
		cancel()
	}

	return (
		<div className={classes.container}>
		<Modal>
		<Card>
		<Form onSubmit={handleSubmit} title="create message">
			<div className={classes.to}>
				<FormRow label="To:">
					<Select
						type="text"
						name="recipient"
						list={addressBook}
						value={values.recipient}
						onChange={handleChange}
					></Select>
				</FormRow>
			</div>
			<Input
				htmlFor="subject"
				placeholder="Subject"
				type="text"
				name="subject"
				value={values.subject}
				onChange={handleChange}
			></Input>
			<Textarea
				placeholder="Type new message here..."
				name="body"
				value={values.body}
				rows="15"
				onChange={handleChange}
			></Textarea>

			<div className={classes.buttons}>
				<Button type="submit">Send</Button>
				<Button type="button" onClick={cancel}>Cancel</Button>
			</div>

		</Form>
		</Card>
		</Modal>
		</div>

	);
};

const createMessage = async (message) => {
	try {
		const response = await axiosDB.post("/messages", message)
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
}
export default CreateMessageForm;
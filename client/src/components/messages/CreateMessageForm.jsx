import classes from "./styles/CreateMessageForm.module.css";
import { Button, Form, Input, InputSelect, Modal } from "../../UI";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { axiosDB } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

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
		<Modal>
		<Form onSubmit={handleSubmit} title="create message">
			<InputSelect
				htmlFor="recipient"
				label="recipient: "
				type="text"
				name="recipient"
				list={addressBook}
				value={values.recipient}
				onChange={handleChange}
			></InputSelect>
			<Input
				htmlFor="subject"
				label="subject: "
				type="text"
				name="subject"
				value={values.subject}
				onChange={handleChange}
			></Input>
			<Input
				htmlFor="body"
				label="message: "
				type="text"
				name="body"
				value={values.body}
				onChange={handleChange}
			></Input>
			<div>
				<Button type="submit">Send</Button>
				<Button type="button" onClick={cancel}>Cancel</Button>
			</div>
		</Form>
		</Modal>
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
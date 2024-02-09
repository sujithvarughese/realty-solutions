import classes from "./styles/CreateMessageForm.module.css";
import { Modal, Card} from "../../ui";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { axiosDB } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import CustomSelect from '../../ui/CustomSelect.jsx'
import CustomInput from '../../ui/CustomInput.jsx'
import { VStack, Textarea, FormControl, ButtonGroup, Button, Select, FormLabel } from '@chakra-ui/react'

const initialState = {
	sender: "",
	recipient: "",
	subject: "",
	body: ""
}

const CreateMessageForm = ({ addressBook, cancel, getMessages }) => {

	const { user } = useGlobalContext()

	// recipient is initially set to first name in address book (user has only one name in address book so default to admin)
	//const [values, setValues] = useState({ ...initialState, recipient: addressBook[0].value })
	const [buttonText, setButtonText] = useState("Send")
	/*
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}
*/
	const navigate = useNavigate()

	const handleSubmit = async (values, actions) => {
		try {
			console.log(values)
			// add sender info before passing to server
			const msg = await createMessage({ ...values, sender: user.userID })
			// navigate back to messages to update messages display
			if (msg === 'success') {
				setButtonText("Sent!")
			} else {
				setButtonText("Error")
			}
			await getMessages()
			setTimeout(() => {
				navigate("/messages");
				cancel()
			}, 1000)
		} catch (error) {
			throw new Error(error)
		} finally {
			actions.resetForm()
		}
	}

	return (
		<div className={classes.container}>
		<Modal closeFn={cancel}>
		<Card>
		<Formik
			initialValues={{
				sender: "",
				recipient: "",
				subject: "",
				body: ""
		}}

			onSubmit={handleSubmit}
		>
			{
				props => (
					<Form>
						<VStack>

							<Select
								type="text"
								name="recipient">
								{addressBook.map((option, index) => {
									if (index === 0) {
										return <option key={option.value} value={option.value} selected={true}>{option.text}</option>
									}
									return <option key={option.value} value={option.value}>{option.text}</option>
								})}
							</Select>
							<CustomInput
								placeholder="Subject"
								type="text"
								name="subject"
							></CustomInput>
							<FormControl>
								<Textarea
									placeholder="Type new message here..."
									name="body"
									rows="15"
									resize="none"
								></Textarea>
							</FormControl>

							<ButtonGroup>
								<Button type="submit" colorScheme="facebook" color="white" >{buttonText}</Button>
								<Button type="button" colorScheme="facebook" onClick={cancel}>Cancel</Button>
							</ButtonGroup>

						</VStack>


					</Form>
				)
			}

		</Formik>
		</Card>
		</Modal>
		</div>

	);
};

const createMessage = async (message) => {
	try {
		const response = await axiosDB.post("/messages", message)
		const { msg } = response.data
		return msg
	} catch (error) {
		console.log(error);
	}
}
export default CreateMessageForm;
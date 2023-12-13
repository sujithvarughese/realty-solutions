import classes from "./styles/CreateUserForm.module.css";
import { Input, Form, Button, Card, Modal } from "../../ui";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import UserRegistrationConfirmation from "./UserRegistrationConfirmation.jsx";

const initialState = {
	lastName: "",
	firstName: "",
	email: "",
	unit: null,
	phone: "",
	rent: "",
	balance: "",
}

const CreateUserForm = ({ closeForm, unitID }) => {

	const [values, setValues] = useState(initialState)
	const [buttonText, setButtonText] = useState("Create User")
	const [showConfirmation, setShowConfirmation] = useState(false)
	const [email, setEmail] = useState("")
	const [code, setCode] = useState("")
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const navigate = useNavigate()


	const handleSubmit = async (e) => {
		e.preventDefault()
		// pass unit to database so unit will be in mongo user document
		const registration = await createUser({ ...values, unit: unitID })
		const { email, code } = registration
		setEmail((prevState) => email)
		setCode((prevState => code))
		setShowConfirmation(true)

		// navigate back to units page to render changes
		navigate("/units");
		// close form
	}

	return (
		<div className={classes.container}>
		<Modal closeFn={closeForm}>
		<Card>
			{showConfirmation ? <UserRegistrationConfirmation email={email} code={code} />
				:
			<Form onSubmit={handleSubmit} title="Create User">
				<div className={classes.form}>
					<div className={classes.name}>
						<Input
							htmlFor="lastName"
							placeholder="LAST NAME"
							type="text"
							name="lastName"
							value={values.lastName}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="firstName"
							placeholder="FIRST NAME"
							type="text"
							name="firstName"
							value={values.firstName}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.contact}>
						<Input
							htmlFor="email"
							placeholder="EMAIL"
							type="email"
							name="email"
							value={values.email}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="phone"
							placeholder="PHONE"
							type="text"
							name="phone"
							value={values.phone}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.info}>
						<Input
							htmlFor="rent"
							placeholder="RENT"
							type="number"
							name="rent"
							value={values.rent}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="balance"
							placeholder="BALANCE"
							type="number"
							name="balance"
							value={values.balance}
							onChange={handleChange}
						></Input>
					</div>

					<div className={classes.buttons}>
						<Button type="submit">{buttonText}</Button>
						<Button type="button" onClick={closeForm}>Cancel</Button>
					</div>
				</div>
			</Form>
			}
		</Card>
		</Modal>
		</div>
	);
};

const createUser = async (credentials) => {
	try {
		const response = await axiosDB.post("/registration/create", credentials)
		const { registration } = response.data
		return registration
	} catch (error) {
		console.log(error);
	}
}

export default CreateUserForm;
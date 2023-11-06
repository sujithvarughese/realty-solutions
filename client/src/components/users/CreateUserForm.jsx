import classes from "./styles/CreateUserForm.module.css";
import { Input, Form, Button, Modal } from "../../UI";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { axiosDB } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

const initialState = {
	lastName: "",
	firstName: "",
	email: "",
	password: "",
	unit: null,
	phone: "",
	rent: "",
	balance: 0
}

const CreateUserForm = ({ cancel, unit }) => {

	const { unitID, street } = unit

	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		// pass unit to database so unit will be in mongo user document
		await createUser({ ...values, unit: unit })
		// navigate back to units page to render changes
		navigate("/units");
		// close form
		cancel()
	}

	return (
		<Modal>
			<Form onSubmit={handleSubmit} title="Create User">
				<div>{unitID} {street}</div>
				<div className={classes.name}>
					<Input
						htmlFor="lastName"
						label="Last Name: "
						type="text"
						name="lastName"
						value={values.lastName}
						onChange={handleChange}
					></Input>
					<Input
						htmlFor="firstName"
						label="First Name: "
						type="text"
						name="firstName"
						value={values.firstName}
						onChange={handleChange}
					></Input>
				</div>
				<div className={classes.contact}>
					<Input
						htmlFor="email"
						label="Email: "
						type="email"
						name="email"
						value={values.email}
						onChange={handleChange}
					></Input>
					<Input
						htmlFor="phone"
						label="phone number: "
						type="text"
						name="phone"
						value={values.phone}
						onChange={handleChange}
					></Input>
				</div>
				<div className={classes.info}>
					<Input
						htmlFor="rent"
						label="rent: "
						type="number"
						name="rent"
						value={values.rent}
						onChange={handleChange}
					></Input>
					<Input
						htmlFor="balance"
						label="balance: "
						type="number"
						name="balance"
						value={values.balance}
						onChange={handleChange}
					></Input>
				</div>

				<div className={classes.btn}>
					<Button type="submit">Create Account</Button>
					<Button type="button" onClick={cancel}>Cancel</Button>
				</div>
			</Form>
		</Modal>
	);
};

const createUser = async (credentials) => {
	try {
		const response = await axiosDB.post("/auth/user", credentials)
		// response.data --> user = { userID: _id, isAdmin: isAdmin }
		console.log(response.data)
	} catch (error) {
		console.log(error);
	}
}

export default CreateUserForm;
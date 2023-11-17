import classes from "./styles/CreateUserForm.module.css";
import { Input, Form, Button, Card } from "../../UI";
import { useState } from "react";
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
	balance: "",
	tenant: ""
}

const CreateUserForm = ({ cancel, unitID }) => {

	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		// pass unit to database so unit will be in mongo user document
		await createUser({ ...values, unit: unitID })
		// navigate back to units page to render changes
		navigate("/units");
		// close form
		cancel()
	}

	return (
		<div className={classes.container}>
		<Card>
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
						<Button type="submit">Create Account</Button>
						<Button type="button" onClick={cancel}>Cancel</Button>
					</div>
				</div>
			</Form>
		</Card>
		</div>
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
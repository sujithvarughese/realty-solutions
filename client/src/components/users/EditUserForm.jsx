import classes from "./styles/EditUserForm.module.css";
import { useState } from "react";
import { Button, Form, Input, Card } from "../../UI/index.js";
import { axiosDB } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

const EditUserForm = ({ cancel, user }) => {
	// pre-fill fields with current user values
	const [values, setValues] = useState(user)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		await editUser(values)
		// navigate back to units page to render changes
		navigate("/units");
		// close form
		cancel()
	}

	return (
		<div className={classes.container}>
		<Form onSubmit={handleSubmit}>
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
				<div className={classes.buttons}>
					<Button type="submit">Update User</Button>
					<Button type="button" onClick={cancel}>Cancel</Button>
				</div>
			</div>
		</Form>
		</div>
	);
};

const editUser = async (credentials) => {
	try {
		const response = await axiosDB.patch("/auth/user", credentials)
		// response.data --> user = { userID: _id, isAdmin: isAdmin }
		console.log(response.data)
	} catch (error) {
		console.log(error);
	}
}

export default EditUserForm;
import classes from "./styles/EditUserForm.module.css";
import { useState } from "react";
import { Button, Form, Input, Modal } from "../../UI/index.js";
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
		<Modal>
			<Form onSubmit={handleSubmit} title="Edit User">
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
						htmlFor="unit"
						label="unit: "
						type="text"
						name="unit"
						value={values.unit}
						onChange={handleChange}
					></Input>
					<Input
						htmlFor="rent"
						label="rent: "
						type="number"
						name="rent"
						value={values.rent}
						onChange={handleChange}
					></Input>
				</div>
				<div className={classes.btn}>
					<Button type="submit">Update User</Button>
					<Button type="button" onClick={cancel}>Cancel</Button>
				</div>
			</Form>
		</Modal>
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
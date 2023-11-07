import classes from "./styles/Register.module.css";
import { Input, Form, Button } from "../../UI";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const initialState = {
	lastName: "",
	firstName: "",
	email: "",
	password: "",
	newPassword: "",
	newPasswordVerify: ""
}

const Register = () => {

	const [values, setValues] = useState(initialState)
	const { register } = useGlobalContext()

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// verify passwords are same before sending to server
		if (values.newPassword !== values.newPasswordVerify) {
			console.log("Passwords do not match");
			return
		}
		register(values)
	}

	return (
		<div className={classes.register}>
			<Form onSubmit={handleSubmit} title="Register">
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
				<Input
					htmlFor="email"
					label="Email: "
					type="email"
					name="email"
					value={values.email}
					onChange={handleChange}
				></Input>
				<Input
					htmlFor="password"
					label="Password: "
					type="password"
					name="password"
					value={values.password}
					onChange={handleChange}
				></Input>
				<Input
					htmlFor="newPassword"
					label="New Password: "
					type="password"
					name="newPassword"
					value={values.newPassword}
					onChange={handleChange}
				></Input>
				<Input
					htmlFor="newPasswordVerify"
					label="Re-type new Password: "
					type="password"
					name="newPasswordVerify"
					value={values.newPasswordVerify}
					onChange={handleChange}
				></Input>
				<div className={classes.btn}>
					<Button type="submit">Create Account</Button>
				</div>
			</Form>
		</div>

	);
};
export default Register;
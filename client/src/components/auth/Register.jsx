import classes from "./styles/Register.module.css";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Button, Form, Input } from "../../UI/index.js";

const initialState = {
	email: "",
	password: ""
}

const Register = () => {
	const [values, setValues] = useState(initialState)
	const { login } = useGlobalContext()

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		login(values)
	}

	return (
		<div className={classes.login}>
			<div>
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
					htmlFor="newPasswordVerify"
					label="Re-type new Password: "
					type="password"
					name="newPasswordVerify"
					value={values.newPasswordVerify}
					onChange={handleChange}
				></Input>
				<div className={classes.btn}>
					<Button type="submit">Login</Button>
				</div>
			</div>
		</div>

	);
};

export default Register;
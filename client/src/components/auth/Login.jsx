import classes from "./styles/Login.module.css";
import { useState } from "react";
import { Form, Input, Button } from "../../UI"
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const initialState = {
	email: "",
	password: ""
}

const Login = () => {
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
				<div className={classes.btn}>
					<Button type="submit">Login</Button>
				</div>
			</div>
		</div>

	);
};


export default Login;
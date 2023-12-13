import classes from "./styles/Auth.module.css";
import {Form, Input, Button} from "../../ui";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const credentials = {
	email: import.meta.env.VITE_ADMIN_LOGIN,
	password: import.meta.env.VITE_ADMIN_PASSWORD
}
const AuthForm = ({ authState }) => {

	const { login, verifyRegistration } = useGlobalContext()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [registrationCode, setRegistrationCode] = useState("")

	const previewAsAdmin = () => {
		login(credentials)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (authState === "login") {
			login({ email, password })
		} else {
			if (password !== passwordConfirm) {
				return console.log("passwords do not match")
			}
			verifyRegistration({ email, registrationCode, password })
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				htmlFor="email"
				type="email"
				name="email"
				placeholder="Email"
				value={email}
				onChange={(e)=>setEmail(e.target.value)}
			></Input>
			{
				authState === "register" &&
				<Input
					htmlFor="code"
					type="text"
					name="code"
					placeholder="Registration Code"
					value={registrationCode}
					onChange={(e)=>setRegistrationCode(e.target.value)}
				></Input>
			}
			<Input
				htmlFor="password"
				placeholder="Password"
				type="password"
				name="password"
				value={password}
				onChange={(e)=>setPassword(e.target.value)}
			></Input>
			{
				authState === "register" &&
				<Input
					htmlFor="passwordConfirm"
					placeholder="Confirm Password"
					type="password"
					name="passwordConfirm"
					value={passwordConfirm}
					onChange={(e)=>setPasswordConfirm(e.target.value)}
				></Input>
			}
			<div className={classes.buttons}>
				<Button type="submit">{authState === "register" ? "REGISTER" : "LOG IN"}</Button>
				<Button type="click" onClick={previewAsAdmin}>PREVIEW</Button>
			</div>
		</Form>
	);
};

export default AuthForm;
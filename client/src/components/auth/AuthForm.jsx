import classes from "./styles/AuthForm.module.css";
import { Form, Input, Button } from "../../UI";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";


const AuthForm = ({ authState }) => {

	const { login, register } = useGlobalContext()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordRetype, setPasswordRetype] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		if (authState === "login") {
			login({ email, password })
		} else {
			if (password !== passwordRetype) {
				return console.log("passwords dont match");
			}
			console.log(email, password);
			register({ email, password })
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<div className={classes.form}>
				<Input
					htmlFor="email"
					type="email"
					name="email"
					placeholder="EMAIL"
					value={email}
					onChange={(e)=>setEmail(e.target.value)}
				></Input>
				<Input
					htmlFor="password"
					placeholder="PASSWORD"
					type="password"
					name="password"
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
				></Input>
				{
					authState === "register" &&
					<Input
						htmlFor="passwordRetype"
						placeholder="CONFIRM PASSWORD"
						type="password"
						name="passwordRetype"
						value={passwordRetype}
						onChange={(e)=>setPasswordRetype(e.target.value)}
					></Input>
				}

			{
				authState !== "register" &&
				<div className={classes.options}>
					<div>
						Reset Password
					</div>
					<div>
						Login as Guest
					</div>
				</div>
			}
			</div>
			<Button type="submit">
				{
					authState === "register" ?
						"CREATE ACCOUNT"
						:
						"LOG INTO MY ACCOUNT"
				}
			</Button>

		</Form>
	);
};

export default AuthForm;
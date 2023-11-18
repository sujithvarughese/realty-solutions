import classes from "./styles/AuthForm.module.css";
import { Form, Input, Button } from "../../UI";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const AuthForm = ({ authState }) => {

	const { login, verifyAccount } = useGlobalContext()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [registrationCode, setRegistrationCode] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		if (authState === "login") {
			login({ email, password })
		} else {
			verifyAccount({ email, password })
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
				{
					authState === "register" ?
						<Input
							htmlFor="code"
							type="text"
							name="code"
							placeholder="REGISTRATION CODE"
							value={registrationCode}
							onChange={(e)=>setRegistrationCode(e.target.value)}
						></Input>
					:
						<Input
							htmlFor="password"
							placeholder="PASSWORD"
							type="password"
							name="password"
							value={password}
							onChange={(e)=>setPassword(e.target.value)}
						></Input>
				}


			</div>
			<div className={classes.button}>
				<Button type="submit">
					{
						authState === "register" ?
							"REGISTER"
							:
							"LOG INTO MY ACCOUNT"
					}
				</Button>
			</div>


		</Form>
	);
};

export default AuthForm;
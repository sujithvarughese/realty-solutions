import classes from "./styles/Auth.module.css";
import { useEffect, useState } from 'react'
import {ButtonPlain} from "../../ui";
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import { Card, CardBody } from '@chakra-ui/react'

const Auth = ({ state }) => {
	// default to create account tab, state changes between "login" and "register" on click
	const [authState, setAuthState] = useState(state)
	useEffect(() => {
		setAuthState(state)
	}, [state])
	return (
		<Card height="420px" width={{ lg: "50%" }} marginX={{ md: "10" }} boxShadow="2xl">
			<CardBody>
				<div className={classes.links}>
					<div className={`${classes.link} ${authState === "login" && classes.active}`}>
						<ButtonPlain onClick={()=>setAuthState("login")}>LOGIN</ButtonPlain>
					</div>
					<div className={`${classes.link} ${authState === "register" && classes.active}`}>
						<ButtonPlain onClick={()=>setAuthState("register")}>REGISTER</ButtonPlain>
					</div>
				</div>

				{/* form with input fields and button */}
				{/* when user is detected in state, Root component will navigate accordingly to user */}

				{
					authState === "register" ? <RegisterForm />: <LoginForm />
				}
			</CardBody>
		</Card>
	);
};

export default Auth;
import classes from "./styles/Auth.module.css";
import { useState } from "react";
import { Card } from "../../UI";
import AuthForm from "./AuthForm.jsx";
import {useGlobalContext} from "../../context/GlobalContext.jsx";

const credentials = {
	email: import.meta.env.VITE_ADMIN_LOGIN,
	password: import.meta.env.VITE_ADMIN_PASSWORD
}
const Auth = () => {
	const { login } = useGlobalContext()
	// default to create account tab, state changes between "login" and "register" on click
	const [authState, setAuthState] = useState("register")
	const previewAsAdmin = () => {
		login(credentials)
	}
	return (
		<Card>
			<div className={classes.container}>
				<div className={classes.select}>
					<div
						className={`${classes.tab} ${authState === "register" && classes.active}`}
						onClick={()=>setAuthState("register")}
					>
						Register
					</div>
					<div
						className={`${classes.tab} ${authState === "login" && classes.active}`}
						onClick={()=>setAuthState("login")}
					>
						Login
					</div>
				</div>

				{/* form with input fields and button */}
				{/* when user is detected in state, Root component will navigate accordingly to user */}
				<AuthForm authState={authState} />
			</div>

			<div onClick={previewAsAdmin} className={classes.link}>
				Preview as Property Manager
			</div>
		</Card>
	);
};

export default Auth;
import classes from "./styles/Auth.module.css";
import { useState } from "react";
import {Card} from "../../ui";
import AuthForm from "./AuthForm.jsx";

const Auth = () => {
	// default to create account tab, state changes between "login" and "register" on click
	const [authState, setAuthState] = useState("register")

	return (
		<Card>
			<div className={classes.container}>
				<div className={classes.select}>
					<div
						className={`${classes.link} ${authState === "register" && classes.active}`}
						onClick={()=>setAuthState("register")}
					>
						Register
					</div>
					<div
						className={`${classes.link} ${authState === "login" && classes.active}`}
						onClick={()=>setAuthState("login")}
					>
						Login
					</div>
				</div>

				{/* form with input fields and button */}
				{/* when user is detected in state, Root component will navigate accordingly to user */}
				<div className={classes.authForm}>
					<AuthForm authState={authState} />
				</div>

			</div>


		</Card>
	);
};

export default Auth;
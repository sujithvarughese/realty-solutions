import classes from "./styles/Auth.module.css";
import { useState } from "react";
import { Card } from "../../UI";
import AuthForm from "./AuthForm.jsx";

const Auth = () => {

	// default to create account tab, state changes between "login" and "register" on click
	const [authState, setAuthState] = useState("register")

	return (
		<Card>
			<div className={classes.container}>
				<div className={classes.select}>
					<div
						className={`${classes.tab} ${authState === "register" && classes.active}`}
						onClick={()=>setAuthState("register")}
					>
						Create Account
					</div>
					<div
						className={`${classes.tab} ${authState === "login" && classes.active}`}
						onClick={()=>setAuthState("login")}
					>
						Login
					</div>
				</div>

				<AuthForm authState={authState} />
			</div>
		</Card>
	);
};

export default Auth;
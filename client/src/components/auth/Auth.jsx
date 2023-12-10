import classes from "./styles/Auth.module.css";
import { useState } from "react";
import {Card, ButtonPlain} from "../../ui";
import AuthForm from "./AuthForm.jsx";

const Auth = () => {
	// default to create account tab, state changes between "login" and "register" on click
	const [authState, setAuthState] = useState("register")

	return (
		<Card>
			<div className={classes.container}>
				<div className={classes.links}>
					<div className={`${classes.link} ${authState === "register" && classes.active}`}>
						<ButtonPlain onClick={()=>setAuthState("register")}>REGISTER</ButtonPlain>
					</div>
					<div className={`${classes.link} ${authState === "login" && classes.active}`}>
						<ButtonPlain onClick={()=>setAuthState("login")}>LOGIN</ButtonPlain>
					</div>
				</div>

				{/* form with input fields and button */}
				{/* when user is detected in state, Root component will navigate accordingly to user */}
				<AuthForm authState={authState} />
			</div>
		</Card>
	);
};

export default Auth;
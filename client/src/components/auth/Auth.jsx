import classes from "./styles/Auth.module.css";
import { Login, Register } from "../"
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";
import { Card } from "../../UI";
import AuthForm from "./AuthForm.jsx";

const initialState = {
	email: "",
	password: ""
}

const Auth = () => {

	const { user } = useGlobalContext()

	const [values, setValues] = useState(initialState)
	const [authState, setAuthState] = useState("register")

	return (
		<Card>
			<div className={classes.container}>
				<div className={classes.select}>
					<div
						className={`${classes.register} ${authState === "register" && classes.active}`}
						onClick={()=>setAuthState("register")}
					>
						Create Account
					</div>
					<div
						className={`${classes.login} ${authState === "login" && classes.active}`}
						onClick={()=>setAuthState("login")}
					>
						Login
					</div>
				</div>

				<AuthForm
					authState={authState}
					values={values}
					setValues={setValues}
				/>
			</div>
		</Card>
	);
};

export default Auth;
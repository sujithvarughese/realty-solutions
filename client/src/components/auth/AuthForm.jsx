import classes from "./styles/AuthForm.module.css";
import { Form, Input, Button } from "../../UI/index.js";

const AuthForm = ({ authState, values, setValues }) => {

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	return (
		<Form>
			<div className={classes.form}>
				<Input
					htmlFor="email"
					type="email"
					name="email"
					placeholder="EMAIL"
					value={values.email}
					onChange={handleChange}
				></Input>
				<Input
					htmlFor="password"
					placeholder="PASSWORD"
					type="password"
					name="password"
					value={values.password}
					onChange={handleChange}
				></Input>
				{
					authState === "register" &&
					<Input
						htmlFor="newPasswordVerify"
						placeholder="CONFIRM PASSWORD"
						type="password"
						name="newPasswordVerify"
						value={values.newPasswordVerify}
						onChange={handleChange}
					></Input>
				}
			</div>
			<div className={classes.options}>
				<div className={classes.reset}>
					Reset Password
				</div>
				<div className={classes.guest}>
					Login as Guest
				</div>
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
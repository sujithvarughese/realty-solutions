import classes from "./styles/DesktopNavbar.module.css"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {ButtonPlain} from "../../ui/index.js";
import { Button, HStack } from '@chakra-ui/react'
import { useGlobalContext } from '../../context/GlobalContext.jsx'
import { Form, Formik } from 'formik'
import { loginSchema } from '../../schemas/index.js'
import useAxios from '../../hooks/useAxios.js'
import { useEffect } from 'react'

const credentials = {
	email: import.meta.env.VITE_ADMIN_LOGIN,
	password: import.meta.env.VITE_ADMIN_PASSWORD
}

const DesktopNavbar = ({ user, links, logout }) => {
	const { login } = useGlobalContext()
	const navigate = useNavigate()
	const { response, error, loading, submitData } = useAxios()

	const handleSubmit = async (values, actions) => {
		try {
			await submitData({
				method: "post",
				url: "/auth/login",
				requestConfig: values
			})
		} catch (err) {
			console.log(error.message)
		} finally {
			actions.resetForm()
		}
	}
	useEffect(() => {
		if (response) login(response.user)
	}, [response])

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				{user ?
					<div className={classes.logo}>
						RS
					</div>
					:
					<NavLink to="/" className={classes.logo}>
						RS
					</NavLink>
				}

				<div className={classes.links}>
					{
						links.map((link, index) => {
							return (
								<NavLink
									key={index}
									to={link.url}
									className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
								>
									{link.name}
								</NavLink>
							)
						})
					}
				</div>

				<div className={classes.logout}>
					{
						user ?
						<div className={classes.link}>
							<ButtonPlain onClick={logout}>Logout</ButtonPlain>
						</div>
						:
						<HStack>
							<Button onClick={() => navigate("auth", { state: "login" })} borderRadius={4} width={24}>Login</Button>
							<Button onClick={() => navigate("auth", { state: "register" })} borderRadius={4} width={24}>Sign Up</Button>
							<Formik
								initialValues={{ email: "", password: ""}}
								validationSchema={loginSchema}
								onSubmit={handleSubmit}
								>
									{props => (
										<Form>
											<Button type="submit" onClick={()=>handleSubmit(credentials, props)} borderRadius={4} width={24} bgColor="var(--COLOR-ALT)" color="white" fontWeight="bold">Demo</Button>
										</Form>
									)}
							</Formik>
						</HStack>
					}
				</div>
			</div>



		</div>
	);
};

export default DesktopNavbar;
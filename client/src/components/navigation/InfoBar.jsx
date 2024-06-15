import classes from "./styles/InfoBar.module.css"
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { ButtonPlain} from "../../ui";
import { Button } from '@chakra-ui/react'

import { useNavigate } from "react-router-dom";
import useAxios from '../../hooks/useAxios.js'
import { useEffect } from 'react'
import { Form, Formik } from 'formik'
import { loginSchema } from '../../schemas/index.js'

const credentials = {
	email: import.meta.env.VITE_ADMIN_LOGIN,
	password: import.meta.env.VITE_ADMIN_PASSWORD
}

const InfoBar = ({ user, logout }) => {

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
		<div className={classes.infoBar}>
			<div className={classes.title}>
				Realty Solutions
			</div>

			{
				user ?
			<div className={classes.link}>
				<ButtonPlain onClick={logout}>Logout</ButtonPlain>
			</div>
				:
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
			}
		</div>
	);
};

export default InfoBar;
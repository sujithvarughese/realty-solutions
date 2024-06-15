import classes from "./styles/DesktopNavbar.module.css"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {ButtonPlain} from "../../ui/index.js";
import { Button, HStack } from '@chakra-ui/react'

const DesktopNavbar = ({ user, links, logout }) => {

	const navigate = useNavigate()

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div className={classes.logo}>
					RS
				</div>
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
							<Button borderRadius={4} width={24} bgColor="var(--COLOR-ALT)" color="white" fontWeight="bold">Demo</Button>
						</HStack>
					}
				</div>
			</div>



		</div>
	);
};

export default DesktopNavbar;
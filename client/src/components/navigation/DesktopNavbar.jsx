import classes from "./styles/DesktopNavbar.module.css"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {ButtonPlain} from "../../ui/index.js";

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
						user &&
						<div className={classes.link}>
							<ButtonPlain onClick={logout}>Logout</ButtonPlain>
						</div>
					}
				</div>
			</div>



		</div>
	);
};

export default DesktopNavbar;
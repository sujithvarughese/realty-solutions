import classes from "./styles/DesktopNavbar.module.css"
import { NavLink } from "react-router-dom";

const DesktopNavbar = ({ user, links, logout }) => {

	return (
		<div className={classes.navbar}>

			<div className={classes.logo}>
				<div className={classes.title}>
					<h1>Realty Solutions</h1>
				</div>
			</div>

			<div className={classes.links}>
				{
					links.map((link, index) => {
						return (
							<NavLink
								key={index}
								to={link.url}
								className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
								end
							>
								{link.name}
							</NavLink>
						)
					})
				}

				{
					user &&
					<div className={classes.link} onClick={logout}>
						Logout
					</div>
				}

			</div>


		</div>
	);
};

export default DesktopNavbar;
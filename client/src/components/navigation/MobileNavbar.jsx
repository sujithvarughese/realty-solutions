import classes from "./styles/MobileNavbar.module.css"
import { Fragment } from "react"
import { NavLink } from "react-router-dom";

const MobileNavbar = ({ user, links }) => {

	return (
		<div className={classes.navbar}>
			{
				links.map((link, index) => {
					return (
						<NavLink
							key={index}
							to={link.url}
							className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
							end
						>
							{link.icon}
						</NavLink>
					)
				})
			}
		</div>
	);
};

export default MobileNavbar;
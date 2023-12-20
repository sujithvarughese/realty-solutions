import classes from "./styles/MobileNavbar.module.css"
import { NavLink } from "react-router-dom";

const MobileNavbar = ({ user, links }) => {

	return (
		<div className={classes.container}>
			<div className={classes.backdrop}></div>


			{
				links.map((link, index) => {
					return (
						<NavLink
							key={index}
							to={link.url}
							className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
						>
							<>
								<div className={classes.icon}>{link.icon}</div>
								<div className={classes.name}>{link.name}</div>
							</>

						</NavLink>
					)
				})
			}

		</div>
	);
};

export default MobileNavbar;
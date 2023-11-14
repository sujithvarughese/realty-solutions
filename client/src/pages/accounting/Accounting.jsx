import classes from "./styles/Accounting.module.css";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Accounting = () => {


	return (
		<div className={classes.container}>

			<div className={classes.links}>
				<NavLink
					to="details"
					className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
				>
					Details
				</NavLink>
				<NavLink
					to="rents"
					className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
				>
					Rents
				</NavLink>
			</div>

			<Outlet />

		</div>
	);
};


export default Accounting;
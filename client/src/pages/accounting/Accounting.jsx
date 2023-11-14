import classes from "./styles/Accounting.module.css";
import { NavLink, Outlet } from "react-router-dom";
import {useState} from "react";


const Accounting = () => {


	return (
		<div className={classes.container}>
			<div className={classes.links}>
				<NavLink
					to="./"
					className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
				>
					Overview
				</NavLink>
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

const links = [
	{
		name: "Overview",
		icon: "finances",
		url: "accounting"

	},
	{
		name: "Details",
		icon: "finances",
		url: "accounting/"
	},
	{
		name: "Rents",
		icon: "rents",
		url: "rents"
	},

]

export default Accounting;
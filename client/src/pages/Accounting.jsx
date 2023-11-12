import classes from "./styles/Accounting.module.css";
import { NavLink, Outlet } from "react-router-dom";


const Accounting = () => {

	return (
		<div className={classes.container}>

			<Outlet />

		</div>
	);
};

const links = [
	{
		name: "Finances",
		icon: "finances",
		url: ""

	},
	{
		name: "Rents",
		icon: "rents",
		url: "rents"
	},

]

export default Accounting;
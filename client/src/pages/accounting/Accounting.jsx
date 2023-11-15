import classes from "./styles/Accounting.module.css";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Accounting = () => {


	return (
		<div className={classes.container}>

			<Outlet />

		</div>
	);
};


export default Accounting;
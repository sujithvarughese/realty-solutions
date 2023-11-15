import classes from "./styles/Accounting.module.css";
import { Outlet } from "react-router-dom";

// /accounting will render overall finances and /accounting/:id will render by unit
const Accounting = () => {
	return (
		<div className={classes.container}>
			<Outlet />
		</div>
	);
};

export default Accounting;
import classes from "./styles/Accounting.module.css";
import { NavLink, Outlet } from "react-router-dom";


const Accounting = () => {

	return (
		<div className={classes.container}>
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
			</div>
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
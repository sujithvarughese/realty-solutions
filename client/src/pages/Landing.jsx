import classes from "./styles/Landing.module.css"
import { Auth } from "../components"
import {NavLink} from "react-router-dom";

// home page for public (no user logged in)
const Landing = () => {
	return (
		<div className={classes.container}>
			<div className={classes.content}>

				<div className={classes.text}>
					<div className={classes.title}>
						Realty Solutions
					</div>
					<div className={classes.description}>
						Real solutions for all your property needs.
					</div>
				</div>

				{/* Card with login/register options */}
				<div className={classes.auth}>
					<Auth />
				</div>


				<div className={classes.admin}>
					<NavLink to="admin">
						Admin Access
					</NavLink>
				</div>

			</div>
		</div>
	);
};

export default Landing;
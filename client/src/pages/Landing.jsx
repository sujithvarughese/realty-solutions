import classes from "./styles/Landing.module.css"
import { Auth } from "../components"

// home page for public (no user logged in)
const Landing = () => {
	return (
		<div className={classes.container}>


				<div className={classes.caption}>
					<div className={classes.title}>
						Realty Solutions
					</div>
					<div className={classes.description}>
						Real solutions for all your property needs.
					</div>
				</div>

				{/* Card with login/register options */}
				<Auth />

		</div>
	);
};

export default Landing;
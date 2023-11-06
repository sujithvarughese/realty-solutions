import classes from "./styles/Landing.module.css"
import { About } from "../";

// home page for public (no user logged in)
const Landing = () => {
	return (
		<div className={classes.landing}>
			<h1>Landing Page</h1>
			<About />

		</div>
	);
};

export default Landing;
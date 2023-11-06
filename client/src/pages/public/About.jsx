import classes from "./styles/About.module.css";

// should only be displayed when no user logged in
const About = () => {

	return (
		<div className={classes.about}>
			<h1>About Page</h1>
		</div>
	);
};

export default About;
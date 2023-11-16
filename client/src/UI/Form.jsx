import classes from "./styles/Form.module.css"

const Form = (props) => {
	return (
		<form { ...props } className={classes.container}>
			<div className={classes.title}>{ props.title }</div>
			<div className={classes.content}>
				{ props.children }
			</div>

		</form>
	);
};

export default Form;
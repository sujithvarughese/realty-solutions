import classes from "./styles/Form.module.css"

const Form = (props) => {
	return (
		<form { ...props } className={classes.form}>
			<div className={classes.title}>{ props.title }</div>
			<div className={classes.content}>
				{ props.children }
			</div>

		</form>
	);
};

export default Form;
import classes from "./styles/Input.module.css";

const Input = (props) => {
	return (
		<div className={classes.input}>
			<label
				className={classes.label}
				{ ...props }
			>
				{ props.label }
			</label>
			<input
				className={classes.inputArea}
				{ ...props }
			/>
		</div>
	);
};

export default Input;
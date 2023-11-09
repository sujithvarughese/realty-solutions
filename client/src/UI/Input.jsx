import classes from "./styles/Input.module.css";

const Input = (props) => {
	return (
		<div className={classes.container}>
			<label
				className={classes.label}
				{ ...props }
			>
				{ props.label }
			</label>
			<input
				className={classes.input}
				{ ...props }
			/>
		</div>
	);
};

export default Input;
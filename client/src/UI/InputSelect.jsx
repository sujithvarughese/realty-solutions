import classes from "./styles/InputSelect.module.css";

const InputSelect = (props) => {
	return (
		<div className={classes.input}>
			<label
				className={classes.label}
				{ ...props }
			>
				{ props.label }
			</label>
			<select
				className={classes.select}
				{ ...props }
			>
				{
					props.list.map((item, index) => {
						return (
							<option
								key={index}
								value={item.value || item}
							>
								{item.text || item}
							</option>
						)
					})
				}
			</select>
		</div>
	);
};

export default InputSelect;
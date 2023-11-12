import classes from "./styles/FormSelect.module.css"

const FormSelect = ({ labelText, name, value, defaultValue, onChange, list, selectText }) => {


  return (
    <div className={classes.formSelect}>
      <label
         htmlFor={name}
         className={classes.formLabel}
      >
        {labelText || name}
      </label>

      <select
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={classes.formInput}
      >
        {
           list.map((itemValue, index) => {
              return (
                 <option
                    key={index}
                    value={itemValue}
                 >
                    {selectText || itemValue}
                 </option>
              )
           })
        }
      </select>
    </div>
  )
}

export default FormSelect

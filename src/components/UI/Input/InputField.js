import classes from './InputField.module.css'

function InputField(props) {
  const { label, type, name, handleChange, errorMessage, isValid, value } = props

  return (
    <div className={classes.inputContainer}>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
      {errorMessage && !isValid && <span className={classes.error}>{errorMessage}</span>}
    </div>
  )
}

export default InputField

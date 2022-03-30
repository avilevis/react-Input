import InputField from './UI/Input/InputField'
import useInputField from './UI/Input/InputField.hook'

function Form() {
  const nameProps = useInputField('Name', 'text', [{ requiredRule: null }, { minLengthRule: 3 }])
  const submitHandler = () => {}

  return (
    <form onSubmit={submitHandler}>
      <InputField {...nameProps} />
    </form>
  )
}

export default Form

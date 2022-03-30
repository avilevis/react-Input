import { useState, useEffect, useCallback } from 'react'
import { requiredRule, minLengthRule, maxLengthRule, passwordMatchRule } from './validation'

function bindValidationFunc(validationRule, value = null) {
  switch (validationRule) {
    case 'requiredRule':
      return requiredRule

    case 'minLengthRule':
      return minLengthRule.bind(null, value)

    case 'maxLengthRule':
      return maxLengthRule.bind(null, value)

    case 'passwordMatchRule':
      return passwordMatchRule.bind(null, value)

    default:
      return () => [true, null]
  }
}

function generateValidationFunctions(validationRules) {
  return validationRules.map(ruleObj => {
    const [rule, value] = Object.entries(ruleObj)[0]

    return bindValidationFunc(rule, value)
  })
}

function useInputField(label, type, validationRules = [], value = '') {
  const [inputValue, setInputValue] = useState(value)
  const validationFunctions = generateValidationFunctions(validationRules)
  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [touched, setTouched] = useState(false)

  const setValue = event => {
    setInputValue(event.target.value)
    setTouched(true)
  }
  const isValidHandler = useCallback(() => {
    if (!touched) return

    for (const validationFunc of validationFunctions) {
      const [valid, errMessage] = validationFunc(inputValue)

      if (!valid) {
        setIsValid(false)
        setErrorMessage(errMessage)
        return
      }
    }
    setIsValid(true)
    setErrorMessage(null)
  }, [validationFunctions, inputValue, touched])

  useEffect(() => {
    isValidHandler()
  }, [isValidHandler, inputValue])

  return {
    label,
    type,
    value: inputValue,
    handleChange: setValue,
    isValid,
    errorMessage,
  }
}

export default useInputField

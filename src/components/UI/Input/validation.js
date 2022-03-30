export function requiredRule(inputValue) {
  const valid = inputValue.length !== 0

  return [valid, valid ? null : 'This field is required']
}

export function minLengthRule(minCharacters, inputValue) {
  const valid = inputValue.length >= minCharacters

  return [valid, valid ? null : `This field should contain atleast ${minCharacters} characters`]
}

export function maxLengthRule(maxCharacters, inputValue) {
  const valid = inputValue.length <= maxCharacters

  return [valid, valid ? null : `This field cannot contain more than ${maxCharacters} characters`]
}

export function passwordMatchRule(matchPassword, inputValue) {
  const valid = matchPassword === inputValue

  return [valid, valid ? null : 'passwords do not match']
}

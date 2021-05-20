/* eslint-disable no-useless-escape */
export function required(value) {
  console.log("inside required", value);
  const result = value !== undefined && value !== null && value.length > 0;
  return result;
}

export function isValidEmail(value) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    value
  );
}

export function isFormValid(data, validatorMap) {
  return Object.keys(data).map(function (key) {
    const fieldValidators = validatorMap[key];
    console.log(key, data);
    const value = data[key];
    console.log(fieldValidators, value);
    if (fieldValidators) {
      return fieldValidators.map((validator) => [key, validator(value)]);
    } else {
      return true;
    }
  });
}

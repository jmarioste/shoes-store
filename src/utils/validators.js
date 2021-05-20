/* eslint-disable no-useless-escape */
export function required(field) {
  console.log("inside required", field);
  function validator(value) {
    console.log(`validating ${field} for ${value}`);
    const result = value !== undefined && value !== null && value.length > 0;
    return result;
  }
  validator.error = `${field} is required.`;
  return validator;
}

export function isValidEmail(value) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    value
  );
}
isValidEmail.error = `Please enter a valid e-mail`;

export function getAllErrors(data, validatorMap) {
  return Object.keys(data).reduce(function (form, key) {
    const fieldValidators = validatorMap[key];
    const value = data[key];
    if (fieldValidators) {
      const results = fieldValidators.reduce((acc, validator) => {
        console.log(validator.error);
        acc.push(validator(value) || validator.error);
        return acc;
      }, []);
      form[key] = results;
    } else {
      form[key] = [true]; //optional field. no validation
    }
    return form;
  }, {});
}

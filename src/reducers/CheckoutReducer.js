import { produce } from "immer";
import { isValidEmail, required } from "utils/validators";

export function checkoutReducer(state, action) {
  if (action.type.startsWith("update")) {
    return updateReducer(state, action);
  } else {
    return errorReducer(state, action);
  }
}

function updateReducer(state, action) {
  const { type, value } = action;
  return produce(state, (draft) => {
    switch (type) {
      case "update_email":
        draft.data.email = value;
        break;
      case "update_firstName":
        draft.data.firstName = value;
        break;
      case "update_lastName":
        draft.data.lastName = value;
        break;
      case "update_streetAddress":
        draft.data.streetAddress = value;
        break;
      case "update_zipCode":
        draft.data.zipCode = value;
        break;
      case "update_city":
        draft.data.city = value;
        break;
      case "update_country":
        draft.data.country = value;
        break;
      case "update_phone":
        draft.data.phone = value;
        break;
      default:
        throw new Error(`Unhandled exeption for ${action.type}`);
    }
  });
}

function errorReducer(state, action) {
  const { type, value } = action;
  return produce(state, (draft) => {
    switch (type) {
      case "error_all":
        draft.errors = value;
        break;
      case "error_email":
        draft.errors.email = getErrors("email", value);
        break;
      case "error_firstName":
        draft.errors.firstName = getErrors("firstName", value);
        break;
      case "error_lastName":
        draft.errors.lastName = getErrors("lastName", value);
        break;
      case "error_streetAddress":
        draft.errors.streetAddress = getErrors("streetAddress", value);
        break;
      case "error_zipCode":
        draft.errors.zipCode = getErrors("zipCode", value);
        break;
      case "error_city":
        draft.errors.city = getErrors("city", value);
        break;
      case "error_country":
        draft.errors.country = getErrors("country", value);
        break;
      case "error_phone":
        draft.errors.phone = getErrors("phone", value);
        break;
      default:
        throw new Error(`Unhandled exeption for ${action.type}`);
    }
  });
}

function getErrors(type, value) {
  return validators[type].reduce((acc, validator) => {
    const isValid = validator;
    if (!isValid(value)) {
      acc.push(validator.error);
    }
    return acc;
  }, []);
}
export const validators = {
  email: [required("Email"), isValidEmail],
  firstName: [required("First name")],
  lastName: [required("Last name")],
  streetAddress: [required("Street address")],
  city: [required("City")],
  zipCode: [required("Zip code")],
  country: [required("Country")],
};

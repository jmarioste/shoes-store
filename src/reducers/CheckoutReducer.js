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
  switch (type) {
    case "update_email":
      return produce(state, (draft) => {
        draft.data.email = value;
      });

    case "update_firstName":
      return produce(state, (draft) => {
        draft.data.firstName = value;
      });
    case "update_lastName":
      return produce(state, (draft) => {
        draft.data.lastName = value;
      });
    case "update_streetAddress":
      return produce(state, (draft) => {
        draft.data.streetAddress = value;
      });
    case "update_zipCode":
      return produce(state, (draft) => {
        draft.data.zipCode = value;
      });
    case "update_city":
      return produce(state, (draft) => {
        draft.data.city = value;
      });
    case "update_country":
      return produce(state, (draft) => {
        draft.data.country = value;
      });
    case "update_phone":
      return produce(state, (draft) => {
        draft.data.phone = value;
      });
    default:
      throw new Error(`Unhandled exeption for ${action.type}`);
  }
}

function errorReducer(state, action) {
  const { type, value } = action;
  switch (type) {
    case "error_all": {
      return produce(state, (draft) => {
        draft.errors = value;
      });
    }
    case "error_email":
      return produce(state, (draft) => {
        draft.errors.email = getErrors("email", value);
      });
    case "error_firstName":
      return produce(state, (draft) => {
        draft.errors.firstName = getErrors("firstName", value);
      });
    case "error_lastName":
      return produce(state, (draft) => {
        draft.errors.lastName = getErrors("lastName", value);
      });
    case "error_streetAddress":
      return produce(state, (draft) => {
        draft.errors.streetAddress = getErrors("streetAddress", value);
      });
    case "error_zipCode":
      return produce(state, (draft) => {
        draft.errors.zipCode = getErrors("zipCode", value);
      });
    case "error_city":
      return produce(state, (draft) => {
        draft.errors.city = getErrors("city", value);
      });
    case "error_country":
      return produce(state, (draft) => {
        draft.errors.country = getErrors("country", value);
      });
    case "error_phone":
      return produce(state, (draft) => {
        draft.errors.phone = getErrors("phone", value);
      });
    default:
      throw new Error(`Unhandled exeption for ${action.type}`);
  }
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

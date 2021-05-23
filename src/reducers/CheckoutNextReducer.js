import { produce } from "immer";
import { required } from "utils/validators";

export function checkoutNextReducer(state, action) {
  if (action.type.startsWith("update")) {
    return updateReducer(state, action);
  } else if (action.type.startsWith("error")) {
    return errorReducer(state, action);
  } else if (action.type.startsWith("copy")) {
    return copyReducer(state, action);
  }
}

function copyReducer(state, action) {
  console.log("inside copy");
  const { value } = action;
  return produce(state, (draft) => {
    draft.data = {
      ...value,
    };
  });
}

function updateReducer(state, action) {
  const { type, value } = action;
  return produce(state, (draft) => {
    switch (type) {
      case "update_nameOnCard":
        draft.data.nameOnCard = value;
        break;
      case "update_cardNumber":
        draft.data.cardNumber = value;
        break;
      case "update_cardExpiry":
        draft.data.cardExpiry = value;
        break;
      case "update_cvv":
        draft.data.cvv = value;
        break;
      case "update_firstName":
        draft.data.billingFirstName = value;
        break;
      case "update_lastName":
        draft.data.billingLastName = value;
        break;
      case "update_streetAddress":
        draft.data.billingStreetAddress = value;
        break;
      case "update_zipCode":
        draft.data.billingZipCode = value;
        break;
      case "update_city":
        draft.data.billingCity = value;
        break;
      case "update_country":
        draft.data.billingCountry = value;
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
      case "error_nameOnCard":
        draft.errors.nameOnCard = getErrors("nameOnCard", value);
        break;
      case "error_cardNumber":
        draft.errors.cardNumber = getErrors("cardNumber", value);
        break;
      case "error_cardExpiry":
        draft.errors.cardExpiry = getErrors("cardExpiry", value);
        break;
      case "error_cvv":
        draft.errors.cvv = getErrors("cvv", value);
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
  nameOnCard: [required("Full name")],
  cardNumber: [required("cardNumber")],
  cardExpiry: [required("cardExpiry")],
  cvv: [required("cardExpiry")],
  firstName: [required("First name")],
  lastName: [required("Last name")],
  streetAddress: [required("Street address")],
  city: [required("City")],
  zipCode: [required("Zip code")],
  country: [required("Country")],
};

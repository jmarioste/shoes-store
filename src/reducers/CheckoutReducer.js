export function checkoutReducer(state, action) {
  switch (action.type) {
    case "data":
      return {
        ...state,
        data: action.data,
      };
    case "errors":
      return {
        ...state,
        errors: action.errors,
      };
    default:
      throw new Error(`Unhandled exeption for ${action.type}`);
  }
}

export default function shippingAddressReducer(state, action) {
  switch (action.type) {
    case "email":
      return setEmail(state, action.value);

    case "firstName":
      return setFirstName(state, action.value);
    case "lastName":
      return setLastName(state, action.value);
    case "streetAddress":
      return setStreetAddress(state, action.value);
    case "zipCode":
      return setZipCode(state, action.value);
    case "city":
      return setCity(state, action.value);
    case "country":
      return setCountry(state, action.value);
    case "phone":
      return setPhone(state, action.value);
    default:
      throw new Error(`Unhandled exeption for ${action.type}`);
  }
}

function setEmail(state, email) {
  return {
    ...state,
    data: {
      ...state.data,
      email,
    },
  };
}
function setFirstName(state, firstName) {
  console.log(state);
  return {
    ...state,
    data: {
      ...state.data,
      shippingAddress: {
        ...state.data.shippingAddress,
        firstName,
      },
    },
  };
}

function setLastName(state, lastName) {
  return {
    ...state,
    data: {
      ...state.data,
      shippingAddress: {
        ...state.data.shippingAddress,
        lastName,
      },
    },
  };
}

function setStreetAddress(state, streetAddress) {
  return {
    ...state,
    data: {
      ...state.data,
      shippingAddress: {
        ...state.data.shippingAddress,
        streetAddress,
      },
    },
  };
}

function setZipCode(state, zipCode) {
  return {
    ...state,
    data: {
      ...state.data,
      shippingAddress: {
        ...state.data.shippingAddress,
        zipCode,
      },
    },
  };
}

function setCity(state, city) {
  return {
    ...state,
    data: {
      ...state.data,
      shippingAddress: {
        ...state.data.shippingAddress,
        city,
      },
    },
  };
}

function setCountry(state, country) {
  return {
    ...state,
    data: {
      ...state.data,
      shippingAddress: {
        ...state.data.shippingAddress,
        country,
      },
    },
  };
}

function setPhone(state, phone) {
  return {
    ...state,
    data: {
      ...state.data,
      shippingAddress: {
        ...state.data.shippingAddress,
        phone,
      },
    },
  };
}

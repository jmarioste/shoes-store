import React, { createContext, useContext, useReducer } from "react";

import { checkoutReducer } from "reducers/CheckoutReducer";

// const initialInfo = loadCartFromStorage();
const CheckoutContext = createContext(null);

export function CheckoutProvider(props) {
  const [checkoutState, dispatch] = useReducer(checkoutReducer, initialState);
  const value = { checkoutState, dispatch };
  return (
    <CheckoutContext.Provider value={value}>
      {props.children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      "Context not found. Use <CartProvider> in a parent component."
    );
  }
  return context;
}

// Declaring outside component to avoid recreation on each render
const initialState = {
  data: {
    email: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    zipCode: 0,
    country: "",
    phone: "",
  },
  errors: {
    email: [],
    firstName: [],
    lastName: [],
    streetAddress: [],
    city: [],
    zipCode: [],
    country: [],
    phone: [],
  },
};

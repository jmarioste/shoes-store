// @ts-nocheck
import { BigButton } from "components";
import { useCart } from "contexts/CartContext";
import React, { useReducer, useState } from "react";
import shippingAddressReducer from "reducers/CheckoutReducer";
import { saveShippingAddress } from "services/shippingService";

import { required, isValidEmail, isFormValid } from "utils/validators";
import { Content, CheckoutForm, CheckoutSummary } from "./Checkout.styles.jsx";

const validators = {
  email: [required, isValidEmail],
  firstName: [required],
  lastName: [required],
  streetAddress: [required],
  city: [required],
  zipCode: [required],
  country: [required],
};

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

const STATUS = {
  IDLE: 1,
  SUBMITTING: 2,
  SUBMITTED: 3,
  COMPLETED: 4,
};

export default function Checkout() {
  console.log("inside checkout");
  const { dispatch } = useCart();
  const [checkoutState, dispatchCheckout] = useReducer(
    shippingAddressReducer,
    initialState
  );

  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState("");
  // const [touched, setTouched] = useState({ city: false, country: false });
  //derived state
  const errors = getErrors(checkoutState);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    e.persist();
    const { id, value } = e.target;
    console.log("inside handleChange", id, value);
    dispatchCheckout({
      type: e.target.id,
      value: e.target.value,
    });
  }

  function handleBlur(event) {
    event.preventDefault();
    console.log("inside handle blur");
    event.persist();
    const valid =
      // isFormValid(checkoutState.data, validators) &&
      isFormValid(checkoutState.data.shippingAddress, validators);
    console.log("is form valid", valid);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(checkoutState);
        setStatus(STATUS.COMPLETED);
        dispatch({ type: "empty" });
      } catch (error) {
        console.error(error);
        // setStatus(STATUS.ERROR);
        setSaveError(error);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors() {
    const result = {};
    return result;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) return <h2>Thanks for shopping!</h2>;

  return (
    <Content>
      <h1>Checkout</h1>
      <CheckoutForm>
        <h5>Contact Information</h5>
        <label>Email address:</label>
        <input
          id="email"
          type="text"
          placeholder="Email address"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>

        <h5>Shipping Address</h5>
        <label>Full name</label>
        <input
          id="firstName"
          type="text"
          placeholder="First name"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <input
          id="lastName"
          type="text"
          placeholder="Last name"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <label>Complete address: </label>
        <input
          id="streetAddress"
          type="text"
          placeholder="Address"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <input
          id="zipCode"
          type="text"
          placeholder="Postal code"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <input
          id="city"
          type="text"
          placeholder="City"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <input
          id="country"
          type="text"
          placeholder="Country"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <input
          id="phone"
          type="text"
          placeholder="Phone (optional)"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <BigButton
          type="submit"
          disabled={status === STATUS.SUBMITTING}
          onClick={handleSubmit}
        >
          Save Shipping Info
        </BigButton>
      </CheckoutForm>
      <CheckoutSummary>
        <h5>Summary</h5>
      </CheckoutSummary>
    </Content>
  );
}

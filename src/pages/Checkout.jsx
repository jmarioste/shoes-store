import { useCart } from "contexts/CartContext";
import React, { useReducer, useState } from "react";
import { checkoutReducer, validators } from "reducers/CheckoutReducer";
import { saveShippingAddress } from "services/shippingService";
import { FiArrowRight } from "react-icons/fi";

import { getAllErrors } from "utils/validators";
import {
  Content,
  CheckoutForm,
  CheckoutSummary,
  ContinueButton,
} from "./Checkout.styles.jsx";
import CheckoutSummaryDetails from "components/CheckoutSummaryDetails.jsx";

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

function renderError(error, index) {
  return (
    <label key={"email_error_" + index} role="error" className="overline">
      {error}
    </label>
  );
}
export default function Checkout() {
  console.log("inside checkout");
  const { dispatch: dispatchCart } = useCart();
  const [checkoutState, dispatch] = useReducer(checkoutReducer, initialState);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState("");

  const errors = checkoutState.errors;

  function handleChange(event) {
    event.persist();
    const { id, value } = event.target;
    dispatch({
      type: "update_" + id,
      value: value,
    });
  }

  function handleBlur(event) {
    event.preventDefault();
    event.persist();
    const { id, value } = event.target;
    if (!validators[id]) return;

    dispatch({
      type: "error_" + id,
      value: value,
    });
  }

  function isFormValid(errors) {
    return Object.keys(errors).every((id) => {
      return errors[id].every((value) => value === true);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    const _errors = getAllErrors(checkoutState.data, validators);
    if (isFormValid(_errors)) {
      try {
        await saveShippingAddress(checkoutState.data);
        setStatus(STATUS.COMPLETED);
        dispatchCart({ type: "empty" });
      } catch (error) {
        console.error(error);
        // setStatus(STATUS.ERROR);
        setSaveError(error);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
      //dispatch errors to re-render
      dispatch({
        type: "error_all",
        value: _errors,
      });
    }
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) return <h2>Thanks for shopping!</h2>;

  return (
    <Content>
      <h1>Checkout</h1>
      <CheckoutForm>
        <h5>Contact Information</h5>
        {errors.email.map(renderError)}
        <input
          id="email"
          type="text"
          placeholder="Email address"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>

        <h5>Shipping Address</h5>
        <label>Full name</label>
        {errors.firstName.map(renderError)}
        <input
          id="firstName"
          type="text"
          placeholder="First name"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        {errors.lastName.map(renderError)}
        <input
          id="lastName"
          type="text"
          placeholder="Last name"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <label>Complete address: </label>
        {errors.streetAddress.map(renderError)}
        <input
          id="streetAddress"
          type="text"
          placeholder="Address"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        {errors.zipCode.map(renderError)}
        <input
          id="zipCode"
          type="text"
          placeholder="Postal code"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        {errors.city.map(renderError)}
        <input
          id="city"
          type="text"
          placeholder="City"
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        {errors.country.map(renderError)}
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
        <ContinueButton
          type="submit"
          disabled={status === STATUS.SUBMITTING}
          onClick={handleSubmit}
        >
          <p>Continue</p>
          <FiArrowRight />
        </ContinueButton>
      </CheckoutForm>
      <CheckoutSummary>
        <h5>Summary</h5>
        <CheckoutSummaryDetails></CheckoutSummaryDetails>
      </CheckoutSummary>
    </Content>
  );
}

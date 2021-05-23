import React, { useState } from "react";
import { saveShippingAddress } from "services/shippingService";
import { FiArrowRight } from "react-icons/fi";

import { getAllErrors } from "utils/validators";
import {
  Content,
  CheckoutForm,
  CheckoutSummary,
  ContinueButton,
} from "./Checkout.styles.jsx";
import { CheckoutSummaryDetails } from "components";
import { useNavigate } from "react-router";
import { useCheckout } from "contexts/CheckoutContext.js";
import { validators } from "reducers/CheckoutReducer.js";

const STATUS = {
  IDLE: 1,
  SUBMITTING: 2,
  SUBMITTED: 3,
  COMPLETED: 4,
};

function renderError(error, index, _class) {
  return (
    <label
      key={"email_error_" + index}
      role="error"
      className={`overline ${_class}`}
    >
      {error}
    </label>
  );
}
export default function Checkout() {
  console.log("inside checkout");
  const navigate = useNavigate();
  const { checkoutState, dispatch } = useCheckout();
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
        navigate("/finalcheckout");
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
        <div className="field">
          {errors.email.map(renderError)}
          <input
            id="email"
            type="text"
            placeholder="Email address"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>

        <h5>Shipping Address</h5>
        <label>Full name</label>
        <div className="field firstName">
          {errors.firstName.map(renderError)}
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field lastName">
          {errors.lastName.map((error, index) =>
            renderError(error, index, "lastName")
          )}
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <label>Complete address: </label>
        <div className="field">
          {errors.streetAddress.map(renderError)}
          <input
            id="streetAddress"
            type="text"
            placeholder="Address"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field zipCode">
          {errors.zipCode.map(renderError)}
          <input
            id="zipCode"
            type="text"
            placeholder="Postal code"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field city">
          {errors.city.map((error, index) => renderError(error, index, "city"))}
          <input
            id="city"
            type="text"
            placeholder="City"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field">
          {errors.country.map(renderError)}
          <input
            id="country"
            type="text"
            placeholder="Country"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field">
          <input
            id="phone"
            type="text"
            placeholder="Phone (optional)"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
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

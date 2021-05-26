// @ts-nocheck
import { useCart } from "contexts/CartContext";
import React, { useReducer, useState } from "react";
import { checkoutNextReducer, validators } from "reducers/CheckoutNextReducer";
import { saveShippingAddress } from "services/shippingService";
import { FiArrowRight } from "react-icons/fi";
import { getAllErrors } from "utils/validators";
import { Content, CheckoutForm, MyCheckbox } from "./CheckoutNext.styles.jsx";
import CheckoutSummaryDetails from "components/CheckoutSummaryDetails.jsx";
import { CheckoutSummary, ContinueButton } from "./Checkout.styles.jsx";
import { useCheckout } from "contexts/CheckoutContext.js";

// Declaring outside component to avoid recreation on each render
const initialState = {
  data: {
    nameOnCard: "",
    cardNumber: "",
    cardExpiry: "",
    cvv: "",
    billingFirstName: "",
    billingLastName: "",
    billingStreetAddress: "",
    billingCity: "",
    billingZipCode: 0,
    billingCountry: "",
  },
  errors: {
    nameOnCard: [],
    cardNumber: [],
    cardExpiry: [],
    cvv: [],
    billingFirstName: [],
    billingLastName: [],
    billingStreetAddress: [],
    billingCity: [],
    billingZipCode: [],
    billingCountry: [],
  },
};

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
export default function CheckoutNext() {
  console.log("inside checkout");
  const { checkoutState: state } = useCheckout();
  console.log("State", state);
  initialState.data = {
    ...initialState.data,
    billingFirstName: state.data.firstName,
    billingLastName: state.data.lastName,
    billingStreetAddress: state.data.streetAddress,
    billingCity: state.data.city,
    billingZipCode: state.data.zipCode,
    billingCountry: state.data.country,
  };
  console.log("Initial State", initialState.data);
  const [checkoutState, dispatch] = useReducer(
    checkoutNextReducer,
    initialState
  );
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState("");
  const [isSameAddress, setIsSameAddress] = useState(true);
  const errors = checkoutState.errors;
  console.log(checkoutState);

  function handleChange(event) {
    event.persist();
    const { id, value } = event.target;
    dispatch({
      type: "update_" + id,
      value: value,
    });
  }
  function handleChangeAddress(event) {
    event.persist();
    const { checked } = event.target;
    setIsSameAddress(!isSameAddress);
    if (checked) {
      dispatch({
        type: "copy",
        value: {
          billingFirstName: state.data.firstName,
          billingLastName: state.data.lastName,
          billingStreetAddress: state.data.streetAddress,
          billingCity: state.data.city,
          billingZipCode: state.data.zipCode,
          billingCountry: state.data.country,
        },
      });
    } else {
      dispatch({
        type: "copy",
        value: {
          billingFirstName: "",
          billingLastName: "",
          billingStreetAddress: "",
          billingCity: "",
          billingZipCode: "",
          billingCountry: "",
        },
      });
    }
  }

  function handleBlur(event) {
    event.preventDefault();
    console.log("inside handle blur");
    event.persist();
    const { id, value } = event.target;
    if (!validators[id]) return;
    console.log(id, value);
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
    event.persist();
    setStatus(STATUS.SUBMITTING);
    const _errors = getAllErrors(checkoutState.data, validators);

    if (isFormValid(_errors)) {
      try {
        await saveShippingAddress(checkoutState.data);
        setStatus(STATUS.COMPLETED);
        // dispatchCart({ type: "empty" });
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
        <h5>Card Informaton</h5>
        <div className="field">
          {errors.nameOnCard.map(renderError)}
          <input
            id="nameOnCard"
            type="text"
            placeholder="Name on card"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field">
          {errors.cardNumber.map(renderError)}
          <input
            id="cardNumber"
            type="number"
            inputMode="numeric"
            placeholder="Card number"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field">
          {errors.cardExpiry.map(renderError)}
          <input
            id="cardExpiry"
            type="month"
            placeholder="Card Expiry"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field">
          {errors.cvv.map(renderError)}
          <input
            id="cvv"
            type="number"
            placeholder="cvv"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <h5>Billing Address</h5>
        <div className="field isSameAddress">
          <MyCheckbox
            color="primary"
            checked={isSameAddress}
            onChange={handleChangeAddress}
          />
          <p>Use the same address as shipping. </p>
        </div>
        {!isSameAddress && (
          <React.Fragment>
            <label>Full name</label>
            <div className="field firstName">
              {errors.billingFirstName.map(renderError)}
              <input
                id="firstName"
                type="text"
                placeholder="First name"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
            <div className="field lastName">
              {errors.billingLastName.map((error, index) =>
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
              {errors.billingStreetAddress.map(renderError)}
              <input
                id="streetAddress"
                type="text"
                placeholder="Address"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
            <div className="field zipCode">
              {errors.billingZipCode.map(renderError)}
              <input
                id="zipCode"
                type="text"
                placeholder="Postal code"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
            <div className="field city">
              {errors.billingCity.map((error, index) =>
                renderError(error, index, "city")
              )}
              <input
                id="city"
                type="text"
                placeholder="City"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
            <div className="field">
              {errors.billingCountry.map(renderError)}
              <input
                id="country"
                type="text"
                placeholder="Country"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
          </React.Fragment>
        )}
        <ContinueButton
          type="submit"
          disabled={status === STATUS.SUBMITTING}
          onClick={handleSubmit}
        >
          <p>Proceed to Payment</p>
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

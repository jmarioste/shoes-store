import { useCart } from "contexts/CartContext";
import React, { useReducer, useState } from "react";
import { checkoutReducer, validators } from "reducers/CheckoutReducer";
import { saveShippingAddress } from "services/shippingService";
import { FiArrowRight } from "react-icons/fi";
import Checkbox from "@material-ui/core/Checkbox";
import { getAllErrors } from "utils/validators";
import { Content, CheckoutForm, MyCheckbox } from "./CheckoutNext.styles.jsx";
import CheckoutSummaryDetails from "components/CheckoutSummaryDetails.jsx";
import { CheckoutSummary, ContinueButton } from "./Checkout.styles.jsx";

// Declaring outside component to avoid recreation on each render
const initialState = {
  data: {
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
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
  const { dispatch: dispatchCart } = useCart();
  const [checkoutState, dispatch] = useReducer(checkoutReducer, initialState);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState("");
  const [isSameAddress, setIsSameAddress] = useState(true);
  const errors = checkoutState.errors;

  function handleChange(event) {
    event.persist();
    const { id, value } = event.target;
    // dispatch({
    //   type: "update_" + id,
    //   value: value,
    // });
  }
  function handleChangeAddress(event) {
    event.persist();
    const { checked } = event.target;
    console.log(event.target, checked);
    setIsSameAddress(!isSameAddress);
    //dispatch copy shipping address to billing addresss
  }
  function handleBlur(event) {
    event.preventDefault();
    event.persist();
    const { id, value } = event.target;
    if (!validators[id]) return;

    // dispatch({
    //   type: "error_" + id,
    //   value: value,
    // });
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
        <h5>Card Informaton</h5>
        <div className="field">
          {errors.email.map(renderError)}
          <input
            id="nameOnCard"
            type="text"
            placeholder="Name on card"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field">
          {errors.email.map(renderError)}
          <input
            id="cardNumber"
            type="number"
            placeholder="Card number"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field">
          {errors.email.map(renderError)}
          <input
            id="cardExpiry"
            type="month"
            placeholder="Card Expiry"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="field">
          {errors.email.map(renderError)}
          <input
            id="cvv"
            type="password"
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
              {errors.city.map((error, index) =>
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

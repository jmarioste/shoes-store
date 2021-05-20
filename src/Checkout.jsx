// @ts-nocheck
import { BigButton, Content } from "components";
import { useCart } from "contexts/CartContext";
import React, { useReducer, useState } from "react";
import shippingAddressReducer from "reducers/CheckoutReducer";
import { saveShippingAddress } from "services/shippingService";
import styled from "styled-components";
import { required, isValidEmail, isFormValid } from "utils/validators";

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
    // event.preventDefault();
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
    <Content direction="row">
      <CheckoutContainer className="p-grid ">
        <div className="p-grid p-justify-end p-col-12 p-md-7 p-col-align-start ">
          <h2 className="p-col-12">Contact Information</h2>
          <label className="p-col-12">Email address:</label>
          <input
            id="email"
            className="p-col-12"
            type="text"
            placeholder="Email address"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>

          <h2 className="p-col-12">Shipping Address</h2>
          <div className="input-group p-col-12 p-md-6">
            <div className="field">
              <input
                id="firstName"
                type="text"
                placeholder="First name"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
            <div className="field">
              <input
                id="lastName"
                type="text"
                placeholder="Last name"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
          </div>
          <input
            id="streetAddress"
            className="p-col-12 "
            type="text"
            placeholder="Address"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          <div className="input-group p-col-12 p-md-6">
            <div className="field">
              <input
                id="zipCode"
                type="text"
                placeholder="Postal code"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
            <div className="field">
              <input
                id="city"
                type="text"
                placeholder="City"
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
          </div>
          <input
            id="country"
            className="p-col-12"
            type="text"
            placeholder="Country"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          <input
            id="phone"
            className="p-col-12"
            type="text"
            placeholder="Phone (optional)"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          <div>
            <BigButton
              type="submit"
              disabled={status === STATUS.SUBMITTING}
              onClick={handleSubmit}
            >
              Save Shipping Info
            </BigButton>
          </div>
        </div>
        <div className="p-col-12 p-md-5">
          <h3>Summary</h3>
        </div>
      </CheckoutContainer>
    </Content>
  );
}

const CheckoutContainer = styled.div`
  h2,
  label {
    padding-left: 0;
  }
  .input-group {
    display: flex;
    flex: 1 0 100%;
    padding: 0;
    justify-content: left;
    .field {
      margin-right: 1rem;
      flex-grow: 1;
      input {
        width: 100%;
      }
    }

    .field:nth-last-child(1) {
      margin-right: 0;
    }
  }

  input {
    /* margin: 5px; */
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #495057;
    background: #ffffff;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ced4da;
    transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
    appearance: none;
    border-radius: 4px;
  }
`;

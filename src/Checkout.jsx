import { useCart } from "contexts/CartContext";
import React, { useState } from "react";
import { saveShippingAddress } from "services/shippingService";

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

const STATUS = {
  IDLE: 1,
  SUBMITTING: 2,
  SUBMITTED: 3,
  COMPLETED: 4,
};
export default function Checkout() {
  const { dispatch } = useCart();
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState("");
  const [touched, setTouched] = useState({ city: false, country: false });
  //derived state
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    e.persist();

    setAddress((currentAddress) => {
      const { id, value } = e.target;
      return {
        ...currentAddress,
        [id]: value,
      };
    });
  }

  function handleBlur(event) {
    // event.preventDefault();
    event.persist();
    setTouched((curr) => {
      const id = event.target.id;
      return {
        ...curr,
        [id]: true,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
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

  function getErrors(address) {
    const result = {};

    Object.keys(address).forEach((key) => {
      if (!address[key]) {
        result[key] = `${key} is Required.`;
      }
    });
    return result;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) return <h2>Thanks for shopping!</h2>;

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {(touched.city || (status === STATUS.SUBMITTED && errors.city)) && (
            <p role="alert"> {errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>

          {(touched.country ||
            (status === STATUS.SUBMITTED && errors.country)) && (
            <p role="alert"> {errors.country}</p>
          )}
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}

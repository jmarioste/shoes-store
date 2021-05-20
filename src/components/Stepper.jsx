import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaMinus, FaPlus } from "react-icons/fa";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  margin: 20px;
  input {
    height: 40px;
    width: 100px;
    text-align: center;
    border: 1px solid var(--color-primary);
  }
  .step {
    position: absolute;
    background-color: var(--color-primary);
    height: 40px;
    width: 35px;
    padding: 0px;

    &:hover {
      background-color: var(--color-primary-dark);
      transition: all 0.5s ease;
    }
  }
  .plus {
    left: 0px;
  }
  .minus {
    right: 0px;
  }
`;

const Stepper = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  const decrement = (e) => {
    e.preventDefault();
    const newVal = Math.max(value - 1, 0);
    onChange(newVal);
  };

  const increment = (e) => {
    e.preventDefault();
    onChange(value + 1);
  };
  return (
    <Wrapper>
      <input type="text" value={value} onChange={handleChange} />
      <Button className="step plus" onClick={decrement}>
        <FaMinus />
      </Button>
      <Button className="step minus" onClick={increment}>
        <FaPlus />
      </Button>
    </Wrapper>
  );
};

export default Stepper;

import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  margin: 20px;
  input {
    height: 40px;
    width: 100px;
    text-align: center;
    border: 1px solid #5d6d7c;
  }
  .step {
    position: absolute;
    background-color: #5d6d7c;
    height: 40px;
    width: 35px;
    padding: 0px;
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
        -
      </Button>
      <Button className="step minus" onClick={increment}>
        +
      </Button>
    </Wrapper>
  );
};

export default Stepper;

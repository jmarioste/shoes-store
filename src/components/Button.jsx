// import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  margin-bottom: 0;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  background-color: #5d6d7c;
  color: white;
  padding: 6px 12px;
  font-size: 14px;
  user-select: none;

  &:disabled {
    background-color: #9da7b0;
    border: 1px solid #9da7b0;
    pointer-events: none;
    color: white;
  }
`;

export default Button;

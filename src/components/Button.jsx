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
  border: 0;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  user-select: none;

  &:disabled {
    background-color: #9da7b0;
    pointer-events: none;
    color: white;
  }

  &:hover {
    background-color: var(--color-pimary-light);
  }
`;

export default Button;

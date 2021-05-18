import React from "react";
import styled from "styled-components";

function Container() {
  return (
    <div className="lds-container">
      <div className="lds-dual-ring"></div>
    </div>
  );
}

const Spinner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;

  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #cef;
    border-color: #cef transparent #cef transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;

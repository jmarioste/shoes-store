import styled from "styled-components";

const Select = styled.select`
  height: 35px;
  color: #5d6d7c;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #5d6d7c;
  cursor: pointer;
  /* border-radius: 5px; */
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    cursor: pointer;
  }
`;

export default Select;

// @ts-nocheck
import React from "react";
import styled from "styled-components";
import Select from "./Select";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: left;
`;

const FilterBox = ({ value, onChange }) => {
  return (
    <Container>
      <label htmlFor="size">Filter by Size</label>{" "}
      <Select id="size" value={value} onChange={onChange}>
        <option value="">All sizes</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </Select>
    </Container>
  );
};

export default FilterBox;

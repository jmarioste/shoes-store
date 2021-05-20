// @ts-nocheck
import React from "react";
import Select from "./Select";

const FilterBox = ({ value, onChange }) => {
  return (
    <Select>
      <select value={value} onChange={onChange}>
        <option value="">All sizes</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </Select>
  );
};

export default FilterBox;

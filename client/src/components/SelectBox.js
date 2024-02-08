import React from "react";
import { useState } from "react";

const SelectBox = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value); // Pass the selected value to the parent component
  };

  return (
    <div>
      <select
        class="form-select form-select-sm mb-5"
        style={{ borderRadius: "8px", padding: "10px", fontSize: "12px" }}
        aria-label=".form-select-lg example"
        onChange={handleSelectChange}
        value={selectedValue}
      >
        {/* <option selected>Open this select menu</option> */}
        {options?.map((option, index) => (
          <option
            key={option.value}
            value={option.value}
            selected={index === 0}
            disabled={index == 0}
            className="text-dark"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;

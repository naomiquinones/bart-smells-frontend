import React from "react";
import "./Home.css";
import "./Input.css";

const Input = ({reportType, selectedType, onTypeChange}) => {
  return (
    <>
      <input
        type="radio"
        name="report-type"
        id={`report-type-${reportType}`}
        value={reportType}
        checked={selectedType === reportType}
        onChange={onTypeChange}
      />
      <label
        className="radio-button-label radio-type-select"
        htmlFor={`report-type-${reportType}`}
      >
        {reportType}
      </label>
    </>
  );
};

export default Input;

import React from "react";
import Select from "react-select";

function MySelect({ name, labelName, className, ...rest }) {
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 52,
      minHeight: 52,
      outline: "none !important",
      border: "0 !important",
      color: "#00000099",
      boxShadow: "0 !important",
    }),
  };
  return (
    <div style={{borderWidth : 1.5}} className={`outline outline-none relative w-full focus:outline-none focus:ring-0 rounded  ${className || " border-gray-1f "}`}>
      <Select name={name} styles={customStyles} {...rest} instanceId={labelName || name} classNamePrefix="react-select" />
      <label htmlFor={name} className="absolute top-0 text-lg bg-white p-1 z-1 duration-300 origin-0" style={{ color: "#00000099" }}>
        {labelName}
      </label>
    </div>
  );
}

export default MySelect;

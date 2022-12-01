import React from "react";
import { BsInfoCircle } from "react-icons/bs";

const ConditionOptionLarge = ({
  title,
  options,
  conditionResults,
  questionIndex,
}) => {
  return (
    <div
      className={`${conditionResults?.[questionIndex] == title && "bg-gray-200"
        } my-4 hover:cursor-pointer p-2 rounded-md border-2 border-gray-200 active:opacity-50 duration-300 hover:bg-gray-200 font-Roboto-Light text-mediumFontSize`}
    >
      <span className="flex items-center space-x-3">
        <BsInfoCircle />
        <p className="font-semibold">{title}</p>
      </span>
      {options &&
        options.length > 0 &&
        conditionResults?.[questionIndex] == title &&
        options.map((option, index) => (
          <div className="flex items-center space-x-3 p-1 ml-5" key={index}>
            <BsInfoCircle className="text-[10px]" />
            <h1>{option}</h1>
          </div>
        ))}
    </div>
  );
};

export default ConditionOptionLarge;

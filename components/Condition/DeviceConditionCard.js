import React from "react";
import { BsInfoCircle } from "react-icons/bs";

const DeviceConditionCard = ({ condition, answer }) => {
  console.log("results", answer);
  return (
    <div className="grid grid-cols-5 hover:cursor-pointer p-3 rounded-md border-2 border-gray-200 active:opacity-50 duration-300 hover:bg-gray-300 space-x-3 bg-gray-200">
      <div className="col-span-2 border-r-[2px] border-gray-500">
        <p className="text-xl font-semibold">Your device is in</p>
        <p className="text-3xl font-bold">
          {condition} <span>CONDITION</span>
        </p>
      </div>
      <div className="col-span-3">
        <p className="text-lg font-semibold">What does this condition mean?</p>
        <div className="mt-3">
        <CheckPoints points={answer[0]} />
        <CheckPoints points={answer[1]} />
        <CheckPoints points={answer[2]} />
        </div>
      </div>
    </div>
  );
};

export default DeviceConditionCard;

const CheckPoints = ({ points }) => {
  return (
    <div className="flex items-center space-x-3 space-y-1">
      <BsInfoCircle />
      <p className="text-sm">{points}</p>
    </div>
  );
};

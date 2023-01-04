import React from "react";
import { BsInfoCircle } from "react-icons/bs";

const ConditionOptionLarge2 = ({
    title,
    options,
    conditionResults,
    questionIndex,
}) => {
    var option2 = [[]];
    console.log("conditionResults", options);
    options && options?.map((option, index) => {
        if (option.title == conditionResults[questionIndex]) {
            option.options.map((optionIn, index2) => {
                option2[index2] = optionIn;
            });
        }
    });
    return (
        <div
            className={`${conditionResults?.[questionIndex] == title && "bg-gray-200"
                } my-4 hover:cursor-pointer p-2 rounded-md border-2 border-gray-200 active:opacity-50 duration-300 hover:bg-gray-200 font-Roboto-Light text-mediumFontSize`}
        >
            <span className="flex items-center space-x-3">
                <BsInfoCircle />
                <p className="font-semibold">{title}</p>
            </span>
            {/* {options &&
        options.length > 0 &&
        conditionResults?.[questionIndex] == title &&
        options.map((option, index) => (
          <div className="flex items-center space-x-3 p-1 ml-5" key={index}>
            <BsInfoCircle className="text-[10px]" />
            <h1>{option}</h1>
          </div>
        ))} */}
            {options &&
                option2 &&
                options.length > 0 &&
                conditionResults?.[questionIndex] == title &&
                option2.map((option, index) => (
                    <div className="flex items-center space-x-3 p-1 ml-5" key={index}>
                        {/* <div className="border border-black p-0.5 rounded-full"> */}
                        <BsInfoCircle className="text-[10px]" />
                        {/* </div> */}
                        <p >{option}</p>
                    </div>
                ))}
        </div>
    );
};

export default ConditionOptionLarge2;

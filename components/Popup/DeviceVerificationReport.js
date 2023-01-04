import Image from "next/image";
import Modal from ".";
import calendar1 from "../../assets/calendar-3.png";
import testpass from "../../assets/testpass.png";
import testfail from "../../assets/testFail.png";
import pass from "../../assets/pass1.png";
import { deviceConditionQuestion } from "@/utils/constant";
import ConditionOptionLarge2 from "../Condition/ConditionOptionLarge2";
import { useState } from "react";

function DeviceVerificationReport({ open, setOpen, data }) {
  const setDate = data?.verifiedDate ? data?.verifiedDate : data?.listingDate;
  const setDateName = data?.verifiedDate ? "Verified on : " : "Listed On : ";

  return (
    <Modal open={open} setOpen={setOpen} title={"Device Report"}>
      <div className="grid grid-cols-5 device_verification_report">
        <div className="flex flex-col px-6 col-span-2">
          <div>
            <p className="text-black-20" style={{ fontSize: 21 }}>
              {data?.marketingName || "SAMSUNG Galaxy S21 Plus"}
            </p>
            <h2 className="text-black-20" style={{ fontSize: 21 }}>
              ({data?.color} {data?.deviceStorage})
            </h2>
          </div>
          <div className="flex-1 py-4">
            <Image
              src={
                (data?.images && data?.images[0]?.fullImage) || data?.imagePath || data?.defaultImage?.fullImage
              }
              // layout="responsive"
              width={250}
              height={350}
              priority
              objectFit="contain"
              alt={data?.marketingName}
            />
          </div>
          <div className="flex justify-center items-center ">
            <span className="text-xs mr-2 flex items-center">
              <Image
                src={calendar1}
                width={15}
                height={15}
                alt={data?.marketingName}
              />
            </span>
            <span className="text-xs mr-2">{setDateName}</span>
            <span className="text-lg">
              {setDate}
            </span>
          </div>
        </div>
        <div
          className="flex flex-col border-l-2 col-span-3 overflow-y-auto max-w-lg"
          style={{ maxHeight: 480 }}
        >
          {/* {data?.questionnaireResults &&
            data?.questionnaireResults?.length > 0 && (
              <div className="border-b-2 pb-4 px-8">
                {data?.questionnaireResults.map((items, index) => {
                  return (
                    <QuestionnaireResults
                      key={index}
                      index={index + 1}
                      question={items.question}
                      result={items.result}
                      childQuestions={items.childQuestions}
                    />
                  );
                })}
              </div>
            )} */}
          <div className="mx-4">
            {data && data?.cosmetic && (
              <h2 className="text-gray-20 font-bold mb-3">
                Device Cosmetic Report
              </h2>
            )}
            {data && data?.cosmetic && (
              <div>
                {deviceConditionQuestion.map((item, index) => (
                  <div>
                    <span className="text-lg font-semibold text-black">{data?.cosmetic[index] != undefined && item?.title}</span>
                    {data?.cosmetic[index] != undefined &&
                      <ConditionOptionLarge2
                        title={data?.cosmetic[index]}
                        options={data?.cosmetic[index] && item?.options[0]?.options}
                        conditionResults={data?.cosmetic}
                        questionIndex={index}
                      />}
                  </div>
                ))}
              </div>
            )}
          </div>
          {data?.verified && (
            <div className="text-gray-20 font-bold mb-3 mx-4">
              <span>
                Device Verification Report
              </span>
            </div>
          )}
          <div className="px-8">
            {data?.functionalTestResults &&
              data?.functionalTestResults.map((items, index) => {
                return (
                  <TestListItem
                    key={index}
                    testName={items.displayName}
                    testStatus={items.testStatus}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeviceVerificationReport;

const TestListItem = ({ testName, testStatus }) => {
  return (
    <div className="w-full flex items-center justify-between py-3">
      <p>{testName}</p>
      <p className="flex items-center justify-between">
        <span className="mr-3">{testStatus}</span>{" "}
        <Image
          src={testStatus === "PASS" ? testpass : testfail}
          width={25}
          height={24}
          alt={testName}
        />
      </p>
    </div>
  );
};

const QuestionnaireResults = ({ question, result, childQuestions, index }) => {
  return (
    <div className="w-full py-1">
      <p>
        {index}. {question}
      </p>
      <p>
        {childQuestions && childQuestions?.length > 0 ? (
          childQuestions.map((items, index1) => (
            <div key={index1} className="flex items-start pt-2">
              <img src={pass.src} alt={items} className="mt-1 mr-2" />
              <p>{items}</p>
            </div>
          ))
        ) : (
          <div className="flex items-start pt-2">
            <img src={pass.src} alt={result} className="mt-1 mr-2" />
            <p>{result}</p>
          </div>
        )}
      </p>
    </div>
  );
};

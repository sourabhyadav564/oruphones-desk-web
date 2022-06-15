import Image from "next/image";
import Modal from ".";
import calendar1 from "../../assets/calendar-3.png";
import testpass from "../../assets/testpass.png";
import testfail from "../../assets/testFail.png";
import pass from "../../assets/pass1.png";

function DeviceVerificationReport({ open, setOpen, data }) {
  console.log("data ", data);
  return (
    <Modal open={open} setOpen={setOpen} title={"Device Verification Report"}>
      <div className="grid grid-cols-5 device_verification_report">
        <div className="flex flex-col px-6 col-span-2">
          <div>
            <h1 className="text-black-20" style={{ fontSize: 21 }}>
              {data?.marketingName || "SAMSUNG Galaxy S21 Plus"}
            </h1>
            <h2 className="text-black-20" style={{ fontSize: 21 }}>
              ({data?.color} {data?.deviceStorage})
            </h2>
          </div>
          <div className="flex-1 py-4">
            <Image
              src={
                (data?.images && data?.images[0]?.fullImage) || data?.imagePath
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
            <span className="text-xs mr-2"> Verified on : </span>
            <span className="text-lg">
              {data?.verifiedDate || "23/10/2021"}
            </span>
          </div>
        </div>
        <div
          className="flex flex-col border-l-2 col-span-3 overflow-y-auto max-w-lg"
          style={{ maxHeight: 480 }}
        >
          {data?.questionnaireResults &&
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
            )}
          <div className="px-8">
            {data?.functionalTestResults &&
              data?.functionalTestResults.map((items, index) => {
                return (
                  <TestListItem
                    key={index}
                    testName={items.commandName}
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
  console.log("childQuestions ", childQuestions?.length);
  return (
    <div className="w-full py-1">
      <p>
        {index}. {question}
      </p>
      <p>
        {childQuestions && childQuestions?.length > 0 ? (
          childQuestions.map((items, index1) => (
            <div key={index1} className="flex items-start pt-2">
              <img src={pass.src} className="mt-1 mr-2" />
              <p>{items}</p>
            </div>
          ))
        ) : (
          <div className="flex items-start pt-2">
            <img src={pass.src} className="mt-1 mr-2" />
            <p>{result}</p>
          </div>
        )}
      </p>
    </div>
  );
};

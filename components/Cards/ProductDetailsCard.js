import { Fragment, useState } from "react";
import { BiRupee } from "react-icons/bi";
// import devicePlaceholder from "../../assets/stock_image.png";
import { getDefaultImage, numberWithCommas } from "../../utils/util";
import ImageSlider from "../ImageSlider";
import LabelAndValue from "../LabelAndValue";
import DeviceVerificationReport from "../Popup/DeviceVerificationReport";
import VerifiedInfoPopup from "../Popup/VerifiedInfoPopup";
import ConditionInfoPopup from "../Popup/ConditionInfoPopup";
import AddFav from "../AddFav";
import RequestVerificationSuccessPopup from "../Popup/RequestVerificationSuccessPopup";
import LoginPopup from "../Popup/LoginPopup";
import Cookies from "js-cookie";
import VerifiedIcon from "../VerifiedIcon";
import UnVerifiedIcon from "../UnVerifiedIcon";
import ShareIcon from "../ShareIcon";
// import Logo from "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png";
import { BsInfoCircle, BsStar, BsStarFill } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import { VscPass } from "react-icons/vsc";
import { IoCloseCircleOutline } from "react-icons/io5";
import VerificationIcon from "../VerificationIcon";
import SellerDetailsCard from "./SellerDetailsCard";
import { deviceConditionQuestion } from "@/utils/constant";
import ConditionOptionLarge2 from "../Condition/ConditionOptionLarge2";
// import testpass from "../../assets/testpass.png";
// import testfail from "../../assets/testFail.png";
import Image from "next/image";
import { useRef } from "react";
import { useEffect } from "react";
import RequestVerificationPopup from "../Popup/RequestVerificationPopup";
import WarrantyInfo from "../Popup/WarrantyInfo";
import * as Axios from "../../api/axios";
import ComparisonTable from "../Table/ComparisonTable";
import ComparisonTable2 from "../Table/ComparisonTable2";
import { toast } from "react-toastify";

function ProductDetailsCard({ data, openFullImage }) {
  const [performAction2, setPerformAction2] = useState(false);
  const [openDeviceReport, setOpenDeviceReport] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openConditionInfoPopup, setConditionInfoPopup] = useState(false);
  const [openWarrantyInfoPopup, setWarrantyInfoPopup] = useState(false);
  const [details,setDetailsData] = useState([]);
  const [
    openRequestVerificationSuccessPopup,
    setRequestVerificationSuccessPopup,
  ] = useState(false);
  const [resData, setResData] = useState([]);
  const [listingid, setListingid] = useState(data?.listingId);

  const [deviceListingInfo, setDeviceListingInfo] = useState(data);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [ListingResData, SetListingtResData] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const [ImageError, setImageError] = useState(false);
  
  const myRef = useRef(null);

  let filled =
    data?.deviceCondition?.toLowerCase() == "Like New".toLowerCase()
      ? 5
      : data?.deviceCondition?.toLowerCase() == "Excellent".toLowerCase()
      ? 4
      : data?.deviceCondition?.toLowerCase() == "Good".toLowerCase()
      ? 3
      : data?.deviceCondition?.toLowerCase() == "Fair".toLowerCase()
      ? 2
      : data?.deviceCondition?.toLowerCase() == "Needs Repair".toLowerCase()
      ? 1
      : 5;
  let iconToShow = (index) => {
    if (index < filled) {
      return <BsStarFill className="text-yellow-400" />;
    } else {
      return <BsStar className="text-black-7e" />;
    }
  };


  // const executeScroll = () => {
  //   myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  // };

  const accessoriesList = [];
  if (data?.originalbox === "Y") {
    accessoriesList.push("Original box");
  }
  if (data?.charger === "Y") {
    accessoriesList.push("Charger");
  }
  if (data?.earphone === "Y") {
    accessoriesList.push("Earphones");
  }
  useEffect(() => {
    
    const interval = setInterval(() => {
      if (
        showLoginPopup == false &&
        performAction2 == true &&
        Cookies.get("userUniqueId") != undefined
      ) {
       
        setRequestVerificationSuccessPopup(true);
        clearInterval(interval);
      }
    }, 1000);
  }, [showLoginPopup]);

  useEffect(()=>{
    setDetailsData(data.similarListTable);
    console.log("similarListTable : ", details);
  })
  
  useEffect(() => {
    if (openRequestVerificationSuccessPopup) {
      setListingid(data?.listingId);
      Axios.sendverification(
        listingid,
        Cookies.get("userUniqueId") || "Guest",
        
      ).then((response) => {
        setResData(response);
        // if (response.status == "SUCCESS") {
        //  setRequestVerificationSuccessPopup(true);
        // }
      });
    }
  }, [openRequestVerificationSuccessPopup]);


  const handleClick = () => {
    if (Cookies.get("userUniqueId") === undefined) {
      setPerformAction2(true);
      setShowLoginPopup(true);
    } else if (data?.verified) {
      setShowNumber((prav) => !prav);
    } else {
      if (showNumber) {
        setShowNumber((prav) => !prav);
      } else {
        setRequestVerificationSuccessPopup(true);
      }
    }
  };
  
  return (
    <Fragment>
      <div className=" p-2 relative w-full">
        <div className="space-x-4 relative lg:-right-2 md:right-20 flex items-center justify-end pr-4 -top-2" >
          {!(data?.isOtherVendor === "Y") && (
            <Fragment>
              <ShareIcon data={deviceListingInfo} width={16} height={16}  />
              <AddFav
                data={deviceListingInfo}
                setProducts={setDeviceListingInfo}
              />
            </Fragment>
          )}
        </div>

        <div className="lg:flex lg:flex-col-2  m-auto justify-center w-full">
          <div className="col-span-1 lg:w-[600px] w-[400px] m-auto justify-center  pr-4">
            {(data?.images || data?.defaultImage || data?.imagePath) && (
              <ImageSlider
                openFullImage={openFullImage}
                data={deviceListingInfo}
                images={
                  (data?.images?.length && data?.images!="" && data?.images ) ||
                  (data?.imagePath && {
                    fullImage: data?.imagePath,
                    thumbImage: data?.imagePath,
                  }) ||
                  (data?.defaultImage.fullImage && data?.defaultImage.fullImage!="" && {
                    fullImage: data?.defaultImage?.fullImage,
                    thumbImage: data?.defaultImage?.fullImage,
                  }) ||
                   {
                    // fullImage: Logo,
                    // thumbImage: Logo,
                    fullImage: "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png",
                    thumbImage: "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png",
                  }
                }
              />
            )}
          </div>
          <div className="col-span-2 lg:w-[700px] md:w-[80vw] w-[90vw] m-auto  pl-4 lg:pt-0 pt-8 ">
            <div className="mb-3 pr-2 ">
              <h1 className="text-xl2FontSize font-Roboto-Bold text-black-20 pl-1">
                {data?.marketingName} - {data?.deviceStorage}
              </h1>
              {/* ({data?.color} {data?.deviceStorage})
              {data?.deviceRam && <span>({data?.deviceRam + " RAM"})</span>} */}
              {/* <h2 className="capitalize text-2xl font-semibold text-black-20">
              ({data?.color && `${data?.color}, `}
              {data?.deviceRam && data?.deviceRam + " RAM, "}
              {data?.deviceStorage && (
                <span>{data?.deviceStorage + " Storage"})</span>
              )}
            </h2> */}
              {/* {(!(data?.isOtherVendor === "Y") && (
              <div className="my-2">
                {data?.verified ? (
                  <div>
                    <VerifiedIcon height={42} width={86} />
                    <div className="hover:cursor-pointer text-blue-600 text-sm underline hover:text-blue-800">
                      <span onClick={() => setOpenDeviceReport(true)}>
                        {"Device Report"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <UnVerifiedIcon height={42} width={86} />
                    <div className="hover:cursor-pointer text-blue-600 text-sm underline hover:text-blue-800">
                      <span
                        onClick={() => {
                          Cookies.get("userUniqueId") === undefined
                            ? setShowLoginPopup(true)
                            : setRequestVerificationSuccessPopup(true);
                        }}
                      >
                        {"Request Verification"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )) || <span className="h-5 block"></span>} */}
              {/* <p className="block text-base text-m-grey-2">List price</p> */}
              <div className="flex flex-row justify-between">
                <p className="font-Roboto-Bold text-xl4FontSize flex items-center -ml-1 text-green2">
                  {data?.listingPrice && <BiRupee />}{" "}
                  {numberWithCommas(data?.listingPrice || "")}
                </p>
                <span
                  className="grid grid-cols-2 hover:cursor-pointer rounded-md py-1 px-4 w-[160pr] h-[40pr] opacity-bg-50 text-xs2FontSize"
                  style={{ backgroundColor: "#F3F3F3" }}
                  onClick={() => {
                    setConditionInfoPopup(true);
                  }}
                >
                  <div className="m-auto justify-center">
                    <span
                      className="font-Roboto-Light text-bx opacity-100 text-[#000] flex leading-tight items-center"
                      // onClick={() => setOpenConditionInfo(true)}
                    >
                      Condition{" "}
                    </span>
                    <div className="font-Roboto-Regular text-smallFontSize">
                      {data?.deviceCondition}
                    </div>
                  </div>
                  <div className="flex text-bx space-x-[2.5px] m-auto justify-center ">
                    {}
                    {Array(5)
                      .fill()
                      .map((_, index) => iconToShow(index))}
                  </div>
                </span>
              </div>
              <div className="py-6">
                {(data?.verified && (
                  <Fragment>
                    {/* <VerifiedIcon width={75} height={32} /> */}
                    <div
                      className="flex m-auto justify-center text-white py-0.5 rounded-md px-7"
                      style={{ background: "#4CAF50" }}
                    >
                      <div className="flex flex-1 ">
                        <VerificationIcon className="flex self-center" />
                        <p className="font-Roboto-Regularitalic text-mediumFontSize self-center pr-1">
                          Verified
                        </p>
                        <BsInfoCircle
                          size={12}
                          className="ml-2 mt-3 hover:cursor-pointer"
                          onClick={() => setOpenInfo(true)}
                        />
                        <div className="pl-3 pt-2">
                          <div className="bg-gray-100 w-[0.5px] h-6 "></div>
                        </div>
                      </div>
                      <div className="m-auto justify-center font-Roboto-Light text-smallFontSize">
                        <p>This phone is verified by ORUphones</p>
                      </div>
                    </div>
                    {/* <span
                    className="bg-white py-1 pr-2 rounded text-black-21 text-xs font-semibold"
                    onClick={executeScroll}
                  >
                    Device Report
                  </span> */}
                  </Fragment>
                )) || (
                  <Fragment>
                    {/* <UnVerifiedIcon width={75} height={32} /> */}
                    {data?.isOtherVendor === "N" && (
                      <div className="w-full  py-2 space-x-2 text-center">
                        <div
                          className="flex py-2 rounded-md space-x-2 col-span-3"
                          style={{ backgroundColor: "#F9C414" }}
                        >
                          <div className="flex space-x-1 flex-1 pl-10">
                            {/* <GoUnverified width={80} height={80} className="text-black self-center"/> */}
                            <div className="flex space-x-2">
                              <AiFillExclamationCircle
                                size={20}
                                fill="white"
                                className="self-center text-black"
                              />
                              {/* <UnVerifiedIcon /> */}

                              <span className="text-xs2FontSize font-Roboto-Regularitalic pt-0.5 self-center text-[#000944] italic uppercase">
                                unverified
                              </span>
                            </div>
                            <BsInfoCircle
                              size={18}
                              className="ml-1 pt-2 hover:cursor-pointer"
                              onClick={() => setOpenInfo(true)}
                            />
                            <div className="pl-3">
                              <div className="bg-gray-100 w-[1px] h-6 "></div>
                            </div>
                            {/* <span className="text-xs italic self-center uppercase"> unverified</span> */}
                          </div>
                          <div
                            className="flex w-full items-center pr-10 justify-end hover:cursor-pointer"
                            onClick={() => {
                              // if (Cookies.get("userUniqueId") === undefined) {
                              //   setPerformAction2(true);
                              //   setShowLoginPopup(true);
                              // } else {
                              //   setRequestVerificationSuccessPopup(true);
                              // }
                              data?.status!="Active" ? toast.warning("This device is sold out"): handleClick()
                            }}
                          >
                            <span
                              className="underline font-Roboto-Light text-smallFontSize"
                              // onClick={() =>
                            >
                              Click here to Request Verification
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* <p className="flex items-center">
                    <span
                      className="underline text-xs"
                      onClick={() =>
                        !authenticated
                          ? setOpenLoginPopup(true)
                          : setOpenRequestVerificationSuccessPopup(true)
                      }
                    >
                      Request Verification
                    </span>
                    <BsInfoCircle
                      className="ml-1.5"
                      onClick={() => setOpenVerificationInfo(true)}
                    />
                  </p> */}
                  </Fragment>
                )}
              </div>
            </div>
            <div className="flex font-Roboto-Light text-mediumFontSize text-black mb-1">
              Device Info
            </div>
            <div className="pr-2 pb-4">
              <div className="bg-gray-600 h-1 border-2 border-white"></div>
            </div>

            {data?.isOtherVendor === "Y" ? (
              <div className="grid grid-cols-3 gap-x-0 gap-y-2 pr-2">
                <LabelAndValue
                  label="Condition"
                  value={data?.deviceCondition || "--"}
                  labelTextSize
                  showConditionInfoPopup={() => setConditionInfoPopup(true)}
                />
                <LabelAndValue
                  label="Listed on"
                  value={data?.listingDate || "--"}
                  labelTextSize
                />
                <LabelAndValue
                  label="Storage"
                  value={data?.deviceStorage || "--"}
                  labelTextSize
                />
                <LabelAndValue
                  label="RAM"
                  value={data?.deviceRam || "--"}
                  labelTextSize
                />
                <LabelAndValue
                  label="Brand Warranty"
                  value={"Not Applicable"}
                  labelTextSize
                  showWarrantyInfoPopup={() => setWarrantyInfoPopup(true)}
                />
                <LabelAndValue
                  label="Seller Warranty"
                  value={data?.warranty || "--"}
                  labelTextSize
                  showWarrantyInfoPopup={() => setWarrantyInfoPopup(true)}
                />
                <LabelAndValue
                  label="Color"
                  value={data?.color || "--"}
                  labelTextSize
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-x-0 gap-y-2 pr-2">
                <LabelAndValue
                  label="Condition"
                  value={data?.deviceCondition || "--"}
                  showConditionInfoPopup={() => setConditionInfoPopup(true)}
                  labelTextSize
                />
                {
                  <LabelAndValue
                    label="Brand Warranty"
                    value={data?.warranty || "--"}
                    showWarrantyInfoPopup={() => setWarrantyInfoPopup(true)}
                  />
                }
                <LabelAndValue
                  label="Seller Warranty"
                  value={"Not Applicable"}
                  labelTextSize
                  showWarrantyInfoPopup={() => setWarrantyInfoPopup(true)}
                />
                <LabelAndValue label="Color" value={data?.color || "--"} />
                <LabelAndValue
                  label="Storage"
                  value={data?.deviceStorage || "--"}
                />
                <LabelAndValue label="RAM" value={data?.deviceRam || "--"} />
                {
                  <LabelAndValue
                    label="Verified on"
                    value={data?.verifiedDate || "Request Verification"}
                    showInfoPopup={() => setOpenInfo(true)}
                    showRequestVerificationSuccessPopup={() => {
                      data?.status!="Active" ? toast.warning("This device is sold out"):handleClick()
                    }}
                    textAsLink={data?.verifiedDate != null ? false : true}
                    labelTextSize
                  />
                }
                <LabelAndValue
                  label="Listed on"
                  value={data?.listingDate || "--"}
                  labelTextSize
                />
                {
                  <LabelAndValue
                    label="Accessories"
                    value={accessoriesList.join(", ") || "--"}
                    labelTextSize
                  />
                }
                {/* {(data?.cosmetic || data?.verified) && (
                  <LabelAndValue
                    label="Report"
                    value={"Device Report"}
                    onClick={executeScroll()}
                    showDeviceReport={() => setOpenDeviceReport(true)}
                    labelTextSize
                  />
                )} */}
              </div>
            )}
            <div className="pr-2 py-4 font-Roboto-Light text-smallFontSize">
              *This phone might be old or refurbished
            </div>
            <div className="pr-2">
              <SellerDetailsCard data={data} />
            </div>
          </div>
        </div>
        <div>
          <div className="">
            {data && data?.cosmetic && (
              <>
                <h2 className="mt-12 text-gray-20 font-Roboto-Light text-regularFontSize mb-3">
                  Device Cosmetic Report
                </h2>
                <div className="pb-4">
                  <div className="bg-gray-600 h-1 border-2"></div>
                </div>
              </>
            )}
            {data && data?.cosmetic && (
              <div className="lg:flex  lg:flex-row-3  mx-2">
                {deviceConditionQuestion.map((item, index) => (
                  <div className="px-2">
                    <span className="text-regularFontSize font-Roboto-Bold text-black truncate">
                      {data?.cosmetic[index] != undefined && item?.title}
                    </span>
                    {data?.cosmetic[index] != undefined && (
                      <ConditionOptionLarge2
                        title={data?.cosmetic[index]}
                        options={data?.cosmetic[index] && item?.options}
                        conditionResults={data?.cosmetic}
                        questionIndex={index}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {data?.functionalTestResults && data?.verified && (
            <div className="text-gray-20 font-Roboto-Light text-regularFontSize lg:my-3 py-9 ">
              <span>Device Verification Report</span>
              <div className="pb-4">
                <div className="bg-gray-600 h-1 border-2 border-white"></div>
              </div>
            </div>
          )}
          <div className="flex flex-row w-full justify-evenly gap-8 pb-10">
            <div className="">
              {data?.functionalTestResults &&
                data?.functionalTestResults.map((items, index) => {
                  return (
                    index < data?.functionalTestResults.length / 2 && (
                      <TestListItem
                        key={index}
                        testName={items.displayName}
                        testStatus={items.testStatus}
                      />
                     
                    )
                  );
                })}
            </div>
            <div className="lg:pl-28 pl-16 mb-8">
              {data?.functionalTestResults &&
                data?.functionalTestResults.map((items, index) => {
                  return (
                    index >= data?.functionalTestResults.length / 2 && (
                      <TestListItem
                        key={index}
                        testName={items.displayName}
                        testStatus={items.testStatus}
                      />
                    )
                  );
                })}
            </div>
          </div>
        </div>
        {data?.externalSource && data?.externalSource?.length > 0 && (
            <div>
           
              <p className="text-normal FontSize pt-6 pr-2 text-black-20 font-Roboto-Light border-b  border-black  capitalize mb-4 pb-1">
                Detailed Comparison Between Other Sellers 
              </p>
              {data && <div className="relative flex py-2">
                    <Image
                      src={
                        ImageError
                          ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                          : getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                      }
                      onError={() => setImageError(true)}
                      className=""
                      // alt={`${
                      //   type[Math.floor(Math.random() * type.length)]
                      // } ${model} ${storage} like new `.toLowerCase()}
                      height="120"
                      width="90"
                    />
                    <div className="flex flex-col justify-end relative  left-6">
                      {/* <p className="font-bold text-dx text-[#2C2F45]">{data?.marketingName}</p> */}
                      <p className='font-Roboto-Bold text-tx text-[#000944]'>{data?.marketingName}</p>

                      {data?.make != "Apple" && (
                        <p className="flex items-center space-x-1">
                          
                            {/* <CardHeading4 title="RAM :" /> */}
                            <p className='font-Roboto-Medium text-ex text-[#000000] truncate'>RAM :</p>
                          <p className="font-Roboto-Bold text-jx pt-0.5 text-[#2C2F45]">
                            {data?.deviceRam}
                          </p>
                        </p>
                      )}

                      <div className="flex space-x-1 items-center"> 
                        <p className='font-Roboto-Medium text-ex text-[#000000] truncate'>Storage :</p>
                        <p className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                          {data?.deviceStorage}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                          <p className='font-Roboto-Medium text-ex text-[#000000] truncate'>Condition :</p>
                        <p className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                          {data?.deviceCondition}
                        </p>
                      </div>
                    </div>
                  </div>}
              <div className="bg-gray-600 h-1 border-2 border-white "></div>
              <div className="pt-2 font-Roboto-Bold text-m-green-1 text-xl2FontSize flex flex-row">
                
              </div>
              <div className="flex">
                <span className="text-smallFontSize font-Roboto-light">
                  *The products compared here are either used mobile phones,
                  refurbished/renewed smartphone or second hand mobile phones.
                  These are not new phones.
                </span>
              </div>
              {/* <div className="flex flex-row"> */}
              {/* {data?.make != "Apple" && (
                <div className="text-m-green-1 font-Roboto-Bold text-sm pr-1">
                  Ram : {data?.deviceRam}
                </div>
              )} */}
              {/* <div className="text-m-green-1 font-Roboto-Bold text-sm pr-1">
                Storage : {data?.deviceStorage}
              </div> */}
              {/* <div className="text-m-green-1 font-Roboto-Bold text-sm">
                Condition : {data?.deviceCondition}
              </div> */}
              {/* </div> */}
              {
                <ComparisonTable
                  data={data?.compareData}
                  listingId={
                    data?.listingId !== undefined ? data?.listingId : []
                  }
                />
              }
               {
                <ComparisonTable2
                data={
                  data?.similarListTable && data?.similarListTable?.length > 0 ? data?.similarListTable : []
                }
                listingId={data?.listingId !== undefined ? data?.listingId : []}
              />
                // <ComparisonTable2
                //   data={data.similarListTable}
                //   listingId={
                //     data.listingId !== undefined ? data?.listingId : []
                //   }
                // />
              }

            </div>
          )}
        <ComparisonTable />
       
      </div>
      <DeviceVerificationReport
        open={openDeviceReport}
        setOpen={setOpenDeviceReport}
        data={data}
      />
      <ConditionInfoPopup
        open={openConditionInfoPopup}
        setOpen={setConditionInfoPopup}
        data={data}
      />
      <VerifiedInfoPopup open={openInfo} setOpen={setOpenInfo} />
      <RequestVerificationSuccessPopup
        open={openRequestVerificationSuccessPopup}
        setOpen={setRequestVerificationSuccessPopup}
        data={resData}
      />

      <LoginPopup
        open={showLoginPopup}
        setOpen={setShowLoginPopup}
        redirect={false}
      />
      <WarrantyInfo
        open={openWarrantyInfoPopup}
        setOpen={setWarrantyInfoPopup}
        data={data}
      />
    </Fragment>
  );
}

export default ProductDetailsCard;

const TestListItem = ({ testName, testStatus }) => {
  return (
    <div className="flex items-center justify-between py-3 lg:space-x-24 space-x-8">
      <p className="font-Roboto-Regular text-mediumFontSize">{testName}</p>
      <p className="flex items-center justify-between">
        <span className="mr-3 font-Roboto-Regular text-smallFontSize">
          {testStatus}
        </span>{" "}
        {testStatus === "PASS" ? (
          <VscPass className="text-green2" />
        ) : (
          <IoCloseCircleOutline className="text-red" />
        )}
      </p>
    </div>
  );
};

import Image from "next/image";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { numberWithCommas } from "../../utils/util";
import * as Axios from "../../api/axios";
import RequestVerificationPopup from "../Popup/RequestVerificationPopup";
import LoginPopup from "../Popup/LoginPopup";
import RequestVerificationSuccessPopup from "../Popup/RequestVerificationSuccessPopup";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { FaGreaterThan } from "react-icons/fa";
import first from "@/assets/first.png";
import second from "@/assets/second.png";
import third from "@/assets/third.png";



function SellerDetailsCard({ data }) {
  const [productLink, setProductLink] = useState("");
  const [performAction, setPerformAction] = useState(false);
  const [performAction2, setPerformAction2] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [contactSellerMobileNumber, setContactSellerMobileNumber] =
    useState("Loading...");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [openRequestVerificationPopup, setRequestVerificationPopup] =
    useState(false);
  const [otherSeller, setOtherSeller] = useState([]);
  const [
    openRequestVerificationSuccessPopup,
    setOpenRequestVerificationSuccessPopup,
  ] = useState(false);
<<<<<<< Updated upstream
=======
  const [resData, setResData] = useState([]);
  const [listingid, setListingid] = useState(data?.listingId);

  useState(()=>{
    setListingid(data?.listingId);
    Axios.sendverification(
     listingid,
     Cookies.get("userUniqueId") || "Guest"
   ).then((response) => {
       setResData(response);
     // if (response.status == "SUCCESS") {
      //  setRequestVerificationSuccessPopup(true);
     // }
   });
  },[data])
 


>>>>>>> Stashed changes
  const handleClick = () => {
    if (Cookies.get("userUniqueId") === undefined ) {
      setPerformAction(true);
      setShowLoginPopup(true);
    } else if (data.verified) {
      setShowNumber((prav) => !prav);
    } else {
      if (showNumber) {
        setShowNumber((prav) => !prav);
      } else { 

        setRequestVerificationPopup(true);
      }
    }
  };
  useEffect(() => {
    // console.log("showLoginPopup", performAction);
    if (
      showLoginPopup == false &&
      performAction == true &&
      Cookies.get("userUniqueId") !== undefined &&
      data?.isOtherVendor !== "Y"
    ) {
      if (data?.verified) {
        setShowNumber((prav) => !prav);
      } else {
        setRequestVerificationPopup(true);
      }
    }
    if (
      showLoginPopup == false &&
      performAction == true &&
      Cookies.get("userUniqueId") !== undefined &&
      data?.isOtherVendor === "Y"
    ) {
      // setPerformAction2(true);
      // setProductLink(data?.productLink);
      openSellerWebSite(data?.vendorLink);
    }

    // setPerformAction(false);
  }, [showLoginPopup]);

  useEffect(() => {
    if (
      showLoginPopup == false &&
      performAction2 == true &&
      Cookies.get("userUniqueId") !== undefined && productLink != ""
    ) {
      openSellerWebSite(productLink);
    }
  }, [showLoginPopup]);

  useEffect(() => {
    // setShowNumber(false);
    if (
      !(data?.isOtherVendor === "Y") &&
      Cookies.get("userUniqueId") !== undefined
    ) {
      Axios.fetchSellerMobileNumber(data?.listingId, data?.userUniqueId).then(
        (response) => {
          // setContactSellerMobileNumber(response?.dataObject?.userdetails?.mobileNumber);
          setContactSellerMobileNumber(response?.dataObject?.mobileNumber);
        }
      );
    }
    setOtherSeller(data?.externalSource);
  }, [data, showNumber]);

  const openSellerWebSite = (e) => {
    if (Cookies.get("userUniqueId") === undefined) {
      setShowLoginPopup(true);
      setPerformAction(true);
    } else {
      window.open(e);
    }
  };

  console.log("other seller ", otherSeller);

  return (
    <div className="seller-info">
      <div className="pr-4 py-2">
        <p className="text-mediumFontSize text-black-20 font-Roboto-Light capitalize mb-1">
          Seller Details
        </p>
        <div className="pb-4">
          <div className="bg-gray-600 h-1 border-2 border-white"></div>
        </div>
        {data?.isOtherVendor === "N" || data?.isOtherVendor === null ? (
          <div className="flex flex-row justify-between">
            <div className="flex ">
              <CgProfile size={40} />
              <div className="pt-1">
                <p className="pl-2 text-grey2 font-Roboto-Light text-smallFontSize leading-4">
                  {data?.listedBy}
                </p>
                <span className="pl-2 text-gray-2 font-Roboto-Medium text-mediumFontSize text-sm inline-block">
                  {data?.listingLocation}
                </span>
              </div>
            </div>
            <span className="px-6">
              <div className="flex flex-row justify-between">
                <button
                  onClick={() => handleClick()}
                  className={`${
                    !showNumber ? "bg-m-green text-white" : "text-m-green"
                  } w-full shadow-xl border border-m-green font-Roboto-Semibold text-regularFontSize uppercase px-12 py-2 rounded ml-12 items-end hover:bg-white hover:text-m-green-1 duration-500`}
                >
                  {showNumber ? contactSellerMobileNumber : "Contact Seller"}
                </button>
              </div>
            </span>
          </div>
        ) : (
          <div className="flex flex-row">
            {data?.vendorLogo && (
              <Image
                loading="lazy"
                placeholder="blur"
                priority={false}
                unoptimized={false}
                blurDataURL={data?.vendorLogo || "/"}
                src={data?.vendorLogo || "/"}
                width={100}
                height={50}
                alt="ORU Compare from Other Sellers"
                objectFit="contain"
              />
            )}
            <button
              onClick={() => {
                openSellerWebSite(data?.vendorLink);
              }}
              className="bg-m-green text-base font-semibold text-white w-full uppercase pr-4 mx-4 py-2 my-4 rounded  hover:bg-white hover:text-m-green-1 duration-500 border border-m-green"
            >
              VIEW WEBSITE
            </button>
          </div>
        )}
      </div>
      {otherSeller && otherSeller.length > 0 && (
        <div className="pr-2">
          <p className="text-mediumFontSize pt-6 pr-2 text-black-20 font-Roboto-Light capitalize mb-2">
            Compare from Other Sellers
          </p>
          <div className="pb-4">
          <div className="bg-gray-600 h-1 border-2 border-white"></div>
        </div>
          <div className="flex flex-col overflow-y-auto">
            {otherSeller.map((items, index) => (
              <OtherSeller
                index={index}
                data={items}
                setShowLoginPopup={setShowLoginPopup}
                setPerformAction2={setPerformAction2}
                setProductLink={setProductLink}
              />
            ))}
          </div>
        </div>
      )}
      <RequestVerificationPopup
        open={openRequestVerificationPopup}
        setOpen={setRequestVerificationPopup}
        data={data}
        setShowNumber={setShowNumber}
        openRequestVerificationSuccessPopup={openRequestVerificationSuccessPopup}
        setRequestVerificationSuccessPopup={
          setOpenRequestVerificationSuccessPopup
        }
      />
      <RequestVerificationSuccessPopup
        data={resData}
        open={openRequestVerificationSuccessPopup}
        setOpen={setOpenRequestVerificationSuccessPopup}
      />
      <LoginPopup
        open={showLoginPopup}
        setOpen={setShowLoginPopup}
        redirect={false}
      />
    </div>
  );
}

const OtherSeller = ({
  index,
  data,
  setShowLoginPopup,
  setPerformAction2,
  setProductLink,
}) => {
  // console.log("data : ",data.externalSourceImage);
  // console.log(
  //   data.externalSourceImage.replaceAll('https://zenrodeviceimages.s3.us-west-2.amazonaws.com/vendors/',"") , data.externalSourceImage.replace('_logo.png',""));
  // console.log(data.externalSourceImage);
  let vendor = data.externalSourceImage.replaceAll(
    "https://zenrodeviceimages.s3.us-west-2.amazonaws.com/vendors/",
    ""
  );

  vendor = vendor.replaceAll("_logo.png", "");
  if (vendor.includes("mbr_")) {
    vendor = vendor.replaceAll("mbr_", "");
  }
  

  // console.log("vendor", vendor);
<<<<<<< HEAD
  
  console.log('data : ',data);
=======
>>>>>>> 478c03c1dc36d9b23207ef03cb4fca6f6617df6e

  return (
    <>
      {/* {data?.map((item, index) => ( */}
      <div
        className="my-1 py-1 px-4 flex justify-between flex-shrink-0 shadow-sm rounded-xl hover:cursor-pointer"
        // key={index}
        style={{ background: "#EFEFEF" }}
      >
        <div className="flex flex-col justify-center items-start">
          {/* <span className="text-xs text-m-grey-2">Seller</span> */}
          <div className="my-1 w-28 flex">
            {/* {console.log("rnak",index)} */}
            {data.externalSourceImage && (
<<<<<<< HEAD
              <img
                src={data.externalSourceImage}
                alt={vendor}
                // width={120}
                // height={32}
                // objectFit="contain"
                style={{ height: 35, width: "auto"}}
                />
=======
              <div className="flex flex-row gap-2">
                {index < 3 && (
                  <Image
                    src={
                      index == 0
                        ? first
                        : index == 1
                        ? second
                        : index == 2 && third
                    }
                    alt="icon"
                    width={35}
                    height={20}
                    objectFit="contain"
                    className=""
                  />
>>>>>>> 478c03c1dc36d9b23207ef03cb4fca6f6617df6e
                )}
                <Image
                  src={data.externalSourceImage}
                  alt={vendor}
                  width={130}
                  height={50}
                  objectFit="contain"
                  // style={{ height: 35, width: "auto" }}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center pr-4"
          onClick={() => {
            if (Cookies.get("userUniqueId") == undefined) {
              setShowLoginPopup(true);
              setProductLink(data?.productLink);
              setPerformAction2(true);
            } else if(data?.externalSourceImage != 'https://zenrodeviceimages.s3.us-west-2.amazonaws.com/oru/product/mobiledevices/img/txt_phone.png') window.open(data?.productLink, "_blank");
          }}
        >
          {/* <span className="text-xs text-m-grey-2">Price</span> */}
          {data.externalSourcePrice && (
            <span className="text-regularFontSize font-Roboto-Semibold text-m-grey-1 h-6 font-semibold flex items-center -ml-1">
              <BiRupee /> {numberWithCommas(data.externalSourcePrice)}{" "}
              <FaGreaterThan size={13} className="pl-1" />
            </span>
          )}
        </div>
      </div>
      {/* ))} */}
    </>
  );
};

export default SellerDetailsCard;

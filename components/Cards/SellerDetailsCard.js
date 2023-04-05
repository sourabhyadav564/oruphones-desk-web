import Image from "next/image";
import { useEffect, useState } from "react";
import Rupee from "@/assets/rupee1.svg";
import { numberWithCommas } from "../../utils/util";
import * as Axios from "../../api/axios";
import RequestVerificationPopup from "../Popup/RequestVerificationPopup";
import LoginPopup from "../Popup/LoginPopup";
import RequestVerificationSuccessPopup from "../Popup/RequestVerificationSuccessPopup";
import Cookies from "js-cookie";
import RegUser from "@/assets/user1.svg";
import GreaterThan from "@/assets/greaterthan.svg";
import ThisPhonePopup from "../Popup/ThisPhonePopup";
import { toast } from "react-toastify";

function SellerDetailsCard({ data, comparisontableid }) {
  const [thisPhonePopup, setThisPhonePopup] = useState(false);
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
  const [resData, setResData] = useState([]);
  const [listingid, setListingid] = useState(data?.listingId);

  useEffect(() => {
    if (openRequestVerificationPopup) {
      setListingid(data?.listingId);
      Axios.sendverification(
        listingid,
        Cookies.get("userUniqueId") || "Guest"
      ).then((response) => {
        setResData(response);
      });
    }
  }, [openRequestVerificationPopup]);

  const handleClick = () => {
    if (Cookies.get("userUniqueId") === undefined) {
      setPerformAction(true);
      setShowLoginPopup(true);
    } else if (data?.verified) {
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
      openSellerWebSite(data?.vendorLink);
    }
  }, [showLoginPopup]);

  useEffect(() => {
    if (
      showLoginPopup == false &&
      performAction2 == true &&
      Cookies.get("userUniqueId") !== undefined &&
      productLink != ""
    ) {
      openSellerWebSite(productLink);
    } else if (
      showLoginPopup == false &&
      performAction2 == true &&
      Cookies.get("userUniqueId") !== undefined &&
      productLink == ""
    ) {
      setThisPhonePopup(true);
    }
  }, [showLoginPopup]);
  useEffect(() => {
    if (
      !(data?.isOtherVendor === "Y") &&
      Cookies.get("userUniqueId") !== undefined &&
      showNumber
    ) {
      Axios.fetchSellerMobileNumber(
        data?.listingId,
        Cookies.get("userUniqueId")
      ).then((response) => {
        setContactSellerMobileNumber(response?.dataObject?.mobileNumber);
      });
    }
  }, [showNumber]);

  const openSellerWebSite = (e) => {
    if (Cookies.get("userUniqueId") === undefined) {
      setShowLoginPopup(true);
      setPerformAction(true);
    } else {
      window.open(e);
    }
  };

  return (
    <div className="seller-info">
      <div className="pr-4 py-2">
        <p className="text-mediumFontSize text-black-20 font-Roboto-Light capitalize mb-1">
          Seller Details
        </p>
        <div className="pb-4">
          <div className="bg-gray-600 h-1 border-2 border-white"> </div>
        </div>
        {data?.isOtherVendor === "N" || data?.isOtherVendor === null ? (
          <div className="flex flex-row justify-between">
            <div className="flex ">
              <Image src={RegUser} width={30} height={30} alt="" />
              <div className="pt-1">
                <p className="pl-2 text-grey2 font-Roboto-Semibold text-mediumFontSize leading-4">
                  {" "}
                  {data?.listedBy}
                </p>
                <span className="pl-2 text-gray-2 font-Roboto-Light text-smallFontSize text-sm inline-block">
                  {" "}
                  {data?.listingLocation}
                </span>
              </div>
            </div>
            <span className="px-6">
              <div className="flex flex-row justify-between">
                <button
                  onClick={() =>
                    data?.status != "Active"
                      ? toast.warning("This device is sold out")
                      : handleClick()
                  }
                  className={`${
                    !showNumber ? "bg-m-green text-white" : "text-m-green"
                  } w-full shadow-xl border border-m-green font-Roboto-Semibold text-regularFontSize uppercase px-12 py-2 rounded ml-12 items-end hover:bg-white hover:text-m-green-1 duration-500`}
                >
                  {" "}
                  {showNumber ? contactSellerMobileNumber : "Contact Seller"}
                </button>{" "}
              </div>{" "}
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
            )}{" "}
            <button
              onClick={() => {
                openSellerWebSite(data?.vendorLink);
              }}
              className="bg-m-green text-base font-semibold text-white w-full uppercase pr-4 mx-4 py-2 my-4 rounded  hover:bg-white hover:text-m-green-1 duration-500 border border-m-green"
            >
              VIEW WEBSITE{" "}
            </button>
          </div>
        )}
      </div>
      {data?.externalSource && data?.externalSource.length > 0 && (
        <div className="pr-2">
          <p className="text-mediumFontSize pt-6 pr-2 text-black-20 font-Roboto-Light capitalize mb-2">
            {" "}
            Compare from Other Sellers{" "}
          </p>
          <div className="pb-4">
            {" "}
            <div className="bg-gray-600 h-1 border-2 border-white"> </div>
          </div>{" "}
          <div className="flex flex-col overflow-y-auto">
            {" "}
            {data?.externalSource.map((items, index) => (
              <OtherSeller
                index={index}
                data={items}
                setShowLoginPopup={setShowLoginPopup}
                setPerformAction2={setPerformAction2}
                setProductLink={setProductLink}
                setThisPhonePopup={setThisPhonePopup}
                listingId={data?.listingId}
                isOtherVendor={data?.isOtherVendor}
              />
            ))}{" "}
            {data?.compareData && data?.compareData.length > 0 && (
              <a
                href={comparisontableid}
                className="flex justify-end p-2 text-m-green text-mediumFontSize underline cursor-pointer pl-4 font-Roboto-Semibold hover:opacity-70"
              >
                See Details &gt;
              </a>
            )}
          </div>{" "}
        </div>
      )}{" "}
      <RequestVerificationPopup
        open={openRequestVerificationPopup}
        setOpen={setRequestVerificationPopup}
        data={data}
        setShowNumber={setShowNumber}
        openRequestVerificationSuccessPopup={
          openRequestVerificationSuccessPopup
        }
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
      <ThisPhonePopup open={thisPhonePopup} setOpen={setThisPhonePopup} />
    </div>
  );
}

const OtherSeller = ({
  index,
  data,
  setShowLoginPopup,
  setPerformAction2,
  setProductLink,
  setThisPhonePopup,
  listingId,
  isOtherVendor,
}) => {
  let vendor = data.externalSourceImage.replaceAll(
    "https://zenrodeviceimages.s3.us-west-2.amazonaws.com/vendors/",
    ""
  );

  vendor = vendor.replaceAll("_logo.png", "");
  if (vendor.includes("mbr_")) {
    vendor = vendor.replaceAll("mbr_", "");
  }

  return (
    <>
      <div
        className="my-1 py-1 px-4 flex justify-between flex-shrink-0 shadow-sm rounded-xl hover:cursor-pointer"
        style={{ background: "#EFEFEF" }}
        onClick={() => {
          if (Cookies.get("userUniqueId") == undefined) {
            setShowLoginPopup(true);
            setProductLink(data?.productLink);
            setPerformAction2(true);
          } else if (data?.listingId == listingId && isOtherVendor == "N") {
            setThisPhonePopup(true);
          } else if (data?.listingId != listingId) {
            window.open(data?.productLink, "_blank");
          } else {
            window.open(data?.productLink, "_blank");
          }
        }}
      >
        <div className="flex flex-col justify-center items-start">
          {" "}
          <div className="my-1 w-64 flex">
            {" "}
            {data?.externalSourcePrice && (
              <div className="flex flex-row gap-2">
                {index < 3 && (
                  <Image
                    src={
                      index == 0
                        ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/first.svg"
                        : index == 1
                        ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/second.svg"
                        : index == 2 &&
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/third.svg"
                    }
                    alt="icon"
                    width={35}
                    height={20}
                    objectFit="contain"
                    className=""
                  />
                )}
                {data?.userName && data?.listingId != listingId ? (
                  <p className="font-Roboto-Semibold opacity-30 py-1 text-regularFontSize">
                    {data?.userName}
                  </p>
                ) : data?.listingId == listingId && isOtherVendor == "N" ? (
                  <div className="flex">
                    <p className="font-Roboto-Semibold opacity-30 py-1 text-regularFontSize">
                      {data?.userName}
                    </p>
                    <p className="font-Roboto-Semibold opacity-30 py-1 text-smallFontSize pt-2 pl-1.5">
                      (This Phone)
                    </p>
                  </div>
                ) : (
                  <Image
                    src={data?.externalSourceImage}
                    alt={vendor}
                    height={35}
                    width={70}
                    objectFit="contain"
                  />
                )}
                {data?.listingId == listingId && isOtherVendor == "Y" && (
                  <p className="font-Roboto-Semibold opacity-30 py-1 w-64">
                    (This Phone){" "}
                  </p>
                )}{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex flex-col items-center justify-center pr-4">
          {" "}
          {data.externalSourcePrice && (
            <span className="text-regularFontSize font-Roboto-Semibold text-m-grey-1 h-6 font-semibold flex items-center -ml-1">
              <Image src={Rupee} width={20} height={20} />
              {numberWithCommas(data.externalSourcePrice)}{" "}
              <Image src={GreaterThan} width={15} height={15} />
            </span>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default SellerDetailsCard;

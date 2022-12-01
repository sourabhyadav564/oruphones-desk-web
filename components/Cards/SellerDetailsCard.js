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

function SellerDetailsCard({ data }) {
  const [showNumber, setShowNumber] = useState(false);
  const [contactSellerMobileNumber, setContactSellerMobileNumber] = useState("Loading...");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [openRequestVerificationPopup, setRequestVerificationPopup] =
    useState(false);
  const [otherSeller, setOtherSeller] = useState([]);
  const [
    openRequestVerificationSuccessPopup,
    setOpenRequestVerificationSuccessPopup,
  ] = useState(false);

  const handleClick = () => {
    if (Cookies.get("userUniqueId") === undefined) {
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
    setShowNumber(false);
    if (
      !(data?.isOtherVendor === "Y") &&
      Cookies.get("userUniqueId") !== undefined
    ) {
      Axios.fetchSellerMobileNumber(data?.listingId, data?.userUniqueId).then((response) => {
        // setContactSellerMobileNumber(response?.dataObject?.userdetails?.mobileNumber);
        setContactSellerMobileNumber(response?.dataObject?.mobileNumber);
      });
    }
    setOtherSeller(data?.externalSource);
  }, [data]);


  const openSellerWebSite = (e) => {
    if (Cookies.get("userUniqueId") === undefined) {
      setShowLoginPopup(true);
    } else {
      window.open(e);
    }
  };

  return (
    <div className="seller-info">
      <div className="pr-4 py-2">
        <p className="text-mediumFontSize text-black-20 font-Roboto-Light capitalize mb-2">
          Seller Details
        </p>
        <div className="pb-4">
          <div className="bg-gray-600 h-1 border-2"></div>
        </div>
        {data?.isOtherVendor === "N" || data?.isOtherVendor === null ? (
          <div className="flex flex-row justify-start">
            <CgProfile size={40} />
            <span className="pl-2">
              <div className="flex flex-row items-end">
                <div>
                  <p className="text-grey2 font-Roboto-Bold text-regularFontSize leading-4">
                    {data?.listedBy}
                  </p>
                  <span className="text-gray-2 font-Roboto-Light text-mediumFontSize text-sm inline-block">
                    {data?.listingLocation}
                  </span>
                </div>
                <button
                  onClick={() => handleClick()}
                  className={`${!showNumber ? "bg-m-green text-white" : "text-m-green"
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
                src={data?.vendorLogo || "/"}
                width={100}
                height={50}
                alt="ORU Compare from Other Sellers"
                objectFit="contain"
              />
            )}
            <button
              onClick={() => openSellerWebSite(data?.vendorLink)}
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
          <div className="flex flex-col overflow-y-auto">
            {otherSeller.map((items, index) => (
              <OtherSeller key={index} data={items} />
            ))}
          </div>
        </div>
      )}
      <RequestVerificationPopup
        open={openRequestVerificationPopup}
        setOpen={setRequestVerificationPopup}
        data={data}
        setShowNumber={setShowNumber}
        setRequestVerificationSuccessPopup={
          setOpenRequestVerificationSuccessPopup
        }
      />
      <RequestVerificationSuccessPopup
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

export default SellerDetailsCard;

const OtherSeller = ({ data }) => {
  return (
    <>
      {/* {data?.map((item, index) => ( */}
      <div
        className="my-0.5 p-2 flex justify-between flex-shrink-0 shadow-sm rounded-xl"
        // key={index}
        style={{ background: "#EFEFEF" }}
      >
        <div className="flex flex-col justify-center items-start">
          {/* <span className="text-xs text-m-grey-2">Seller</span> */}
          <span className="my-1 w-28">
            {data.externalSourceImage && (
              <img
                src={data.externalSourceImage}
                alt={data.externalSourceName || "seller"}
                // width={120}
                // height={32}
                // objectFit="contain"
                style={{ height: 35, width: "auto" }}
              />
            )}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center pr-4">
          {/* <span className="text-xs text-m-grey-2">Price</span> */}
          {data.externalSourcePrice && (
            <span className="text-regularFontSize font-Roboto-Semibold text-m-grey-1 h-6 font-semibold flex items-center -ml-1">
              <BiRupee /> {numberWithCommas(data.externalSourcePrice)}
            </span>
          )}
        </div>
      </div>
      {/* ))} */}
    </>
  );
};

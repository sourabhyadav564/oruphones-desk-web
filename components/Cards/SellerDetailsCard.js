import Image from "next/image";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { numberWithCommas } from "../../utils/util";
import * as Axios from "../../api/axios";
import RequestVerificationPopup from "../Popup/RequestVerificationPopup";
import LoginPopup from "../Popup/LoginPopup";
import RequestVerificationSuccessPopup from "../Popup/RequestVerificationSuccessPopup";
import Cookies from "js-cookie";

function SellerDetailsCard({ data }) {
  console.log("SellerDetailsCard ", data);
  const [showNumber, setShowNumber] = useState(false);
  const [contactSellerMobileNumber, setContactSellerMobileNumber] = useState("Loading...");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [openRequestVerificationPopup, setRequestVerificationPopup] =
    useState(false);
  const [otherSeller, setOtherSeller] = useState(data?.externalSource);
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
    if (
      !(data?.isOtherVendor === "Y") &&
      Cookies.get("userUniqueId") !== undefined
    ) {
      Axios.fetchSellerMobileNumber(data?.listingId, data?.userUniqueId).then((response) => {
        console.log("user detail res ---> ", response)
        // setContactSellerMobileNumber(response?.dataObject?.userdetails?.mobileNumber);
        setContactSellerMobileNumber(response?.dataObject?.mobileNumber);
      });
    }
  }, []);

  console.log("contactSellerMobileNumber", contactSellerMobileNumber);

  const openSellerWebSite = (e) => {
    if (Cookies.get("userUniqueId") === undefined) {
      setShowLoginPopup(true);
    } else {
      window.open(e);
    }
  };

  return (
    <div className="seller-info">
      <div className="p-4 pb-2">
        <h1 className="text-lg text-black-20 font-semibold capitalize mb-2">
          Seller Details
        </h1>
        {data?.isOtherVendor === "N" || data?.isOtherVendor === null ? (
          <div>
            <p className="text-m-grey-2 font-bold leading-4">
              {data?.listedBy}
            </p>
            <span className="text-gray-2 text-sm inline-block">
              {data?.listingLocation}
            </span>
            <button
              onClick={handleClick}
              className={`${
                !showNumber ? "bg-m-green text-white" : "text-m-green"
              } text-base border border-m-green font-semibold w-full uppercase px-4 py-2 my-4 rounded`}
            >
              {showNumber ? contactSellerMobileNumber : "Contact Seller"}
            </button>
          </div>
        ) : (
          <div>
            {data?.vendorLogo && (
              <Image
                src={data?.vendorLogo || "/"}
                width={100}
                height={50}
                objectFit="contain"
              />
            )}
            <button
              onClick={() => openSellerWebSite(data?.vendorLink)}
              className="bg-m-green text-base font-semibold text-white w-full uppercase px-4 py-2 my-4 rounded"
            >
              VIEW WEBSITE
            </button>
          </div>
        )}
      </div>
      {otherSeller && otherSeller.length > 0 && (
        <div className="px-2">
          <h1 className="text-lg text-black-20 font-semibold capitalize mb-2">
            Other Seller
          </h1>
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
  console.log("OTHER ", data);
  return (
    <>
    {data?.map((item, index) => (
    <div
      className="my-1 rounded p-2 flex justify-between flex-shrink-0 shadow-sm"
      key={index}
      style={{ border: "1px solid #EFEFEF" }}
    >
      <div className="flex flex-col">
        <span className="text-xs text-m-grey-2">Price</span>
        {item.externalSourcePrice && (
          <span className="text-2xl text-m-grey-1 h-9 font-semibold flex items-center -ml-1">
            <BiRupee /> {numberWithCommas(item.externalSourcePrice)}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center items-start">
        <span className="text-xs text-m-grey-2">Seller</span>
        <span className="my-1 w-28">
          {item.externalSourceImage && (
            <img
              src={item.externalSourceImage}
              alt={data.externalSourceName || "seller"}
              // width={120}
              // height={32}
              // objectFit="contain"
              style={{ height: 33, width: "auto" }}
            />
          )}
        </span>
      </div>
    </div>
        ))}
    </>
  );
};

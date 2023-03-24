import { getDefaultImage } from "@/utils/util";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfoCircle from "@/assets/infocircle2.svg";
import UserProfile from "@/assets/user1.svg";
import Location from "@/assets/location2.svg";
import ConditionInfoPopup from "../Popup/ConditionInfoPopup";
import LoginPopup from "../Popup/LoginPopup";
import ThisPhonePopup from "../Popup/ThisPhonePopup";
import VerifiedInfoPopup from "../Popup/VerifiedInfoPopup";
import WarrantyInfo from "../Popup/WarrantyInfo";
import Star from "@/assets/star1.svg";
import FillStar from "@/assets/star2.svg";
import BrandWarrantyInfo from "../Popup/BrandWarrantyInfo";
import SellerWarrantyInfo from "../Popup/SellerWarrantyInfo";

function ComparisonTable2(data, listingId) {
  const [productData, setProductData] = useState([]);
  const [thisPhoneListingId, setThisPhoneListingId] = useState(listingId);
  const [thisdealopen, setThisdealOpen] = useState(false);
  const [openLoginPopup, setopenLoginPopup] = useState(false);
  const [performAction2, setperformAction2] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [thisPhonePopup, setThisPhonePopup] = useState(false);
  const [performAction1, setperformAction1] = useState(false);
  const [productLink, setProductLink] = useState("");
  const [openWarrantyInfo, setOpenWarrantyInfo] = useState(false);
  const [opensellerWarrantyInfo, setOpensellerWarrantyInfo] = useState(false);
  const [opensbrandWarrantyInfo, setOpenbrandWarrantyInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  const [openConditionInfo, setOpenConditionInfo] = useState(false);

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

  let iconToShow = (idx, index) => {
    if (
      idx <
      (data?.data[index]?.deviceCondition?.toLowerCase() ==
      "Like New".toLowerCase()
        ? 5
        : data?.data[index]?.deviceCondition?.toLowerCase() ==
          "Excellent".toLowerCase()
        ? 4
        : data?.data[index]?.deviceCondition?.toLowerCase() ==
          "Good".toLowerCase()
        ? 3
        : data?.data[index]?.deviceCondition?.toLowerCase() ==
          "Fair".toLowerCase()
        ? 2
        : data?.data[index]?.deviceCondition?.toLowerCase() ==
          "Needs Repair".toLowerCase()
        ? 1
        : 5)
    ) {
        return <div className="text-yellow-400 text-mediumFontSize">★</div>;
      } else {
        return <div className="text-gray-400 text-mediumFontSize">★</div>;
      }
  };

  useEffect(() => {
    if (data?.data?.length > 0) {
      const interval = setInterval(() => {
        setProductData(data?.data);
        setThisPhoneListingId(data?.listingId);
        clearInterval(interval);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        openLoginPopup == false &&
        performAction2 == true &&
        Cookies.get("userUniqueId") !== undefined &&
        data?.productLink !== "" &&
        productLink !== ""
      ) {
        window.open(productLink, "_blank");
        clearInterval(interval);
      } else if (
        openLoginPopup == false &&
        performAction2 == true &&
        productLink == "" &&
        Cookies.get("userUniqueId") !== undefined
      ) {
        setThisdealOpen(true);
        clearInterval(interval);
      }
    }, 1000);
  }, [openLoginPopup]);

  console.log("ddaatta : ", data);

  return (
    <div className="">
      <div className="my-8 relative pt-3 lg:w-[80vw] w-full  overflow-x-scroll text-center">
        {productData.length > 0 && productData ? (
          <table className=" w-full text-mediumFontSize text-left text-gray-500 dark:text-gray-400">
            <tr className="text-white  ">
              <th className="sticky left-0 px-6 py-3 bg-white z-10 text-center">
                {" "}
              </th>
              {productData?.map((item, index) => (
                <th
                  className="px-6 py-3 text-center cursor-pointer"
                  onClick={() => {
                    if (Cookies.get("userUniqueId") == undefined) {
                      setProductLink(
                        `www.oruphones.com/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`
                      );
                      setopenLoginPopup(true);
                      setperformAction1(true);
                    } else if (
                      thisPhoneListingId == item?.listingId &&
                      item?.isOtherVendor == "N"
                    ) {
                      setThisPhonePopup(true);
                    } else if (thisPhoneListingId != item?.listingId) {
                      window.open(
                        `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                        "_blank"
                      );
                    } else if (item?.isOtherVendor == "Y" && item?.vendorLink) {
                      window.open(item?.vendorLink, "_blank");
                    } else {
                      window.open(
                        `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  <Image
                    src={
                      imageError
                        ? getDefaultImage(item?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                        : getDefaultImage(item?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                    }
                    quality={10}
                    onError={() => setImageError(true)}
                    width={60}
                    height={80}
                    alt=""
                  />
                </th>
              ))}
            </tr>
            <tr className="text-white  text-center">
              <th className=" sticky left-0 px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center ">
                Compare By
              </th>
              {productData?.map((item, index) => (
                <th
                  className="px-6 py-3 min-w-[13vw] bg-m-green-1 border-[1px] border-r-gray hover:opacity-90 text-center cursor-pointer"
                  onClick={() => {
                    if (Cookies.get("userUniqueId") == undefined) {
                      setProductLink(
                        `www.oruphones.com/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`
                      );
                      setopenLoginPopup(true);
                      setperformAction1(true);
                    } else if (
                      thisPhoneListingId == item?.listingId &&
                      item?.isOtherVendor == "N"
                    ) {
                      setThisPhonePopup(true);
                    } else if (thisPhoneListingId != item?.listingId) {
                      window.open(
                        `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                        "_blank"
                      );
                    } else if (item?.isOtherVendor == "Y" && item?.vendorLink) {
                      window.open(item?.vendorLink, "_blank");
                    } else {
                      window.open(
                        `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  {item?.listingId == thisPhoneListingId
                    ? ` ${item?.marketingName} (This Deal) `
                    : item?.marketingName}
                  <p className="text-[#2196f3ff] flex-nowrap whitespace-nowrap cursor-default text-smallFontSize hover:cursor-pointer">
                    View Deal <span> &gt; </span>
                  </p>
                </th>
              ))}
            </tr>
            <tr className=" font-Roboto-Regular">
              <th className=" bg-white border px-5 py-3 sticky left-0 drop-shadow-2xl">
                <div className="mr-32 flex items-center   ">
                  <span className="text-xl2FontSize  pr-2 opacity-70">₹</span>{" "}
                  <span> Price </span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280]  min-w-[13vw] bg-opacity-5 border border-gray-300 text-yellow2"
                      : "border px-2 py-6 min-w-[13vw] font-Roboto-Light text-center text-yellow2"
                  }`}
                >
                  {" "}
                  <span className="px-0.2 ">₹</span> {item?.listingPrice}
                </th>
              ))}
            </tr>
            <tr className="  font-Roboto-Regular text-cx sticky ">
              <th
                className=" bg-white border px-4 py-2  sticky z-10 left-0 drop-shadow-2xl uppercase items-center cursor-pointer"
                onClick={() => setOpenConditionInfo(true)}
              >
                <div className="flex">
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/star-dac.svg"
                    }
                    alt="ORU CONDITION"
                    width={20}
                    height={20}
                    objectFit="contain"
                    className=" "
                  />
                  <span className="pl-2 text-center pt-1 flex items-center">
                    {" "}
                    <span className="pr-1"> Condition </span>
                    <Image src={InfoCircle} width={12} height={12} alt="" />
                  </span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6  min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  <div className=" flex text-bx space-x-[2.5px] m-auto justify-center ">
                    {Array(5)
                      .fill()
                      .map((_, idx) => iconToShow(idx, index))}
                  </div>
                  {item?.deviceCondition}
                </th>
              ))}
            </tr>
            <tr className=" bg-opacity-5  font-Roboto-Regular text-cx">
              <th className=" border  px-4 py-2 sticky left-0 bg-white drop-shadow-2xl uppercase items-center">
                <div className="flex">
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/micro-sd.svg"
                    }
                    alt="ORU CONDITION"
                    width={20}
                    height={20}
                    objectFit="contain"
                    className=""
                  />
                  <span className="pl-2 text-center "> Storage</span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6 min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  {item?.deviceStorage}
                </th>
              ))}
            </tr>
            <tr className=" font-Roboto-Regular text-cx">
              <th
                className=" sticky border left-0 bg-white px-4 py-2 drop-shadow-2xl uppercase cursor-pointer"
                onClick={() => setOpensellerWarrantyInfo(true)}
              >
                <div className="flex ">
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/warranty.svg"
                    }
                    alt="ORU CONDITION"
                    width={20}
                    height={20}
                    objectFit="contain"
                    className=""
                  />
                  <div className="pl-2 flex items-center ">
                    {" "}
                    <span className="pr-1"> Seller's warranty </span>{" "}
                    <span>
                      <Image src={InfoCircle} width={12} height={12} alt="" />
                    </span>
                  </div>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6 min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  {item?.isOtherVendor == "Y" ? item?.warranty : "None"}
                </th>
              ))}
            </tr>
            <tr className=" font-Roboto-Regular text-cx">
              <th
                className=" sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase  items-center cursor-pointer"
                onClick={() => setOpenbrandWarrantyInfo(true)}
              >
                <div className="flex">
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/warranty.svg"
                    }
                    alt="ORU CONDITION"
                    width={20}
                    height={20}
                  />{" "}
                  <span className="pl-2  flex items-center">
                    {" "}
                    <span className="pr-1"> Brand warranty </span>
                    <Image src={InfoCircle} width={12} height={12} alt="" />
                  </span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6  min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  {item?.isOtherVendor == "N" ? item?.warranty : "None"}
                </th>
              ))}
            </tr>
            <tr className="  font-Roboto-Regular text-cx whitespace-nowrap">
              <th className=" sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase items-center whitespace-nowrap ">
                <div className="flex">
                  {" "}
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/charger2.svg"
                    }
                    alt="ORU CONDITION"
                    width={20}
                    height={20}
                    objectFit="contain"
                  />
                  <span className="pl-2 text-center">
                    {" "}
                    Accessories <br /> <span className="">
                      {" "}
                      (Compatible){" "}
                    </span>{" "}
                  </span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6 min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  {item?.isOtherVendor == "Y"
                    ? item?.charger == "Y"
                      ? item?.earphone == "Y"
                        ? item?.originalbox == "Y"
                          ? "Phone Charger, Earphone, Phone Box"
                          : "Phone Charger, Earphone"
                        : item?.originalbox == "Y"
                        ? "Phone Charger, Phone Box"
                        : "Phone Charger"
                      : item?.earphone == "Y"
                      ? item?.originalbox == "Y"
                        ? "Earphone, Phone Box"
                        : "Earphone"
                      : item?.originalbox == "Y"
                      ? "Phone Box"
                      : "None"
                    : "None"}
                </th>
              ))}
            </tr>
            <tr className="  font-Roboto-Regular text-cx">
              <th className=" sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase  ">
                <div className="flex ">
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/charger2.svg"
                    }
                    alt="ORU CONDITION"
                    width={20}
                    height={20}
                    objectFit="contain"
                    className=""
                  />
                  <span className="pl-2 ">
                    {" "}
                    Accessories <br /> <span className="">
                      {" "}
                      (Original){" "}
                    </span>{" "}
                  </span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6 min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  {item?.isOtherVendor == "N"
                    ? item?.charger == "Y"
                      ? item?.earphone == "Y"
                        ? item?.originalbox == "Y"
                          ? "Charger, Earphone, Original Box"
                          : "Charger, Earphone"
                        : item?.originalbox == "Y"
                        ? "Charger, Original Box"
                        : "Charger"
                      : item?.earphone == "Y"
                      ? item?.originalbox == "Y"
                        ? "Earphone, Original Box"
                        : "Earphone"
                      : item?.originalbox == "Y"
                      ? "Original Box"
                      : "None"
                    : "None"}
                </th>
              ))}
            </tr>
            <tr className=" font-Roboto-Regular text-cx">
              <th className=" sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl ">
                <div className="flex">
                  <Image
                    src={Location}
                    width={20}
                    height={20}
                    alt=""
                    className="opacity-60"
                  />
                  <span className="pl-2 text-regularFontSize"> Location </span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6  min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  {item?.listingLocation}
                </th>
              ))}
            </tr>
            <tr className=" font-Roboto-Regular text-cx">
              <th className=" sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase z-10 ">
                <div className="flex items-center">
                  <Image src={UserProfile} width={20} height={20} />
                  <span className="pl-2 "> Listed By</span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6 min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  {!item?.listedBy ? (
                    <Image
                      src={item?.vendorLogo}
                      width={60}
                      height={40}
                      className="object-contain  brightness-50 invert-1 filter"
                    />
                  ) : (
                    item?.listedBy
                  )}
                </th>
              ))}
            </tr>
            <tr className=" font-Roboto-Regular text-cx">
              <th
                className="  sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase z-10"
                onClick={() => setOpenVerificationInfo(true)}
              >
                <div className="flex items-center">
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/quality.svg"
                    }
                    alt=""
                    width={20}
                    height={20}
                    objectFit="contain"
                    className=""
                  />
                  <span className="pl-2 flex items-center ">
                    <span className="pr-1"> Verified </span>
                    <Image src={InfoCircle} width={12} height={12} alt="" />
                  </span>
                </div>
              </th>
              {productData?.map((item, index) => (
                <th
                  className={`${
                    item?.listingId == thisPhoneListingId
                      ? "text-center bg-[#6b7280] min-w-[13vw] bg-opacity-5 border border-gray-300"
                      : "border px-2 py-6 min-w-[13vw] font-Roboto-Light text-center "
                  }`}
                >
                  {item?.verified !== true ? (
                    <div>Not Verifed</div>
                  ) : (
                    <div>Verifed</div>
                  )}
                </th>
              ))}
            </tr>
          </table>
        ) : (
          <div></div>
        )}
      </div>

      {openConditionInfo && (
        <ConditionInfoPopup
          open={openConditionInfo}
          setOpen={setOpenConditionInfo}
        />
      )}

      {openWarrantyInfo && (
        <WarrantyInfo open={openWarrantyInfo} setOpen={setOpenWarrantyInfo} />
      )}

      {opensellerWarrantyInfo && (
        <SellerWarrantyInfo
          open={opensellerWarrantyInfo}
          setOpen={setOpensellerWarrantyInfo}
        />
      )}

      {opensbrandWarrantyInfo && (
        <BrandWarrantyInfo
          open={opensbrandWarrantyInfo}
          setOpen={setOpenbrandWarrantyInfo}
        />
      )}

      {openVerificationInfo && (
        <VerifiedInfoPopup
          open={openVerificationInfo}
          setOpen={setOpenVerificationInfo}
        />
      )}
      <ThisPhonePopup open={thisPhonePopup} setOpen={setThisPhonePopup} />
      <LoginPopup
        open={openLoginPopup}
        setOpen={setopenLoginPopup}
        fromAddListing
      />
    </div>
  );
}

export default ComparisonTable2;

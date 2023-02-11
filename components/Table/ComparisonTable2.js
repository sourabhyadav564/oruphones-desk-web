import { getUserUniqueId } from "api/axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginPopup from "../Popup/LoginPopup";
import ThisPhonePopup from "../Popup/ThisPhonePopup";

function ComparisonTable2(data, listingId) {
  const [productData, setProductData] = useState([]);
  const [thisPhoneListingId, setThisPhoneListingId] = useState(listingId);
  const [thisdealopen, setThisdealOpen] = useState(false);
  const [openLoginPopup, setopenLoginPopup] = useState(false);
  const [performAction2, setperformAction2] = useState(false);
  const [productLink, setProductLink] = useState("");
  const [thisactive,setThisActive] = useState(false);

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

  return (
    <div className="py-8">
      <p className="border-b mb-4 font-Roboto-Light text-[16px] text-m-green">
        Recommended deals comparison for you
      </p>
      <table className="text-center font-Roboto-Medium text-[16px] cursor-default">
        <tr className="text-white ">
          <th className="w-[12vw] border px-4 py-2 bg-m-green">Compare By</th>
          {productData?.map((item, index) => (
            <th
              className={`border px-4 py-4 bg-m-green w-[12vw]  `}
              onClick={() => {
                if (Cookies.get("userUniqueId") == undefined  && thisPhoneListingId == item?.listingId && item?.isOtherVendor == "N") {
                  setopenLoginPopup(true);
                  setProductLink("");
                  setperformAction2(true);
                }
                else if (Cookies.get("userUniqueId") == undefined && item?.vendorLink) {
                  setProductLink(item?.vendorLink
                    // `${
                    //   item.vendorLink
                    //     ? `www.oruphones.com/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`
                    //     : item.vendorLink
                    // }`
                  );
                  setopenLoginPopup(true);
                  setperformAction2(true);
                }
                else if (Cookies.get("userUniqueId") == undefined && !item?.vendorLink) {
                  setProductLink(`/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`
                    // `${
                    //   item.vendorLink
                    //     ? `www.oruphones.com/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`
                    //     : item.vendorLink
                    // }`
                  );
                  setopenLoginPopup(true);
                  setperformAction2(true);
                }
                 else if (
                  thisPhoneListingId == item?.listingId &&
                  item?.isOtherVendor == "N"
                ) {
                  setThisdealOpen(true);
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
                ? `This Deal (${item?.marketingName})`
                : item?.marketingName}
            </th>
          ))}
        </tr>
        <tr className=" opacity-60 bg-[#6b7280] bg-opacity-10  font-Roboto-Regular text-[14px]">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border  ">Price</td>
          {productData?.map((item, index) => (
            // <Link href={item.ven}>
            <th className={`bg-white border px-4 py-4 text-yellow-500 font-Roboto-Light ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""}`}>
              {" "}
              <span className="px-0.2">₹</span> {item?.listingPrice}
            </th>
            // </Link>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border">Condition</td>
          {productData?.map((item, index) => (
            <th className={`bg-white border px-4 py-4 font-Roboto-Light  ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""}`}>
              {item?.deviceCondition}
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px] ">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border ">Storage</td>
          {productData?.map((item, index) => (
            <th className={`bg-white border px-4 py-4 font-Roboto-Light  ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""}`}>
              {item?.deviceStorage}
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border ">
            Seller's warranty
          </td>
          {productData?.map((item, index) => (
            <th className={`bg-white border px-4 py-4 font-Roboto-Light  ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""}`}>
              {item?.isOtherVendor == "Y" ? item?.warranty : "None"}
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border ">Brand warranty</td>
          {productData?.map((item, index) => (
            <th className={`bg-white border px-4 py-4 font-Roboto-Light  ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""}`}>
              {item?.isOtherVendor == "N" ? item?.warranty : "None"}
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border ">
            Accessories (Compatible)
          </td>
          {productData?.map((item, index) => (
            <th className={`bg-white border px-4 py-4 font-Roboto-Light  ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""}`}>
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
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border">
            Accessories (Original)
          </td>
          {productData?.map((item, index) => (
            <th className={`bg-white border px-4 py-4 font-Roboto-Light  ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""}`}>
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
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border ">Location</td>
          {productData?.map((item, index) => (
            <th className={`bg-white border px-4 py-4 font-Roboto-Light  ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""} `}>
              {item?.listingLocation}
            </th>
          ))}
        </tr>
        <tr className=" bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="bg-white drop-shadow-2xl border px-4 py-2 border ">
            Listed By
          </td>
          {productData?.map((item, index) => (
            <th className={`border px-4 py-4 font-Roboto-Light bg-white  ${thisPhoneListingId === item.listingId ? "bg-black border-gray-300 bg-opacity-0":""}`}>
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
      </table>
      <ThisPhonePopup open={thisdealopen} setOpen={setThisdealOpen} />
      <LoginPopup
        open={openLoginPopup}
        setOpen={setopenLoginPopup}
        fromAddListing
      />
    </div>
  );
}

export default ComparisonTable2;

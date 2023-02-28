import { getDefaultImage } from "@/utils/util";
import { getUserUniqueId } from "api/axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import LoginPopup from "../Popup/LoginPopup";
import ThisPhonePopup from "../Popup/ThisPhonePopup";

function ComparisonTable2(data, listingId) {
  const [productData, setProductData] = useState([]);
  const [thisPhoneListingId, setThisPhoneListingId] = useState(listingId);
  const [thisdealopen, setThisdealOpen] = useState(false);
  const [openLoginPopup, setopenLoginPopup] = useState(false);
  const [performAction2, setperformAction2] = useState(false);
  const [thisactive, setThisActive] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [thisPhonePopup, setThisPhonePopup] = useState(false);
  const [performAction1, setperformAction1] = useState(false);
  const [productLink, setProductLink] = useState("");

  console.log('datamine',data);


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
   
<div className="">
     <div className="my-8 relative pt-3 lg:w-[80vw] w-full  overflow-x-scroll text-center">
    {productData.length > 0 && productData ?  
      <table className=" w-full text-mediumFontSize text-left text-gray-500 dark:text-gray-400">
        <tr className="text-white  ">
          <th className="sticky left-0 px-6 py-3 bg-white z-10 text-center">{" "}</th>
          {productData?.map((item, index) => (
            // <th className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center">
            //   {item?.listingId == thisPhoneListingId
            //     ? `(${item?.ImagePath})`
            //     : item?.ImagePath}
            // </th>
            <th className="px-6 py-3 text-center" onClick={() => {
              if(Cookies.get("userUniqueId") == undefined){
                setProductLink(`www.oruphones.com/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`);
                setopenLoginPopup(true);
                setperformAction1(true);
              }
              else if (thisPhoneListingId == item?.listingId && item?.isOtherVendor == "N") {
                setThisPhonePopup(true);
              } else 
              if (thisPhoneListingId != item?.listingId) {
                // window.open(item.productLink, "_blank");}
                window.open(
                  `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                  "_blank"
                );}
                else if(item?.isOtherVendor=="Y" && item?.vendorLink)
            {
              window.open(item?.vendorLink,"_blank");
            }
                else {
                window.open(
                  `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                  "_blank"
                );
              }
            }}>
                <Image 
                src={
                  imageError
                    ? getDefaultImage(item?.marketingName)|| "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                    : getDefaultImage(item?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                }
                onError={() => setImageError(true)}
                width={80} height={100}  alt=""/>
            </th>
          ))}
        </tr>
        <tr className="text-white  text-center">
          <th className="sticky left-0 px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center">Compare By</th>
          {productData?.map((item, index) => (
            <th className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center hover:opacity-90 text-center" onClick={() => {
              if(Cookies.get("userUniqueId") == undefined){
                setProductLink(`www.oruphones.com/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`);
                setopenLoginPopup(true);
                setperformAction1(true);
              }
              else if (thisPhoneListingId == item?.listingId && item?.isOtherVendor == "N") {
                setThisPhonePopup(true);
              } else 
              if (thisPhoneListingId != item?.listingId) {
                // window.open(item.productLink, "_blank");}
                window.open(
                  `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                  "_blank"
                );}
                else if(item?.isOtherVendor=="Y" && item?.vendorLink)
            {
              window.open(item?.vendorLink,"_blank");
            }
                else {
                window.open(
                  `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                  "_blank"
                );
              }
            }}> 
              {item?.listingId == thisPhoneListingId
                ? `This Deal (${item?.marketingName})`
                : item?.marketingName}
                <p className="text-[#2196f3] flex-nowrap whitespace-nowrap cursor-default text-smallFontSize text-center">View Deal <span> > </span></p>
            </th>
          ))}
        </tr>
        <tr className=" font-Roboto-Regular text-cx">
          <th className="bg-white border px-6 py-3 sticky left-0 drop-shadow-2xl uppercase text-center">Price</th>
          {productData?.map((item, index) => (
            // <Link href={item.ven}>
            <th
              className="border px-2 py-6 text-yellow-500 font-Roboto-Light text-center"
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
            >
              {" "}
              <span className="px-0.2 ">₹</span> {item?.listingPrice}
            </th>
            // </Link>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx sticky">
          <th className=" bg-white border px-4 py-2 sticky left-0 drop-shadow-2xl uppercase text-center">Condition</th>
          {productData?.map((item, index) => (
            <th
              className="border px-4 py-4 font-Roboto-Light text-gray text-center"
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
            >
              {item?.deviceCondition}
            </th>
          ))}
        </tr>
        <tr className=" bg-opacity-10  font-Roboto-Regular text-cx">
          <th className="border px-4 py-2  sticky left-0 bg-white drop-shadow-2xl uppercase text-center">Storage</th>
          {productData?.map((item, index) => (
            <th
              className="border px-4 py-4 font-Roboto-Light text-gray text-center"
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
            >
              {item?.deviceStorage}
            </th>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx">
          <th className="sticky border left-0 bg-white px-4 py-2 drop-shadow-2xl uppercase text-center">
            Seller's warranty
          </th>
          {productData?.map((item, index) => (
            <th
              className="border px-4 py-4 font-Roboto-Light text-gray text-center"
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
            >
              {item?.isOtherVendor == "Y" ? item?.warranty : "None"}
            </th>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx">
          <th className="sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase text-center">Brand warranty</th>
          {productData?.map((item, index) => (
            <th
              className="border px-4 py-4 font-Roboto-Light text-gray text-center"
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
            >
              {item?.isOtherVendor == "N" ? item?.warranty : "None"}
            </th>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx">
          <th className=" sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase text-center">
            Accessories (Compatible)
          </th>
          {productData?.map((item, index) => (
            <th
              className="border px-4 py-4 font-Roboto-Light text-gray text-center"   
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
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
          <th className="sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase text-center">
            Accessories (Original)
          </th>
          {productData?.map((item, index) => (
            <th
              className="border px-4 py-4 font-Roboto-Light text-gray text-center"
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
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
          <th className="sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase text-center">Location</th>
          {productData?.map((item, index) => (
            <th
              className={`border px-4 py-4 font-Roboto-Light text-gray text-center`}
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
            >
              {item?.listingLocation}
            </th>
          ))}
        </tr>
        <tr className=" font-Roboto-Regular text-cx">
          <th className="sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase z-10 text-center">
            Listed By
          </th>
          {productData?.map((item, index) => (
            <th
              className={`border px-4 py-4 font-Roboto-Light text-gray text-center`}
              // onClick={() => {
              //   if (item.vendorLink) {
              //     window.open(item.vendorLink, "_blank");
              //   } else {
              //     window.open(
              //       `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
              //       "_blank"
              //     );
              //   }
              // }}
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
      </table>
      : 
      <div>
        
        </div>
}
    </div>
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

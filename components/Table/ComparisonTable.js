import { numberWithCommas } from "@/utils/util";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaGreaterThan } from "react-icons/fa";
import LoginPopup from "../Popup/LoginPopup";
import ThisPhonePopup from "../Popup/ThisPhonePopup";
import VerifiedInfoPopup from "../Popup/VerifiedInfoPopup";
import WarrantyInfo from "../Popup/WarrantyInfo";

function ComparisonTable(data, listingId) {
  console.log("1",data);
  const [productData, setProductData] = useState([]);
  const [thisPhoneListingId, setThisPhoneListingId] = useState(listingId);
  useEffect(() => {
    if (data?.data?.length > 0) {
      const interval = setInterval(() => {
        setProductData(data?.data);
        setThisPhoneListingId(data?.listingId);
        
        clearInterval(interval);
      }, 1000);
    }
  }, []);

  const [performAction2, setperformAction2] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [productLink, setProductLink] = useState("");
  const [thisPhonePopup, setThisPhonePopup] = useState(false);
  const [openWarrantyInfo, setOpenWarrantyInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);

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
      }
      else if (openLoginPopup == false &&
        performAction2 == true &&
        Cookies.get("userUniqueId") !== undefined &&
        productLink == "") {
        setThisPhonePopup(true);
        clearInterval(interval);
      }
    }, 1000);
  }, [openLoginPopup]);

  return (
    <div className="">
      {productData && productData?.length > 0 && <div class="relative pt-3 lg:w-[80vw] w-full  overflow-x-scroll">
        <table class=" w-full text-mediumFontSize text-left text-gray-500 dark:text-gray-400">
          <thead class="uppercase text-white dark:bg-gray-700 dark:text-gray-400 font-Roboto-Semibold">
            <tr>
              <th
                scope="col"
                class=" sticky left-0 top-0 px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
              >
                Seller
              </th>

              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
              >
                Rank
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
                onClick={() => setOpenWarrantyInfo(true)}>

                <div className="flex justify-center items-center hover:cursor-pointer" >
                  <p className="">Brand Warranty</p>
                  <BsInfoCircle size={14} classname="" />
                </div>
              </th>
              
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                <div className="flex justify-center items-center hover:cursor-pointer" onClick={() => setOpenWarrantyInfo(true)}>
                  <p className="">Seller Warranty</p>
                  <BsInfoCircle size={14} />
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                Accessories (Compatible)
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                Accessories (Original)
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                <div className="flex justify-center items-center hover:cursor-pointer" onClick={() => setOpenVerificationInfo(true)}>
                  <p className="pr-1">Oru Verified</p>
                  <BsInfoCircle size={14} classname="pl-1" />
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
              >
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {productData &&
              productData?.map((item, index) => {
                return (
                  <tr class={
                    // item?.externalSourceImage == ""
                    thisPhoneListingId == item?.listingId
                      ? ` bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 font-Roboto-Regular text-center` : ` bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-scroll font-Roboto-Regular text-center `}>
                    <th
                      scope="row"
                      class={
                        // item?.externalSourceImage == "" 
                        thisPhoneListingId == item?.listingId
                          ? `bg-gray-100 sticky  left-0 top-0  px-6 py-4 font-medium text-gray-400 whitespace-nowrap dark:text-white bg-gray drop-shadow-xl border-[1px]` : `sticky left-0 top-0 px-6 py-4 font-medium text-gray-400 whitespace-nowrap dark:text-white bg-white drop-shadow-xl border-[1px]`}
                    >
                      <div className="flex justify-between hover:cursor-pointer" onClick={() => {
                        if (Cookies.get("userUniqueId") == undefined) {
                          setOpenLoginPopup(true);
                          setProductLink(item?.productLink);
                          setperformAction2(true);
                        }
                        else if (
                          thisPhoneListingId == item?.listingId && item?.Object?.isOtherVendor == "N"
                        ) {
                          setThisPhonePopup(true);
                        } else if (
                          thisPhoneListingId != item?.listingId
                        ) {
                          window.open(item?.productLink, "_blank");
                        } else {
                          window.open(item?.productLink, "_blank");
                        }
                      }}>
                        {item?.userName
                          // (item?.externalSourceImage ==
                          // "" || item?.externalSourceImage == 
                          // "https://d1tl44nezj10jx.cloudfront.net/devImg/oru/product/mobiledevices/img/oru_logo.png") 

                          ? (
                            <div className={`filter ${thisPhoneListingId != item.listingId && "brightness-50 invert-1"} object-contain`}>{item?.userName}
                             <p className="text-[#2196f3] flex-nowrap whitespace-nowrap cursor-default text-smallFontSize">View Deal <span> > </span></p>
                            </div>
                            
                          ) : (
                            <div>
                            <Image
                              src={item?.externalSourceImage}
                              height={35}
                              width={70}
                              className={
                                // item?.externalSourceImage !=""
                                thisPhoneListingId != item?.listingId
                                  ? `filter brightness-50 invert-1 object-contain` : `object-contain`}
                            />
                             <p className="text-[#2196f3] flex-nowrap whitespace-nowrap cursor-default text-smallFontSize">View Deal <span> > </span></p>
                            </div>
                          )}
                        {/* <FaGreaterThan size={18} className="pt-1.5" /> */}
                      </div>

                    </th>
                    <td class="px-2 py-4 border-[1px] font-Roboto-Semibold">
                      {index + 1}
                    </td>
                    <td class="px-2 py-4 border-[1px] text-yellow2 font-Roboto-Semibold">
                      ₹ {numberWithCommas(item?.externalSourcePrice)}
                    </td>
                    <td class="px-6 py-4  border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.warranty
                        : "None"}
                    </td>
                    <td class="px-6 py-4  border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? "None"
                        : item?.Object?.warranty}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {/* {item?.Object?.isOtherVendor == "N"
                        ? "None"
                        : "Phone Charger, Phone Box"} */}
                      {item?.Object?.isOtherVendor == "Y"
                        ? item?.Object?.charger == "Y"
                          ? item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Phone Charger, Earphone, Phone Box"
                              : "Phone Charger, Earphone"
                            : item?.Object?.originalbox == "Y"
                              ? "Phone Charger, Phone Box"
                              : "Phone Charger"
                          : item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Earphone, Phone Box"
                              : "Earphone"
                            : item?.Object?.originalbox == "Y"
                              ? "Phone Box"
                              : "Not Available"
                        : "None"}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.charger == "Y"
                          ? item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Charger, Earphone, Original Box"
                              : "Charger, Earphone"
                            : item?.Object?.originalbox == "Y" ?
                              "Charger, Original Box"
                              : "Charger"
                          : item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Earphone, Original Box"
                              : "Earphone"
                            : item?.Object?.originalbox == "Y"
                              ? "Original Box"
                              : "Not Available"
                        : "None"}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.verified
                          ? "Verified"
                          : "Not Verified"
                        : "None"}
                    </td>
                    <td class="px-2 py-4 border-[1px] font-Roboto-Semibold">
                      {item?.Object?.listingLocation}
                    </td>
                  </tr>
                );
              })}
            {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky top-0 left-0 bg-white"
              >
                
              </th>
              <td class="px-6 py-4">$1999</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Alwar</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white left-0 top-0 sticky bg-white"
              >
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">$99</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">Delhi</td>
            </tr> */}
          </tbody>
        </table>
      </div>}
      {openWarrantyInfo && (
        <WarrantyInfo open={openWarrantyInfo} setOpen={setOpenWarrantyInfo} />
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
        setOpen={setOpenLoginPopup}
        fromAddListing
      />
    </div>
  );
}

export default ComparisonTable;

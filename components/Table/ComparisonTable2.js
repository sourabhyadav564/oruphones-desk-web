import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThisPhonePopup from "../Popup/ThisPhonePopup";

function ComparisonTable2(data, listingId) {
  const [productData, setProductData] = useState([]);
  const [thisPhoneListingId, setThisPhoneListingId] = useState(listingId);
  const [open,setOpen] =useState(false);

  useEffect(() => {
    if (data?.data?.length > 0) {
      const interval = setInterval(() => {
        setProductData(data?.data);
        setThisPhoneListingId(data?.listingId);

        clearInterval(interval);
      }, 1000);
    }
  }, []);


  return (
    <div className="py-8">
      <p className="border-b mb-4 font-Roboto-Light text-[16px] text-m-green">
        Recommended deals comparison for you
      </p>
      <table className="text-center font-Roboto-Medium text-[16px] cursor-default">
        <tr className="text-white ">
          <th className="w-[12vw] border px-4 py-2 bg-m-green">Compare By</th>
          {productData?.map((item, index) => (
            <th className="border px-4 py-4 bg-m-green w-[12vw]" 
            onClick={() => {
              if(item.listingId == thisPhoneListingId){
                  setOpen(true);
              }
              else if(item.vendorLink){
                  window.open(item.vendorLink, "_blank");
              }else{
                  window.open(
                      `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                      "_blank"
                    )
              }
           } }>
              {item?.listingId == thisPhoneListingId ? `This Deal (${item?.marketingName})` : item?.marketingName}
            </th>
          ))}
        </tr>
        <tr className=" opacity-60 bg-[#6b7280] bg-opacity-10  font-Roboto-Regular text-[14px]">
          <td className="border px-4 py-2 border-r-black  ">Price</td>
          {productData?.map((item, index) => (
            // <Link href={item.ven}> 
            <th className="border px-4 py-4 text-yellow-500 font-Roboto-Light" 
             onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
              {" "}
              <span className="px-0.2">₹</span> {item?.listingPrice}
            </th>
            // </Link>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="border px-4 py-2 border-r-black">Condition</td>
          {productData?.map((item, index) => (
            <th className="border px-4 py-4 font-Roboto-Light"  onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
              {item?.deviceCondition}
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="border px-4 py-2 border-r-black ">Storage</td>
          {productData?.map((item, index) => (
            <th className="border px-4 py-4 font-Roboto-Light" 
            onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
              {item?.deviceStorage}
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="border px-4 py-2 border-r-black ">Seller's warranty</td>
          {productData?.map((item, index) => (
            <th className="border px-4 py-4 font-Roboto-Light"
            onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
              {item?.isOtherVendor == "Y" ? item?.warranty : "None" }
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="border px-4 py-2 border-r-black ">Brand warranty</td>
          {productData?.map((item, index) => (
            <th className="border px-4 py-4 font-Roboto-Light" 
            onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
              {item?.isOtherVendor == "N" ? item?.warranty : "None" }
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="border px-4 py-2 border-r-black ">Accessories (Compatible)</td>
          {productData?.map((item, index) => (
            <th className="border px-4 py-4 font-Roboto-Light"  onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
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
          <td className="border px-4 py-2 border-r-black">Accessories (Original)</td>
          {productData?.map((item, index) => (
            <th className="border px-4 py-4 font-Roboto-Light"  onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
             
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
          <td className="border px-4 py-2 border-r-black ">Location</td>
          {productData?.map((item, index) => (
            <th className={`border px-4 py-4 font-Roboto-Light `}  onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
              {item?.listingLocation}
            </th>
          ))}
        </tr>
        <tr className="bg-[#6b7280] bg-opacity-10 opacity-60 font-Roboto-Regular text-[14px]">
          <td className="border px-4 py-2 border-r-black border-b-black">Listed By</td>
          {productData?.map((item, index) => (
            <th className={`border px-4 py-4 font-Roboto-Light`} onClick={() => {
              if(item.listingId == thisPhoneListingId){
                setOpen(true);
            }
            else if(item.vendorLink){
                window.open(item.vendorLink, "_blank");
            }else{
                window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  )
            }
             } }>
              {!item?.listedBy ?   <Image src={item?.vendorLogo} width={60} height={40} className="object-contain  brightness-50 invert-1 filter"/>: item?.listedBy}
            </th>
          ))}
        </tr>
      </table>
      <ThisPhonePopup  open={open} setOpen={setOpen}/>
    </div>
  );
}

export default ComparisonTable2;

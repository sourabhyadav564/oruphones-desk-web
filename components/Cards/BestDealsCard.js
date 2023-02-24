import Image from "next/image";
import Link from "next/link";
import { FaRupeeSign } from "react-icons/fa";
import { getDefaultImage, numberWithCommas } from "../../utils/util";
import LabelAndValue from "../LabelAndValue";
import AddFav from "../AddFav";
import VerifiedIcon from "../VerifiedIcon";
import { BiChevronRight } from "react-icons/bi";
// import SoldOut from "https://d1tl44nezj10jx.cloudfront.net/assets/soldout.png"
// import Logo from "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
import { useState } from "react";
import Cookies from "js-cookie";

function BestDealsCard({ data, setProducts }) {

  var type = ["old phone", "used", "refurbished"]
  const soldout = (`bestdeals buy ${type[Math.floor((Math.random() * type.length))]} ${data?.marketingName} ${data?.deviceStorage} ${data?.deviceCondition} soldout`).toLowerCase();
  const [imageError, setImageError] = useState(false);
  return (

    <div
      className=" bg-white h-[300px] rounded-lg py-2 text-m-grey-2 mb-6 bg-gradient-to-l from-m-white to-m-green "
      style={{ boxShadow: "0px 2px 3px #0000000A" }}
    >
      {/* <div className="flex items-end justify-end absolute z-10 pt-11 lg:pl-[620px]  "> */}
      
      <div className="text-sm text-white font-light flex justify-between items-center mr-4">
        <p
          className="bg-yellow-500 md:py-1.5 md:px-4 py-1 px-2 rounded-r font-Roboto-Semibold md:text-regularFontSize"
          style={{ marginLeft: "0.5px" }}
        >
          Best Deals
        </p>
        <div>
          {!(data?.isOtherVendor === "Y" && Cookies.get("userUniqueId")==undefined) && (
            <AddFav data={data} setProducts={setProducts} />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center absolute">
        <div className=" justify-between items-center">

          <div className="pt-5 mx-6 pl-5 text-m-white">
            <span className="flex ">
              <span className="md:mx-6 mx-2">
                <div className="font-Roboto-Light md:text-smallFontSize text-xs2FontSize">
                  Condition
                </div>
                <div className="font-Roboto-Medium md:text-regularFontSize text-mediumFontSize">
                  {data?.deviceCondition}
                </div>
              </span>
              <span className="md:mx-6 mx-2">
                <div className="font-Roboto-Light md:text-smallFontSize text-xs2FontSize">
                  Storage
                </div>
                <div className="font-Roboto-Medium md:text-regularFontSize text-mediumFontSize">
                  {data?.deviceStorage}
                </div>
              </span>
              {data?.deviceRam && <span className=" md:mx-6 mx-2">
                <div className="font-Roboto-Light md:text-smallFontSize text-xs2FontSize">
                  RAM
                </div>
                <div className=" font-Roboto-Medium md:text-regularFontSize text-mediumFontSize">
                  {data?.deviceRam}
                </div>
              </span>}
            </span>
          </div>
          <div className="relative pt-5 pl-16 ">
            <p
              className="font-Roboto-Bold flex items-center -ml-1 text-yellow2 md:text-[28px] text-[24px]"
              
            >
              {data?.listingPrice && <FaRupeeSign className="md:text-[24px] text-[20px]" />}{" "}
              {numberWithCommas(data?.listingPrice || "")}
            </p>
            <div className="font-Roboto-Regular text-white md:text-regularFontSize text-mediumFontSize">
              {data?.marketingName}
            </div>
            <div className="font-Roboto-Light text-smallFontSize text-white">
              {data?.deviceStorage}
            </div>
            <div className="flex absolute pt-4 z-50">
{/*              
              {data?.isOtherVendor === "Y" ? (
                <div className="px-2"> */}
                  {/* <h2 className="font-semibold text-lg text-black-20">
                    {" "}
                    Seller Details{" "}
                  </h2>
                  <p>
                    <Image
                      src={data?.vendorLogo}
                      width={86}
                      height={46}
                      objectFit="contain"
                      alt={data?.marketingName}
                    />
                  </p> */}
                {/* </div> */}
              {/* ) : ( */}
                {/* <div></div> */}
              {/* )} */}

              <div className="">
              <div
                onClick={() => window.open(
                  `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}?isOtherVendor=${data?.isOtherVendor}`,
                  "_blank",)}
              >

                {/* <Link
                  // href={{
                    //   pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}`,
                  //   query: { isOtherVendor: data?.isOtherVendor },
                  // }}
                  // passHref
                  href={`/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}`}
                  target="_blank"
                > */}
                  {/* <div className="hover:bg-yellow-500 hover:cursor-pointer duration-500 flex items-center font-Roboto-Semibold self-end py-2 px-4 text bg-m-white text-m-green rounded-lg ">
                  View Deal{" "}
                  <BiChevronRight style={{ marginLeft: 2, fontSize: 20 }} />
                </div> */}
                  <div className="flex items-center md:text-regularFontSizete text-smallFontSize font-Roboto-Semibold bg-m-white text-m-green md:py-2 py-1 md:px-4 px-2 md:rounded-lg rounded-md hover:bg-yellow-500 hover:cursor-pointer duration-500">
                    <div> View Deal{""}</div>
                    <div>
                    <BiChevronRight style={{ marginLeft: 2, fontSize: 20 }} />
                    </div>
                  </div>
              {/* </Link> */}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="flex justify-end items-end pr-20 pt-5 relative">
      <div className=" absolute z-10 top-4 right-44">
        {data?.status === "Sold_Out" ? <Image
          src={"https://d1tl44nezj10jx.cloudfront.net/assets/soldout.png"}
          width={"50"}
          height={"30"}
          objectFit="contain"
          alt={soldout}
        /> : data?.verified ? <VerifiedIcon width={60} height={29} /> : (
          <span className="h-9 block" />
        )}
      </div>
        <div className="relative flex justify-end items-end">
          <Image
            loading="lazy"
            priority={false}
            blurDataURL={imageError ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : data?.imagePath || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
            placeholder="blur"
            className="flex rounded-[20px]"
            width={140}
            height={190}
            // src={data?.imagePath || Logo}
            src={imageError ? getDefaultImage(data?.marketingName) ||  "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : data?.imagePath || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
            onError={() => setImageError(true)}
            objectFit="contain"
            alt={(`bestdeals buy ${type[Math.floor((Math.random() * type.length))]} ${data?.marketingName} ${data?.deviceStorage} ${data?.deviceCondition}`).toLowerCase()}
          />
        </div>
        
      </div>
      {/* </div> */}


      {/* <div className="flex flex-row-reverse pt-6 pr-20 pb-20 text-white justify-between">
      <div className="pt-5 mx-6 text-m-white">
        <span className="flex flex-row">
          <span className="mx-6">
            <div className="font-Roboto-Light text-smallFontSize">
              Condition
            </div>
            <div className="font-Roboto-Medium text-regularFontSize">
              {data?.deviceCondition}
            </div>
          </span>
          <span className="mx-6">
            <div className="font-Roboto-Light text-smallFontSize">
              Storage
            </div>
            <div className="font-Roboto-Medium text-regularFontSize">
              {data?.deviceStorage}
            </div>
          </span>
          <span className=" mx-6">
            <div className="font-Roboto-Light text-smallFontSize">
              RAM
            </div>
            <div className=" font-Roboto-Medium text-regularFontSize">
              {data?.deviceRam}
            </div>
          </span>
        </span>
      </div>
        <div className="">
          {data?.imagePath && (
            <Image
              className="flex rounded-[20px]"
              width={140}
              height={190}
              src={data?.imagePath}
              objectFit="contain"
              alt={data?.marketingName}
            />
          )}
        </div>
        <div className="relative ">
          <p
            className="font-Roboto-Bold flex items-center -ml-1 text-yellow2"
            style={{ fontSize: 30 }}
          >
            {data?.listingPrice && <FaRupeeSign size={24} />}{" "}
            {numberWithCommas(data?.listingPrice || "")}
          </p>
          <h1 className="font-semibold capitalize" style={{ fontSize: 21 }}>
            {data?.marketingName}
          </h1>
          <div className="my-2">
            {data?.status === "Sold_Out" ? <Image
              src={SoldOut}
              width={"50"}
              height={"30"}
              objectFit="contain"
            /> : data?.verified ? <VerifiedIcon width={60} height={29} /> : (
              <span className="h-9 block" />
            )}
          </div>
        </div>
        <div className="flex absolute ">
          {data?.isOtherVendor === "Y" ? (
            <div className="px-2">
              <h2 className="font-semibold text-lg text-black-20">
                {" "}
                Seller Details{" "}
              </h2>
              <p>
                <Image
                  src={data?.vendorLogo}
                  width={86}
                  height={46}
                  objectFit="contain"
                  alt={data?.marketingName}
                />
              </p>
            </div>
          ) : (
            <div />
          )}
          <Link
            href={{
              pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}`,
              query: { isOtherVendor: data?.isOtherVendor },
            }}
            passHref
          >
            <a className="flex items-center font-semibold self-end py-2 px-4 text bg-m-white rounded text-m-green font-Roboto-Bold">
              View Deal{" "}
              <BiChevronRight style={{ marginLeft: 2, fontSize: 20 }} />
            </a>
          </Link>
        </div>
        {/* <div className="col-span-4 md:col-start-2 md:col-end-4 grid grid-cols-2 gap-x-1 gap-y-2 my-4 px-2 md:px-0"> */}
      {/* <LabelAndValue
            label="Condition"
            value={data?.deviceCondition || "--"}
          />
          <LabelAndValue label="Warranty" value={data?.warranty || "--"} />
          <LabelAndValue label="Storage" value={data?.deviceStorage || "--"} />
          <LabelAndValue label="RAM" value={data?.deviceRam || "--"} /> */}
      {/* {data?.isOtherVendor === "N" && (
            <LabelAndValue
              label="Verified on"
              value={data?.verifiedDate || "--"}
            />
          )}
          <LabelAndValue label="Color" value={data?.color || "--"} />
          {(
            <LabelAndValue
              label="Listed on"
              value={data?.listingDate || "--"}
            />
          )} */}
      {/* </div> */}
      {/* </div> */}
      {/* <div className="flex justify-between px-4 h-5 text-white text-mediumFontSize font-Roboto-Regular">
        <span>{data?.listingLocation}</span>
      </div> */}
    </div>
  );
}

export default BestDealsCard;

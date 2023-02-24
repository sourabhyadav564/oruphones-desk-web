import Image from "next/image";
import Link from "next/link";
import { BiRupee } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { getDefaultImage, numberWithCommas } from "../../utils/util";
import AddFav from "../AddFav";
import VerifiedIcon from "../VerifiedIcon";
// import Logo from "@/assets/home_logo.svg"
// import Logo from "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png";
// import SoldOut from "https://d1tl44nezj10jx.cloudfront.net/assets/soldout.png";
import { useState } from "react";

function ProductCard({ data, prodLink, setProducts }) {
  var type = ["old phone", "used", "refurbished"];
  const soldout = ` buy ${type[Math.floor(Math.random() * type.length)]} ${data?.marketingName
    } ${data?.deviceStorage} ${data?.deviceCondition} soldout`.toLowerCase();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      data-aos="fade-up" className="relative">
      <span className="flex justify-end pr-4 ">
        {!(data?.isOtherVendor === "Y") && (
          <AddFav
            data={data}
            setProducts={setProducts}
            height={18}
            width={18}
          />
        )}
      </span>
      <div 
        className="hover:cursor-pointer"
        onClick={() =>
          window.open(
            `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}?isOtherVendor=${data?.isOtherVendor}`,
            "_blank"
          )
        }
      >
        {/* // <Link */}
        {/* //   href={{ */}
        {/* //     pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${prodLink ? data?.listingId : ""}`,
    //     query: prodLink && { isOtherVendor: data?.isOtherVendor },
    //     target: "_blank",
    //   }}
    // > */}
        <a>
          <div
            className="w-30  -mt-8 -z-1 rounded-lg shadow-xl py-1 text-gray-900 bg-m-white"

            style={{ boxShadow: "2px 2px 10px #00000029", padding: " 0 10px" }}
          >
            <div
              className="flex items-center justify-between"
              style={{ padding: "10px 5px 5px 0" }}
            >
              <div className="h-9">
                {data?.status === "Sold_Out" ? (
                  <Image
                    src={"https://d1tl44nezj10jx.cloudfront.net/assets/soldout.png"}
                    width={"50"}
                    height={"30"}
                    objectFit="contain"
                    alt={soldout}
                  />
                ) : data?.verified ? (
                  <VerifiedIcon width={60} height={29} />
                ) : (
                  <span className="h-9 block" />
                )}
              </div>
            </div>

            <div className="flex justify-center mb-2">
              <Image
                loading="lazy"
                placeholder="blur"
                minimumCacheTTL={3600}
                priority={false}
                unoptimized={false}
                blurDataURL={
                  imageError
                    ?getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                    : data?.imagePath ||
                    data?.defaultImage?.fullImage ||
                    data?.images[0]?.fullImage ||
                    getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                }
                src={
                  imageError
                    ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                    : data?.imagePath ||
                    data?.defaultImage?.fullImage ||
                    data?.images[0]?.fullImage ||
                    getDefaultImage(data?.marketingName)
                    || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                }
                alt={`buy ${type[Math.floor(Math.random() * type.length)]} ${data?.marketingName
                  } ${data?.deviceStorage} ${data?.deviceCondition
                  }`.toLowerCase()}
                // src={imageError ? Logo : img?.fullImage}
                onError={() => setImageError(true)}
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
            <p className="font-semibold flex items-center text-m-grey-1 font-Roboto-Bold text-xlFontSize">
              {data?.listingPrice && <FaRupeeSign size={16} />}
              {numberWithCommas(data?.listingPrice || "")}
            </p>
            <div className="flex flex-col items-baseline pb-2 text-m-grey-2 flex-wrap w-full">
              <p className="text-base flex-1 sm:py-1 truncate w-full font-Roboto-Regular text-regularFontSize">
                {data?.marketingName}
              </p>

              <div className="flex w-full justify-between font-Roboto-Light text-smallFontSize">
                {data?.deviceStorage && (
                  <div className="py-1">
                    <span>{data?.deviceStorage}</span>
                  </div>
                )}
                <div className="py-1">
                  <span>Condition : </span>
                  <span>{data?.deviceCondition || "--"}</span>
                </div>
              </div>
              <div className="justify-self-end flex justify-between pt-1 w-full uppercase font-Roboto-Light text-xsFontSize">
                <span>{data?.listingLocation}</span>
                {/* <span>{data?.modifiedDate}</span> */}
                <span>{data?.listingDate}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
    // </Link>
  );
}

export default ProductCard;

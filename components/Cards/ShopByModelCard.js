import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/oru_phones_logo.png";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { fetchByMarketingName } from "../../api/axios";

function ShopByModelCard({
  data,
  location,
  makeLink,
  make,
  src,
  alt,
  fallBackSrc = Logo.src,
}) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const handleModelClick = () => {
    fetchByMarketingName(
      location,
      data,
      Cookies.get("userUniqueId") || "Guest",
      0,
      "Featured"
    );
  };

  // console.log("shop by models make : ", make)

  return (
    <div>
      <div
        className="flex relative my-6 flex-col items-center justify-center hover:cursor-pointer"
        // onClick={handleModelClick}
        onClick={() =>
          window.open(
            makeLink
              ? `/product/buy-old-refurbished-used-mobiles/${make}/`
              : `/product/buy-old-refurbished-used-mobiles/${make}/${data}`
          )
        }
      >
        <div className="">
          <Image
            loading="lazy"
            placeholder="blur"
            priority={false}
            unoptimized={false}
            blurDataURL={imageError ? fallBackSrc : src}
            src={imageError ? fallBackSrc : src}
            alt={alt}
            onError={() => setImageError(true)}
            width="40"
            height="55"
          />
        </div>

        <div className="m-auto">
          <p className="font-Roboto-Light opacity-100 text-regularFontSize text-[#2C2F45]">
            {data}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShopByModelCard;

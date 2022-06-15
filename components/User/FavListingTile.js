import Image from "next/image";
import Link from "next/link";
import { BiDotsVerticalRounded, BiRupee } from "react-icons/bi";
import { useState, useEffect, useCallback } from "react";
import { numberWithCommas } from "../../utils/util";
import IconLabelValue from "./IconLableValue";
import verifiedIcon from "../../assets/verified.svg";
import unVerifiedIcon from "../../assets/unverified.svg";
import * as Axios from "../../api/axios";
import Cookies from "js-cookie";

function FavListingTile({ data, setProducts }) {
  console.log("data from favourite", data);
  const [frontImagePath, setFrontImagePath] = useState();
  const frontImage = data?.images?.filter((img) => {
    if (img?.panel === "front") {
      return img?.fullImage;
    }
  });

  useEffect(() => {
    if (frontImage?.length > 0) {
      var data = frontImage.filter((item) => item.panel === "front");
      setFrontImagePath(data[0]?.fullImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavoties = async () => {
    setProducts((prevState) => {
      Axios.removeFavotie(
        data.listingId,
        Cookies.get("userUniqueId") || "Guest"
      ).then((response) => {
        console.log("removeFav RES", response);
      });
      return prevState.filter((i) => i.listingId !== data.listingId);
    });
  };

  return (
    <div className="grid grid-cols-8 rounded border p-3 hover:shadow relative">
      <div className="absolute top-1 left-0 z-10">
        {data?.verified ? (
          <Image
            src={verifiedIcon}
            width={90}
            height={28}
            alt="verified icon"
          />
        ) : (
          <Image
            src={unVerifiedIcon}
            width={90}
            height={28}
            alt="unverified icon"
          />
        )}
      </div>
      <div className="col-span-3 flex">
        {data?.images && frontImagePath && (
          <div className="flex justify-center w-32 h-24">
            <img
              src={frontImagePath}
              alt={data?.marketingName}
              style={{ width: "auto", height: "100%" }}
            />
          </div>
        )}

        {!data?.images && (
          <div className="flex justify-center w-32 h-24">
            <img
              src={data?.defaultImage?.fullImage || data?.imagePath}
              alt={data?.marketingName}
              style={{ width: "auto", height: "100%" }}
            />
          </div>
        )}

        {data?.images && (
          <div className="flex justify-center w-32 h-24">
            <img
              src={data?.defaultImage?.fullImage || data?.imagePath}
              alt={data?.marketingName}
              style={{ width: "auto", height: "100%" }}
            />
          </div>
        )}

        <div>
          <h1 className="uppercase text-sm font-bold text-m-grey-1 my-1.5">
            {" "}
            {data?.marketingName}​{" "}
          </h1>
          <span className="text-m-grey-2 text-sm">List Price</span>
          <p className="flex items-center font-bold text-xl text-m-grey-1">
            {data?.listingPrice && <BiRupee className="h-full" />}{" "}
            {numberWithCommas(data?.listingPrice || "")}
          </p>
        </div>
      </div>
      <div className=" col-span-4 grid grid-cols-2 gap-x-2">
        <IconLabelValue label="Condition" value={data?.deviceCondition} />
        <IconLabelValue
          label="Warranty"
          value={data?.warranty === null ? "--" : data?.warranty}
        />
        <IconLabelValue label="Storage" value={data?.deviceStorage} />
        <IconLabelValue
          label="Verified on"
          value={data?.verifiedDate === null ? "--" : data?.verifiedDate}
        />
        <IconLabelValue label="Color" value={data?.color || ""} />
        <IconLabelValue
          label="Listed on"
          value={data?.listingDate === null ? "--" : data?.listingDate}
        />
      </div>
      <div className="flex flex-col justify-between items-end pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          onClick={(e) => {
            e.preventDefault();
            handleFavoties(data);
          }}
        >
          <path
            id="hearts"
            d="M8.024,16a1.135,1.135,0,0,0-.274-.672,4.437,4.437,0,0,0-.734-.734q-.461-.375-1.062-.812T4.688,12.8q-.664-.539-1.328-1.164a11.035,11.035,0,0,1-1.266-1.43,11.907,11.907,0,0,1-1.062-1.7A9.065,9.065,0,0,1,.3,6.445,10.626,10.626,0,0,1,.024,4,3.854,3.854,0,0,1,1.2,1.172,3.854,3.854,0,0,1,4.024,0,3.854,3.854,0,0,1,6.852,1.172,3.854,3.854,0,0,1,8.024,4,3.854,3.854,0,0,1,9.2,1.172,3.854,3.854,0,0,1,12.024,0a3.854,3.854,0,0,1,2.828,1.172A3.854,3.854,0,0,1,16.024,4a10.659,10.659,0,0,1-.274,2.445,9.037,9.037,0,0,1-.734,2.062,11.96,11.96,0,0,1-1.062,1.7,10.991,10.991,0,0,1-1.266,1.43q-.664.625-1.328,1.164t-1.266.977q-.6.437-1.062.812a4.46,4.46,0,0,0-.734.734A1.131,1.131,0,0,0,8.023,16Z"
            transform="translate(-0.024)"
            fill={data.favourite ? "#FF0000" : "#C7C7C7"}
          />
        </svg>
      </div>
    </div>
  );
}

export default FavListingTile;

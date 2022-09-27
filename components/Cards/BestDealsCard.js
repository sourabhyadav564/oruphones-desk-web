import Image from "next/image";
import Link from "next/link";
import { FaRupeeSign } from "react-icons/fa";
import { numberWithCommas } from "../../utils/util";
import LabelAndValue from "../LabelAndValue";
import AddFav from "../AddFav";
import VerifiedIcon from "../VerifiedIcon";
import { BiChevronRight } from "react-icons/bi";
import SoldOut from "@/assets/soldout.png"

function BestDealsCard({ data, setProducts }) {
  return (
    <div
      className="bg-white rounded-lg py-2 text-m-grey-2 mb-6"
      style={{ boxShadow: "0px 2px 3px #0000000A" }}
    >
      <div className="text-sm text-white font-light flex justify-between items-center mr-4">
        <p
          className="bg-yellow-500 py-1.5 px-4 rounded-r font-light"
          style={{ marginLeft: "0.5px" }}
        >
          Best Deals
        </p>
        <div>
          {!(data?.isOtherVendor === "Y") && (
            <AddFav data={data} setProducts={setProducts} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 px-2">
        <div className="col-span-2 md:col-auto md:row-span-2 flex items-center justify-center">
          {data?.imagePath && (
            <Image
              width={180}
              height={180}
              src={data?.imagePath}
              objectFit="contain"
              alt={data?.marketingName}
            />
          )}
        </div>
        <div className="col-span-2 md:-mt-3">
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
          <span className="text-sm block" style={{ color: "#707070" }}>
            List price
          </span>
          <p
            className="font-semibold flex items-center -ml-1"
            style={{ fontSize: 30, color: "#4E4E4E" }}
          >
            {/* {data?.listingPrice && <FaRupeeSign size={24} />}{" "} */}
            {numberWithCommas(data?.listingPrice || "")}
          </p>
        </div>
        <div className="row-start-3 col-span-4 md:row-span-3 md:col-auto flex md:flex-col justify-between mb-3">
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
            <a className="flex items-center font-semibold self-end mx-2 py-2 px-4 text bg-m-green rounded hover:bg-m-green text-white">
              View Deal{" "}
              <BiChevronRight style={{ marginLeft: 2, fontSize: 20 }} />
            </a>
          </Link>
        </div>
        <div className="col-span-4 md:col-start-2 md:col-end-4 grid grid-cols-2 gap-x-1 gap-y-2 my-4 px-2 md:px-0">
          <LabelAndValue
            label="Condition"
            value={data?.deviceCondition || "--"}
          />
          <LabelAndValue label="Warranty" value={data?.warranty || "--"} />
          <LabelAndValue label="Storage" value={data?.deviceStorage || "--"} />
          <LabelAndValue label="RAM" value={data?.deviceRam || "--"} />
          {data?.isOtherVendor === "N" && (
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
          )}
        </div>
      </div>
      <div className="flex justify-between text-sm px-4 h-5">
        <span>{data?.listingLocation}</span>
      </div>
    </div>
  );
}

export default BestDealsCard;

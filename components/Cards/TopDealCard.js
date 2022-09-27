import Image from "next/image";
import Link from "next/link";
import { BiRupee } from "react-icons/bi";
import { numberWithCommas } from "../../utils/util";
import VerifiedIcon from "../VerifiedIcon";
import AddFav from "../AddFav";
import Logo from "@/assets/oru_phones_logo.png"
import SoldOut from "@/assets/soldout.png"

function TopDealCard({ data, setProducts, prodLink }) {
  if (data?.name?.toLowerCase().includes("all")) {
    return (
      <Link href={`/product/buy-old-refurbished-used-mobiles/bestdealnearyou`}>
        <a className="w-full h-full rounded-md shadow hover:shadow-md p-4 bg-m-white flex justify-center items-center">
          <p className="block text-m-green">{"Show All"}</p>
        </a>
      </Link>
    );
  }
  return (
    <Link
      href={{
        pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${prodLink ? data?.listingId : ""
          }`,
        query: prodLink && { isOtherVendor: data?.isOtherVendor },
      }}
    >
      <a className="flex flex-col pt-6 relative w-full h-full rounded-md shadow hover:shadow-md py-1 px-3 text-gray-900 bg-m-white">
        {data?.isOtherVendor === "N" && (
          <div className="flex z-20 items-center absolute top-0 right-0 left-0 pt-2 px-2 justify-between">
            <span className="h-6">
              {data?.status === "Sold_Out" ? <Image
                src={SoldOut}
                width={"50"}
                height={"30"}
                objectFit="contain"
              /> : data?.verified ? <VerifiedIcon width={60} height={29} /> : (
                <span className="h-9 block" />
              )}
            </span>
            <AddFav data={data} setProducts={setProducts} />
          </div>
        )}

        <div className="flex justify-center">
          {data?.imagePath ? (
            <Image
              src={data?.imagePath}
              alt={data?.name}
              width={"150"}
              height={"150"}
              objectFit="contain"
            />
          ) : (
            <Image
              src={Logo}
              alt={data?.name}
              width={"150"}
              height={"150"}
              objectFit="contain"
            />
          )}
        </div>
        <div className="pb-2 w-full">
          <h1 className="text-lg sm:text-base flex-1 sm:py-1 truncate w-full font-semibold text-m-grey-2">
            {data?.marketingName}
          </h1>
          <div className="flex justify-between text-xs">
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
          <p className="font-bold flex items-center -ml-1 text-base text-m-grey-1">
            {/* {data?.listingPrice && <BiRupee />}{" "} */}
            {numberWithCommas(data?.listingPrice || "")}
          </p>
          <div className="flex justify-between pt-1 text-xs w-full text-m-grey-2">
            <span>{data?.listingLocation}</span>
            <span>{data?.listingDate}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default TopDealCard;

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
        <a className="w-full h-full rounded-md  shadow hover:shadow-md p-4 bg-m-white flex justify-center items-center">
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
      <a className="flex flex-col pt-6 relative w-full h-full drop-shadow-sm rounded-md bg-no-repeat shadow-m-grey-6 py-1 px-3 bg-m-white shadow-lg" data-aos="flip-right" data-aos-duration="2000">
        {data?.isOtherVendor === "N" && (
          <div className="flex z-20 items-center absolute top-0 right-0 left-0 pt-2 px-2 justify-between">
            <span className="h-6">
              {data?.verified ? <VerifiedIcon width={60} height={29} /> : data?.status === "Sold_Out" && <Image
                src={SoldOut}
                width={"50"}
                height={"50"}
                objectFit="contain"
              />}
            </span>
            <AddFav data={data} setProducts={setProducts} />
          </div>
        )}

        <div className="flex justify-center pb-[17.77px] h-[163.14px] bg-transparent">
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
          {/* <h1 className="text-lg sm:text-base flex-1 sm:py-1 truncate w-full font-semibold text-m-grey-2">
            {data?.marketingName}
          </h1> */}
          <p className="font-bold flex items-center w-[74px] text-[18px] -ml-1 text-lg opacity-100 text-m-blue-1 font-Roboto-Bold">
            {data?.listingPrice && <BiRupee size={20} />}{" "}
            {numberWithCommas(data?.listingPrice || "")}
          </p>
          <h1 className=" text-regularFontSize flex-1 w-full opacity-100 text-black-1 font-Roboto-Light truncate">
            {data?.marketingName}
          </h1>

          <div className="flex justify-between pt-1 pb-4 text-smallFontSize opacity-100 h-2 w-full text-m-grey-2 font-Roboto-Light">
            {data?.deviceStorage && (
              <div>
                <span>{data?.deviceStorage}</span>
              </div>
            )}
            <div>
              <span>Condition : </span>
              <span>{data?.deviceCondition || "--"}</span>
            </div>
          </div>
          <div className="flex justify-between pt-1 pb-2 text-xsFontSize opacity-100 h-2 w-full text-m-grey-2 font-Roboto-Light">
            <span>{data?.listingLocation}</span>
            <span>{data?.listingDate}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default TopDealCard;

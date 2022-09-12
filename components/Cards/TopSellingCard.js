import Image from "next/image";
import Link from "next/link";
import { BiRupee } from "react-icons/bi";
import { numberWithCommas } from "../../utils/util";

function TopSellingCard({ data }) {
  if (data?.name?.toLowerCase().includes("all")) {
    return (
      <Link href={`/product/models`} passHref>
        <a>
          <div className="w-full h-full rounded-md shadow hover:shadow-md p-4 bg-m-white flex justify-center items-center">
            <p className="block text-m-green">{"Show All"}</p>
          </div>
        </a>
      </Link>
    );
  }

  return (
    <Link href={`/product/buy-old-refurbished-used-mobiles/${data.make}/${data.marketingName}`}>
      <a>
        <div className="grid grid-cols-1 rounded-md shadow hover:shadow-md p-4 pb-2 bg-m-white">
          <div className="grid grid-cols-1">
            <div className="flex justify-center">
              <Image src={data?.imagePath || "/"} alt={data?.name} width={150} height={150} objectFit="contain" />
            </div>
            <div className="flex-wrap w-full">
              <h1 className="text-lg sm:text-base flex-1 sm:py-1 truncate w-full capitalize font-semibold text-m-grey-2">{data?.marketingName}</h1>
              <div className="justify-self-end">
                <p className="text-sm text-m-grey-1">Starting from</p>
                <p className="font-bold flex items-center -ml-1 text-lg text-m-grey-1">
                  {(data?.startingFrom && <BiRupee />) || <>&nbsp;</>} {numberWithCommas(data?.startingFrom || "")}
                  {(data?.listingPrice && <BiRupee />) || <>&nbsp;</>} {numberWithCommas(data?.listingPrice || "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default TopSellingCard;

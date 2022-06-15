import Link from "next/link";
import Image from "next/image";
import { BiRupee } from "react-icons/bi";

function ShopByPriceCard({ src, min, max }) {
  if (max && max.toString().toLowerCase().includes("above")) {
    return (
      <Link href={`/product/listings/pricerange/${min}/${max}`}>
        <a className="w-full h-full py-2 rounded-md shadow hover:shadow-md flex flex-col items-center bg-m-white">
          <div>
            <Image src={src} alt={`${min}-${max}`} width={150} height={150} />
          </div>
          <div className="text-m-grey-1 text-lg sm:text-base py-1 font-bold flex items-center justify-center w-full">
            <p className="flex items-center">
              <BiRupee /> {min}
            </p>
            <p className="w-10 inline-flex justify-center items-center"> and </p>
            <p className="flex items-center">above</p>
          </div>
        </a>
      </Link>
    );
  }
  return (
    <Link href={`/product/listings/pricerange/${min}/${max}`}>
      <a className="w-full h-full py-2 rounded-md shadow hover:shadow-md flex flex-col items-center bg-m-white">
        <div>
          <Image src={src} alt={`${min}-${max}`} width={150} height={150} />
        </div>
        <div className="text-m-grey-1 text-lg sm:text-base py-1 font-bold flex items-center justify-center w-full">
          <p className="flex items-center">
            <BiRupee /> {min}
          </p>
          <p className="w-4 inline-flex justify-center items-center"> {"-"} </p>
          <p className="flex items-center">
            <BiRupee /> {max}
          </p>
        </div>
      </a>
    </Link>
  );
}

export default ShopByPriceCard;

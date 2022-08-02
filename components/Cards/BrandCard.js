import Link from "next/link";
import Image from "next/image";

function BrandCard({ data }) {
  if (data?.make.toLowerCase().includes("show")) {
    return (
      <Link href={`/brands`}>
        <a className="w-full h-full rounded-md shadow hover:shadow-md p-4 bg-m-white flex justify-center items-center">
          <p className="block text-m-green">Show All</p>
        </a>
      </Link>
    );
  }
  return (
    data.imagePath && (
      <Link href={{ pathname: `/product/listings/${data?.make?.toLowerCase()}`}}>
        <a className="rounded-md shadow hover:shadow-md px-10 py-4 sm:px-4 bg-m-white flex justify-center relative">
          <Image src={data?.imagePath} alt={data?.make} height={80} width={80} objectFit="contain" />
        </a>
      </Link>
    )
  );
}

export default BrandCard;

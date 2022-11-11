import Link from "next/link";
import Image from "next/image";

function BrandCard({ data }) {
  if (data?.make.toLowerCase().includes("show")) {
    return (
      <Link href={`/brands`}>
        <a className="w-36 h-[91px] rounded opacity-100 bg-no-repeat p-4 bg-m-white flex justify-center  items-center shadow-md">
          <p className="block text-m-grey-2 font-Roboto-Regular text-regularFontSize w-[89px] pl-2.5 h-5">View All &gt;</p>
        </a>
      </Link>
    );
  }
  return (
    data.imagePath && (
      <Link href={{ pathname: `/product/buy-old-refurbished-used-mobiles/${data?.make?.toLowerCase()}` }}>
        <a className="bg-no-repeat rounded w-36 h-[91px] px-[349px] sm:px-4 bg-m-white flex justify-center opacity-100 relative shadow-md">
          <Image src={data?.imagePath} alt={data?.make} height={80} width={80} objectFit="contain" />
        </a>
      </Link>
    )
  );
}

export default BrandCard;

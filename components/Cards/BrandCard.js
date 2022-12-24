import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { makeState } from "atoms/globalState";

function BrandCard({ data }) {
  const [make, setMake] = useRecoilState(makeState);

  if (data?.make.toLowerCase().includes("show")) {
    return (
      <Link href={`/brands`}>
        <a className="w-36 h-[91px] rounded opacity-100 bg-no-repeat p-4 bg-m-white flex justify-center  items-center shadow-md">
          <p className="block text-m-grey-2 font-Roboto-Regular text-regularFontSize w-[89px] pl-2.5 h-5">
            View All &gt;
          </p>
        </a>
      </Link>
    );
  }
  return (
    data.imagePath && (
      <Link
        href={{
          pathname: `/product/buy-old-refurbished-used-mobiles/${data?.make?.toLowerCase()}`,
        }}
      >
        <a className="bg-no-repeat rounded w-36 h-[91px] px-[349px] sm:px-4 bg-m-white flex justify-center opacity-100 relative shadow-md">
          <Image
            src={data?.imagePath}
            loading="lazy"
            placeholder="blur"
            priority={false}
            unoptimized={false}
            blurDataURL={data?.imagePath}
            minimumCacheTTL={60}
            alt={`buy online refurbished ${data?.make}`}
            onClick={() => setMake(data?.make)}
            height={80}
            width={80}
            objectFit="contain"
          />
        </a>
      </Link>
    )
  );
}

export default BrandCard;

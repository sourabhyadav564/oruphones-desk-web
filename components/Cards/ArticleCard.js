import Link from "next/link";
import Image from "next/image";

function ArticleCard({ title, src, href, viewAll }) {
  if (viewAll) {
    return (
      <Link href={`#blogs${href}`}>
        <a className="w-full h-full rounded-md shadow hover:shadow-md flex flex-col justify-center items-center text-m-green bg-m-white">
          View All
        </a>
      </Link>
    );
  }
  return (
    <Link href={`#blogs${href}`}>
      <a className="w-full h-full rounded-md shadow hover:shadow-md flex flex-col items-center bg-m-white">
        <div className="w-full h-full">
          <Image src={src} alt={title} width={"100%"} height={"100%"} objectFit="contain" layout="responsive" className="rounded-t-md" />
        </div>
        <div className="py-2 px-3 w-full text-m-grey-1">
          <p className="line-clamp-2 text-lg sm:text-base">{title}</p>
        </div>
      </a>
    </Link>
  );
}

export default ArticleCard;

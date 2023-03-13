import Link from "next/link";

function ArticleCard({ title, src, href, viewAll }) {
  if (viewAll) {
    const common = "https://www.oruphones.com/blog/";
    return (
      <Link href={`${common}`}>
        <a
          className="w-full h-full rounded-md shadow hover:shadow-md flex flex-col justify-center items-center text-m-green bg-m-white"
          target="_blank"
        >
          View All
        </a>
      </Link>
    );
  }
  return (
    <Link href={`${href}`}>
      <a
        className="w-full h-full rounded-md shadow hover:shadow-md flex flex-col items-center bg-m-white"
        target="_blank"
      >
        <div className="w-full h-full">
          <img src={src} alt={title} className="h-200 w-200" />
        </div>
        <div className="py-2 px-3 w-full text-m-grey-1">
          <p className="line-clamp-2 text-lg sm:text-base font-semibold">
            {title}
          </p>
        </div>
      </a>
    </Link>
  );
}

export default ArticleCard;

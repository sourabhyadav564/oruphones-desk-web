import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryCards = ({ data, priceRange }) => {
  const priceRangeData = [
    {
      id: 1,
      text: "₹10,000",
      min: "0",
      max: "10000",
      alpha: "under_ten",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 2,
      text: "₹30,000",
      min: "10000",
      max: "30000",
      alpha: "under_thirty",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 3,
      text: "₹50,000",
      min: "30000",
      max: "50000",
      alpha: "under_fifty",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 4,
      text: "₹50,000",
      min: "50000",
      max: "200000",
      alpha: "above_fifty",
      bracket: "Above",
      type: "Price",
    },
  ];

  if (priceRange) {
    return (
      <div>
        <div className="rounded-md shadow hover:shadow-md px-10 py-4 sm:px-4 bg-m-white grid grid-cols-2 gap-5">
          {priceRangeData.map((item) => (
            <Link href={`/shopby/pricerange/${item.min}/${item.max}`}>
              <p className="bg-gray-200 flex flex-col items-center justify center p-2 rounded-md hover:cursor-pointer hover:bg-gray-300 active:bg-gray-400 duration-300">
                {item.bracket}{" "}
                <span className="font-semibold">{item.text}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  return (
    data.imagePath && (
      <Link
        href={{
          pathname:
            data?.urlPath === "bestselling"
              ? "/product/models"
              : `/shopby/category/${data?.urlPath}`,
        }}
      >
        <a className="rounded-md shadow hover:shadow-md px-10 py-4 sm:px-4 bg-m-white flex flex-col items-center justify-center relative">
          <Image
            src={data?.imagePath}
            alt={data?.make}
            height={135}
            width={135}
            objectFit="contain"
          />
          <span>{data.text}</span>
        </a>
      </Link>
    )
  );
};

export default CategoryCards;

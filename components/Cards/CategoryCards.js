import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryCards = ({ data, priceRange }) => {
  const priceRangeData = [
    {
      id: 1,
      text: "₹10K",
      min: "0",
      max: "10000",
      alpha: "under_ten",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 2,
      text: "₹30K",
      min: "10000",
      max: "30000",
      alpha: "under_thirty",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 3,
      text: "₹50K",
      min: "30000",
      max: "50000",
      alpha: "under_fifty",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 4,
      text: "₹50K+",
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
        <div className="shadow drop-shadow rounded-lg px-1.5 py-1.5 sm:px-1.5 bg-m-white grid grid-cols-2 gap-1">
          {priceRangeData.map((item, index) => (
            <Link href={`/shopby/pricerange/${item.min}/${item.max}`} key={index}>
              <p className="flex flex-col items-center justify-center rounded-md bg-m-grey-8 opacity-100 hover:cursor-pointer font-light text-m-green-1 text-xs">
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
            data?.urlPath === "Bestselling"
              ? "/product/models"
              : `/shopby/category/${data?.urlPath?.toLowerCase()}`,
        }}
      >
        <a className="shadow drop-shadow rounded-lg w-32 h-28 px-10 py-4 sm:px-4 bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative">
          <Image
            src={data?.imagePath}
            alt={data?.make}
            height={70}
            width={70}
            objectFit="contain"
          />
          <span
            className="text-xs2FontSize">{data.text}</span>
        </a>
      </Link>
    )
  );
};

export default CategoryCards;

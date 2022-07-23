import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeletonCard = ({ popular }) => {
  if (popular) {
    return (
      <div className="rounded-md shadow hover:shadow-md p-4 pb-2 bg-m-white w-[280px] h-[254px] space-y-3 mx-2">
        <div className="text-center">
          <Skeleton circle width={120} height={120} />
        </div>
        <div>
          <Skeleton width={150} height={20} />
          <Skeleton width={100} height={20} />
          <Skeleton width={50} height={20} />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-md shadow hover:shadow-md p-4 pb-2 bg-m-white w-[280px] h-[254px] space-y-3 mx-2">
      <div className="text-center">
        <Skeleton circle width={120} height={120} />
      </div>
      <div>
        <Skeleton width={150} height={20} />
        <Skeleton width={100} height={20} />
        <Skeleton width={50} height={20} />
      </div>
    </div>
  );
};

export default ProductSkeletonCard;

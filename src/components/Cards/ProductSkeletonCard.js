import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeletonCard = ({
	popular = false,
	isTopSelling = false,
	isBestDeal = false,
}) => {
	if (isBestDeal) {
		return (
			<div className="rounded-md shadow hover:shadow-md p-4 pb-6 bg-gradient-to-l from-m-white to-m-green  w-[900px] h-[260px] space-y-3 mx-2 mb-2">
				<div className="text-right flex flex-row items-center justify-between px-8">
					<div className="flex flex-col items-start pt-5">
						<Skeleton width={150} height={20} />
						<Skeleton width={100} height={20} />
						<Skeleton width={50} height={20} />
						<Skeleton className="mt-12 rounded-2xl" width={100} height={40} />
					</div>
					<Skeleton width={120} height={200} />
				</div>
			</div>
		);
	}
	if (isTopSelling) {
		return (
			<div className="rounded-md shadow hover:shadow-md p-4 pb-6 bg-m-white w-[260px] h-[300px] space-y-3 mx-2">
				<div className="text-center">
					<Skeleton circle width={120} height={120} />
					<div className="flex flex-col items-start pt-5">
						<Skeleton width={150} height={20} />
						<Skeleton width={100} height={20} />
						<Skeleton width={50} height={20} />
					</div>
				</div>
			</div>
		);
	}
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

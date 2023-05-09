import React from 'react';
import BrandCard from '../Cards/BrandCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TopBrand({ brandsList }) {
	brandsList = brandsList?.sort(
		(list1, list2) =>
			parseInt(list1.displayOrder) - parseInt(list2.displayOrder)
	);
	let _bList = brandsList?.slice(0, 13);

	return (
		<>
			<div className="bg-m-grey pt-[54px] pb-[57px]">
				<section
					className="container  pt-0 gap-6 flex justify-center pb-4 font-Roboto-Semibold text-m-green-1 font-bold text-2xl  "
					data-aos="flip-up"
				>
					<p>Top Brands</p>
				</section>
				<section className="container m-auto py-4  bg-m-grey top_brand  gap-4 grid lg:grid-cols-7 md:grid-cols-5 grid-cols-3 md:pl-4 pl-16 ">
					{_bList &&
						_bList.length > 0 &&
						_bList.map((item) => <BrandCard key={item.make} data={item} />)}
					{_bList && _bList.length > 0 && (
						<BrandCard data={{ make: 'Show all' }} />
					)}
				</section>
				{_bList && _bList.length == 0 && (
					<div className="container m-auto py-4  bg-m-grey top_brand  gap-4 grid lg:grid-cols-7 md:grid-cols-5 grid-cols-3 md:pl-4 pl-16">
						{Array(14)
							.fill()
							.map((_, index) => (
								<div
									className="rounded-md shadow hover:shadow-md p-4 pb-6 bg-m-white w-[140px] h-[100px] space-y-3 mx-2"
									key={index}
								>
									<div className="text-center">
										<Skeleton circle width={60} height={60} />
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</>
	);
}

export default TopBrand;

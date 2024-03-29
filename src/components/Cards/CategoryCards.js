import React, { useState } from 'react';
import WarrantyPopup from '@/components/Popup/WarrantyPopup';
import Image from 'next/image';
import Link from 'next/link';

const CategoryCards = ({ data, priceRange }) => {
	const [openWarrantyPopup, setOpenWarrantyPopup] = useState(false);
	const priceRangeData = [
		{
			id: 1,
			text: '₹10K',
			min: '0',
			max: '10000',
			alpha: 'under_ten',
			bracket: 'Under',
			type: 'Price',
		},
		{
			id: 2,
			text: '₹30K',
			min: '10000',
			max: '30000',
			alpha: 'under_thirty',
			bracket: 'Under',
			type: 'Price',
		},
		{
			id: 3,
			text: '₹50K',
			min: '30000',
			max: '50000',
			alpha: 'under_fifty',
			bracket: 'Under',
			type: 'Price',
		},
		{
			id: 4,
			text: '₹50K+',
			min: '50000',
			max: '200000',
			alpha: 'above_fifty',
			bracket: 'Above',
			type: 'Price',
		},
	];

	if (priceRange) {
		return (
			<div>
				<div className="shadow  drop-shadow hover:bg-gray-200  rounded-lg w-40 h-28 px-1.5 py-1.5 sm:px-1.5 bg-m-white grid grid-cols-2 gap-1">
					{priceRangeData.map((item, index) => (
						<Link
							href={`/product/buy-old-refurbished-used-mobiles/bestdealnearyou?minPrice=${item.min}&maxPrice=${item.max}`}
							key={index}
							passHref
						>
							<p className="flex flex-col items-center hover:scale-105 justify-center rounded-md bg-m-grey-8 opacity-100 hover:cursor-pointer font-light text-m-green-1 text-xs">
								{item.bracket}{' '}
								<span className="font-semibold">{item.text}</span>
							</p>
						</Link>
					))}
				</div>
			</div>
		);
	} else if (data?.urlPath === 'Warranty') {
		return (
			<>
				<div onClick={() => setOpenWarrantyPopup(true)}>
					<div className="shadow drop-shadow hover:bg-gray-100  hover:cursor-pointer rounded-lg w-32  h-28 px-10 py-2 sm:px-4 bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative">
						<Image
							src={data?.imagePath}
							alt={data?.make}
							height={70}
							width={70}
							objectFit="contain"
						/>
						<span className="text-smallFontSize font-Roboto-Regular text-center pt-2">
							{data.text}
						</span>
					</div>
				</div>
				<WarrantyPopup
					open={openWarrantyPopup}
					data={data}
					setOpen={setOpenWarrantyPopup}
				/>
			</>
		);
	}
	return (
		data.imagePath && (
			<Link
				href={{
					pathname:
						data?.urlPath === 'Bestselling'
							? '/product/models'
							: data?.urlPath != 'Warranty' &&
							  `/product/buy-old-refurbished-used-mobiles/bestdealnearyou`,
					query: data?.urlPath !== 'Warranty' &&
						data?.urlPath !== 'Bestselling' && {
							[data?.query]: data?.queryValue,
						},
				}}
			>
				<a className="shadow hover:bg-gray-100  drop-shadow rounded-lg w-32 h-28 px-10 py-2 sm:px-4 bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative">
					<Image
						src={data?.imagePath}
						alt={data?.make}
						height={70}
						width={70}
						objectFit="contain"
					/>
					<span className="text-smallFontSize font-Roboto-Regular text-center pt-2">
						{data.text}
					</span>
				</a>
			</Link>
		)
	);
};

export default CategoryCards;

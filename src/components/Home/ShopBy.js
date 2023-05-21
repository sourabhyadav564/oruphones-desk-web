import React from 'react';
import CategoryCards from '../Cards/CategoryCards';
import Title from '../Title';

const data = [
	{
		id: 1,
		text: 'BestSelling Mobiles',
		imagePath:
			'https://d1tl44nezj10jx.cloudfront.net/web/assets/best-selling-mobiles.svg',
		urlPath: 'Bestselling',
	},
	{
		id: 3,
		text: 'Verified Devices Only',
		imagePath:
			'https://d1tl44nezj10jx.cloudfront.net/web/assets/verified-mobils.svg',
		urlPath: 'verified=true',
		query: 'verified',
		queryValue: 'true',
	},
	{
		id: 2,
		text: 'Like New Condition',
		imagePath: 'https://d1tl44nezj10jx.cloudfront.net/web/assets/like-new.svg',
		urlPath: 'condition=Like%20New',
		query: 'condition',
		queryValue: 'Like New',
	},
	{
		id: 4,
		text: 'Phone with Warranty',
		imagePath: 'https://d1tl44nezj10jx.cloudfront.net/web/assets/warranty.svg',
		urlPath: 'Warranty',
	},
];

function ShowBy() {
	return (
		<>
			<div className="bg-m-grey">
				<section className="container top_brand pt-[57px] pb-[44px] font-bold ">
					<Title text="Shop By" />
					<div className="md:flex md:flex-wrap grid grid-cols-3   pt-4 gap-4  justify-between px-4">
						{data &&
							data.map((item, index) => (
								<CategoryCards key={index} data={item} />
							))}
						<CategoryCards priceRange />
					</div>
				</section>
			</div>
		</>
	);
}

export default ShowBy;

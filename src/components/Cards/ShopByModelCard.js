import { useState } from 'react';
import Image from 'next/image';

function ShopByModelCard({
	data,
	makeLink,
	make,
	src,
	alt,
	fallBackSrc = 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
		.src,
}) {
	const [imageError, setImageError] = useState(false);

	return (
		<div>
			<div
				className="flex relative my-6 flex-col items-center justify-center hover:cursor-pointer mx-[3rem]"
				onClick={() =>
					window.open(
						makeLink
							? `/product/buy-old-refurbished-used-mobiles/${make}/`
							: `/product/buy-old-refurbished-used-mobiles/${make}/${data}`
					)
				}
			>
				<div className="">
					<Image
						loading="lazy"
						placeholder="blur"
						priority={false}
						quality={10}
						unoptimized={false}
						blurDataURL={
							imageError
								? fallBackSrc
								: src ||
								  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
						}
						src={
							imageError
								? fallBackSrc
								: src ||
								  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
						}
						alt={alt}
						onError={() => setImageError(true)}
						width="40"
						height="55"
					/>
				</div>

				<div className="m-auto">
					<p className="font-Roboto-Light opacity-100 md:text-regularFontSize text-smallFontSize text-[#2C2F45]">
						{data}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ShopByModelCard;

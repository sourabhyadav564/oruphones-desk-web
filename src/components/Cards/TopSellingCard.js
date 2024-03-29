import { useState } from 'react';
import Rupee1 from '@/assets/rupee1.svg';
import { getDefaultImage, numberWithCommas } from '@/utils/util';
import Image from 'next/image';
import Link from 'next/link';

function TopSellingCard({ data }) {
	const [imageError, setImageError] = useState(false);
	var type = ['old phone', 'used', 'refurbished'];
	const alternate_text = `buy ${
		type[Math.floor(Math.random() * type.length)]
	} ${data?.marketingName} like new `.toLowerCase();

	if (data?.name?.toLowerCase().includes('all')) {
		return (
			<Link href={`/product/models`} passHref>
				<a>
					<div className="w-full h-full rounded-md shadow hover:shadow-md p-4 bg-m-white flex justify-center items-center">
						<p className="block text-m-green">{'Show All'}</p>
					</div>
				</a>
			</Link>
		);
	}

	return (
		<Link
			href={`/product/buy-old-refurbished-used-mobiles/${data.make}/${data.marketingName}`}
		>
			<a>
				<div
					className="grid grid-cols-1 rounded-md shadow-lg hover:shadow-md p-4 pb-2 bg-m-white hover:bg-gray-100"
					data-aos="fade-up"
				>
					<div className="grid grid-cols-1">
						<div className="flex justify-center">
							<Image
								loading="lazy"
								priority={false}
								onError={() => setImageError(true)}
								blurDataURL={
									imageError
										? getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										: data?.imagePath ||
										  getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								placeholder="blur"
								src={
									imageError
										? getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										: data?.imagePath ||
										  getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								alt={alternate_text}
								width={150}
								quality={25}
								height={150}
								objectFit="contain"
							/>
						</div>
						<div className="flex-wrap w-full">
							<p className="text-regularFontSize sm:text-base flex-1 sm:py-1 truncate w-full capitalize font-Roboto-Regular text-m-grey-2">
								{data?.marketingName}
							</p>
							<div className="justify-self-end">
								<p className="text-smallFontSize font-Roboto-Light text-m-grey-1">
									Starting from
								</p>
								<p className="font-Roboto-Bold flex items-center -ml-1 text-xlFontSize text-m-green">
									{(data?.startingFrom && (
										<Image src={Rupee1} width={20} height={20} alt="" />
									)) || <>&nbsp;</>}{' '}
									{numberWithCommas(data?.startingFrom || '')}
									{(data?.listingPrice && (
										<Image src={Rupee1} width={20} height={20} alt="" />
									)) || <>&nbsp;</>}{' '}
									{numberWithCommas(data?.listingPrice || '')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
}

export default TopSellingCard;

import Image from 'next/image';
import { getDefaultImage, numberWithCommas } from '../../utils/util';
import AddFav from '../AddFav';
import VerifiedIcon from '../VerifiedIcon';
import ChevronRight from '@/assets/chevronright.svg';
import { useState } from 'react';
import Cookies from 'js-cookie';

function BestDealsCard({ data }) {
	var type = ['old phone', 'used', 'refurbished'];
	const soldout = `bestdeals buy ${
		type[Math.floor(Math.random() * type.length)]
	} ${data?.marketingName} ${data?.deviceStorage} ${
		data?.deviceCondition
	} soldout`.toLowerCase();
	const [imageError, setImageError] = useState(false);
	return (
		<div
			className=" bg-white h-[300px] rounded-lg py-2 text-m-grey-2 mb-6 bg-gradient-to-l from-m-white to-m-green "
			style={{ boxShadow: '0px 2px 3px #0000000A' }}
		>
			<div className="text-sm text-white font-light flex justify-between items-center mr-4">
				<div
					className="bg-yellow-500 md:py-1.5 md:px-4 py-1 px-2 rounded-r font-Roboto-Semibold md:text-regularFontSize"
					style={{ marginLeft: '0.5px' }}
				>
					Best Deals
				</div>
				<div>
					{!(
						data?.isOtherVendor === 'Y' &&
						Cookies.get('userUniqueId') == undefined
					) && <AddFav data={data} setProducts={null} />}
				</div>
			</div>
			<div className="flex justify-between items-center absolute">
				<div className=" justify-between items-center">
					<div className="pt-5 mx-6 pl-5 text-m-white">
						<span className="flex ">
							<span className="md:mx-6 mx-2">
								<div className="font-Roboto-Light md:text-smallFontSize text-xs2FontSize">
									Condition
								</div>
								<div className="font-Roboto-Medium md:text-regularFontSize text-mediumFontSize">
									{data?.deviceCondition}
								</div>
							</span>
							<span className="md:mx-6 mx-2">
								<div className="font-Roboto-Light md:text-smallFontSize text-xs2FontSize">
									Storage
								</div>
								<div className="font-Roboto-Medium md:text-regularFontSize text-mediumFontSize">
									{data?.deviceStorage}
								</div>
							</span>
							{data?.deviceRam && (
								<span className=" md:mx-6 mx-2">
									<div className="font-Roboto-Light md:text-smallFontSize text-xs2FontSize">
										RAM
									</div>
									<div className=" font-Roboto-Medium md:text-regularFontSize text-mediumFontSize">
										{data?.deviceRam}
									</div>
								</span>
							)}
						</span>
					</div>
					<div className="relative pt-5 pl-16 ">
						<div className="font-Roboto-Bold flex items-center -ml-1 text-yellow2 md:text-[28px] text-[24px]">
							{data?.listingPrice && <p className="">₹</p>}{' '}
							{numberWithCommas(data?.listingPrice || '')}
						</div>
						<div className="font-Roboto-Regular text-white md:text-regularFontSize text-mediumFontSize">
							{data?.marketingName}
						</div>
						<div className="font-Roboto-Light text-smallFontSize text-white">
							{data?.deviceStorage}
						</div>
						<div className="flex absolute pt-4 z-50">
							<div className="">
								<div
									onClick={() =>
										window.open(
											`/product/buy-old-refurbished-used-mobiles/${
												data?.marketingName.split(' ')[0]
											}/${data?.marketingName}/${
												data?.listingId
											}?isOtherVendor=${data?.isOtherVendor}`,
											'_blank'
										)
									}
								>
									<div className="flex items-center md:text-regularFontSizete text-smallFontSize font-Roboto-Semibold bg-m-white text-m-green md:py-2 py-1 md:px-4 px-2 md:rounded-lg rounded-md hover:bg-yellow-500 hover:cursor-pointer duration-500">
										<div>View Deal </div>
										<div className="pt-0.5">
											<Image src={ChevronRight} width={10} height={10} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-end items-end pr-20 pt-5 relative">
				<div className=" absolute z-10 top-4 right-44">
					{data?.status === 'Sold_Out' ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/web/assets/soldout.svg'
							}
							width={'50'}
							height={'30'}
							objectFit="contain"
							alt={'TODO: Something stable'}
						/>
					) : data?.verified ? (
						<VerifiedIcon width={60} height={29} />
					) : (
						<span className="h-9 block" />
					)}
				</div>
				<div className="relative flex justify-end items-end">
					<Image
						loading="lazy"
						priority={false}
						blurDataURL={
							imageError
								? getDefaultImage(data?.marketingName) ||
								  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								: data?.imagePath ||
								  getDefaultImage(data?.marketingName) ||
								  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
						}
						placeholder="blur"
						className="flex rounded-[20px]"
						width={140}
						height={190}
						quality={40}
						src={
							imageError
								? getDefaultImage(data?.marketingName) ||
								  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								: data?.imagePath ||
								  getDefaultImage(data?.marketingName) ||
								  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
						}
						onError={() => setImageError(true)}
						objectFit="contain"
						alt={'TODO: Something stable'}
					/>
				</div>
			</div>
		</div>
	);
}

export default BestDealsCard;

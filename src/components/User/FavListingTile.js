import { useEffect, useState } from 'react';
import IconLabelValue from './IconLableValue';
import * as Axios from '@/api/axios';
import OutlineHeart from '@/assets/heartfill.svg';
import Rupee from '@/assets/rupee1.svg';
import { getDefaultImage, numberWithCommas } from '@/utils/util';
import Cookies from 'js-cookie';
import Image from 'next/image';

function FavListingTile({ data, setProducts }) {
	const [frontImagePath, setFrontImagePath] = useState();
	const [imageError, setImageError] = useState(false);
	const frontImage = data?.images?.filter((img) => {
		if (img?.panel === 'front') {
			return img?.fullImage;
		}
	});

	useEffect(() => {
		if (frontImage?.length > 0) {
			var data = frontImage.filter((item) => item.panel === 'front');
			setFrontImagePath(data[0]?.fullImage);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFavoties = async () => {
		setProducts.mutate(data.listingId);
	};

	return (
		<div>
			<div className="hidden lg:grid grid-cols-8 rounded border p-3 hover:shadow relative">
				<div className="absolute top-1 left-0 z-10">
					{data?.verified ? (
						<Image
							src={'https://d1tl44nezj10jx.cloudfront.net/assets/verified.svg'}
							width={90}
							height={28}
							alt="verified icon"
						/>
					) : (
						<div>
							<Image
								src={
									'https://d1tl44nezj10jx.cloudfront.net/assets/unverified.svg'
								}
								width={90}
								height={28}
								alt="unverified icon"
							/>
							<p className="text-xsFontSize absolute top-1.5 font-Roboto-Semibold right-4">
								unverified
							</p>
						</div>
					)}
				</div>

				<div className="col-span-3 flex">
					{data?.images && frontImagePath && (
						<div className="flex justify-center w-32 h-24">
							<Image
								alt={data?.marketingName}
								src={
									imageError
										? 'https://d1tl44nezj10jx.cloudfront.net/webassets/oru_phones_logo.svg'
										: frontImage ||
										  getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/webassets/oru_phones_logo.svg'
								}
								onError={() => setImageError(true)}
								objectFit="contain"
								width={128}
								height={96}
							/>
						</div>
					)}

					{!data?.images && (
						<div className="flex justify-center w-32 h-24">
							<Image
								src={
									imageError
										? getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										: data?.defaultImage?.fullImage ||
										  data?.imagePath ||
										  getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								onError={() => setImageError(true)}
								alt={data?.marketingName}
								objectFit="contain"
								width={128}
								height={96}
							/>
						</div>
					)}

					{data?.images && (
						<div className="flex justify-center w-32 h-24">
							<Image
								alt={data?.marketingName}
								src={
									imageError
										? getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/assets/web/oru_phones_logo.svg'
										: data?.defaultImage?.fullImage ||
										  data?.imagePath ||
										  getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/assets/web/oru_phones_logo.svg'
								}
								onError={() => setImageError(true)}
								objectFit="contain"
								style={{ width: 'auto', height: '100%' }}
								width={128}
								height={96}
							/>
						</div>
					)}

					<div>
						<p className="text-mediumFontSize font-Roboto-Semibold text-m-grey-1 my-1.5 truncate">
							{' '}
							{data?.marketingName}​{' '}
						</p>
						<p className="flex items-center text-mediumFontSize font-Roboto-Bold text-m-grey-1">
							{data?.listingPrice && (
								<Image src={Rupee} width={15} height={16} alt="listing" />
							)}{' '}
							{numberWithCommas(data?.listingPrice || '')}
						</p>
					</div>
				</div>
				<div className=" col-span-4 grid grid-cols-2 gap-x-2">
					<IconLabelValue label="Condition" value={data?.deviceCondition} />
					<IconLabelValue
						label="Warranty"
						value={data?.warranty === null ? '--' : data?.warranty}
					/>
					<IconLabelValue label="Storage" value={data?.deviceStorage} />
					<IconLabelValue
						label="Verified on"
						value={data?.verifiedDate === null ? '--' : data?.verifiedDate}
					/>
					<IconLabelValue label="Color" value={data?.color || ''} />
					<IconLabelValue
						label="Listed on"
						value={data?.listingDate === null ? '--' : data?.listingDate}
					/>
				</div>
				<div className="flex flex-col justify-between items-end pr-2">
					<Image
						alt="heart icon"
						src={OutlineHeart}
						width={20}
						height={20}
						onClick={(e) => {
							e.preventDefault();
							handleFavoties(data);
						}}
					/>
				</div>
			</div>

			<div className="lg:hidden  w-56 rounded-md border lg:p-3 p-4 hover:shadow relative">
				<div className="absolute top-2 left-8 z-10 px-3">
					{data?.verified ? (
						<Image
							src={'https://d1tl44nezj10jx.cloudfront.net/assets/verified.svg'}
							width={90}
							height={28}
							alt="verified icon"
						/>
					) : (
						<div>
							<Image
								src={
									'https://d1tl44nezj10jx.cloudfront.net/assets/unverified.svg'
								}
								width={90}
								height={28}
								alt="unverified icon"
							/>
							<p className="text-xsFontSize absolute top-1.5 font-Roboto-Semibold right-8">
								unverified
							</p>
						</div>
					)}
				</div>

				<div className="col-span-3 lg:flex">
					{data?.images && frontImagePath && (
						<div className="fflex  m-auto justify-center w-32 h-24 pr-4">
							<Image
								alt={data?.marketingName}
								src={
									imageError
										? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										: frontImage ||
										  getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								onError={() => setImageError(true)}
								objectFit="contain"
								width={128}
								height={96}
							/>
						</div>
					)}

					{!data?.images && (
						<div className="fflex  m-auto justify-center w-32 h-24 pr-4">
							<Image
								src={
									imageError
										? getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										: data?.defaultImage?.fullImage ||
										  data?.imagePath ||
										  getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								onError={() => setImageError(true)}
								alt={data?.marketingName}
								objectFit="contain"
								width={128}
								height={96}
							/>
						</div>
					)}

					{data?.images && (
						<div className="fflex  m-auto justify-center w-32 h-24 pr-4">
							<Image
								alt={data?.marketingName}
								src={
									imageError
										? getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										: data?.defaultImage?.fullImage ||
										  data?.imagePath ||
										  getDefaultImage(data?.marketingName) ||
										  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								onError={() => setImageError(true)}
								objectFit="contain"
								style={{ width: 'auto', height: '100%' }}
								width={128}
								height={96}
							/>
						</div>
					)}

					<div>
						<p className="text-mediumFontSize font-Roboto-Semibold text-m-grey-1 lg:my-1.5 mt-4 ">
							{' '}
							{data?.marketingName}​{' '}
						</p>
						<p className="flex items-center font-Roboto-Bold md:text-xl2FontSize text-xlFontSize -ml-1 text-m-grey-1">
							{data?.listingPrice && (
								<Image src={Rupee} width={20} height={20} alt="rupee" />
							)}{' '}
							{numberWithCommas(data?.listingPrice || '')}
						</p>
					</div>
				</div>
				<div className=" col-span-4 grid lg:grid-cols-2 lg:gap-x-2 lg:py-0 py-2">
					<IconLabelValue label="Condition" value={data?.deviceCondition} />
					<IconLabelValue
						label="Warranty"
						value={data?.warranty === null ? '--' : data?.warranty}
					/>
					<IconLabelValue label="Storage" value={data?.deviceStorage} />
					<IconLabelValue
						label="Verified on"
						value={data?.verifiedDate === null ? '--' : data?.verifiedDate}
					/>
					<IconLabelValue label="Color" value={data?.color || ''} />
					<IconLabelValue
						label="Listed on"
						value={data?.listingDate === null ? '--' : data?.listingDate}
					/>
				</div>
				<div className="flex flex-col absolute top-2 right-2 justify-between items-end pr-2">
					<Image
						alt="heart icon"
						src={OutlineHeart}
						width={20}
						height={20}
						onClick={(e) => {
							e.preventDefault();
							handleFavoties(data);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default FavListingTile;

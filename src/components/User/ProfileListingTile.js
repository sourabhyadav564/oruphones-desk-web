import Link from 'next/link';
import Rupee from '@/assets/rupee1.svg';
import { useState, useEffect, useCallback } from 'react';
import { numberWithCommas } from '../../utils/util';
import IconLabelValue from './IconLableValue';
import AppDownloadPopup from '../Popup/AppDownloadPopup';
import * as Axios from '@/api/axios';
import { useRouter } from 'next/router';
import VerifiedIcon from '../VerifiedIcon';
import UnVerifiedIcon from '../UnVerifiedIcon';
import Cookies from 'js-cookie';
import Image from 'next/image';

function ProfileListingTile({ data, fromMyFav, setProducts }) {
	const router = useRouter();
	const [frontImagePath, setFrontImagePath] = useState();
	const [openAppDownload, setOpenAppDownload] = useState(false);
	const [openActivatePopup, setOpenActivatePopup] = useState(false);
	const [openActivatePausePopup, setOpenActivatePausePopup] = useState(false);
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

	const handleActivateClick = (e) => {
		let payload = {
			listingId: data?.listingId,
			userUniqueId: Cookies.get('userUniqueId') || 'Guest',
		};
		const fetchData = async () => {
			const activeListedDevice = await Axios.activeListedDevice(payload);
			if (activeListedDevice.status === 'SUCCESS') {
				setOpenActivatePopup(true);
			}
		};
		fetchData();
	};

	function handleVerifyListing() {
		setOpenAppDownload(true);
	}

	function uploadPhotos() {
		// router.push(`/sell-old-refurbished-used-mobiles/edit/${data?.listingId}`);
	}

	return (
		<div>
			<div
				className=" hidden lg:grid grid-cols-8  rounded border p-3 hover:shadow relative"
				onClick={() => {
					setOpenAppDownload(true);
				}}
			>
				<div className="absolute top-1 left-0 z-10 px-3">
					{data?.verified ? (
						<VerifiedIcon width={69} height={29} />
					) : (
						<UnVerifiedIcon width={69} height={29} />
					)}
				</div>
				<div className="col-span-3 flex">
					{data?.images && frontImagePath && (
						<div className="flex justify-center w-32 h-24 pr-4">
							<Image
								src={frontImagePath}
								alt={
									data?.marketingName ||
									'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
							/>
						</div>
					)}

					{!data?.images && (
						<div className="flex justify-center w-32 h-24 pr-4">
							<Image
								src={
									data?.defaultImage?.fullImage ||
									data?.imagePath ||
									'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								alt={data?.marketingName}
								style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
							/>
						</div>
					)}

					{data?.images && (
						<div className="flex justify-center w-32 h-24 pr-4">
							<Image
								src={
									data?.defaultImage?.fullImage ||
									data?.imagePath ||
									'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								alt={data?.marketingName}
								style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
							/>
						</div>
					)}

					<div>
						<p className="text-mediumFontSize font-Roboto-Semibold text-m-grey-1 my-1.5">
							{' '}
							{data?.marketingName}{' '}
						</p>
						<p className="flex items-center font-Roboto-Bold text-xl2FontSize text-m-grey-1">
							{data?.listingPrice && (
								<Image src={Rupee} width={20} height={20} alt="rupee" />
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
				<div className="flex flex-col justify-between items-end pr-2 font-Roboto-Semibold text-smallFontSize">
					{data?.status === 'Active' &&
					data?.verified &&
					!data?.deviceImagesAvailable ? (
						<Link legacyBehavior href="#">
							<a
								className="text-xs cursor-pointer self-end min-w-max"
								style={{ color: '#00A483' }}
								onClick={() => uploadPhotos()}
							>
								UPLOAD PHOTOS
							</a>
						</Link>
					) : (
						data?.status === 'Active' &&
						!data?.verified && (
							<Link legacyBehavior href="#" passHref>
								<p
									className="text-xs cursor-pointer self-end"
									style={{ color: '#00A483' }}
									onClick={handleVerifyListing}
								>
									<a>VERIFY NOW</a>
								</p>
							</Link>
						)
					)}
					{data?.status === 'Paused' && !data?.verified && (
						<Link legacyBehavior href="#" passHref>
							<p
								className="text-xs cursor-pointer self-end"
								style={{ color: '#00A483' }}
								onClick={handleActivateClick}
							>
								<a>ACTIVATE NOW</a>
							</p>
						</Link>
					)}
				</div>
				<AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
			</div>
			<div
				className=" lg:hidden  w-56 rounded-md border lg:p-3 p-4 hover:shadow relative"
				onClick={() => {
					setOpenAppDownload(true);
				}}
			>
				<div className="absolute top-2 left-8 z-10 px-3">
					{data?.verified ? (
						<VerifiedIcon width={69} height={29} />
					) : (
						<UnVerifiedIcon width={69} height={29} />
					)}
				</div>
				<div className="col-span-3   lg:flex">
					{data?.images && frontImagePath && (
						<div className="flex  m-auto justify-center w-32 h-24 pr-4">
							<Image
								src={frontImagePath}
								alt={
									data?.marketingName ||
									'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
							/>
						</div>
					)}

					{!data?.images && (
						<div className="flex m-auto justify-center w-32 h-24 pr-4">
							<Image
								src={
									data?.defaultImage?.fullImage ||
									data?.imagePath ||
									'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								alt={data?.marketingName}
								style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
							/>
						</div>
					)}

					{data?.images && (
						<div className="flex m-auto justify-center w-32 h-24 pr-4">
							<Image
								src={
									data?.defaultImage?.fullImage ||
									data?.imagePath ||
									'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								alt={data?.marketingName}
								style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
							/>
						</div>
					)}

					<div>
						<p className="text-mediumFontSize font-Roboto-Semibold text-m-grey-1 lg:my-1.5 mt-4 ">
							{' '}
							{data?.marketingName}{' '}
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
				<div className="flex flex-col justify-between items-end pr-2 font-Roboto-Semibold text-smallFontSize">
					{data?.status === 'Active' &&
					data?.verified &&
					!data?.deviceImagesAvailable ? (
						<Link legacyBehavior href="#">
							<a
								className="text-xs cursor-pointer self-center lg:py-0 py-2   min-w-max"
								style={{ color: '#00A483' }}
								onClick={() => uploadPhotos()}
							>
								UPLOAD PHOTOS
							</a>
						</Link>
					) : (
						data?.status === 'Active' &&
						!data?.verified && (
							<Link legacyBehavior href="#" passHref>
								<p
									className="text-xs cursor-pointer self-center lg:py-0 py-2 "
									style={{ color: '#00A483' }}
									onClick={handleVerifyListing}
								>
									<a>VERIFY NOW</a>
								</p>
							</Link>
						)
					)}
					{data?.status === 'Paused' && !data?.verified && (
						<Link legacyBehavior href="#" passHref>
							<p
								className="text-xs cursor-pointer self-center lg:py-0 py-2"
								style={{ color: '#00A483' }}
								onClick={handleActivateClick}
							>
								<a>ACTIVATE NOW</a>
							</p>
						</Link>
					)}
				</div>
				<AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
			</div>
		</div>
	);
}

export default ProfileListingTile;

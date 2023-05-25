import { useState } from 'react';
import * as Axios from '@/api/axios';
import ImageSlider from '@/components/ImageSlider';
import LabelAndValue from '@/components/LabelAndValue';
import AppDownloadPopup from '@/components/Popup/AppDownloadPopup';
import DeviceVerificationReport from '@/components/Popup/DeviceVerificationReport';
import VerifiedInfoPopup from '@/components/Popup/VerifiedInfoPopup';
import UnVerifiedIcon from '@/components/UnVerifiedIcon';
import VerifiedIcon from '@/components/VerifiedIcon';
import { numberWithCommas } from '@/utils/util';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DynamicConditionInfoPopup = dynamic(
	() => import('@/components/Popup/ConditionInfoPopup'),
	{
		ssr: false,
		loading: () => <p>Loading...</p>,
	}
);
const DynamicActivateListingPopup = dynamic(
	() => import('@/components/Popup/ActivateListingPopup'),
	{
		ssr: false,
		loading: () => <p>Loading...</p>,
	}
);
const DynamicActivatePauseListing = dynamic(
	() => import('@/components/Popup/ActivatePauseListingPopup'),
	{
		ssr: false,
		loading: () => <p>Loading...</p>,
	}
);
const DynamicDeletePopup = dynamic(
	() => import('@/components/Popup/DeleteListingPopup'),
	{
		ssr: false,
		loading: () => <p>Loading...</p>,
	}
);

function ListingDetailsCard({ data }) {
	const [openDeviceReport, setOpenDeviceReport] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [openActivatePausePopup, setOpenActivatePausePopup] = useState(false);
	const [openActivatePopup, setOpenActivatePopup] = useState(false);
	const [openDeletePopup, setDeletePopup] = useState(false);
	const [openAppDownload, setOpenAppDownload] = useState(false);
	const [openConditionInfoPopup, setConditionInfoPopup] = useState(false);

	const accessoriesList = [];
	if (data?.originalbox === 'Y') {
		accessoriesList.push('Original box');
	}
	if (data?.charger === 'Y') {
		accessoriesList.push('Charger');
	}
	if (data?.earphone === 'Y') {
		accessoriesList.push('Earphones');
	}

	const handleActivateClick = (e) => {
		let payload = {
			listingId: data?.listingId,
			userUniqueId: Cookies.get('userUniqueId'),
		};
		const fetchData = async () => {
			const activeListedDevice = await Axios.activeListedDevice(payload);
			if (activeListedDevice.status === 'SUCCESS') {
				setOpenActivatePopup(true);
			}
		};
		fetchData();
	};

	return (
		<div className="grid grid-cols-4 p-2">
			{data?.images && (
				<div>
					<ImageSlider images={data?.images} />
				</div>
			)}

			{data?.defaultImage && (
				<div>
					<ImageSlider images={data?.defaultImage} />
				</div>
			)}
			<div className="grid grid-cols-3 col-span-3">
				<div className="col-span-2">
					<div className="mb-3 px-2">
						<p className="capitalize text-2xl font-semibold text-black-20">
							{data?.marketingName}
						</p>
						<p className="capitalize text-2xl font-semibold text-black-20">
							{/* ({data?.color}, {data?.deviceStorage}) */}(
							{data?.color && `${data?.color}, `}
							{data?.deviceRam && data?.deviceRam + ' RAM, '}
							{data?.deviceStorage && (
								<span>{data?.deviceStorage + ' Storage'})</span>
							)}
						</p>
						{data?.verified ? (
							<VerifiedIcon width={86} height={46} />
						) : (
							<UnVerifiedIcon width={86} height={46} />
						)}
						<label className="block text-base text-m-grey-2">List price</label>
						<p
							className="font-semibold flex items-center -ml-1 text-m-grey-1"
							style={{ fontSize: 42 }}
						>
							{/* {data?.listingPrice && <BiRupee />}{' '} */}
							{numberWithCommas(data?.listingPrice || '')}
						</p>
					</div>
					<div className="grid grid-cols-2 gap-x-8 gap-y-5 px-2">
						<LabelAndValue
							label="Condition"
							value={data?.deviceCondition}
							showConditionInfoPopup={() => setConditionInfoPopup(true)}
						/>
						<LabelAndValue
							label="Warranty"
							value={data?.warranty === null ? '--' : data?.warranty}
						/>
						<LabelAndValue label="Storage" value={data?.deviceStorage} />
						<LabelAndValue
							label="Verified on"
							value={data?.verifiedDate === null ? '--' : data?.verifiedDate}
							showInfoPopup={() => setOpenInfo(true)}
						/>
						<LabelAndValue label="Color" value={data?.color || ''} />
						<LabelAndValue
							label="Listed on"
							value={data?.listingDate === null ? '--' : data?.listingDate}
						/>
						<LabelAndValue
							label="Accessories"
							value={accessoriesList.join(', ')}
						/>
						{data?.verified && (
							<LabelAndValue
								label="Report"
								value={'Device Verification Report'}
								showDeviceReport={() => setOpenDeviceReport(true)}
							/>
						)}
					</div>
				</div>
				<div className="flex flex-col justify-between">
					<div className="flex justify-end">
						<p className="cursor-pointer self-end uppercase font-semibold mr-6 text-m-green">
							<button onClick={() => setOpenAppDownload(true)}>Edit</button>
						</p>
						<Image
							src={'https://d1tl44nezj10jx.cloudfront.net/assets/chart.svg'}
							width={15}
							height={15}
							alt="Chart Icon"
							className="cursor-pointer"
						/>
					</div>
					{data?.status === 'Active' ? (
						<div className="flex flex-col items-end">
							<button
								className="w-10/12 px-4 my-2 py-3 uppercase border border-yellow-1 text-yellow-1 rounded"
								onClick={() => setOpenActivatePausePopup(true)}
							>
								Pause Listing
							</button>
							<button
								className="w-10/12 px-4 my-2 py-3 uppercase border border-m-green text-m-green rounded"
								onClick={() => setOpenAppDownload(true)}
							>
								{data?.verified ? 'Re-Verify' : 'Verify'}
							</button>
							<button
								className="w-10/12 px-4 my-2 py-3 uppercase border border-red text-red rounded"
								onClick={() => setDeletePopup(true)}
							>
								Delete Listing
							</button>
						</div>
					) : (
						<div className="flex flex-col items-end">
							<button
								className="w-10/12 px-4 my-2 py-3 uppercase border border-m-green text-m-green rounded"
								// onClick={() => setOpenActivatePopup(true)}
								onClick={handleActivateClick}
							>
								Activate now
							</button>
							<button
								className="w-10/12 px-4 my-2 py-3 uppercase border border-gray-1 text-gray-1 rounded disabled:cursor-not-allowed"
								disabled
								onClick={() => setOpenAppDownload(true)}
							>
								{data?.verified ? 'Re-Verify' : 'Verify'}
							</button>
							<button
								className="w-10/12 px-4 my-2 py-3 uppercase border border-red text-red rounded"
								onClick={() => setDeletePopup(true)}
							>
								Delete Listing
							</button>
						</div>
					)}
				</div>
			</div>
			<AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
			<VerifiedInfoPopup open={openInfo} setOpen={setOpenInfo} data={data} />
			<DeviceVerificationReport
				open={openDeviceReport}
				setOpen={setOpenDeviceReport}
				data={data}
			/>
			{openConditionInfoPopup && (
				<DynamicConditionInfoPopup
					open={openConditionInfoPopup}
					setOpen={setConditionInfoPopup}
					data={data}
				/>
			)}
			{openActivatePausePopup && (
				<DynamicActivatePauseListing
					open={openActivatePausePopup}
					setOpen={setOpenActivatePausePopup}
					data={data?.listingId}
				/>
			)}
			{openDeletePopup && (
				<DynamicDeletePopup
					open={openDeletePopup}
					setOpen={setDeletePopup}
					data={data}
				/>
			)}
			{openActivatePopup && (
				<DynamicActivateListingPopup
					open={openActivatePopup}
					setOpen={setOpenActivatePopup}
					data={'true'}
				/>
			)}
		</div>
	);
}

export default ListingDetailsCard;

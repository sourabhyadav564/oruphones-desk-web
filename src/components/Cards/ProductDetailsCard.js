import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SellerDetailsCard from './SellerDetailsCard';
import * as Axios from '@/api/axios';
import Close from '@/assets/close.svg';
import FillExclamation from '@/assets/fillexclamation.svg';
import PassCheck from '@/assets/gcheck.svg';
import InfoCircle1 from '@/assets/infocircle.svg';
import InfoCircle from '@/assets/infocircle2.svg';
import AddFav from '@/components/AddFav';
import ConditionOptionLarge2 from '@/components/Condition/ConditionOptionLarge2';
import ImageSlider from '@/components/ImageSlider';
import LabelAndValue from '@/components/LabelAndValue';
import BrandWarrantyInfo from '@/components/Popup/BrandWarrantyInfo';
import ConditionInfoPopup from '@/components/Popup/ConditionInfoPopup';
import DeviceVerificationReport from '@/components/Popup/DeviceVerificationReport';
import LoginPopup from '@/components/Popup/LoginPopup';
import RequestVerificationSuccessPopup from '@/components/Popup/RequestVerificationSuccessPopup';
import SellerWarrantyInfo from '@/components/Popup/SellerWarrantyInfo';
import VerifiedInfoPopup from '@/components/Popup/VerifiedInfoPopup';
import WarrantyInfo from '@/components/Popup/WarrantyInfo';
import ShareIcon from '@/components/ShareIcon';
import ComparisonTable from '@/components/Table/ComparisonTable';
import ComparisonTable2 from '@/components/Table/ComparisonTable2';
import VerificationIcon from '@/components/VerificationIcon';
import { deviceConditionQuestion } from '@/utils/constant';
import { getDefaultImage, numberWithCommas } from '@/utils/util';
import Cookies from 'js-cookie';
import Image from 'next/image';

function ProductDetailsCard({ data, openFullImage, onDataContext }) {
	const [performAction2, setPerformAction2] = useState(false);
	const [openDeviceReport, setOpenDeviceReport] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [openConditionInfoPopup, setConditionInfoPopup] = useState(false);
	const [openWarrantyInfoPopup, setWarrantyInfoPopup] = useState(false);
	const [details, setDetailsData] = useState([]);
	const [
		openRequestVerificationSuccessPopup,
		setRequestVerificationSuccessPopup,
	] = useState(false);
	const [resData, setResData] = useState([]);
	const [listingid, setListingid] = useState(data?.listingId);
	const [deviceListingInfo, setDeviceListingInfo] = useState(data);
	const [showLoginPopup, setShowLoginPopup] = useState(false);
	const [showNumber, setShowNumber] = useState(false);
	const [ImageError, setImageError] = useState(false);
	const [openWarrantyInfo, setOpenWarrantyInfo] = useState(false);
	const [opensellerWarrantyInfo, setOpensellerWarrantyInfo] = useState(false);
	const [opensbrandWarrantyInfo, setOpenbrandWarrantyInfo] = useState(false);

	let filled =
		data?.deviceCondition?.toLowerCase() == 'Like New'.toLowerCase()
			? 5
			: data?.deviceCondition?.toLowerCase() == 'Excellent'.toLowerCase()
			? 4
			: data?.deviceCondition?.toLowerCase() == 'Good'.toLowerCase()
			? 3
			: data?.deviceCondition?.toLowerCase() == 'Fair'.toLowerCase()
			? 2
			: data?.deviceCondition?.toLowerCase() == 'Needs Repair'.toLowerCase()
			? 1
			: 5;
	let iconToShow = (index) => {
		if (index < filled) {
			return <div className="text-yellow-400 text-mediumFontSize">★</div>;
		} else {
			return <div className="text-gray-400 text-mediumFontSize">★</div>;
		}
	};

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

	useEffect(() => {
		const interval = setInterval(() => {
			if (
				showLoginPopup == false &&
				performAction2 == true &&
				Cookies.get('userUniqueId') != undefined
			) {
				setRequestVerificationSuccessPopup(true);
				clearInterval(interval);
			}
		}, 1000);
	}, [showLoginPopup]);

	useEffect(() => {
		if (openRequestVerificationSuccessPopup) {
			setListingid(data?.listingId);
			Axios.sendverification(
				listingid,
				Cookies.get('userUniqueId') || 'Guest'
			).then((response) => {
				setResData(response);
			});
		}
	}, [openRequestVerificationSuccessPopup]);

	const handleClick = () => {
		if (Cookies.get('userUniqueId') === undefined) {
			setPerformAction2(true);
			setShowLoginPopup(true);
		} else if (data?.verified) {
			setShowNumber((prav) => !prav);
		} else {
			if (showNumber) {
				setShowNumber((prav) => !prav);
			} else {
				setRequestVerificationSuccessPopup(true);
			}
		}
	};

	const handleContext = (data) => {
		onDataContext(data);
	};

	return (
		<Fragment>
			<div className=" p-2 relative w-full">
				<div className="space-x-4 relative lg:-right-2 md:right-20 flex items-center justify-end pr-4 -top-2 ">
					{!(data?.isOtherVendor === 'Y') && (
						<Fragment>
							<div className="hover:scale-110">
								<ShareIcon data={deviceListingInfo} width={16} height={16} />
							</div>
							<span className="pt-2 hover:scale-110 ">
								<AddFav
									data={deviceListingInfo}
									setProducts={setDeviceListingInfo}
								/>
							</span>
						</Fragment>
					)}
				</div>
				<div className="lg:flex lg:flex-col-2 justify-center w-full">
					<div className="col-span-1 lg:w-[600px] h-[28rem] justify-center pr-4 w-full">
						{!(data?.isOtherVendor === 'Y') ? (
							<>
								{(data?.images || data?.defaultImage || data?.imagePath) && (
									<ImageSlider
										openFullImage={openFullImage}
										data={deviceListingInfo}
										onDataContext={handleContext}
										images={
											(data?.images?.length &&
												data?.images != '' &&
												data?.images) ||
											(data?.imagePath && {
												fullImage: data?.imagePath,
												thumbImage: data?.imagePath,
											}) ||
											(data?.defaultImage.fullImage &&
												data?.defaultImage.fullImage != '' && {
													fullImage: data?.defaultImage?.fullImage,
													thumbImage: data?.defaultImage?.fullImage,
												}) || {
												fullImage:
													'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg',
												thumbImage:
													'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg',
											}
										}
									/>
								)}
							</>
						) : (
							<>
								{' '}
								{(data?.images || data?.defaultImage || data?.imagePath) && (
									<ImageSlider
										openFullImage={openFullImage}
										onDataContext={handleContext}
										data={deviceListingInfo}
										images={
											'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										}
									/>
								)}
							</>
						)}
					</div>
					<div className="col-span-2 lg:w-[700px] md:w-[80vw] w-[90vw] m-auto  pl-4 lg:pt-0 pt-8 ">
						<div className="mb-3 pr-2 ">
							<h1 className="text-xl2FontSize font-Roboto-Bold text-black-20 pl-1">
								{data?.marketingName} - {data?.deviceStorage}
							</h1>
							<div className="flex flex-row justify-between">
								<p className="font-Roboto-Bold text-xl4FontSize flex items-center ml-1 text-green2">
									{data?.listingPrice &&
										'₹' + numberWithCommas(data?.listingPrice || '')}
								</p>
								<span
									className="grid grid-cols-2 hover:cursor-pointer rounded-md py-1 px-4 w-[160pr] h-[40pr] opacity-bg-50 text-xs2FontSize"
									style={{ backgroundColor: '#F3F3F3' }}
									onClick={() => {
										setConditionInfoPopup(true);
									}}
								>
									<div className="m-auto justify-center">
										<span className="font-Roboto-Light text-bx opacity-100 text-[#000] flex leading-tight items-center">
											Condition{' '}
										</span>
										<div className="font-Roboto-Regular text-smallFontSize">
											{data?.deviceCondition}
										</div>
									</div>
									<div className="flex text-bx space-x-[2.5px] m-auto justify-center ">
										{Array(5)
											.fill()
											.map((_, index) => iconToShow(index))}
									</div>
								</span>
							</div>
							<div className="py-6">
								{(data?.verified && (
									<Fragment>
										<div
											className="flex m-auto justify-center text-white py-0.5 rounded-md px-7"
											style={{ background: '#4CAF50' }}
										>
											<div className="flex flex-1 items-center">
												<VerificationIcon className="flex self-center" />
												<p className=" font-Roboto-Regularitalic text-mediumFontSize self-center pr-1 ">
													Verified
												</p>
												<div className="w-[13px] ml-0.5 mt-0.5">
													<Image
														src={InfoCircle1}
														width={13}
														height={13}
														alt=""
														onClick={() => setOpenInfo(true)}
													/>
												</div>
												<div className="pl-3 pt-2">
													<div className="bg-gray-100 w-[0.5px] h-6 "></div>
												</div>
											</div>
											<div className=" flex items-center m-auto justify-center font-Roboto-Light text-smallFontSize">
												<p>This phone is verified by ORUphones</p>
												<a
													href="#devicereport"
													className="text-m-green underline cursor-pointer pl-10 hover:opacity-80 hover:font-bold"
												>
													Device Report &gt;
												</a>
											</div>
										</div>
									</Fragment>
								)) || (
									<Fragment>
										{data?.isOtherVendor === 'N' && (
											<div className="w-full  py-2 space-x-2 text-center">
												<div
													className="flex py-2 rounded-md space-x-2 col-span-3"
													style={{ backgroundColor: '#F9C414' }}
												>
													<div className="whitespace-nowrap w-[100px] flex space-x-1 flex-1 pl-10">
														<div className="flex space-x-1 items-center">
															<div className="w-[24px] mt-0.5">
																<Image
																	src={FillExclamation}
																	width={24}
																	height={24}
																	alt=""
																/>
															</div>
															<span className="flex text-xs2FontSize items-center font-Roboto-Regularitalic  self-center text-[#000944] italic uppercase">
																<span> unverified </span>
																<span className="w-[13px] ml-2 mt-1">
																	<Image
																		src={InfoCircle}
																		width={15}
																		height={15}
																		alt=""
																		onClick={() => setOpenInfo(true)}
																	/>
																</span>
															</span>
														</div>
														<div className="pl-3">
															<div className="bg-gray-100 w-[1px] h-6 "></div>
														</div>
													</div>
													<div
														className="flex w-full items-center pr-10 justify-end hover:cursor-pointer"
														onClick={() => {
															data?.status != 'Active'
																? toast.warning('This device is sold out')
																: handleClick();
														}}
													>
														<span className="underline font-Roboto-Light text-smallFontSize">
															Click here to Request Verification
														</span>
													</div>
												</div>
											</div>
										)}
									</Fragment>
								)}
							</div>
						</div>
						<div className="flex font-Roboto-Light text-mediumFontSize text-black mb-1">
							Device Info
						</div>
						<div className="pr-2 pb-4">
							<div className="bg-gray-600 h-1 border-2 border-white"></div>
						</div>

						{data?.isOtherVendor === 'Y' ? (
							<div className="grid grid-cols-3 gap-x-0 gap-y-2 pr-2">
								<LabelAndValue
									label="Condition"
									value={data?.deviceCondition || '--'}
									labelTextSize
									showConditionInfoPopup={() => setConditionInfoPopup(true)}
								/>
								<LabelAndValue
									label="Listed on"
									value={data?.listingDate || '--'}
									labelTextSize
								/>
								<LabelAndValue
									label="Storage"
									value={data?.deviceStorage || '--'}
									labelTextSize
								/>
								<LabelAndValue
									label="RAM"
									value={data?.deviceRam || '--'}
									labelTextSize
								/>
								<LabelAndValue
									label="Brand Warranty"
									value={'Not Applicable'}
									labelTextSize
									showWarrantyInfoPopup={() => setOpenbrandWarrantyInfo(true)}
								/>
								<LabelAndValue
									label="Seller Warranty"
									value={data?.warranty || '--'}
									labelTextSize
									showWarrantyInfoPopup={() => setOpensellerWarrantyInfo(true)}
								/>
								<LabelAndValue
									label="Color"
									value={data?.color || '--'}
									labelTextSize
								/>
							</div>
						) : (
							<div className="grid grid-cols-3 gap-x-0 gap-y-2 pr-2">
								<LabelAndValue
									label="Condition"
									value={data?.deviceCondition || '--'}
									showConditionInfoPopup={() => setConditionInfoPopup(true)}
									labelTextSize
								/>
								{
									<LabelAndValue
										label="Brand Warranty"
										value={data?.warranty || '--'}
										showWarrantyInfoPopup={() => setOpenbrandWarrantyInfo(true)}
									/>
								}
								<LabelAndValue
									label="Seller Warranty"
									value={'Not Applicable'}
									labelTextSize
									showWarrantyInfoPopup={() => setOpensellerWarrantyInfo(true)}
								/>
								<LabelAndValue label="Color" value={data?.color || '--'} />
								<LabelAndValue
									label="Storage"
									value={data?.deviceStorage || '--'}
								/>
								<LabelAndValue label="RAM" value={data?.deviceRam || '--'} />
								{
									<LabelAndValue
										label="Verified on"
										value={data?.verifiedDate || 'Request Verification'}
										showInfoPopup={() => setOpenInfo(true)}
										showRequestVerificationSuccessPopup={() => {
											data?.status != 'Active'
												? toast.warning('This device is sold out')
												: handleClick();
										}}
										textAsLink={data?.verifiedDate != null ? false : true}
										labelTextSize
									/>
								}
								<LabelAndValue
									label="Listed on"
									value={data?.listingDate || '--'}
									labelTextSize
								/>
								{
									<LabelAndValue
										label="Accessories"
										value={accessoriesList.join(', ') || '--'}
										labelTextSize
									/>
								}
							</div>
						)}
						<div className="pr-2 py-4 font-Roboto-Light text-smallFontSize">
							*This phone might be old or refurbished
						</div>
						<div className="pr-2">
							<SellerDetailsCard
								data={data}
								comparisontableid="#Comparisontabl1"
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="">
						{data && data?.cosmetic && (
							<>
								<h2 className="mt-12 text-gray-20 font-Roboto-Light text-regularFontSize mb-3">
									Device Cosmetic Report
								</h2>
								<div className="pb-4">
									<div className="bg-gray-600 h-1 border-2"></div>
								</div>
							</>
						)}
						{data && data?.cosmetic && (
							<div className=" lg:flex  lg:flex-row-3  mx-2">
								{deviceConditionQuestion.map((item, index) => (
									<div className="px-2" key={index}>
										<span className="text-regularFontSize font-Roboto-Bold text-black truncate">
											{data?.cosmetic[index] != undefined && item?.title}
										</span>
										{data?.cosmetic[index] != undefined && (
											<ConditionOptionLarge2
												title={data?.cosmetic[index]}
												options={data?.cosmetic[index] && item?.options}
												conditionResults={data?.cosmetic}
												questionIndex={index}
											/>
										)}
									</div>
								))}
							</div>
						)}
					</div>
					{data?.functionalTestResults && data?.verified && (
						<div
							className="text-gray-20 font-Roboto-Light text-regularFontSize lg:my-3 py-9 "
							id="devicereport"
						>
							<span>Device Verification Report</span>
							<div className="pb-4">
								<div className="bg-gray-600 h-1 border-2 border-white"></div>
							</div>
						</div>
					)}
					<div className="flex flex-row w-full justify-evenly gap-8 pb-10">
						<div className="">
							{data?.functionalTestResults &&
								data?.functionalTestResults.map((items, index) => {
									return (
										index < data?.functionalTestResults.length / 2 && (
											<TestListItem
												key={index}
												testName={items.displayName}
												testStatus={items.testStatus}
											/>
										)
									);
								})}
						</div>
						<div className="lg:pl-28 pl-16 mb-8">
							{data?.functionalTestResults &&
								data?.functionalTestResults.map((items, index) => {
									return (
										index >= data?.functionalTestResults.length / 2 && (
											<TestListItem
												key={index}
												testName={items.displayName}
												testStatus={items.testStatus}
											/>
										)
									);
								})}
						</div>
					</div>
				</div>
				{data?.compareData && data?.compareData?.length > 0 && (
					<div id="Comparisontabl1">
						<p className="text-normal FontSize pt-6 pr-2 text-black-20 font-Roboto-Light border-b  border-black  capitalize mb-4 pb-1">
							Detailed Comparison Between Other Sellers for{' '}
							{data?.marketingName} ({data?.deviceStorage}
							{data?.make != 'Apple' && '/' + data?.deviceRam}) -{' '}
							{data?.deviceCondition} Condition
						</p>
						{data && (
							<div className="relative flex py-2">
								<Image
									src={
										ImageError
											? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
											: getDefaultImage(data?.marketingName) ||
											  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
									}
									onError={() => setImageError(true)}
									className=""
									height={120}
									width={90}
									alt="marketingName"
								/>
								<div className="flex flex-col justify-end relative  left-6">
									<p className="font-Roboto-Bold text-tx text-[#000944]">
										{data?.marketingName}
									</p>

									{data?.make != 'Apple' && (
										<p className="flex items-center space-x-1">
											<p className="font-Roboto-Medium text-ex text-[#000000] truncate">
												RAM :
											</p>
											<p className="font-Roboto-Bold text-jx pt-0.5 text-[#2C2F45]">
												{data?.deviceRam}
											</p>
										</p>
									)}

									<div className="flex space-x-1 items-center">
										<p className="font-Roboto-Medium text-ex text-[#000000] truncate">
											Storage :
										</p>
										<p className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
											{data?.deviceStorage}
										</p>
									</div>

									<div className="flex items-center space-x-1">
										<p className="font-Roboto-Medium text-ex text-[#000000] truncate">
											Condition :
										</p>
										<p className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
											{data?.deviceCondition}
										</p>
									</div>
								</div>
							</div>
						)}
						<div className="bg-gray-600 h-1 border-2 border-white "></div>
						<div className="pt-2 font-Roboto-Bold text-m-green-1 text-xl2FontSize flex flex-row"></div>
						<div className="flex">
							<span className="text-smallFontSize font-Roboto-light">
								*The products compared here are either used mobile phones,
								refurbished/renewed smartphone or second hand mobile phones.
								These are not new phones.
							</span>
						</div>
						{
							<ComparisonTable
								data={data?.compareData}
								listingId={data?.listingId !== undefined ? data?.listingId : []}
							/>
						}
						{data?.similarListTable && data?.similarListTable.length > 0 && (
							<div className="pt-16">
								<p className="text-normal FontSize pt-6 pr-2 text-black-20 font-Roboto-Light border-b  border-black  capitalize mb-4 pb-1">
									You may also like these deals
								</p>
								{
									<ComparisonTable2
										data={
											data?.similarListTable &&
											data?.similarListTable?.length > 0
												? data?.similarListTable
												: []
										}
										listingId={
											data?.listingId !== undefined ? data?.listingId : []
										}
									/>
								}
							</div>
						)}
					</div>
				)}
				<ComparisonTable />
			</div>

			{openWarrantyInfo && (
				<WarrantyInfo open={openWarrantyInfo} setOpen={setOpenWarrantyInfo} />
			)}

			{opensellerWarrantyInfo && (
				<SellerWarrantyInfo
					open={opensellerWarrantyInfo}
					setOpen={setOpensellerWarrantyInfo}
				/>
			)}

			{opensbrandWarrantyInfo && (
				<BrandWarrantyInfo
					open={opensbrandWarrantyInfo}
					setOpen={setOpenbrandWarrantyInfo}
				/>
			)}

			<DeviceVerificationReport
				open={openDeviceReport}
				setOpen={setOpenDeviceReport}
				data={data}
			/>
			<ConditionInfoPopup
				open={openConditionInfoPopup}
				setOpen={setConditionInfoPopup}
				data={data}
			/>
			<VerifiedInfoPopup open={openInfo} setOpen={setOpenInfo} />
			<RequestVerificationSuccessPopup
				open={openRequestVerificationSuccessPopup}
				setOpen={setRequestVerificationSuccessPopup}
				data={resData}
			/>

			<LoginPopup
				open={showLoginPopup}
				setOpen={setShowLoginPopup}
				redirect={false}
			/>
			<WarrantyInfo
				open={openWarrantyInfoPopup}
				setOpen={setWarrantyInfoPopup}
				data={data}
			/>
		</Fragment>
	);
}

export default ProductDetailsCard;

const TestListItem = ({ testName, testStatus }) => {
	return (
		<div className="flex items-center  justify-between py-3 lg:space-x-24 space-x-8">
			<p className="font-Roboto-Regular text-mediumFontSize">{testName}</p>
			<p className="flex items-center justify-between">
				<span className="mr-3 font-Roboto-Regular text-smallFontSize">
					{testStatus}
				</span>{' '}
				{testStatus === 'PASS' ? (
					<Image src={PassCheck} width={20} height={20} alt="" />
				) : (
					<Image src={Close} width={20} height={20} alt="" />
				)}
			</p>
		</div>
	);
};

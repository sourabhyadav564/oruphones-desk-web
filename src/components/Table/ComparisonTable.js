import React, { useEffect, useState } from 'react';
import InfoCircle from '@/assets/infocircle.svg';
import BrandWarrantyInfo from '@/components/Popup/BrandWarrantyInfo';
import LoginPopup from '@/components/Popup/LoginPopup';
import SellerWarrantyInfo from '@/components/Popup/SellerWarrantyInfo';
import ThisPhonePopup from '@/components/Popup/ThisPhonePopup';
import VerifiedInfoPopup from '@/components/Popup/VerifiedInfoPopup';
import { numberWithCommas } from '@/utils/util';
import Cookies from 'js-cookie';
import Image from 'next/image';

function ComparisonTable({ data, listingId }) {
	const [performAction2, setperformAction2] = useState(false);
	const [openLoginPopup, setOpenLoginPopup] = useState(false);
	const [vendorLink, setProductLink] = useState('');
	const [thisPhonePopup, setThisPhonePopup] = useState(false);
	const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
	const [opensellerWarrantyInfo, setOpensellerWarrantyInfo] = useState(false);
	const [opensbrandWarrantyInfo, setOpenbrandWarrantyInfo] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			if (
				openLoginPopup == false &&
				performAction2 == true &&
				Cookies.get('userUniqueId') !== undefined &&
				data?.vendorLink !== '' &&
				vendorLink !== ''
			) {
				window.open(vendorLink, '_blank');
				clearInterval(interval);
			} else if (
				openLoginPopup == false &&
				performAction2 == true &&
				Cookies.get('userUniqueId') !== undefined &&
				vendorLink == ''
			) {
				setThisPhonePopup(true);
				clearInterval(interval);
			}
		}, 1000);
	}, [openLoginPopup]);

	return (
		<div className="">
			{data && data?.length > 0 && (
				<div className="relative pt-3 lg:w-[80vw] w-full  overflow-x-scroll">
					<table className=" w-full text-mediumFontSize text-left text-gray-500 dark:text-gray-400">
						<thead className="uppercase text-white dark:bg-gray-700 dark:text-gray-400 font-Roboto-Semibold">
							<tr>
								<th
									scope="col"
									className=" sticky left-0 top-0 px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
								>
									Seller
								</th>
								<th
									scope="col"
									className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
								>
									Rank
								</th>
								<th
									scope="col"
									className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
								>
									Price
								</th>
								<th
									scope="col"
									className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
									onClick={() => setOpenbrandWarrantyInfo(true)}
								>
									<div className="flex justify-center items-center hover:cursor-pointer">
										<p className="">Brand Warranty</p>
										<Image src={InfoCircle} width={15} height={15} />
									</div>
								</th>

								<th
									scope="col"
									className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
								>
									<div
										className=" flex justify-center items-center hover:cursor-pointer"
										onClick={() => setOpensellerWarrantyInfo(true)}
									>
										<p className="">Seller Warranty</p>
										<Image src={InfoCircle} width={15} height={15} />
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
								>
									Accessories (Compatible)
								</th>
								<th
									scope="col"
									className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
								>
									Accessories (Original)
								</th>
								<th
									scope="col"
									className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
								>
									<div
										className="flex justify-center items-center hover:cursor-pointer"
										onClick={() => setOpenVerificationInfo(true)}
									>
										<p className="pr-1">Oru Verified</p>
										<Image src={InfoCircle} width={15} height={15} />
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
								>
									Location
								</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data?.map((item, index) => {
									return (
										<tr
											className={
												listingId == item?.listingId
													? ` bg-gray-100 border-b  dark:bg-gray-800 dark:border-gray-700 font-Roboto-Regular text-center`
													: ` bg-white  border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-scroll font-Roboto-Regular text-center `
											}
											key={index}
										>
											<th
												scope="row"
												className={
													listingId == item?.listingId
														? `bg-gray-100 sticky  left-0 top-0  px-6 py-4 font-medium hover:bg-gray-200 hover:text-black text-gray-400 whitespace-nowrap dark:text-white bg-gray drop-shadow-xl border-[1px]`
														: `sticky left-0 top-0 px-6 py-4 font-medium text-gray-400 whitespace-nowrap dark:text-white bg-white drop-shadow-xl border-[1px]`
												}
												onClick={() => {
													if (Cookies.get('userUniqueId') == undefined) {
														setOpenLoginPopup(true);
														setProductLink(item?.vendorLink);
														setperformAction2(true);
													} else if (
														listingId == item?.listingId &&
														item?.isOtherVendor == 'N'
													) {
														setThisPhonePopup(true);
													} else if (listingId != item?.listingId) {
														window.open(item?.vendorLink, '_blank');
													} else {
														window.open(item?.vendorLink, '_blank');
													}
												}}
											>
												<div className="flex  justify-between hover:cursor-pointer">
													{item?.listedBy ? (
														<div>
															<div
																className={`filter ${
																	listingId != item.listingId &&
																	'brightness-50 invert-1'
																} object-contain`}
															>
																{item?.listedBy}
															</div>
															<p className="text-[#2196f3ff] text-smallFontSize hover:cursor-pointer">
																View Deal &gt;{' '}
															</p>
														</div>
													) : (
														<div>
															<Image
																src={item?.vendorImage}
																height={35}
																width={70}
																className={
																	listingId != item?.listingId
																		? `filter brightness-50 invert-1 object-contain`
																		: `object-contain`
																}
																alt={'externalSourceImage'}
															/>
															<p className="text-[#2196f3ff] text-smallFontSize hover:cursor-pointer">
																View Deal &gt;{' '}
															</p>
														</div>
													)}
												</div>
											</th>
											<td className="px-2 py-4 border-[1px] font-Roboto-Semibold">
												{index + 1}
											</td>
											<td className="px-2 py-4 border-[1px] text-yellow2 font-Roboto-Semibold">
												₹ {numberWithCommas(item?.listingPrice)}
											</td>
											<td className="px-6 py-4  border-[1px]">
												{item?.isOtherVendor == 'N' ? item?.warranty : 'None'}
											</td>
											<td className="px-6 py-4  border-[1px]">
												{item?.isOtherVendor == 'N' ? 'None' : item?.warranty}
											</td>
											<td className="px-6 py-4 border-[1px]">
												{item?.isOtherVendor == 'Y'
													? item?.charger == 'Y'
														? item?.earphone == 'Y'
															? item?.originalbox == 'Y'
																? 'Phone Charger, Earphone, Phone Box'
																: 'Phone Charger, Earphone'
															: item?.originalbox == 'Y'
															? 'Phone Charger, Phone Box'
															: 'Phone Charger'
														: item?.earphone == 'Y'
														? item?.originalbox == 'Y'
															? 'Earphone, Phone Box'
															: 'Earphone'
														: item?.originalbox == 'Y'
														? 'Phone Box'
														: 'Not Available'
													: 'None'}
											</td>
											<td className="px-6 py-4 border-[1px]">
												{item?.isOtherVendor == 'N'
													? item?.charger == 'Y'
														? item?.earphone == 'Y'
															? item?.originalbox == 'Y'
																? 'Charger, Earphone, Original Box'
																: 'Charger, Earphone'
															: item?.originalbox == 'Y'
															? 'Charger, Original Box'
															: 'Charger'
														: item?.earphone == 'Y'
														? item?.originalbox == 'Y'
															? 'Earphone, Original Box'
															: 'Earphone'
														: item?.originalbox == 'Y'
														? 'Original Box'
														: 'Not Available'
													: 'None'}
											</td>
											<td className="px-6 py-4 border-[1px]">
												{item?.isOtherVendor == 'N'
													? item?.verified
														? 'Verified'
														: 'Not Verified'
													: 'None'}
											</td>
											<td className="px-2 py-4 border-[1px] font-Roboto-Semibold">
												{item?.listingLocation}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
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
			{openVerificationInfo && (
				<VerifiedInfoPopup
					open={openVerificationInfo}
					setOpen={setOpenVerificationInfo}
				/>
			)}
			<ThisPhonePopup open={thisPhonePopup} setOpen={setThisPhonePopup} />
			<LoginPopup
				open={openLoginPopup}
				setOpen={setOpenLoginPopup}
				fromAddListing
			/>
		</div>
	);
}

export default ComparisonTable;

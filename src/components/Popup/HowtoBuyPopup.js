import React, { useState } from 'react';
import AppleStore from '@/assets/apple_store.svg';
import PlayStore from '@/assets/playstore.svg';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '.';

function HowtoBuyPopup({ open, setOpen }) {
	const [qrValue1, setQrValue1] = useState(
		'https://apps.apple.com/in/app/oruphones/id1629378420'
	);

	const [qrValue2, setQrValue2] = useState(
		'https://play.google.com/store/apps/details?id=com.oruphones.oru'
	);

	return (
		<div>
			<Modal open={open} setOpen={setOpen} title={'Steps On How to Buy Phone'}>
				<div className="px-16 py-16  m-auto justify-center h-[80vh] overflow-y-scroll mostly-customized-scrollbar">
					<div className="flex pb-8  justify-start items-center">
						<div className="flex flex-col items-center justify-center m-auto">
							<Image src={AppleStore} width={96} height={96} alt="" />
							<Link href={qrValue1}>
								<a className="w-32 h-10 bg-app-store bg-contain mt-2"></a>
							</Link>
						</div>
						<div className="flex flex-col items-center justify-center m-auto">
							<Image src={PlayStore} width={96} height={96} alt="" />
							<Link href={qrValue2}>
								<a className="w-32 h-10 bg-play-store bg-contain mt-2"></a>
							</Link>
						</div>
					</div>
					<p className="font-Roboto-Semibold text-center text-[24px] w-[350px]">
						Download our App using these QR Codes
					</p>
					<div className="flex items-center">
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/1.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Browse in Shop By Brand for specific brand
						</p>
					</div>
					<div className="flex items-center">
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							You can buy through search, Buy now and scroll for best deals.
						</p>
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/2.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
					</div>
					<div className="flex items-center">
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/3.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Select your location from top bar. You can select from this popup.
						</p>
					</div>
					<div className="flex items-center">
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Click on the filter icon to add specific filters.
						</p>
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/4.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
					</div>
					<div className="flex items-center">
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/5.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Choose Brand Name, Storage, Ram, Condition and Warranty.
						</p>
					</div>
					<div className="flex items-center">
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Now open desired deal from all the available products.
						</p>
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/6.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
					</div>
					<div className="flex items-center">
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/7.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Scroll down to view Device details.
						</p>
					</div>
					<div className="flex items-center">
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Click on Contact Seller to request verification.
						</p>
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/9.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
					</div>
					<div className="flex items-center">
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/8.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							You can also view other deals of same model.
						</p>
					</div>
					<div className="flex items-center">
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Go to Home and Click on Three lines on top left corner and click
							on verification for buyer tile.
						</p>
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/10.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
					</div>
					<div className="flex items-center">
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/12.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Enter your Mobile Number to get start verification in seller's
							device.
						</p>
					</div>
					<div className="flex items-center">
						<p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center">
							Wait for Diagnostic check. Once it completes you can contact the
							seller.
						</p>
						<Image
							src={
								' https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/11.webp'
							}
							width={150}
							height={300}
							alt=""
							className="object-contain"
						/>
					</div>
					<div>
						<p className=" text-[20px] font-Roboto-Semibold text-center py-4">
							We wish you a happy shopping.
						</p>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default HowtoBuyPopup;

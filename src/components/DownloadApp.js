import { useState } from 'react';
import AppleStore from '@/assets/apple_store.svg';
import PlayStore from '@/assets/playstore.svg';
import Image from 'next/image';

function DownloadApp() {
	const [qrValue1, setQrValue1] = useState(
		'https://apps.apple.com/in/app/oruphones/id1629378420'
	);

	const [qrValue2, setQrValue2] = useState(
		'https://play.google.com/store/apps/details?id=com.oruphones.oru'
	);

	return (
		<section className="w-full pt-5">
			<div
				className="flex flex-col sm:flex-row justify-between items-center p-4 pt-12 sm:p-12 bg-bg-mask-1 bg-no-repeat bg-cover sm:bg-center bg-m-green text-white rounded-md"
				data-aos="zoom-in"
			>
				<div className="px-8">
					<p className="pb-4 font-Roboto-Bold md:text-[40px] text-[28px] ">
						Download ORUphones app
					</p>
					<p className="font-Roboto-Medium md:text-[24px] text-[20px]">
						Want to get the best price for your mobile or want to get a mobile
						at your best price, ORUphones app is the one stop solution.
					</p>
				</div>
				<div className="flex space-x-5 pt-4 sm:pt-0 justify-start">
					<div className="flex flex-col justify-end">
						<Image src={AppleStore || ''} width={86} height={86} alt="" />
						<a target={'_blank'} rel="noreferrer" href={qrValue1}>
							<p className="w-32 hover:scale-105 mt-2 h-10 bg-app-store bg-no-repeat bg-contain" />
						</a>
					</div>
					<div className="flex flex-col justify-end">
						<Image src={PlayStore || ''} width={86} height={86} alt="" />
						<a target={'_blank'} rel="noreferrer" href={qrValue2}>
							<p className="w-32 mt-2 hover:scale-105 h-10 bg-play-store bg-no-repeat bg-contain" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default DownloadApp;

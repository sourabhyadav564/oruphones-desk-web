import React, { useState } from 'react';
import AppDownloadPopup from '@/components/Popup/AppDownloadPopup';

export default function Hero() {
	const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);
	const handleClick = () => {
		setShowAppDownloadPopup(true);
	};

	return (
		<section className="flex-grow w-full  px-0 ">
			<img
				className="hover:cursor-pointer"
				data-aos="fade-down"
				src={'https://d1tl44nezj10jx.cloudfront.net/web/assets/banner_4.webp'}
				alt="BannerImage"
				priority
				onClick={() => handleClick()}
			/>
			<AppDownloadPopup
				open={showAppDownloadPopup}
				setOpen={setShowAppDownloadPopup}
			/>
		</section>
	);
}

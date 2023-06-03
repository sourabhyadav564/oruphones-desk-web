import { Fragment, useState } from 'react';
import AppDownloadPopup from '@/components/Popup/AppDownloadPopup';
import LoginPopup from '@/components/Popup/LoginPopup';
import { useRouter } from 'next/router';

function SellNowBtn() {
	const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);
	const handleClick = () => {
		setShowAppDownloadPopup(true);
	};
	return (
		<Fragment>
			<button
				style={{
					boxShadow: '0px 0px 20px #002c2f44',
				}}
				className=" bg-m-yellow-1  py-1 w-20 h-8 rounded-md border-2   md:border-m-yellow-1 hover:border-white text-m-green-1 text-smallFontSize self-center items-center font-Roboto-Semibold hover:bg-[rgb(44,47,69)] duration-500 hover:border-[rgb(44,47,69)] hover:text-white hover:scale-110"
				onClick={() => handleClick()}
			>
				Sell Now
			</button>
			<AppDownloadPopup
				open={showAppDownloadPopup}
				setOpen={setShowAppDownloadPopup}
			/>
		</Fragment>
	);
}

export default SellNowBtn;

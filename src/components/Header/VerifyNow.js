import { Fragment, useState } from 'react';
import AppDownloadPopup from '@/components/Popup/AppDownloadPopup';


function verifyNow() {
	const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);
	const handleClick = () => {
		setShowAppDownloadPopup(true);
	};
	return (
		<Fragment>
			<p
				className="text-xs cursor-pointer self-end"
				style={{ color: '#00A483' }}
                onClick={() => handleClick()}
                >
				<a>VERIFY NOW</a>
			</p>
			<AppDownloadPopup
				open={showAppDownloadPopup}
				setOpen={setShowAppDownloadPopup}
			/>
		</Fragment>
	);
}

export default verifyNow;

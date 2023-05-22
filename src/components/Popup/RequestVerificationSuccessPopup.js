import { useEffect, useState } from 'react';
import Modal2 from './Model2';
import Alert from '@/assets/alert.svg';
import gcheck from '@/assets/gcheck.svg';
import Loader from '@/components/Loader/Loader';
import Image from 'next/image';

function RequestVerificationSuccessPopup({ open, setOpen, data }) {
	const [resData, setResData] = useState(data);
	const [listingid, setListingid] = useState(data?.listingId);
	const [statuscode, setStatuscode] = useState(data?.statusCode);

	useEffect(() => {
		setListingid(data?.listingId);
		setStatuscode(data?.statusCode);
	}, [data]);

	return (
		<Modal2 open={open} setOpen={setOpen}>
			<div className="flex flex-col items-center max-w-lg py-4 px-6 text-base text-black-4e">
				{statuscode ? (
					<>
						{statuscode === 200 ? (
							<Image src={gcheck} width={32} height={32} />
						) : (
							<Image src={Alert} width={40} height={40} alt="" />
						)}
						<p className="font-Roboto-Bold my-2 text-lg">
							{statuscode === 200 ? 'Request Sent' : 'Request Already Sent'}
						</p>
						<p className="text-md my-2 text-center font-Roboto-Regular">
							{statuscode === 200
								? 'You will receive a notification once Seller completes verification.'
								: 'You have already sent verification request for this listing.'}
							<br />{' '}
							{statuscode === 200
								? 'This listing will also be added to My Favorites'
								: 'You will receive a notification once Seller completes verification. A new verification request can only be sent after 7 days of the previous request.'}
						</p>
					</>
				) : (
					<div className="font-Roboto-Regular">
						<Loader />
						<p className="text-mx">
							Your verification request will be sent soon...
						</p>
					</div>
				)}
				<div className="mb-2 mt-4 font-Roboto-Regular">
					<button
						className="bg-m-green w-32 px-4 py-2 rounded text-white"
						onClick={(e) => {
							setOpen(false);
						}}
					>
						{' '}
						OK{' '}
					</button>
				</div>
			</div>
		</Modal2>
	);
}

export default RequestVerificationSuccessPopup;

import { useState } from 'react';
import { toast } from 'react-toastify';
import React from 'react';
import Input from '@/components/Form/Input';
import { gradePhone } from 'api/axios';
import Cookies from 'js-cookie';
import AppDownloadPopup from '../../../../components/Popup/AppDownloadPopup';
import { useRouter } from 'next/router';

function Index() {
	const [reportID, setReportID] = useState('');
	const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);

	const router = useRouter();

	const handleClick = () => {
		router.push('/user/services/price-comparison/myreports');
	};

	return (
		<>
			<div className=" flex flex-col items-left justify-center pt-20 text-left px-20 pb-4   ">
				<p className=" text-4xl text-fx font-Roboto-Medium px-20">
					{' '}
					Get grade of your phone
				</p>

				<div className="flex flex-col items-left justify-left pt-10 text-left px-20 pb-12 font-Roboto-Medium ">
					<p className="text-gx ">
						It will perform a series of test to determine the grade of your
						phone and then choose the cosmetic condition of your phone.{' '}
					</p>
					<p className="text-gx  ">
						You can also verify or download the report by entering the report
						ID.
					</p>
				</div>

				<p className="px-20 text -3xl font-semibold pb-2 ">Enter Report ID</p>

				<div className="flex items-left text-px justify-left pt-2 px-20 ">
					<Input
						type="text"
						prefix="ORU-"
						placeholder="Report ID"
						id="reportID"
						className="w-96 text-left  bg-white border-black  "
						onChange={(e) => {
							setReportID(e.target.value);
						}}
					/>
				</div>
				<div className=" text-px justify-left pt-8 px-20 ">
					<button
						className=" border-2 border-primary text-tx text-primary-light
              py-2 px-4  font-Roboto-Semibold rounded-lg w-52 text-white bg-m-green  "
						onClick={() => {
							gradePhone(reportID, Cookies.get('sessionId')).then((res) => {
								if (res?.dataObject?.reportLink !== 'No report found') {
									toast.success('Report downloaded successfully', {
										toastId: '021',
										position: toast.POSITION.TOP_CENTER,
									});
									window.open(res?.dataObject?.reportLink);
									console.log(res);
								} else {
									console.log(res);
									toast.warning('Report not found', {
										toastId: '020',
										position: toast.POSITION.TOP_CENTER,
									});
								}
							});
						}}
					>
						Verify Report / Download Report
					</button>
					<button
						className=" border-2 border-primary text-tx text-primary-light
               py-2 pb-8  font-Roboto-Semibold rounded-lg w-52 text-white bg-m-green 
              "
						onClick={handleClick}
					>
						Download My Reports{' '}
					</button>

					<div className="pt-2 px-2">
						<button
							className=" border-2 border-primary text-tx bg-primary py-2 font-Roboto-Semibold rounded-lg w-96"
							onClick={() => {
								setShowAppDownloadPopup(true);
							}}
						>
							Get Grade Report
						</button>
					</div>
				</div>
			</div>

			<AppDownloadPopup
				open={showAppDownloadPopup}
				setOpen={setShowAppDownloadPopup}
			/>
		</>
	);
}

export default Index;

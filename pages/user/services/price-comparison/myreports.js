import { useState } from 'react';
import { gradePhone } from 'api/axios';
import Cookies from 'js-cookie';
import Loader from '@/components/Loader/Loader';

function myReports() {
	const [Myreports, setMyreports] = useState();
	const [reportID, setReportID] = useState('');
	const [myReportSelected, setMyReportSelected] = useState(true);
	const [isLoading, setLoading] = useState(true);

	gradePhone(
		reportID,
		Cookies.get('sessionId'),
		Cookies.get('userUniqueId'),
		true
	).then((res) => {
		setMyreports(res?.dataObject?.reports);
		setLoading(false);
	});

	return (
		<>
			{isLoading && (
				<div className="flex h-60 items-center justify-center text-xlFontSize font-Roboto-Regular">
					<Loader />
					Please wait, while we are fetching your reports...
				</div>
			)}
			{myReportSelected == true &&
				Myreports &&
				Myreports.length > 0 &&
				Myreports.map((item, index) => (
					<div className="bg-white px-4 py-2 flex flex-col rounded-lg  px-20 font-Roboto-Semibold ">
						<p>{item?.src}-Report</p>
						<p>ReportID: {item?.reportId}</p>
						<p className=" pb-4">Generated On: {item?.createdAt}</p>
						<button
							onClick={() => {
								window.open(item?.filePath);
							}}
							className=" border-2 border-primary px-4  text-tx text-primary-light
             py-1 mb-2  rounded-lg w-52 text-white bg-m-green"
						>
							Download
						</button>
					</div>
				))}
			{Myreports && Myreports.length == 0 && myReportSelected == true && (
				<div className="flex justify-center items-center h-96">
					<p className="text-2xl font-Roboto-Medium">No Reports Found</p>
				</div>
			)}
		</>
	);
}

export default myReports;

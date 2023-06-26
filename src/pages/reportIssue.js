import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Axios from '@/api/axios';
import Input from '@/components/Form/Input';
import MySelect from '@/components/Form/Select';
import ReportIssuePopup from '@/components/Popup/ReportIssuePopup';
import 'react-toastify/dist/ReactToastify.css';
import useUser from '@/hooks/useUser';
import reportIssue from '@/utils/fetchers/reportIssue';
import Head from 'next/head';

function Report_a_problem() {
	const [make, setMake] = useState(null);
	const [makeOptions, setMakeOptions] = useState([]);
	const [marketingName, setmarketingName] = useState(null);
	const [modelOptions, setModelOptions] = useState([]);
	const [storage, setStorage] = useState(null);
	const [colorAndStorageOption, setColorAndStorageOption] = useState([]);
	const [issue, setIssue] = useState(null);
	const [Name, setName] = useState('');
	const [Email, setEmail] = useState('');
	const [Phone, setPhone] = useState('');
	const [callTime, setCallTime] = useState('');
	const [check, setCheck] = useState(false);
	const [description, setDescription] = useState('');
	const [ScheduleCall, setScheduleCall] = useState(false);
	const [openReportIssuePopup, setOpenReportIssuePopup] = useState(false);
	const { user, isLoggedIn } = useUser();

	useEffect(() => {
		setName(user?.userName);
		setEmail(user?.email);
		setPhone(user?.mobileNumber);
	}, [user]);

	useEffect(() => {
		const whatever = async () => {
			if (make) {
				const models = await Axios.fetchModelList('Guest', '', make, '');
				if (models?.dataObject[0]?.models) {
					const sortedModels = models.dataObject[0].models.sort((a, b) => {
						return a.marketingname.localeCompare(b.marketingname);
					});
					setModelOptions(sortedModels);
				}
			}
		};
		whatever();
	}, [make]);

	useEffect(() => {
		const whatever = async () => {
			const data = await Axios.fetchModelList('Guest', '', '', '');
			let makeModelLists = data?.dataObject;
			if (makeModelLists) {
				makeModelLists.sort((a, b) => {
					return a.make.localeCompare(b.make);
				});
				setMakeOptions(makeModelLists);
			}
		};
		whatever();
	}, []);

	useEffect(() => {
		modelOptions?.map((item) => {
			if (item['marketingname'] == marketingName) {
				setColorAndStorageOption(item);
			}
		});
	}, [marketingName]);

	const issueTypeOption = [
		'Verification Issue',
		'Listing Issue',
		'Service Issue',
		'Functionality Issue',
		'Other',
	];

	const validateEmail = (email) => {
		if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
			setEmail(email);
			return true;
		} else {
			toast.warning(`Please enter valid email address`, {
				toastId: '021',
				position: toast.POSITION.TOP_CENTER,
			});
			return false;
		}
	};

	const handleSubmit = () => {
		if (
			Name &&
			Email &&
			Phone &&
			issue &&
			marketingName &&
			description &&
			storage
		) {
			if (validateEmail(Email)) {
				reportIssue({
					name: Name,
					email: Email,
					phone: Phone,
					description,
					modelName: marketingName,
					ScheduleCall,
					issueType: issue,
				})
					.then(() => {
						setMake(null);
						setmarketingName(null);
						setStorage(null);
						setCallTime('');
						setCheck(false);
						setDescription('');
						setScheduleCall(false);
						setOpenReportIssuePopup(true);
					})
					.catch(() => {
						toast.error('Please fill all the fields in the report.', {
							toastId: '020',
							position: toast.POSITION.TOP_CENTER,
						});
					});
			}
		} else {
			toast.warning(`Please enter valid details`, {
				toastId: '017',
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	return (
		<Fragment>
			<Head>
				<title>Report a Problem | OruPhones</title>
				<meta
					name="description"
					content="Report a problem with your phone or the website"
				/>
				<meta
					name="og:title"
					property="og:title"
					content="Report a Problem | OruPhones"
				/>
				<meta
					name="og:description"
					property="og:description"
					content="Report a problem with your phone or the website"
				/>
			</Head>
			<div className="container my-8">
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
					<MySelect
						star="*"
						labelName="Brand"
						required
						value={make === null ? 'Select...' : { label: make, value: make }}
						onChange={(e) => {
							setMake(e.value);
						}}
						options={makeOptions?.map((item) => {
							return { label: item.make, value: item.make };
						})}
					></MySelect>
					<MySelect
						value={
							marketingName === null
								? 'Select..'
								: { label: marketingName, value: marketingName }
						}
						star="*"
						labelName="Model"
						onChange={(e) => {
							setmarketingName(e.value);
						}}
						options={modelOptions?.map((item) => {
							return {
								label: item.marketingname,
								value: item.marketingname,
							};
						})}
					></MySelect>
				</div>

				<div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
					<MySelect
						value={
							storage === null ? 'Select..' : { label: storage, value: storage }
						}
						star="*"
						labelName="Storage"
						onChange={(e) => {
							setStorage(e.value);
						}}
						options={colorAndStorageOption?.storage?.map((item) => {
							return { label: item, value: item };
						})}
					></MySelect>
					<MySelect
						value={issue === null ? 'Select..' : { label: issue, value: issue }}
						star="*"
						// onfocus={requiredFields}
						labelName="Issue Type"
						onChange={(e) => {
							setIssue(e.value);
						}}
						options={issueTypeOption?.map((item) => {
							return { label: item, value: item };
						})}
					></MySelect>
				</div>

				<div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
					<Input
						type="text"
						placeholder="Issue Description"
						name="username"
						minLength="30"
						maxLength="500"
						lableclass={'bg-white'}
						borderclass={'border-[#00000130] opacity-90'}
						inputClass={'py-3'}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						required
					>
						Issue Description<span className="text-red opacity-60">*</span>
					</Input>

					<Input
						type="email"
						placeholder="Enter an Email"
						name="Email"
						lableclass={'bg-white'}
						defaultValue={Email}
						inputClass={'py-3'}
						borderclass={'border-[#00000130] opacity-90'}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						required
					>
						Email<span className="text-red opacity-60">*</span>
					</Input>
				</div>

				<div className="grid md:grid-cols-2 grid-cols-1 my-4 gap-4">
					<Input
						type="text"
						maxLength={10}
						pattern="[0-9]*"
						prefix="+91-"
						placeholder="Enter Your Phone Number"
						name="Phone"
						lableclass={'bg-white'}
						defaultValue={Phone}
						borderclass={'border-[#00000130] opacity-90'}
						inputClass={'py-3'}
						required
						onChange={(e) => {
							setPhone(e.target.value);
						}}
					>
						Phone<span className="text-red opacity-60">*</span>
					</Input>

					<Input
						type="text"
						placeholder="Enter Your Name"
						name="Name"
						minLength="3"
						lableclass={'bg-white '}
						defaultValue={Name}
						borderclass={'border-[#00000130] opacity-90'}
						inputClass={'py-3'}
						required
						onChange={(e) => {
							setName(e.target.value);
						}}
					>
						Name<span className="text-red opacity-60">*</span>
					</Input>
				</div>

				<div className="my-4">
					<div className="my-4"></div>
					<div className="my-4"></div>
					<label>
						<div className="py-4 flex items-center gap-2">
							<input
								type="checkbox"
								className="appearance-none checked:bg-m-green  focus:ring-0 "
								value={ScheduleCall}
								onChange={(e) => {
									if (e.target.checked) {
										setCheck(true);
										setScheduleCall(!ScheduleCall);
									} else {
										setCheck(false);
									}
								}}
							/>

							<p>Schedule a call back</p>
						</div>
					</label>
					{!check ? (
						''
					) : (
						<form className="gap-2">
							<div className="items-center">
								{' '}
								<label>
									{' '}
									<input
										type="radio"
										className="checked:bg-m-green border  focus:ring-0 "
										value={' 09:00AM-12:00PM'}
										name="time"
										onChange={(e) => {
											if (e.target.checked) {
												setCallTime(e.target.value);
											}
										}}
									/>{' '}
									09:00AM-12:00PM{' '}
								</label>
							</div>
							<br />
							<div className="items-center">
								<label>
									{' '}
									<input
										type="radio"
										name="time"
										className="checked:bg-m-green  focus:ring-0 "
										value={'12:00PM-03:00PM'}
										onChange={(e) => {
											if (e.target.checked) {
												setCallTime(e.target.value);
											}
										}}
									/>{' '}
									12:00PM-03:00PM{' '}
								</label>
							</div>
							<br />
							<div className="items-center">
								<label>
									{' '}
									<input
										type="radio"
										name="time"
										className="checked:bg-m-green  focus:ring-0 "
										value={' 03:00PM-06:00PM '}
										onChange={(e) => {
											if (e.target.checked) {
												setCallTime(e.target.value);
											}
										}}
									/>{' '}
									03:00PM-06:00PM{' '}
								</label>
							</div>
							<br />
							<div className="items-center">
								<label>
									{' '}
									<input
										type="radio"
										name="time"
										className="checked:bg-m-green  focus:ring-0 "
										value={'06:00PM-09:00PM'}
										onChange={(e) => {
											if (e.target.checked) {
												setCallTime(e.target.value);
											}
										}}
									/>{' '}
									06:00PM-09:00PM{' '}
								</label>{' '}
							</div>
						</form>
					)}
				</div>
				<div className="flex justify-center">
					<button
						className="border w-4/12  py-1 rounded-full font-Roboto-Semibold text-white bg-m-green"
						onClick={() => {
							handleSubmit();
						}}
					>
						Submit
					</button>
				</div>
			</div>
			<ReportIssuePopup
				open={openReportIssuePopup}
				setOpen={setOpenReportIssuePopup}
			/>
		</Fragment>
	);
}

export default Report_a_problem;

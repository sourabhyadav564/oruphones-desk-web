import { Fragment, useEffect, useRef, useState } from 'react';
import VerifyOtpPopup from './VerifyOtpPopup';
import * as Axios from '@/api/axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Modal from '.';

const DynamicTermsAndCondition = dynamic(
	() => import('./TermAndConditionPopup'),
	{ ssr: false, loading: () => <p>Loading...</p> }
);

function LoginPopup({ open, setOpen, redirect }) {
	const [openTermAndCondPopup, setOpenTermAndCondPopup] = useState(false);
	const [isVerifyStep, setIsVerifyStep] = useState(false);
	const inputRef = useRef();

	const [formData, setFormData] = useState({ termsAndCondition: true });

	useEffect(() => {
		if (open) {
			setOpenTermAndCondPopup(false);
			setIsVerifyStep(false);
		}
	}, [open]);

	const handleChange = (e) => {
		const { name, type } = e.target;
		const value = type === 'checkbox' ? e.target.checked : e.target.value;
		setFormData({ ...formData, [name]: value });
		if (name === 'mobile') {
			e.target.setCustomValidity('');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const mobNumber = formData?.mobile?.split('-');
		const value = mobNumber && mobNumber[1];
		if (value && value.length === 10) {
			const response = await Axios.signUp(value);
			setIsVerifyStep(response?.status === 'SUCCESS');
		} else {
			inputRef.current.setCustomValidity('Please enter valid mobile number');
			inputRef.current.reportValidity();
		}
	};

	return (
		<Modal open={open} setOpen={setOpen}>
			{!isVerifyStep ? (
				<Fragment>
					<div className="container max-w-xl grid place-items-center py-8">
						<div>
							<Image
								src={
									'https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg'
								}
								alt="ORUPhones"
								width={100}
								height={40}
								className="md:w-96 w-60 h-96 "
							/>
						</div>
						<form
							onSubmit={handleSubmit}
							className="md:m-16 m-8 mt-4 md:px-6 flex flex-col space-y-4 items-center justify-center md:w-96"
						>
							<h2
								className="md:text-xl3FontSize  font-Roboto-Bold py-5 text-center"
								style={{ color: '#2c2f44' }}
							>
								Sign In
							</h2>
							<div className="outline outline-none relative w-full focus:outline-none font-Roboto-Semibold text-xlFontSize">
								<input
									ref={inputRef}
									type="text"
									name="mobile"
									title="Please enter valid mobile number"
									required
									className="block p-4 w-full rounded appearance-none ring-0 focus:ring-0 bg-transparent"
									style={{ border: '1px solid #0000001F', color: '#00000099' }}
									value={formData?.mobile || '+91-'}
									onChange={(e) => {
										let input = e.target.value;
										if (!isNaN(input.substr(4).trim()) && input.length > 4) {
											e.target.value =
												'+91-' + parseInt(input.substr(4).trim());
										} else if (
											typeof input.substr(4).trim() === 'string' &&
											input.length > 4
										) {
											return null;
										} else {
											e.target.value = '+91-' + input.substr(4).trim();
										}
										handleChange(e);
									}}
								/>
								<label
									htmlFor="mobile"
									className="absolute top-0 md:text-xlFontSize text-regularFontSize font-Roboto-Light bg-white px-4 mt-1 -z-1 duration-300 origin-0"
									style={{ color: '#00000099' }}
								>
									Mobile No
								</label>
							</div>
							<div className="flex justify-center items-center">
								<input
									type="checkbox"
									name="termsAndCondition"
									defaultChecked={formData?.termsAndCondition || false}
									onChange={handleChange}
									className="border-gray-300 rounded md:text-xl2FontSize text-smallFontSize   text-m-green focus:ring-transparent"
								/>
								<label
									className="ml-2 underline cursor-pointer md:text-regularFontSize text-smallFontSize font-Roboto-Regular"
									onClick={() => setOpenTermAndCondPopup(true)}
								>
									Accept terms and conditions
								</label>
							</div>
							<button
								disabled={!formData?.termsAndCondition}
								className="w-full bg-m-green px-4 py-3 shadow-2xl rounded-lg md:text-xlFontSize text-regularFontSize font-Roboto-Regular text-white block disabled:cursor-not-allowed disabled:opacity-50"
							>
								NEXT
							</button>
						</form>
					</div>
					{open && (
						<DynamicTermsAndCondition
							open={openTermAndCondPopup}
							setOpen={setOpenTermAndCondPopup}
						/>
					)}
				</Fragment>
			) : (
				<VerifyOtpPopup setOpen={setOpen} data={formData} redirect={redirect} />
			)}
		</Modal>
	);
}

export default LoginPopup;

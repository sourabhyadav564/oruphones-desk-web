import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '@/components/Form/Input';
import UserProfile from '@/components/User/UserProfile';
import useUser from '@/hooks/useUser';
import update from '@/utils/fetchers/user/update';
import Head from 'next/head';

function Profile() {
	const { user, setUser } = useUser();
	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [oruMitraId, setOruMitraId] = useState<string>();
	const [mobileNumber, setMobileNumber] = useState<string>();
	const [saveChange, setSaveChange] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		let payload = {
			...(name && { userName: name }),
			...(email && { email }),
			...(mobileNumber && { mobileNumber: mobileNumber }),
		};
		try {
			await update(payload);
			setUser({
				...user!,
				...(name && { userName: name }),
				...(email && { email }),
				...(mobileNumber && { mobileNumber: mobileNumber }),
			});
			toast.success('Profile updated successfully');
		} catch (error) {
			toast.error("Couldn't update profile");
		}
	};

	const handleReferral = async (isLinking: boolean, referral?: string) => {
		try {
			await update({
				isLinking,
				...(referral && { referral }),
			});
			setUser({
				...user!,
				...(isLinking
					? { associatedWith: referral }
					: { associatedWith: undefined }),
			});
			toast.success('Referral updated successfully');
		} catch (error) {
			toast.error("Couldn't update Referral");
		}
	};

	return (
		<>
			<Head>
				<title>Profile | OruPhones</title>
				<meta
					name="description"
					content="OruPhones is a platform to buy and sell used phones"
				/>
			</Head>
			<UserProfile className="mb-10">
				<div className="px-12 py-4">
					<h1 className="text-xl2FontSize font-Roboto-Semibold py-3">
						{' '}
						Profile Information{' '}
					</h1>
					<form
						className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-8 "
						onSubmit={handleSubmit}
					>
						<Input
							type="text"
							maxLength="30"
							name="username"
							defaultValue={user?.userName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setSaveChange(true);
								setName(e.target.value);
							}}
							className={undefined}
							inputClass={undefined}
							prefix={undefined}
							lableclass={undefined}
							borderclass={undefined}
							errorClass={undefined}
						>
							Name
						</Input>
						<span className="block" />
						<Input
							type="tel"
							name="mobile"
							defaultValue={user?.mobileNumber}
							value={`+91 ${user?.mobileNumber}` || ''}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setSaveChange(true);
								setMobileNumber(e.target.value);
							}}
							disabled
							className={undefined}
							inputClass={undefined}
							prefix={undefined}
							lableclass={undefined}
							borderclass={undefined}
							errorClass={undefined}
						>
							Mobile No
						</Input>
						<span className="block" />
						<Input
							type="email"
							defaultValue={user?.email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setSaveChange(true);
								setEmail(e.target.value);
							}}
							name={undefined}
							className={undefined}
							inputClass={undefined}
							prefix={undefined}
							lableclass={undefined}
							borderclass={undefined}
							errorClass={undefined}
						>
							Email ID
						</Input>
						<span className="block" />

						<div className="flex flex-row space-x-2">
							{(!user?.associatedWith && user?.associatedWith == '') ||
							user?.associatedWith == undefined ? (
								<Input
									type="text"
									defaultValue={user?.associatedWith}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setOruMitraId(e.target.value);
									}}
									name={undefined}
									className={undefined}
									inputClass={undefined}
									prefix={undefined}
									lableclass={undefined}
									borderclass={undefined}
									errorClass={undefined}
								>
									ORU-Mitra ID
								</Input>
							) : (
								<Input
									type="text"
									defaultValue={user?.associatedWith}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setOruMitraId(e.target.value);
									}}
									disabled
									name={undefined}
									className={undefined}
									inputClass={undefined}
									prefix={undefined}
									lableclass={undefined}
									borderclass={undefined}
									errorClass={undefined}
								>
									ORU-Mitra ID
								</Input>
							)}

							{(!user?.associatedWith && user?.associatedWith == '') ||
							user?.associatedWith == undefined ? (
								<button
									className="bg-m-green text-white px-4 py-2 rounded-md font-Roboto-Semibold text-regularFontSize uppercase"
									onClick={() => handleReferral(true, oruMitraId)}
									type="button"
								>
									Link
								</button>
							) : (
								<button
									className="text-m-green border border-m-green px-4 py-2 rounded-md font-Roboto-Semibold text-regularFontSize uppercase"
									onClick={() => handleReferral(false)}
									type="button"
								>
									Delink
								</button>
							)}
						</div>
						<span className="block"></span>
						<div className=" grid  grid-cols-1 gap-8 ">
							<button
								type="submit"
								className={` px-12 rounded text-white text-regularFontSize font-Roboto-Semibold uppercase py-2 
							bg-m-green disabled:bg-gray-1'
							} hover:bg-m-green`}
								disabled={!saveChange}
							>
								Save
							</button>
							<button></button>
						</div>
					</form>
				</div>
			</UserProfile>
		</>
	);
}

export default Profile;

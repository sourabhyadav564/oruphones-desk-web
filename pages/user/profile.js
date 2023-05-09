import React, { useEffect, useRef } from 'react';
import Input from '../../components/Form/Input';
import UserProfile from '../../components/User/UserProfile';
import * as Axios from '../../api/axios';
import { useState, useContext } from 'react';
import AppContext from '@/context/ApplicationContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

function Profile() {
	const { userInfo, setUserInfo } = useContext(AppContext);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [oruMitraId, setOruMitraId] = useState();
	const mobileNumber = useRef(Cookies.get('mobileNumber'));
	const [saveChange, setSaveChange] = useState(false);
	const [link, setLink] = useState(false);
	console.log('setUserInfo : ', userInfo?.userdetails?.associatedWith);

	const handleSubmit = (e) => {
		e.preventDefault();
		let payload = {
			email: email || userInfo?.userdetails?.email,
			mobileNumber: userInfo?.userdetails?.mobileNumber,
			userName: name || userInfo.userdetails?.userName,
			userUniqueId: Cookies.get('userUniqueId'),
		};

		Axios.updateUserDetails(payload).then((res) => {
			Axios.getUserProfile('91', mobileNumber?.current).then((resp) => {
				setUserInfo(resp.dataObject);
				toast.info('Profile information saved successfully', {
					position: toast.POSITION.TOP_CENTER,
				});
			});
		});
	};

	const handleLink = () => {
		Axios.AttachId(
			userInfo?.userdetails?.userUniqueId,
			oruMitraId,
			Cookies.get('sessionId')
		).then((res) => {
			if (res?.reason == 'ORU-Mitra attached successfully') {
				setLink(true);
				toast.info('ORU-Mitra ID Linked Successfully', {
					position: toast.POSITION.TOP_CENTER,
				});
				// Axios.getUserProfile("91", mobileNumber?.current).then(
				//   (resp) => {
				//     setUserInfo(resp.dataObject);
				//   }
				// );
			} else {
				toast.error(res?.reason, {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		});
	};

	const toInputUppercase = (e) => {
		e.target.value = ('' + e.target.value).toUpperCase();
	};

	const handleDeLink = () => {
		Axios.DetachId(
			userInfo?.userdetails?.userUniqueId,
			Cookies.get('sessionId')
		).then((res) => {
			setLink(false);
			toast.info('ORU-Mitra ID Delinked Successfully', {
				position: toast.POSITION.TOP_CENTER,
			});

			setOruMitraId();
			// Axios.getUserProfile("91", mobileNumber?.current).then(
			//   (resp) => {
			//     setUserInfo(resp.dataObject);
			//   }
			// );
		});
	};

	return (
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
						defaultValue={userInfo?.userdetails?.userName}
						onChange={(e) => {
							setSaveChange(true);
							setName(e.target.value);
						}}
					>
						Name
					</Input>
					<span className="block" />
					<Input
						type="tel"
						name="mobile"
						value={`+91 ${mobileNumber?.current}` || ''}
						disabled
					>
						Mobile No
					</Input>
					<span className="block" />
					<Input
						type="email"
						defaultValue={userInfo?.userdetails?.email}
						onChange={(e) => {
							setSaveChange(true);
							setEmail(e.target.value);
						}}
					>
						Email ID
					</Input>
					<span className="block" />

					<div className="flex flex-row space-x-2">
						{(!userInfo?.userdetails?.associatedWith &&
							userInfo?.userdetails?.associatedWith == '') ||
						userInfo?.userdetails?.associatedWith == undefined ? (
							<Input
								type="text"
								defaultValue={userInfo?.userdetails?.associatedWith}
								onInput={toInputUppercase}
								onChange={(e) => {
									setOruMitraId(e.target.value);
								}}
							>
								ORU-Mitra ID
							</Input>
						) : (
							<Input
								type="text"
								defaultValue={userInfo?.userdetails?.associatedWith}
								onInput={toInputUppercase}
								onChange={(e) => {
									setOruMitraId(e.target.value);
								}}
								disabled
							>
								ORU-Mitra ID
							</Input>
						)}

						{(!userInfo?.userdetails?.associatedWith &&
							userInfo?.userdetails?.associatedWith == '') ||
						userInfo?.userdetails?.associatedWith == undefined ? (
							<button
								className="bg-m-green text-white px-4 py-2 rounded-md font-Roboto-Semibold text-regularFontSize uppercase"
								onClick={handleLink}
							>
								Link
							</button>
						) : (
							<button
								className="text-m-green border border-m-green px-4 py-2 rounded-md font-Roboto-Semibold text-regularFontSize uppercase"
								onClick={handleDeLink}
							>
								Delink
							</button>
						)}
					</div>
					<span className="block"></span>
					<div className=" grid  grid-cols-1 gap-8 ">
						<button
							className={` px-12 rounded text-white text-regularFontSize font-Roboto-Semibold uppercase py-2 ${
								saveChange ? 'bg-m-green' : 'bg-gray-1'
							} hover:bg-m-green`}
						>
							Save
						</button>
						<button></button>
					</div>
				</form>
			</div>
		</UserProfile>
	);
}

export default Profile;

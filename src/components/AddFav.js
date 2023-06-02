import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoginPopup from './Popup/LoginPopup';
import * as Axios from '@/api/axios';
import OutlineHeartBlack from '@/assets/heart_black.svg';
import FillHeart from '@/assets/heartfill.svg';
import OutlineHeart from '@/assets/heartoutline.svg';
import Cookies from 'js-cookie';
import Image from 'next/image';

function AddFav({ data, setProducts, ...rest }) {
	const [showLoginPopup, setShowLoginPopup] = useState(false);
	const [performAction, setPerformAction] = useState(false);

	function handleFavoties() {
		console.log('handling =>');
		setProducts((prevState) => {
			let tempVal;
			if (Array.isArray(prevState)) {
				let index = prevState.findIndex((i) => i.listingId === data.listingId);
				tempVal = [...prevState];
				tempVal[index] = { ...tempVal[index], favourite: !data.favourite };
			} else {
				tempVal = { ...prevState, favourite: !data.favourite };
			}
			return tempVal;
		});
		let payLoad = {
			listingId: data.listingId,
			userUniqueId: Cookies.get('userUniqueId') || 'Guest',
		};
		const addFavorite = async () => {
			console.log('add');

			let favList = localStorage.getItem('favoriteList');
			if (favList) {
				favList = favList.split(',');
				favList.push(data.listingId);
				localStorage.setItem('favoriteList', favList);
			} else {
				localStorage.setItem('favoriteList', data.listingId);
			}
			const addFav = await Axios.addFavotie(payLoad);
		};
		const removeFavorite = async () => {
			console.log('remove');

			let favList = localStorage.getItem('favoriteList');
			if (favList) {
				favList = favList.split(',');
				favList = favList.filter((item) => item !== data.listingId);
				localStorage.setItem('favoriteList', favList);
			}
			const removeFav = await Axios.removeFavotie(
				data.listingId,
				Cookies.get('userUniqueId') || 'Guest'
			);
		};

		if (data.favourite) {
			data?.status == 'Active'
				? removeFavorite()
				: toast.warning('This device is sold out');
		} else {
			data?.status == 'Active'
				? addFavorite()
				: toast.warning('This device is sold out');
		}
	}

	useEffect(() => {
		if (
			showLoginPopup == false &&
			performAction == true &&
			Cookies.get('userUniqueId') !== undefined
		) {
			handleFavoties();
		}
	}, [showLoginPopup]);

	if (Cookies.get('userUniqueId') === undefined) {
		return (
			<div>
				<Image
					src={OutlineHeartBlack}
					width={20}
					height={20}
					onClick={(e) => {
						e.preventDefault();
						setPerformAction(true);
						setShowLoginPopup(true);
					}}
					className="hover:scale-110 "
					alt="Outline Heart Black"
				/>

				<LoginPopup open={showLoginPopup} setOpen={setShowLoginPopup} />
			</div>
		);
	}

	return Cookies.get('userUniqueId') != undefined &&
		Cookies.get('userUniqueId') != '' &&
		Cookies.get('userUniqueId') != 'Guest' &&
		localStorage.getItem('favoriteList') != null &&
		localStorage.getItem('favoriteList').includes(data?.listingId) ? (
		<Image
			src={FillHeart}
			width={24}
			height={24}
			onClick={(e) => {
				e.preventDefault();
				handleFavoties(data);
			}}
			className="hover:scale-110"
			alt="Fill Heart"
		/>
	) : (
		<Image
			src={OutlineHeart}
			width={24}
			height={24}
			onClick={(e) => {
				e.preventDefault();
				handleFavoties(data);
			}}
			className="hover:scale-110 "
			alt="Outline Heart"
		/>
	);
}

export default AddFav;

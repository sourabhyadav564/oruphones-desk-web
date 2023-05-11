import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import DesktopMenu from './DesktopMenu';
import Geocode from 'react-geocode';
import MobileMenu from './MobileMenu';
import LoginOrProfile from './LoginOrProfile';
import LocationPopup from '../Popup/LocationPopup';
import AppContext from '@/context/ApplicationContext';
import SearchBar from './SearchBar';
import SellNowBtn from './SellNowBtn';
import Cookies from 'js-cookie';
import LocationPicker from './LocationPicker';
import { useAtom } from 'jotai';
import readLocationAtom, { updateLocationLatLongAtom } from '@/store/location';

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [openLocationPopup, setOpenLocationPopup] = useState(false);
	const [location] = useAtom(readLocationAtom);
	const [_, setLocation] = useAtom(updateLocationLatLongAtom);
	const { userInfo, setUserInfo, setSearchLocation } = useContext(AppContext);

	const onSuccess = async (location) => {
		await updateLocationLatLongAtom(location);
	};

	const onError = (error) => {
		setLocation('India')
	};

	const handleNearme = async () => {
		if (!('geolocation' in navigator)) {
			onError({
				code: 0,
				message: 'Geolocation not supported',
			});
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	};

	return (
		<header>
			<div className=" container lg:w-10/12 w-full h-16 bg-m-white bg-no-repeat  flex justify-center items-center opacity-100 px-0 py-0 ">
				<Link href="/">
					<a className="h-9 md:w-[75px] px-32 pr-0 py-[14px] mr-4 lg:mr-8 block relative">
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg'
							}
							alt="ORUphones"
							layout="fill"
							priority
						/>
					</a>
				</Link>
				<div className="hidden sm:flex  justify-center mx-12 flex-1 text-sm">
					<SearchBar />
				</div>

				<div className="hidden lg:flex  space-x-2 flex-shrink-0 text-sm">
					<SellNowBtn />
					<LoginOrProfile />
				</div>
				<div className="-mr-1 sm:mr-2 px-4 flex lg:hidden w-16 justify-end ml-auto">
					<button
						onClick={() => setIsOpen(!isOpen)}
						type="button"
						className="bg-m-green inline-flex items-center justify-center h-full p-2 rounded-md text-m-white hover:bg-green-700 focus:outline-none"
						aria-controls="mobile-menu"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						{!isOpen ? <OpenIcon /> : <CloseIcon />}
					</button>
				</div>
			</div>
			<DesktopMenu />
			<MobileMenu isOpen={isOpen} />
			<LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
			<LocationPicker />
		</header>
	);
}

export default Header;

const OpenIcon = () => (
	<svg
		className="block h-6 w-7"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden="true"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M4 6h16M4 12h16M4 18h16"
		/>
	</svg>
);

const CloseIcon = () => (
	<svg
		className="block h-6 w-7"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden="true"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);

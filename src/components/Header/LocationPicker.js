import { useState } from 'react';
import Geocode from 'react-geocode';
import { getCityFromResponse } from '@/utils/util';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import AppContext from '@/context/ApplicationContext';
import { useAtom } from 'jotai';
import readLocationAtom, { updateLocationLatLongAtom, updateLocationAtom } from '@/store/location';

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function LocationPicker() {
	const [location] = useAtom(readLocationAtom);
	const [,setLocation] = useAtom(updateLocationAtom);
	const [, setLatLong] = useAtom(updateLocationLatLongAtom);
	const { userInfo, setUserInfo, setSearchLocation } = useContext(AppContext);

	const onSuccess = async (location) => {
		await setLatLong(location);
	};

	const onError = (error) => {
		setLocation('India');
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

	useEffect(() => {
		const initialState = localStorage.getItem('usedLocation');
		if (!initialState || initialState == null) {
			handleNearme();
		} else {
			setSearchLocation(initialState);
		}
	}, []);

	useEffect(() => {
		if (location && location.city && location.city.length > 0) {
			if (Cookies.get('userUniqueId') !== undefined) {
				let searchID = 0;
				let searchLocId = userInfo?.address?.filter((items) => {
					return items.addressType === 'SearchLocation';
				});
				if (searchLocId) {
					searchID = searchLocId[0]?.locationId;
				}
			}
			setSearchLocation(location.city);
			localStorage.setItem('usedLocation', location.city);
		}
	}, [location]);

	return null;
}

export default LocationPicker;

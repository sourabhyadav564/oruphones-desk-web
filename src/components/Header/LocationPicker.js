import { useState } from 'react';
import Geocode from 'react-geocode';
import { getCityFromResponse } from '@/utils/util';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import AppContext from '@/context/ApplicationContext';

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function LocationPicker() {
	const [location, setLocation] = useState({
		loaded: false,
		city: '',
	});
	const { userInfo, setUserInfo, setSearchLocation } = useContext(AppContext);

	const onSuccess = async (location) => {
		let lat = location.coords.latitude;
		let lng = location.coords.longitude;
		Geocode.setApiKey('AIzaSyAh6-hbxmUdNaznjA9c05kXi65Vw3xBl3w');

		Geocode.setLanguage('en');
		Geocode.enableDebug();
		Geocode.fromLatLng(lat, lng).then(
			(response) => {
				let address = response?.plus_code?.compound_code;
				address = getCityFromResponse(address);
				setLocation({
					loaded: true,
					city: address,
				});
			},
			(error) => {
				console.error(error);
				setLocation({
					loaded: true,
					city: 'India',
				});
			}
		);
	};

	const onError = (error) => {
		setLocation({
			loaded: true,
			city: 'India',
		});
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
		if (location.loaded && location.city && location.city.length > 0) {
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

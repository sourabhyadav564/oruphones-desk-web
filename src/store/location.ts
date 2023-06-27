import Geocode, { setLocationType } from 'react-geocode';
import filterAtom from '@/store/productFilter';
import { topDealsQueryAtom } from '@/store/topDeals';
import { setCookie } from 'cookies-next';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const GEOCODE_API_KEY = process.env.NEXT_PUBLIC_GEOCODE_API_KEY!;

export const locationAtom = atomWithStorage<string>('location', 'India');
const readLocationAtom = atom((get) => get(locationAtom));
export const updateLocationAtom = atom(
	null,
	async (get, set, location: string) => {
		setCookie('location', location);

		set(filterAtom, { ...get(filterAtom), listingLocation: location });
		set(locationAtom, location);
	}
);

export const updateLocationLatLong = atom(
	null,
	async (get, set, longitude: number, latitude: number) => {
		setCookie('longitude', longitude);
		setCookie('latitude', latitude);
		set(topDealsQueryAtom, longitude, latitude);
	}
);
export const updateLocationLatLongAtom = atom(
	null,
	async (
		_get,
		set,
		location: { coords: { latitude: string; longitude: string } }
	) => {
		Geocode.setApiKey(GEOCODE_API_KEY);
		Geocode.setLanguage('en');
		Geocode.setRegion('IN');
		Geocode.setLocationType('ROOFTOP');
		Geocode.enableDebug();
		// Get city from latidude & longitude.
		const res = await Geocode.fromLatLng(
			location.coords.latitude,
			location.coords.longitude
		);
		const address = res.results[0];
		console.log(address);
		let city;
		let state;
		for (let i = 0; i < address.address_components.length; i++) {
			for (let j = 0; j < address.address_components[i].types.length; j++) {
				switch (address.address_components[i].types[j]) {
					case 'locality':
						city = address.address_components[i].long_name;
						break;

					case 'administrative_area_level_1':
						state = address.address_components[i].long_name;
						break;
				}
			}
		}
		const statewithcity = city.replace(/\s/g, '') + ',' + ' ' + state;

		set(updateLocationAtom, statewithcity);
	}
);

export const citiesAtom = atomWithStorage<any>('cities', undefined);

export default readLocationAtom;

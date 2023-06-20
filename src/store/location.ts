import Geocode from 'react-geocode';
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
		set(topDealsQueryAtom, location);
		set(filterAtom, { ...get(filterAtom), listingLocation: location });
		set(locationAtom, location);
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
		let city;
		for (let i = 0; i < address.address_components.length; i++) {
			for (let j = 0; j < address.address_components[i].types.length; j++) {
				switch (address.address_components[i].types[j]) {
					case 'locality':
						city = address.address_components[i].long_name;
						break;
				}
			}
		}
		const noWhiteSpaceCity = city.replace(/\s/g, '');
		set(updateLocationAtom, noWhiteSpaceCity);
	}
);

export const citiesAtom = atomWithStorage<any>('cities', undefined);

export default readLocationAtom;

import Geocode from 'react-geocode';
import { topDealsQueryAtom } from './topDeals';
import filterAtom from '@/store/productFilter';
import { getLocation } from '@/utils/fetchers/location';
import { setCookie } from 'cookies-next';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const GEOCODE_API_KEY = process.env.NEXT_PUBLIC_GEOCODE_API_KEY!;

export const locationAtom = atomWithStorage<string>('location', 'India');
export const cityAtom = atomWithStorage<string>('city', '');
export const localityAtom = atomWithStorage<string>('locality', '');
export const latitudeAtom = atomWithStorage<number>('latitude', 0);
export const longitudeAtom = atomWithStorage<number>('longitude', 0);
export const stateAtom = atomWithStorage<string>('state', '');
const readLocationAtom = atom((get) => get(locationAtom));
export const updateLocationAtom = atom(
	null,
	async (
		get,
		set,
		locationObj: {
			locality: string;
			city: string;
			state: string;
			latitude: number;
			longitude: number;
			location: string;
		}
	) => {
		const { locality, city, state, latitude, longitude, location } =
			locationObj;
		setCookie('location', location);
		set(filterAtom, {
			...get(filterAtom),
			listingLocation: location,
			locality: locality,
			state: state,
			city: city,
		});
		set(localityAtom, locality);
		set(cityAtom, city);
		set(locationAtom, location);
		set(latitudeAtom, latitude);
		set(longitudeAtom, longitude);
		set(stateAtom, state);
		set(topDealsQueryAtom, locality, state, city);

		setCookie('locality', locality);
		setCookie('state', state);
		setCookie('city', city);
		setCookie('location', location);
		setCookie('latitude', latitude.toString());
		setCookie('longitude', longitude.toString());
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

		const locationfromlatlong = await getLocation(
			parseFloat(location.coords.latitude),
			parseFloat(location.coords.longitude)
		);
		console.log(locationfromlatlong.dataObject)

		let city = locationfromlatlong.dataObject[1].name;
		let state = locationfromlatlong.dataObject[0].name;
		let locality = locationfromlatlong.dataObject[2].name;

		const localitywithcity = locality + "," + " " +city;

		let locationObj = {
			locality: locality,
			city: city,
			state: state,
			latitude: parseFloat(location.coords.latitude),
			longitude: parseFloat(location.coords.longitude),
			location: localitywithcity,
		};

		set(updateLocationAtom, locationObj);
	}
);

export const citiesAtom = atomWithStorage<any>('cities', undefined);

export default readLocationAtom;

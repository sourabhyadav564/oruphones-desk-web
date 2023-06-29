import Geocode from 'react-geocode';
import filterAtom from '@/store/productFilter';
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
	async (get, set, location: string) => {
		setCookie('location', location);
		set(filterAtom, { ...get(filterAtom), listingLocation: location });
	}
);

export const updateNewLocationAtom = atom(
	null,
	async (
		_get,
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
		set(localityAtom, locality);
		set(cityAtom, city);
		set(locationAtom, location);
		set(latitudeAtom, latitude);
		set(longitudeAtom, longitude);
		set(stateAtom, state);
		set(topDealsQueryAtom, locality,state,city)

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
		const res = await Geocode.fromLatLng(
			location.coords.latitude,
			location.coords.longitude
		);
		const address = res.results[0];
		console.log(address);
		let city;
		let state;
		let locality;
		for (let i = 0; i < address.address_components.length; i++) {
			for (let j = 0; j < address.address_components[i].types.length; j++) {
				switch (address.address_components[i].types[j]) {
					case 'locality':
						city = address.address_components[i].long_name;
						break;

					case 'administrative_area_level_1':
						state = address.address_components[i].long_name;
						break;
					case 'sublocality_level_1':
						locality = address.address_components[i].long_name;
						break;
				}
			}
		}
		const statewithcity = city.replace(/\s/g, '') + ',' + ' ' + state;

		const lat = address.geometry.location.lat
		const long =address.geometry.location.lng

		let locationObj = {
			locality: locality,
			city: city,
			state: state,
			latitude: lat,
			longitude: long,
			location: statewithcity,
		};

		set(updateLocationAtom, statewithcity);
	set(updateNewLocationAtom, locationObj)
	}
);

export const citiesAtom = atomWithStorage<any>('cities', undefined);

export default readLocationAtom;

import { atom } from 'jotai';
import Geocode from 'react-geocode';
import setLocation from '@/utils/fetchers/setLocation';

const GEOCODE_API_KEY = process.env.NEXT_PUBLIC_GEOCODE_API_KEY!;

export const locationAtom = atom<string | null>(null);
const readLocationAtom = atom((get) => get(locationAtom));
export const updateLocationAtom = atom(null, async (_get, set, location: string) => {
	console.log("idk ",location)
	await setLocation(location);
	set(locationAtom, location);
});
export const updateLocationLatLongAtom = atom(
	null,
	async (
		_get,
		set,
		location: { coords: { latitude: string; longitude: string } }
	) => {
		Geocode.setApiKey(GEOCODE_API_KEY);
		Geocode.setLanguage('en');
		Geocode.setRegion('en');
		Geocode.enableDebug();
		// Get city from latidude & longitude.
		const res = await Geocode.fromLatLng(
			location.coords.latitude,
			location.coords.longitude
		);
		const city = res.results[0].formatted_address.split(',').slice(-3)[0];
		const noWhiteSpaceCity = city.replace(/\s/g, '');
		set(updateLocationAtom, noWhiteSpaceCity);
	}
);

export default readLocationAtom;

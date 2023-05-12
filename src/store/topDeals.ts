import type IDeal from '@/types/Deal';
import * as Axios from '@/api/axios';
import { locationAtom } from '@/store/location';
import { atom } from 'jotai';

export const topDealsAtom = atom<IDeal[] | null>(null);
export const topDealsQueryAtom = atom(null, async (get, set, location: string) => {
	let bestDeals = await Axios.bestDealNearByYou(location, 'Guest', 0);
	// if length is < 20, return, else slice
	const sliceLength = 10;
	if (bestDeals.dataObject.otherListings.length > sliceLength) {
		bestDeals.dataObject.otherListings =
			bestDeals.dataObject.otherListings.slice(0, sliceLength);
	}
	set(topDealsAtom, bestDeals.dataObject.otherListings);
});

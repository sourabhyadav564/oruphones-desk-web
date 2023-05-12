import type IDeal from '@/types/Deal';
import { atom } from 'jotai';
import getHomeListings from '@/utils/fetchers/getHomeListings';

export const topDealsAtom = atom<IDeal[] | null>(null);
export const topDealsQueryAtom = atom(null, async (get, set, location: string) => {
	const sliceLength = 10;
	let bestDeals = await getHomeListings(location, sliceLength);
	set(topDealsAtom, bestDeals.dataObject.otherListings);
});

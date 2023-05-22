import type IDeal from '@/types/Deal';
import getHomeListings from '@/utils/fetchers/getHomeListings';
import { atom } from 'jotai';

export const topDealsAtom = atom<IDeal[] | null>(null);
export const topDealsQueryAtom = atom(
	null,
	async (get, set, location: string) => {
		const sliceLength = 10;
		let bestDeals = await getHomeListings(location, sliceLength);
		set(topDealsAtom, bestDeals);
	}
);

import type IDeal from '@/types/Deal';
import getHomeListings from '@/utils/fetchers/index/getHomeListings';
import { atom } from 'jotai';

export const topDealsAtom = atom<IDeal[] | null>(null);
export const topDealsQueryAtom = atom(
	null,
	async (get, set, locality: string, state: string, city: string) => {
		const sliceLength = 10;
		let bestDeals = await getHomeListings(locality, state, city, sliceLength);
		set(topDealsAtom, bestDeals);
	}
);

import type IDeal from '@/types/Deal';
import getHomeListings from '@/utils/fetchers/index/getHomeListings';
import { atom } from 'jotai';

export const topDealsAtom = atom<IDeal[] | null>(null);
export const topDealsQueryAtom = atom(
	null,
	async (get, set, longitude: number, latitude: number) => {
		const sliceLength = 10;
		let bestDeals = await getHomeListings(
			longitude,
			latitude,
			sliceLength
		);
		set(topDealsAtom, bestDeals);
	}
);

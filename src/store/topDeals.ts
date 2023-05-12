import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import type IDeal from '@/types/Deal';
import * as Axios from '@/api/axios';
import { locationAtom } from '@/store/location';
export const [topDealsAtom] = atomsWithQuery<IDeal[] | null>((get) => {
	return {
		queryKey: ['topDeals', get(locationAtom)],
		queryFn: async () => {
			const data = await Axios.bestDealNearByYou(get(locationAtom), 'Guest', 0);
			let bestDeals = data.dataObject.otherListings;
			if (bestDeals.length > 10) {
				bestDeals = bestDeals.slice(0, 10);
			}
			return bestDeals;
		},
	};
});

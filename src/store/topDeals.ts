import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import type IDeal from '@/types/Deal';
import * as Axios from '@/api/axios';
import { locationAtom } from '@/store/location';
export const [topDealsAtom] = atomsWithQuery<IDeal[] | null>((get) => {
	return {
		queryKey: ['topDeals', get(locationAtom)],
		queryFn: async () => {
			let bestDeals = await Axios.bestDealNearByYou(get(locationAtom), 'Guest', 0)
      const sliceLength = 10;
			if (bestDeals.dataObject.otherListings.length > sliceLength) {
				bestDeals.dataObject.otherListings =
					bestDeals.dataObject.otherListings.slice(0, sliceLength);
			}
      return bestDeals.dataObject.otherListings;
		},
	};
});

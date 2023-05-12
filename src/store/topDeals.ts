import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import type IDeal from '@/types/Deal';
import * as Axios from '@/api/axios';
import { locationAtom } from '@/store/location';
export const [topDealsAtom] = atomsWithQuery<{
	dataObject: { otherBestDeals: IDeal[] };
} | null>((get) => {
	return {
		queryKey: ['topDeals', get(locationAtom)],
		queryFn: async () => {
			const data = await Axios.bestDealNearByYou(get(locationAtom), 'Guest', 0);
			return data;
		},
	};
});

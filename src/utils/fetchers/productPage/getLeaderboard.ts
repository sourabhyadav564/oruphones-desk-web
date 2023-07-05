import type {
	TListingFilterWithID,
	TListingReturnFilter,
} from '@/types/ListingFilter';
import SSRreq from '@/types/SSRreq';
import SSRHeaders from '@/utils/ssrHeaders';

export default async function getLeaderboard(
	filter: TListingFilterWithID,
	req?: SSRreq
): Promise<TListingReturnFilter[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter/getSimilarLeaderboard`,
		{
			method: 'POST',
			...SSRHeaders(req),
			body: JSON.stringify({ filter: { listingId: filter.listingId } }),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

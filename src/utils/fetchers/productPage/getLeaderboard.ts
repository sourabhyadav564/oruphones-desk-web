import type {
	TListingFilterWithID,
	TListingReturnFilter,
} from '@/types/ListingFilter';

export default async function getLeaderboard(
	filter: TListingFilterWithID
): Promise<TListingReturnFilter[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter/getSimilarLeaderboard`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ filter: { listingId: filter.listingId } }),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

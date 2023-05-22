import type { TListingFilterWithID } from '@/types/ListingFilter';

export default async function getLeaderboard(filter: TListingFilterWithID) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter/getSimilarLeaderboard`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ filter: { listingId: filter.listingId } }),
		}
	);
	console.log(response);
	const resp = await response.json();
	return resp.data;
}

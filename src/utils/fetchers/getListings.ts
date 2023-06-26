import { TListingReturnFilter } from '../../types/ListingFilter';

export default async function getListings(
	listingIds: string[] | string
): Promise<TListingReturnFilter[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/listings`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: Array.isArray(listingIds)
				? JSON.stringify({ listingIds })
				: JSON.stringify({ listingIds: [listingIds] }),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

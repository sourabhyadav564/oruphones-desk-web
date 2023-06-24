import type {
	TListingFilterWithID,
	TListingReturnFilter,
} from '@/types/ListingFilter';

export default async function getSimilarTable(
	filter: TListingFilterWithID
): Promise<TListingReturnFilter[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter/getSimilarPriceRange`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ filter }),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data.data;
}

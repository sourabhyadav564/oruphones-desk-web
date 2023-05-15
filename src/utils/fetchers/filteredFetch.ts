import TListingFilter, { TListingReturnFilter } from '@/types/ListingFilter';

export default async function getFilteredListings(
	filter: TListingFilter,
	returnFilter?: TListingReturnFilter
): Promise<TListingReturnFilter[]> {
	const content = {
		filter,
		...(returnFilter && { returnFilter }),
	};
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(content),
		}
	);
	const resp = await response.json();
	return resp.data;
}

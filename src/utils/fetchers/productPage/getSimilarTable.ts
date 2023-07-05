import type {
	TListingFilterWithID,
	TListingReturnFilter,
} from '@/types/ListingFilter';
import SSRreq from '@/types/SSRreq';
import SSRHeaders from '@/utils/ssrHeaders';

export default async function getSimilarTable(
	filter: TListingFilterWithID,
	req?: SSRreq
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

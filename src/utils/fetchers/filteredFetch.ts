import TListingFilter, {
	TListingFilterWithID,
	TListingReturnFilter,
} from '@/types/ListingFilter';

export default async function getFilteredListings(
	filter: TListingFilter,
	isNotionalBestDeals: boolean = false,
	returnFilter?: TListingReturnFilter
): Promise<{
	data: TListingReturnFilter[];
	totalCount: number;
	bestDeals: TListingReturnFilter[] | undefined;
}> {
	const content = {
		filter,
		...(returnFilter && { returnFilter }),
	};
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter${
			isNotionalBestDeals ? '?notionalFilter=true' : ''
		}`,
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

export async function getListingByID(
	filter: TListingFilterWithID,
	returnFilter?: TListingReturnFilter
): Promise<TListingReturnFilter> {
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

export async function getSimilarListings(
	filter: TListingFilterWithID,
	returnFilter?: TListingReturnFilter
): Promise<{ data: TListingReturnFilter[]; totalCount: number }> {
	const content = {
		filter,
		...(returnFilter && { returnFilter }),
	};
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter/getSimilar`,
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

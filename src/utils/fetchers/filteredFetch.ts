import TListingFilter, {
	TListingFilterWithID,
	TListingReturnFilter,
} from '@/types/ListingFilter';
import SSRreq from '@/types/SSRreq';
import SSRHeaders from '@/utils/ssrHeaders';

export default async function getFilteredListings(
	filter: TListingFilter,
	isNotionalBestDeals: boolean = false,
	req?: SSRreq,
	returnFilter?: TListingReturnFilter
): Promise<{
	data: TListingReturnFilter[];
	totalCount?: number;
	bestDeals?: TListingReturnFilter[];
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
			...SSRHeaders(req),
			body: JSON.stringify(content),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	if (filter.page === 1) {
		return {
			data: resp.data.data,
			bestDeals: resp.data.bestDeals,
			totalCount: resp.data.totalCount,
		};
	} else {
		return {
			data: resp.data.data,
		};
	}
}

export async function getListingByID(
	filter: TListingFilterWithID,
	returnFilter?: TListingReturnFilter,
	req?: SSRreq
): Promise<TListingReturnFilter> {
	const content = {
		filter,
		...(returnFilter && { returnFilter }),
	};
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter`,
		{
			method: 'POST',
			...SSRHeaders(req),
			body: JSON.stringify(content),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

export async function getSimilarListings(
	filter: TListingFilterWithID,
	returnFilter?: TListingReturnFilter,
	req?: SSRreq
): Promise<{ data: TListingReturnFilter[]; totalCount: number }> {
	const content = {
		filter,
		...(returnFilter && { returnFilter }),
	};
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/filter/getSimilar`,
		{
			method: 'POST',
			...SSRHeaders(req),
			body: JSON.stringify(content),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

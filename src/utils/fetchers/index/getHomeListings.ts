import SSRreq from '@/types/SSRreq';
import SSRHeaders from '@/utils/ssrHeaders';

export default async function getHomeListings(
	locality: string,
	state: string,
	city: string,
	count: number,
	req?: SSRreq
) {
	try {
		//ping the api route with the location
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/topSellingHome`,
			{
				method: 'POST',
				body: JSON.stringify({ locality,state,city, count }),
				credentials: 'include',
				...SSRHeaders(req),
			}
		);
		const json = await res.json();
		return json.data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

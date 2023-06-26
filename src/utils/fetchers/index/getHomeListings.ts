import SSRreq from '@/types/SSRreq';
import SSRHeaders from '@/utils/ssrHeaders';

export default async function getHomeListings(
	longitude: number,
	latitude: number,
	count: number,
	req?: SSRreq
) {
	try {
		//ping the api route with the location
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/topSellingHome`,
			{
				method: 'POST',
				body: JSON.stringify({ longitude, latitude, count }),
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

import SSRreq from '@/types/SSRreq';
import SSRHeaders from '@/utils/ssrHeaders';

export default async function getHomeBrands(req?: SSRreq) {
	try {
		//ping the api route with the location
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/master/brands`,
			{
				method: 'GET',
				credentials: 'include',
				...SSRHeaders(req),
			}
		);
		const json = await res.json();
		return json.dataObject;
	} catch (e) {
		console.log(e);
		return null;
	}
}

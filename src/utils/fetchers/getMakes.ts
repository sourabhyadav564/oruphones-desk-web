import SSRreq from '@/types/SSRreq';
import SSRHeaders from '@/utils/ssrHeaders';

export default async function getMakes(req?: SSRreq) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/makes`,
		{
			method: 'GET',
			...SSRHeaders(req),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

import SSRreq from '@/types/SSRreq';
import SSRHeaders from '@/utils/ssrHeaders';

export default async function getModels(
	make: string,
	limit?: number,
	req?: SSRreq
) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/models`,
		{
			method: 'POST',
			...SSRHeaders(req),
			body: JSON.stringify({ make, count: limit }),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

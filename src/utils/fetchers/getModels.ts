export default async function getModels(make: string, limit?: number) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/models`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ make, count: limit }),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

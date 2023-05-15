export default async function getModels(make: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/models`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ make }),
		}
	);
	const resp = await response.json();
	return resp.data;
}

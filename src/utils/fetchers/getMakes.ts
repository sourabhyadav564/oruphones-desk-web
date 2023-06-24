export default async function getMakes() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/makes`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

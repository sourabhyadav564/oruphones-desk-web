export default async function sendVerification({
	listingId,
}: {
	listingId: string;
}) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/sendVerification`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ listingId }),
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp.data;
}

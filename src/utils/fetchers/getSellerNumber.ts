export default async function getSellerNumber({
	listingId,
}: {
	listingId: string;
}): Promise<string> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/getSellerNumber`,
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
	return resp.mobileNumber;
}

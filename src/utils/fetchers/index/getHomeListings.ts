export default async function getHomeListings(location: string, count: number) {
	try {
		//ping the api route with the location
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/listing/topSellingHome`,
			{
				method: 'POST',
				body: JSON.stringify({ location, count }),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const json = await res.json();
		return json.data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

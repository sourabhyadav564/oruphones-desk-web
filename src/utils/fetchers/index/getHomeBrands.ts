export default async function getHomeBrands() {
	try {
		//ping the api route with the location
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/master/brands`,
			{
				method: 'GET',
			}
		);
		const json = await res.json();
		return json.dataObject;
	} catch (e) {
		console.log(e);
		return null;
	}
}

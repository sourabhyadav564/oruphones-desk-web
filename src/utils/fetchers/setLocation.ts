export default async function setLocation(location: string) {
	//ping the api route with the location
	await fetch(`/api/setLocation`, {
		method: 'POST',
		body: JSON.stringify({ location }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	console.log('location set to: ', location);
}

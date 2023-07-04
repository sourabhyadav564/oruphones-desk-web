
export async function fetchTopSearch() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/location/topSearch`,
			{
				method: 'GET',
			}
		);
		const json = await res.json();
		return json;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function Search(searchText : string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/location/search`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				  },
				body: JSON.stringify({ searchText}),
			}
		);
		const json = await res.json();
		return json;
	} catch (error) {
		console.error(error);
		return null;
	}
}


export async function getLocation(latitude : number,longitude : number) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/location/getLocation`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				  },
				body: JSON.stringify({ latitude,longitude}),
			}
		);
		const json = await res.json();
		return json;
	} catch (error) {
		console.error(error);
		return null;
	}
}

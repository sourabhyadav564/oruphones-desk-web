export default async function toggleFav({
	listingId,
	isFav,
}: {
	listingId: string;
	isFav: boolean;
}) {
	await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/favs`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ listingId, isFav }),
		credentials: 'include',
	});
	return;
}

export default async function update({
	userName,
	email,
	mobileNumber,
}: {
	userName?: string;
	email?: string;
	mobileNumber?: string;
}) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...(userName && { userName }),
				...(email && { email }),
				...(mobileNumber && { mobileNumber }),
			}),
			credentials: 'include',
		}
	);
	const data = await response.json();
	return data;
}

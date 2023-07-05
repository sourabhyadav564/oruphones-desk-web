export default async function logout() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`,{
			credentials: 'include',
		}
	);
	const data = await response.json();
	return data;
}

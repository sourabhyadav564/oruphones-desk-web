import TUser from "@/types/User";

export default async function isLoggedIn(): Promise<{ isLoggedIn: boolean, user?:Partial<TUser> }> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user/isloggedin`,
		{
			credentials: 'include',
		}
	);
	const data = await response.json();
	return data;
}

export default async function update({
	userName,
	email,
	mobileNumber,
	isLinking,
	referral,
}: {
	userName?: string;
	email?: string;
	mobileNumber?: string;
	isLinking?: boolean;
	referral?: string;
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
				...(isLinking && { isLinking }),
				...(referral && { referral }),
			}),
			credentials: 'include',
		}
	);
	if (response.status !== 200) throw new Error('Failed to update user details');
	const data = await response.json();
	return data;
}

export async function updateProfilePic(formData: FormData): Promise<{
	reason: string;
	status: string;
	profilePicPath: string;
}> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/imageUpload?type=profilePic`,
		{
			method: 'POST',
			body: formData,
			credentials: 'include',
		}
	);
	const resp = await response.json();
	return resp;
}

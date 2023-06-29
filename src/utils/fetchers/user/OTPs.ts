async function otpCreate({
	countryCode,
	mobileNumber,
}: {
	countryCode: number;
	mobileNumber: number;
}) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login/otpCreate`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				countryCode,
				mobileNumber,
			}),
			credentials: 'include',
		}
	);
	const data = await response.json();
	return data;
}
async function otpValidate({
	countryCode,
	mobileNumber,
	otp,
}: {
	countryCode: number;
	mobileNumber: number;
	otp: number;
}): Promise<{
	status: string;
	message: string;
	dataObject: {
		submitCountIncrement: number;
		maxRetryCount: string;
	};
	user: {
		userName: string;
		email: string;
		profilePicPath: string;
		city: string;
		state: string;
		mobileNumber: number;
		favListings: string[];
		userListings: string[];
		isAccountExpired: boolean;
	};
}> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login/otpValidate`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				countryCode,
				mobileNumber,
				otp,
			}),
			credentials: 'include',
		}
	);
	const data = await response.json();
	return data;
}

const OTPs = {
	otpCreate,
	otpValidate,
};

export default OTPs;

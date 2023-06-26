export type Issue = {
	name: string;
	email: string;
	phone: string;
	issueType: string;
	description: string;
	modelName: string;
	hasLog: boolean;
	forCrash: boolean;
	shareLog: boolean;
	scheduleCall: boolean;
};

export default async function reportIssue(props: Partial<Issue>) {
	try {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/reportIssue`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(props),
				credentials: 'include',
			}
		);
		const data = await resp.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

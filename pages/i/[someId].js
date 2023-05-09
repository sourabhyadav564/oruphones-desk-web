function OLXPage({ someId }) {
	return (
		<main className="text-center min-h-screen">
			<h1>{someId}</h1>
		</main>
	);
}

export default OLXPage;

export async function getServerSideProps({ query }) {
	try {
		const someId = query.someId;
		return {
			props: {
				someId,
			},
		};
	} catch (error) {
		return {
			redirect: {
				destination: `/`,
				permanent: false,
			},
		};
	}
}

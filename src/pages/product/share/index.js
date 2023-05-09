import * as Axios from '../../../../api/axios';

function Share() {
	return <></>;
}

export default Share;

export async function getServerSideProps({ query }) {
	try {
		const listingInfo = await Axios.fetchWebLinkByShareId(query.lid);
		return {
			redirect: {
				destination: `/product/buy-old-refurbished-used-mobiles/${listingInfo?.dataObject.make}/${listingInfo?.dataObject.marketingName}/${listingInfo?.dataObject.listingId}?isOtherVendor=N`,
				permanent: false,
			},
			props: {},
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

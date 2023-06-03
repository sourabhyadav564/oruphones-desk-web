import { useEffect, useState } from 'react';
import * as Axios from '@/api/axios';
import AddListingForm from '@/components/User/AddListingForm';
import GuideToSell from '@/components/User/GuideToSell';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

const DynamicTermAndCondition = dynamic(
	() => import('@/components/Popup/TermAndConditionPopup'),
	{ ssr: false, loading: () => <p>Loading...</p> }
);

const DynamicListingAddedPopup = dynamic(
	() => import('@/components/Popup/ListingAddedPopup'),
	{ ssr: false, loading: () => <p>Loading...</p> }
);
function AddListing({ brandsList }) {
	const [brands, setBrands] = useState([]);

	useEffect(() => {
		if (brandsList.length === 0) {
			setBrands(JSON.parse(localStorage.getItem('make_models')));
		} else {
			localStorage.setItem('make_models', JSON.stringify(brandsList));
			Cookies.set('make_models', true);
			setBrands(brandsList);
		}
	}, []);

	const [open, setOpen] = useState(false);
	const [openTCPopup, setOpenTCPopup] = useState(false);
	return (
		<main className="container grid grid-cols-3 gap-4 my-8">
			<div className="col-span-2 bg-white rounded shadow">
				<AddListingForm
					brandsList={brands}
					openPopup={() => setOpen(true)}
					openTCPopup={() => setOpenTCPopup(true)}
				/>
			</div>
			<div className="bg-white rounded rounded-t-lg shadow">
				<GuideToSell />
			</div>
			{open && <DynamicListingAddedPopup open={open} setOpen={setOpen} />}
			{openTCPopup && (
				<DynamicTermAndCondition open={openTCPopup} setOpen={setOpenTCPopup} />
			)}
		</main>
	);
}

export async function getServerSideProps({ req, res, query }) {
	const { userUniqueId, sessionId, make_models } = req.cookies;

	let brandsList;
	if (make_models) {
		brandsList = [];
	} else {
		const data = await Axios.fetchMakeModelList(
			userUniqueId || 'Guest',
			sessionId || ''
		);
		brandsList = data?.dataObject;
	}

	return {
		props: { brandsList: brandsList || [] },
	};
}

export default AddListing;

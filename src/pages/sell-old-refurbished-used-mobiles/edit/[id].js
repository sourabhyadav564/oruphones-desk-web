import EditListingForm from '@/components/User/EditListingForm';
import GuideToSell from '@/components/User/GuideToSell';
import { useRouter } from 'next/router';
import * as Axios from '@/api/axios';
import { useState, useEffect } from 'react';
import ListingAddedPopup from '@/components/Popup/ListingAddedPopup';
import TermAndConditionPopup from '@/components/Popup/TermAndConditionPopup';
import Cookies from 'js-cookie';

function EditListing({ brandsList }) {
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

	const router = useRouter();
	const { id } = router.query;
	const [open, setOpen] = useState(false);
	const [openTCPopup, setOpenTCPopup] = useState(false);

	return (
		<main className="container grid grid-cols-3 gap-6 my-8">
			<div className="col-span-2 bg-white rounded shadow">
				<EditListingForm
					id={id}
					openPopup={() => setOpen(true)}
					openTCPopup={() => setOpenTCPopup(true)}
					brandsList={brands}
				/>
			</div>
			<div className="bg-white rounded rounded-t-lg shadow">
				<GuideToSell />
			</div>
			<ListingAddedPopup open={open} setOpen={setOpen} />
			<TermAndConditionPopup open={openTCPopup} setOpen={setOpenTCPopup} />
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
		props: { brandsList: brandsList?.dataObject || [] },
	};
}

export default EditListing;

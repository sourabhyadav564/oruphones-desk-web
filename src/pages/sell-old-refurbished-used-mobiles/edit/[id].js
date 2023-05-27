import { useEffect, useState } from 'react';
import * as Axios from '@/api/axios';
import EditListingForm from '@/components/User/EditListingForm';
import GuideToSell from '@/components/User/GuideToSell';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicTermAndCondition = dynamic(
	() => import('@/components/Popup/TermAndConditionPopup'),
	{ ssr: false, loading: () => <p>Loading...</p> }
);

const DynamicListingAddedPopup = dynamic(
	() => import('@/components/Popup/ListingAddedPopup'),
	{ ssr: false, loading: () => <p>Loading...</p> }
);

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
	}, [brandsList]);

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
		props: { brandsList: brandsList?.dataObject || [] },
	};
}

export default EditListing;

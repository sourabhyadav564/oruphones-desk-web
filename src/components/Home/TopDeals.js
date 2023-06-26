import TopDealCard from '@/components/Cards/TopDealCard';
import Title from '@/components/Title';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicLocationPopup = dynamic(
	() => import('@/components/Popup/LocationPopup'),
	{ ssr: false, loading: () => <p>Loading...</p> }
);
function TopDeals({ bestDeals, location }) {
	const [openLocationPopup, setOpenLocationPopup] = useState(false);
	return (
		<section className="container pt-[25px] font-bold">
			<Title
				text={`Best Deals Near You`}
				onClick={() => setOpenLocationPopup(true)}
				location={`(${location})`}
			/>
			<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 justify-between  gap-8 py-4">
				{bestDeals &&
					bestDeals.map((item, index) => (
						<TopDealCard key={index} data={item} />
					))}
			</div>
			<div className="w-full md:w-1/4 m-auto p-4 drop-shadow-xl">
				<TopDealCard data={{ name: 'show all' }} />
			</div>

			{openLocationPopup && (
				<DynamicLocationPopup
					open={openLocationPopup}
					setOpen={setOpenLocationPopup}
				/>
			)}
		</section>
	);
}

export default TopDeals;

import TopDealCard from '../Cards/TopDealCard';
import Title from '../Title';
import 'react-loading-skeleton/dist/skeleton.css';
import LocationPopup from '../Popup/LocationPopup';
import { useState } from 'react';

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
					bestDeals
						.slice(0, 10)
						.map((item, index) => (
							<TopDealCard
								key={index}
								prodLink
								data={item}
								setProducts={() => null}
							/>
						))}
				<TopDealCard data={{ name: 'show all' }} />
			</div>
			<LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
		</section>
	);
}

export default TopDeals;

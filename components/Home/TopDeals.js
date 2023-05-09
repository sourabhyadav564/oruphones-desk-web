import { useEffect, useState } from 'react';
import TopDealCard from '../Cards/TopDealCard';
import Title from '../Title';
import * as Axios from '../../api/axios';
import Cookies from 'js-cookie';
import LocationPopup from '../Popup/LocationPopup';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TopDeals({ location }) {
	const [bestDeals, setBeatDeals] = useState([]);
	const [openLocationPopup, setOpenLocationPopup] = useState(false);
	const [isLoading, setLoading] = useState(true);
	let [pageNumber, setPageNumber] = useState(0);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [myFavListings, setMyFavListings] = useState([]);

	useEffect(() => {
		const loadData = (initialPage) => {
			const fetchNestDealsNearByMe = async () => {
				await Axios.bestDealNearByYou(
					location,
					Cookies.get('userUniqueId') || 'Guest',
					initialPage
				).then((response) => {
					setBeatDeals(
						[
							...response?.dataObject?.bestDeals,
							...response?.dataObject?.otherListings,
						] || []
					);
					setLoading(false);
				});
			};
			if (
				Cookies.get('userUniqueId') != undefined &&
				Cookies.get('userUniqueId') != '' &&
				Cookies.get('userUniqueId') != 'Guest'
			) {
				Axios.fetchMyFavorites(Cookies.get('userUniqueId')).then((res) => {
					setMyFavListings(res?.dataObject?.map((item2) => item2.listingId));
				});
			}
			if (location != undefined) {
				fetchNestDealsNearByMe();
			}
		};

		let intialPage = 0;
		setPageNumber(intialPage);
		loadData(intialPage);
	}, [location]);

	return (
		<section className="container pt-[25px] font-bold">
			<Title
				text={`Best Deals Near You`}
				onClick={() => setOpenLocationPopup(true)}
				location={`(${location})`}
			/>
			{
				bestDeals && bestDeals?.length > 1 ? (
					<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 justify-between  gap-8 py-4">
						{bestDeals &&
							bestDeals
								.slice(0, 10)
								.map((item, index) => (
									<TopDealCard
										key={index}
										prodLink
										data={item}
										setProducts={setBeatDeals}
									/>
								))}
						{isFinished && <TopDealCard data={{ name: 'show all' }} />}
					</div>
				) : (
					<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 justify-between  gap-8 py-4">
						{Array(10)
							.fill()
							.map((_, index) => (
								<div
									key={index}
									className="rounded-md shadow hover:shadow-md p-4 pb-6 bg-m-white w-[200px] h-[260px] space-y-3 mx-2"
								>
									<div className="text-center">
										<Skeleton circle width={120} height={120} />
										<div className="flex flex-col items-start pt-5">
											<Skeleton width={150} height={20} />
											<Skeleton width={100} height={20} />
											<Skeleton width={50} height={20} />
										</div>
									</div>
								</div>
							))}
					</div>
				)
				// )
			}
			{!isLoading && isFinished === false && (
				<Link
					className={`${
						isLoadingMore ? 'w-full' : 'w-full '
					}  flex justify-center items-center  hover:cursor-pointer`}
					href={{
						pathname: `/product/buy-old-refurbished-used-mobiles/bestdealnearyou`,
					}}
					passHref
				>
					<p className="flex justify-center w-full items-center font-semibold p-5 text-m-blue hover:underline hover:opacity-60 hover:cursor-pointer">
						{isLoadingMore ? 'Fetching more products...' : 'View All >'}
					</p>
				</Link>
			)}
			<LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
		</section>
	);
}

export default TopDeals;

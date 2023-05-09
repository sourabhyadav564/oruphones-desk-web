import BestDealsCard from '@/components/Cards/BestDealsCard';
import ProductCard from '@/components/Cards/ProductCard';
import Carousel from '@/components/Carousel';
import Filter from '@/components/Filter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as Axios from '../../../../../../api/axios';
import AppContext from '@/context/ApplicationContext';
import { useContext } from 'react';
import { numberFromString, stringToDate } from '@/utils/util';
import Cookies from 'js-cookie';
import ProductSkeletonCard from '@/components/Cards/ProductSkeletonCard';

const settings = {
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 4000,
	pauseOnHover: true,
	dots: true,
	arrows: true,
	infinite: true,
	swipeToSlide: true,
};

const Pricerange = () => {
	const router = useRouter();
	const { min, max } = router.query;
	const [bestDeal, setBestDeal] = useState();
	const [otherListings, setOtherListings] = useState([]);
	const [totalProducts, setTotalProducts] = useState([]);
	const { getSearchLocation } = useContext(AppContext);
	const [applyFilter, setApplyFilter] = useState({});
	const [isLoading, setLoading] = useState(true);
	const [applySort, setApplySort] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const priceRange = await Axios.shopByPriceRange(
				max === 'above' ? '200000' : max,
				getSearchLocation,
				min,
				Cookies.get('userUniqueId') || 'Guest',
				applySort
			);
			setBestDeal(priceRange?.dataObject?.bestDeals);
			setTotalProducts(priceRange?.dataObject?.totalProducts);
			setOtherListings(priceRange?.dataObject?.otherListings);
			setLoading(false);
		};
		if (min != undefined && max != undefined) {
			fetchData();
		}
	}, [min, max, getSearchLocation]);

	useEffect(() => {
		const {
			brand,
			condition,
			color,
			storage,
			Ram,
			warranty,
			verification,
			minPrice,
			maxPrice,
		} = applyFilter;
		if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
			let payLoad = {
				listingLocation: getSearchLocation,
				maxsellingPrice: max === 'above' ? '200000' : max,
				minsellingPrice: min,
				reqPage: 'SBYP',
			};
			if (brand?.length > 0) {
				payLoad.make = brand.includes('all') ? [] : brand;
			}
			if (condition?.length > 0) {
				payLoad.deviceCondition = condition.includes('all') ? [] : condition;
			}
			if (storage?.length > 0) {
				payLoad.deviceStorage = storage.includes('all') ? [] : storage;
			}
			if (Ram?.length > 0) {
				payLoad.deviceRam = Ram.includes('all') ? [] : Ram;
			}
			if (color?.length > 0) {
				payLoad.color = color.includes('all') ? [] : color;
			}
			if (warranty?.length > 0) {
				payLoad.warenty = warranty.includes('all') ? [] : warranty;
			}
			if (verification?.length > 0) {
				payLoad.verified = verification.includes('all') ? [] : 'verified';
			}
			setLoading(true);
			Axios.searchFilter(payLoad, Cookies.get('userUniqueId') || 'Guest').then(
				(response) => {
					setOtherListings(response?.dataObject?.otherListings);
					setTotalProducts(response?.dataObject?.totalProducts);
					setBestDeal([]);
					setLoading(false);
				}
			);
		}
	}, [applyFilter]);

	return (
		<main className="container py-4">
			<h1 className="sr-only">Listing nearme</h1>
			<Filter setApplyFilter={setApplyFilter} setApplySort={setApplySort}>
				{isLoading ? (
					<ProductSkeletonCard isBestDeal={true} />
				) : (
					!isLoading &&
					bestDeal &&
					bestDeal.length > 0 && (
						<Carousel {...settings}>
							{bestDeal.map((items, index) => (
								<BestDealsCard
									key={index}
									data={items}
									setProducts={setBestDeal}
									className="bestDealCarousel"
								/>
							))}
						</Carousel>
					)
				)}
				<div className="grid grid-cols-3 gap-4 mt-3">
					{isLoading ? (
						Array(10)
							.fill()
							.map((_, index) => <ProductSkeletonCard isTopSelling={true} />)
					) : !isLoading &&
					  isFinished == false &&
					  otherListings.length != totalProducts ? (
						otherListings?.map((product, index) => (
							<ProductCard
								key={index}
								data={product}
								prodLink
								setProducts={setOtherListings}
							/>
						))
					) : (
						<div className="col-span-3 h-96 items-center flex justify-center ">
							{isLoading ? 'Loading...' : 'No match found'}
						</div>
					)}
				</div>
			</Filter>
		</main>
	);
};

export default Pricerange;

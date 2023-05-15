import BestDealsCard from '@/components/Cards/BestDealsCard';
import Filter from '@/components/Filter';
import React, { useState, useEffect } from 'react';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/Cards/ProductCard';
import NoMatch from '@/components/NoMatch';
import { metaTags } from '@/utils/constant';
import Head from 'next/head';
import ShopByBrandSection from '@/components/ShopByBrandSection';
import ProductSkeletonCard from '@/components/Cards/ProductSkeletonCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import getFilteredListings from '@/utils/fetchers/filteredFetch';
import TListingFilter, { TListingReturnFilter, Tmodel } from '@/types/ListingFilter';
import { useQuery } from '@tanstack/react-query';
import { SwiperSlide } from 'swiper/react';
import getModels from '@/utils/fetchers/getModels';
import { useAtomValue } from 'jotai';
import filterAtom from '@/store/productFilter';
import { useHydrateAtoms } from 'jotai/utils';

type TPageProps = {
	makeName: string;
	products: TListingReturnFilter[];
	bestDeals: TListingReturnFilter[];
	models: Tmodel[];
	filters: TListingFilter;
};

const settings = {
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 4000,
	pauseOnHover: true,
	dots: true,
	arrows: true,
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async (
	ctx
) => {
	let makeName = ctx.query.makeName as string;
	makeName = makeName
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	const filters: TListingFilter = {
		make: makeName as string,
		page: 1,
		limit: 11,
	};
	let products: TListingReturnFilter[] = await getFilteredListings(filters);
	console.log('length: ', products.length);
	let models = await getModels(makeName);
	const bestDeals = products.slice(0, 5);
	products = products.slice(5);
	return {
		props: {
			makeName,
			products,
			bestDeals,
			models,
			filters
		},
	};
};

function BrandPage({
	makeName,
	products,
	bestDeals,
	models,
	filters
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([[filterAtom, filters]]);
	const [title, setTitle] = useState<string>(makeName);
	const [description, setDescription] = useState<string>('Description');
	const filterData = useAtomValue(filterAtom);
	const { data, isLoading, isError } = useQuery({
		queryKey: ['listings', { make: makeName }, { filter: filterData }],
		queryFn: () => getFilteredListings(filterData),
		initialData: products,
	});
	useEffect(() => {
		switch (makeName) {
			case 'apple':
				setTitle(metaTags.APPLE.title);
				setDescription(metaTags.APPLE.description);
				break;
			case 'samsung':
				setTitle(metaTags.SAMSUNG.title);
				setDescription(metaTags.SAMSUNG.description);
				break;
			case 'oppo':
				setTitle(metaTags.OPPO.title);
				setDescription(metaTags.OPPO.description);
				break;
			case 'oneplus':
				setTitle(metaTags.ONEPLUS.title);
				setDescription(metaTags.ONEPLUS.description);
				break;
			case 'xiaomi':
				setTitle(metaTags.XIAOMI.title);
				setDescription(metaTags.XIAOMI.description);
				break;
			case 'vivo':
				setTitle(metaTags.VIVO.title);
				setDescription(metaTags.VIVO.description);
				break;
			case 'realme':
				setTitle(metaTags.REALME.title);
				setDescription(metaTags.REALME.description);
				break;
			case 'lenovo':
				setTitle(metaTags.LENOVO.title);
				setDescription(metaTags.LENOVO.description);
				break;
			case 'nokia':
				setTitle(metaTags.NOKIA.title);
				setDescription(metaTags.NOKIA.description);
				break;
			case 'google':
				setTitle(metaTags.GOOGLE.title);
				setDescription(metaTags.GOOGLE.description);
				break;
			case 'honor':
				setTitle(metaTags.HONOR.title);
				setDescription(metaTags.HONOR.description);
				break;
			case 'asus':
				setTitle(metaTags.ASUS.title);
				setDescription(metaTags.ASUS.description);
				break;
			case 'blackberry':
				setTitle(metaTags.BLACKBERRY.title);
				setDescription(metaTags.BLACKBERRY.description);
				break;
			default:
				setTitle(metaTags.BRANDS.title);
				setDescription(metaTags.BRANDS.description);
				break;
		}
	}, [makeName]);

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
			</Head>
			<main className="container py-4">
				<h1 className="sr-only">{`${makeName} Page`}</h1>
				<Filter
					listingsCount={products?.length + bestDeals?.length}
					makeName={makeName}
				>
					{isLoading ? (
						<ProductSkeletonCard isBestDeal={true} />
					) : (
						!isLoading &&
						bestDeals &&
						bestDeals.length > 0 && (
							<div className="w-full h-1/4">
								<Carousel
									{...settings}
									key={bestDeals.length > 0 ? bestDeals.length : -1}
									className="bestDealCarousel"
								>
									{bestDeals.map((items, index) => (
										<SwiperSlide key={index}>
											<BestDealsCard data={items} />
										</SwiperSlide>
									))}
								</Carousel>
							</div>
						)
					)}
					{models?.length > 0 && (
						<div className="font-Roboto-Semibold text-xlFontSize">
							<p className="opacity-50">Shop By Model</p>
							<ShopByBrandSection
								shopbymodeldata={models}
								shopbymakedata={makeName}
							/>
						</div>
					)}
					<h4 className="font-Roboto-Semibold text-xlFontSize opacity-50 md:py-8 py-4 mb-4">
						Total Products ({products?.length + bestDeals?.length})
					</h4>
					<div className="grid md:grid-cols-3 grid-cols-2 m-auto md:pl-0 pl-4  justify-center gap-8 ">
						{isLoading ? (
							Array(10).map((_, index) => (
								<ProductSkeletonCard isTopSelling={true} key={index} />
							))
						) : !isLoading && !isError && products.length > 0 ? (
							products?.map((product, index) => (
								<div key={index}>
									<ProductCard data={product} prodLink />
								</div>
							))
						) : (
							<div className="col-span-3 pt-20 h-96 items-center flex justify-center ">
								{isLoading ? 'Loading...' : <NoMatch />}
							</div>
						)}
					</div>
					{/* {!isLoading &&
						isFinished === false &&
						products.length != totalProducts && (
							<span
								className={`${
									isLoadingMore ? 'w-[250px]' : 'w-[150px]'
								} rounded-md shadow hover:drop-shadow-lg p-4 bg-m-white flex justify-center items-center hover:cursor-pointer mt-5`}
								onClick={loadMoreData}
							>
								<p className="block text-m-green font-semibold">
									{isLoadingMore ? 'Fetching more products...' : 'Load More'}
								</p>
							</span>
						)} */}
				</Filter>
			</main>
		</>
	);
}

export default BrandPage;

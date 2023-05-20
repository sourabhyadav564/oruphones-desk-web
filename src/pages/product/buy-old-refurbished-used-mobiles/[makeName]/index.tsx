import BestDealsCard from '@/components/Cards/BestDealsCard';
import Filter from '@/components/Filter';
import React, { useState, useEffect } from 'react';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/Cards/ProductCard';
// import NoMatch from '@/components/NoMatch';
import { metaTags } from '@/utils/constant';
import Head from 'next/head';
import ShopByBrandSection from '@/components/ShopByBrandSection';
import ProductSkeletonCard from '@/components/Cards/ProductSkeletonCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import getFilteredListings from '@/utils/fetchers/filteredFetch';
import TListingFilter, {
	TListingReturnFilter,
	Tmodel,
} from '@/types/ListingFilter';
import {
	useInfiniteQuery,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query';
import { SwiperSlide } from 'swiper/react';
import getModels from '@/utils/fetchers/getModels';
import { atom, useAtom } from 'jotai';
import filterAtom from '@/store/productFilter';
import { useHydrateAtoms } from 'jotai/utils';
import { useInView } from 'react-intersection-observer';
import { getCookie, setCookie } from 'cookies-next';
import { locationAtom } from '@/store/location';
import useDebounce from '@/hooks/useDebounce';
import NoMatch from '@/components/NoMatch';

type TPageProps = {
	makeName: string;
	bestDeals: TListingReturnFilter[];
	models: Tmodel[];
	filters: TListingFilter;
	dehydratedState: any;
	location: string;
};

const settings = {
	slidesPerView: 1,
	autoplay: {
		delay: 5000,
	},
	navigation: {
		dots: true,
		arrows: true,
	},
};

const filterPageAtom = atom<number>(1);

export const getServerSideProps: GetServerSideProps<TPageProps> = async (
	ctx
) => {
	let cookie = getCookie('location', ctx) as string;
	if (!cookie) {
		// set cookie to India
		setCookie('location', 'India', { ...ctx, maxAge: 24 * 60 * 60 });
		cookie = 'India';
	}
	let makeName = ctx.query.makeName as string;
	makeName = makeName
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	let filters: TListingFilter = {
		make: [makeName as string],
		listingLocation: cookie,
		limit: 11,
	};
	const queryClient = new QueryClient();
	let infiniteDeals = await queryClient.fetchInfiniteQuery({
		queryKey: ['filtered-listings', filters],
		queryFn: async () => {
			const data = await getFilteredListings({ ...filters, page: 1 });
			return data;
		},
	});
	const bestDeals = infiniteDeals.pages[0].data.slice(0, 5);
	let models = await getModels(makeName, 20);
	return {
		props: {
			makeName,
			bestDeals,
			models,
			filters,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			location: cookie,
		},
	};
};

// TODO: Back to top button/ floating filter menu
// TODO: Replace text with NoMatch component
function BrandPage({
	makeName,
	bestDeals,
	models,
	filters,
	location,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([
		[filterAtom, { ...filters, limit: 12 }],
		[filterPageAtom, 1],
		[locationAtom, location],
	]);
	const [title, setTitle] = useState<string>(makeName);
	const [description, setDescription] = useState<string>('Description');
	const [filterData, setFilterData] = useAtom(filterAtom);
	const [filterPage, setFilterPage] = useAtom(filterPageAtom);
	const debouncedFilterData = useDebounce(filterData, 750);

	const {
		isLoading,
		data,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['filtered-listings', debouncedFilterData],
		queryFn: async ({ pageParam }) => {
			const data = await getFilteredListings({
				...filterData,
				page: pageParam,
			});
			return data;
		},
		getNextPageParam: (lastPage) => {
			if (lastPage?.data.length < (filters.limit || 12)) {
				return undefined;
			}
			return filterPage;
		},
	});
	const { ref } = useInView({
		triggerOnce: false,
		threshold: 0.45,
		onChange: (inView) => {
			if (inView) {
				setFilterPage(filterPage + 1);
				fetchNextPage();
			}
		},
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

	// update brand name in filter if changed
	useEffect(() => {
		if (filterData?.make && filterData.make[0] === makeName) return;
		setFilterData({ ...filterData, make: [makeName] });
	}, [makeName, setFilterData, filterData]);

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
					listingsCount={
						isLoading || isFetchingNextPage || !data?.pages[0]
							? 0
							: data?.pages[0].totalCount || 0
					}
					makeName={makeName}
					defaultBrands={[makeName]}
				>
					<div className="w-full h-[21rem]">
						<Carousel
							{...settings}
							key={bestDeals?.length > 0 ? bestDeals.length : -1}
							className="bestDealCarousel h-full"
						>
							{bestDeals?.map((items, index) => (
								<SwiperSlide key={index}>
									<BestDealsCard data={items} />
								</SwiperSlide>
							))}
						</Carousel>
					</div>
					{(!data || !data.pages[0]) && <NoMatch />}
					{data?.pages[0] && (
						<>
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
								{`Total Products (${
									isLoading || isFetchingNextPage || !data?.pages[0]
										? 0
										: data?.pages[0].totalCount || 0
								})`}
							</h4>
							<div className="grid md:grid-cols-3 grid-cols-2 m-auto md:pl-0 pl-4  justify-center gap-8 ">
								{data?.pages[0]
									? data?.pages.map((page, idx1) => {
											return (
												<React.Fragment key={idx1}>
													{page.data?.map((product, idx2) => {
														return (
															<div key={idx2}>
																<ProductCard data={product} prodLink />
																{/* <ProductSkeletonCard /> */}
															</div>
														);
													})}
												</React.Fragment>
											);
									  })
									: null}
								{!isLoading && !isFetchingNextPage && !data?.pages[0] && (
									<div className="text-center w-full">
										<h1 className="text-2xl font-Roboto-Semibold">
											No Products Found
										</h1>
									</div>
								)}
								{isFetchingNextPage &&
									Array.from({ length: 12 }).map((_, idx) => (
										<div key={idx}>
											<ProductSkeletonCard key={idx} />
										</div>
									))}
							</div>

							<button
								ref={ref}
								disabled={isFetchingNextPage || isError}
								onClick={() => {
									setFilterPage(filterPage + 1);
									fetchNextPage();
								}}
								className={`${
									!hasNextPage && 'hidden'
								} rounded-md shadow hover:drop-shadow-lg p-4 bg-m-white flex justify-center items-center hover:cursor-pointer mt-5 disabled:opacity-10`}
							>
								{`${isFetchingNextPage ? 'Loading...' : 'Next page'}`}
							</button>
						</>
					)}
				</Filter>
			</main>
		</>
	);
}

export default BrandPage;

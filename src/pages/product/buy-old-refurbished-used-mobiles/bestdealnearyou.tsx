import BestDealsCard from '@/components/Cards/BestDealsCard';
import Filter from '@/components/Filter';
import React from 'react';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/Cards/ProductCard';
import ProductSkeletonCard from '@/components/Cards/ProductSkeletonCard';
import TListingFilter, {
	TListingReturnFilter,
	Tmodel,
} from '@/types/ListingFilter';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCookie, setCookie } from 'cookies-next';
import { QueryClient, dehydrate } from '@tanstack/query-core';
import getFilteredListings from '@/utils/fetchers/filteredFetch';
import Head from 'next/head';
import { useHydrateAtoms } from 'jotai/utils';
import { locationAtom } from '@/store/location';
import filterAtom from '@/store/productFilter';
import { atom, useAtom } from 'jotai';
import useDebounce from '@/hooks/useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { SwiperSlide } from 'swiper/react';
import getMakes from '@/utils/fetchers/getMakes';
import NoMatch from '@/components/NoMatch';

const settings = {
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 4000,
	pauseOnHover: true,
	dots: true,
	arrows: true,
	dotsWrapperStyle: { marginBottom: 20 },
};

type TPageProps = {
	bestDeals: TListingReturnFilter[];
	allMakes: string[];
	filters: TListingFilter;
	dehydratedState: any;
	location: string;
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async (
	ctx
) => {
	let cookie = getCookie('location', ctx) as string;
	if (!cookie) {
		// set cookie to India
		setCookie('location', 'India', { ...ctx, maxAge: 24 * 60 * 60 });
		cookie = 'India';
	}

	let filters: TListingFilter = {
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
	const allMakes = await getMakes();
	return {
		props: {
			bestDeals,
			allMakes,
			filters,
			location: cookie,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	};
};

const filterPageAtom = atom<number>(1);

function Bestdealnearyou({
	bestDeals,
	allMakes,
	filters,
	location,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([
		[locationAtom, location],
		[filterAtom, { ...filters, limit: 12 }],
		[filterPageAtom, 1],
	]);
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

	return (
		<>
			<Head>
				<title>{`Oruphones Search`}</title>
				<meta
					name="description"
					content={`Search page for all the best deals in every possible brand!`}
				/>
				<meta property="og:title" content={`Oruphones Search`} />
				<meta
					property="og:description"
					content={`Search page for all the best deals in every possible brand!`}
				/>
			</Head>
			<main className="container py-4">
				<h1 className="sr-only">Best Deal Near You Page</h1>
				<Filter
					listingsCount={
						isLoading || isFetchingNextPage || !data?.pages[0]
							? 0
							: data?.pages[0].totalCount || 0
					}
					defaultBrands={allMakes}
				>
					<div className="w-full h-[21rem]">
						<Carousel
							{...settings}
							key={bestDeals.length > 0 ? bestDeals.length : -1}
							className="bestDealCarousel h-full"
						>
							{bestDeals.map((items, index) => (
								<SwiperSlide key={index}>
									<BestDealsCard data={items} />
								</SwiperSlide>
							))}
						</Carousel>
					</div>
					{(!data || !data.pages[0]) && <NoMatch />}
					{data?.pages[0] && (
						<>
							<h4 className="font-Roboto-Semibold text-xlFontSize opacity-50 mb-4">
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

export default Bestdealnearyou;

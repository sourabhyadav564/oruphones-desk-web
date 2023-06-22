import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SwiperSlide } from 'swiper/react';
import BestDealsCard from '@/components/Cards/BestDealsCard';
import ProductCard from '@/components/Cards/ProductCard';
import ProductSkeletonCard from '@/components/Cards/ProductSkeletonCard';
import Carousel from '@/components/Carousel';
import Filter from '@/components/Filter';
import NoMatch from '@/components/NoMatch';
import useDebounce from '@/hooks/useDebounce';
import { locationAtom } from '@/store/location';
import filterAtom from '@/store/productFilter';
import TListingFilter from '@/types/ListingFilter';
import getFilteredListings from '@/utils/fetchers/filteredFetch';
import getMakes from '@/utils/fetchers/getMakes';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { getCookie, setCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

const settings = {
	slidesPerView: 1,
	navigation: {
		arrows: true,
	},
	pagination: {
		dots: true,
	},
	autoplay: {
		delay: 5000,
	},
	loop: true,
};

type TPageProps = {
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
	// account for possible query params
	const { verified, condition, warranty, minPrice, maxPrice } = ctx.query as {
		verified: string | undefined;
		condition: string | undefined;
		warranty: string | undefined;
		minPrice: string | undefined;
		maxPrice: string | undefined;
	};
	let filters: TListingFilter = {
		listingLocation: cookie,
		limit: 12,
		...(verified && { verified: verified === 'true' }),
		...(condition && { condition: [condition] }),
		...(warranty && { warranty: [warranty] }),
		...(minPrice && {
			priceRange: [
				parseInt(minPrice) || 0,
				parseInt(maxPrice as string) || 999999,
			],
		}),
	};
	const queryClient = new QueryClient();
	let infiniteDeals = await queryClient.fetchInfiniteQuery({
		queryKey: ['filtered-listings', filters],
		queryFn: async () => {
			const data = await getFilteredListings({ ...filters, page: 1 }, true);
			return data;
		},
	});
	const allMakes = await getMakes();
	// cache this SSR response
	// ctx.res.setHeader(
	// 	'Cache-Control',
	// 	'public, s-maxage=3600, stale-while-revalidate=59' // cached for 1 hour, revalidate after 1 minute
	// );
	return {
		props: {
			allMakes,
			filters,
			location: cookie,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	};
};

function Bestdealnearyou({
	allMakes,
	filters,
	location,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([
		[locationAtom, location],
		[filterAtom, filters],
	]);
	const [filterData, setFilterData] = useAtom(filterAtom);
	const debouncedFilterData = useDebounce(filterData, 400);
	const queryClient = useQueryClient();

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
			const data = await getFilteredListings(
				{
					...filterData,
					page: pageParam ? pageParam.pageNum : 1,
					...(pageParam && {
						notionalIDs: pageParam.notionalIDs,
					}),
				},
				true
			);
			return data;
		},
		getNextPageParam: (lastPage, allPages) => {
			const currentRecordCount = allPages.length * (filterData.limit || 12);
			if (currentRecordCount >= (allPages[0]?.totalCount || 0)) {
				return undefined;
			}
			const currentPage = allPages.length;
			return {
				pageNum: currentPage + 1,
				notionalIDs: allPages[0]?.bestDeals?.map((deal: any) => deal.listingId),
			};
		},
	});

	// mutate bestDeals data
	const setBestFavDeal = useMutation({
		mutationFn: async (paramData: string) => true,
		onSuccess: (returnData, paramData: string) => {
			console.log('paramData', paramData);
			queryClient.setQueryData(
				['filtered-listings', debouncedFilterData],
				(oldData: any) => {
					return oldData
						? {
								...oldData,
								pages: oldData.pages.map((page: any, idx: number) => {
									if (idx === 0) {
										return {
											...page,
											bestDeals: page.bestDeals.map((deal: any) => {
												if (deal.listingId === paramData) {
													return {
														...deal,
														favourite: !(deal.favourite || false),
													};
												}
												return deal;
											}),
										};
									}
									return page;
								}),
						  }
						: undefined;
				}
			);
		},
	});

	// Mutate favourite data
	const setFavDeal = useMutation({
		mutationFn: async (paramData: { listingId: string; page: number }) =>
			paramData,
		onSuccess: (paramData: { listingId: string; page: number }) => {
			queryClient.setQueryData(
				['filtered-listings', debouncedFilterData],
				(oldData: any) => {
					return oldData
						? {
								...oldData,
								pages: oldData.pages.map((page: any, idx: number) => {
									if (idx === paramData.page) {
										return {
											...page,
											data: page.data.map((deal: any) => {
												if (deal.listingId === paramData.listingId) {
													return {
														...deal,
														favourite: !(deal.favourite || false),
													};
												}
												return deal;
											}),
										};
									}
									return page;
								}),
						  }
						: undefined;
				}
			);
		},
	});

	const { ref } = useInView({
		triggerOnce: false,
		threshold: 0.45,
		onChange: (inView) => {
			if (inView) {
				fetchNextPage();
			}
		},
	});

	useEffect(() => {
		setFilterData({ ...filters, limit: 12, make: undefined });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<>
					<Filter
						listingsCount={
							isLoading || isFetchingNextPage || !data?.pages[0]
								? 0
								: Math.max(data?.pages[0]?.totalCount!, 0) || 0
						}
						defaultBrands={allMakes}
					>
						{(isLoading || data?.pages[0]?.bestDeals) && (
							<div className="w-full h-[21rem]">
								{isLoading && <ProductSkeletonCard isBestDeal={true} />}
								{data?.pages[0].bestDeals && (
									<Carousel
										{...settings}
										key={
											data?.pages[0]?.data?.length > 0
												? data?.pages[0]?.data?.length
												: -1
										}
										className="bestDealCarousel h-full"
									>
										{data?.pages[0].bestDeals?.map((items, index) => (
											<SwiperSlide key={index}>
												<BestDealsCard
													data={items}
													setProducts={(listingId: string) =>
														setBestFavDeal.mutate(listingId)
													}
												/>
											</SwiperSlide>
										))}
									</Carousel>
									// <ProductSkeletonCard isBestDeal={true} />
								)}
							</div>
						)}
						<h4 className="font-Roboto-Semibold text-xlFontSize opacity-50 mb-4">
							{/* {`Filter: ${JSON.stringify(filterData)}`}
								<br /> */}
							{`Total Products (${
								isLoading || isFetchingNextPage || !data?.pages[0]
									? 0
									: Math.max(0, data?.pages[0]?.totalCount!) || 0
							})`}
						</h4>
						{(!data || !data.pages[0] || !data.pages[0].data) && !isLoading && (
							<NoMatch />
						)}
						{(!data || !data.pages[0]) && isLoading && (
							<div className="grid md:grid-cols-3 grid-cols-2 m-auto md:pl-0 pl-4  justify-center gap-8 ">
								{Array.from({ length: 12 }).map((_, idx) => (
									<div key={idx}>
										<ProductSkeletonCard key={idx} />
									</div>
								))}
							</div>
						)}
						{data?.pages[0] && (
							<>
								<div className="grid md:grid-cols-3 grid-cols-2 m-auto md:pl-0 pl-4  justify-center gap-8 ">
									{data?.pages[0]
										? data?.pages.map((page, idx1) => {
												return (
													<React.Fragment key={idx1}>
														{page.data?.map((product, idx2) => {
															return (
																<div key={idx2}>
																	<ProductCard
																		data={product}
																		setProducts={(listingId: string) =>
																			setFavDeal.mutate({
																				listingId,
																				page: idx1,
																			})
																		}
																	/>
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
				</>
			</main>
		</>
	);
}

export default Bestdealnearyou;

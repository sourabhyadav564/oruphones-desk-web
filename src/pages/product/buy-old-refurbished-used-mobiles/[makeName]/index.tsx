import {
	dehydrate,
	QueryClient,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SwiperSlide } from 'swiper/react';
import BestDealsCard from '@/components/Cards/BestDealsCard';
import ProductCard from '@/components/Cards/ProductCard';
import ProductSkeletonCard from '@/components/Cards/ProductSkeletonCard';
import Carousel from '@/components/Carousel';
import Filter from '@/components/Filter';
import NoMatch from '@/components/NoMatch';
import ShopByBrandSection from '@/components/ShopByBrandSection';
import { locationAtom } from '@/store/location';
import filterAtom from '@/store/productFilter';
import TListingFilter, { Tmodel } from '@/types/ListingFilter';
import { metaTags } from '@/utils/constant';
import getFilteredListings from '@/utils/fetchers/filteredFetch';
import getModels from '@/utils/fetchers/getModels';
import { getCookie, setCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

type TPageProps = {
	makeName: string;
	models: Tmodel[];
	filters: TListingFilter;
	dehydratedState: any;
	location: string;
};

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

export const getServerSideProps: GetServerSideProps<TPageProps> = async (
	ctx
) => {
	let cookie = getCookie('location', ctx) as string;
	let latitude = Number(getCookie('latitude', ctx)) ;
	let longitude = Number(getCookie('longitude', ctx)) ;
 
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
		latitude : latitude,
		longitude : longitude,
		limit: 12,
	};
	const queryClient = new QueryClient();
	let infiniteDeals = await queryClient.fetchInfiniteQuery({
		queryKey: ['filtered-listings', filters],
		queryFn: async () => {
			const data = await getFilteredListings({ ...filters, page: 1 }, true, ctx.req);
			return data;
		},
	});
	let models = await getModels(makeName, 20, ctx.req);
	return {
		props: {
			makeName,
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
	models,
	filters,
	location,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([
		[filterAtom, filters],
		[locationAtom, location],
	]);
	const [title, setTitle] = useState<string>(makeName);
	const [description, setDescription] = useState<string>('Description');
	const [filterData, setFilterData] = useAtom(filterAtom);
	const router = useRouter();
	const queryClient = useQueryClient();

	const {
		isLoading,
		data,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['filtered-listings', filterData],
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

	// update brand name in filter if changed, (hydrate Atom doesnt work in rerenders, only in first render)
	useEffect(() => {
		if (!router.query.makeName) return;
		let makeName = router.query.makeName as string;
		makeName = makeName
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		if (filterData?.make?.[0] === makeName) return;
		setFilterData({ ...filters, make: [makeName] });
	}, [router.query.makeName, filterData, filters, setFilterData]);

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
							: Math.max(data?.pages[0]?.totalCount!, 0) || 0
					}
					makeName={makeName}
					defaultBrands={[makeName]}
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
									{data!.pages[0].bestDeals?.map((items, index) => (
										<SwiperSlide key={index}>
											<BestDealsCard
												data={items}
											/>
										</SwiperSlide>
									))}
								</Carousel>
							)}
						</div>
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
			</main>
		</>
	);
}

export default BrandPage;

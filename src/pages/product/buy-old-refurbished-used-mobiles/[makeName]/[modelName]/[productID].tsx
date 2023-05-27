import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProductCard from '@/components/Cards/ProductCard';
import ProductDetailsCard from '@/components/Cards/ProductDetailsCard';
import FullImageView from '@/components/FullImageView';
import { locationAtom } from '@/store/location';
import { TListingReturnFilter } from '@/types/ListingFilter';
import {
	getListingByID,
	getSimilarListings,
} from '@/utils/fetchers/filteredFetch';
import getLeaderboard from '@/utils/fetchers/getLeaderboard';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type TPageProps = {
	productID: string;
	dehydratedState: any;
	make: string | undefined;
	model: string | undefined;
	leaderBoard: TListingReturnFilter[];
};

const returnFilter = {
	_id: 1,
	deviceCondition: 1,
	defaultImage: 1,
	listingLocation: 1,
	listingPrice: 1,
	marketingName: 1,
	model: 1,
	make: 1,
	listingDate: 1,
	listedBy: 1,
	listingId: 1,
	images: 1,
	imagePath: 1,
	isOtherVendor: 1,
	deviceStorage: 1,
	charger: 1,
	earphone: 1,
	originalBox: 1,
	deviceRam: 1,
	warranty: 1,
	cosmetic: 1,
	status: 1,
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async (
	ctx
) => {
	const productID = ctx.params!.productID as string;
	const queryClient = new QueryClient();
	const prod = await queryClient.fetchQuery({
		queryKey: ['product-listing', productID],
		queryFn: async () => {
			const data = await getListingByID(
				{
					listingId: productID as string,
				},
				returnFilter as any
			);
			return data;
		},
	});
	const { make, model } = prod;
	const productLeaderboard = await queryClient.fetchQuery({
		queryKey: ['product-leaderboard', make, model],
		queryFn: () => getLeaderboard({ listingId: productID as string }),
	});
	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=43200, stale-while-revalidate=59' // cached for 12 hours, revalidate after 1 minute
	);
	return {
		props: {
			productID,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			make,
			model,
			leaderBoard: productLeaderboard,
		},
	};
};

export const leaderBoardAtom = atom<TListingReturnFilter[]>([]);
export const dealsYouMayLikeAtom = atom<TListingReturnFilter[]>([]);
function ProductDetails({
	productID,
	make,
	model,
	leaderBoard,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([[leaderBoardAtom, leaderBoard]]);
	const [openImageFullView, setOpenImageFullView] = useState(false);
	const [contextData, setContextData] = useState('');
	const locationVal = useAtomValue(locationAtom);
	const setDealsYouMayLike = useSetAtom(dealsYouMayLikeAtom);
	const { data, isLoading, isError } = useQuery({
		queryKey: ['product-listing', productID],
		queryFn: async () => {
			const data = await getListingByID(
				{
					listingId: productID as string,
				},
				returnFilter as any
			);
			return data;
		},
	});
	const { data: similarProducts, isLoading: similarProductsLoading } = useQuery(
		{
			queryKey: ['similar-products', productID],
			queryFn: async () => {
				const data = await getSimilarListings({
					listingId: productID as string,
					limit: 20,
					make: ['yes' as string],
					model: ['yes' as string],
					condition: ['yes' as string],
					storage: ['yes' as string],
				});
				return data;
			},
		}
	);
	const { data: dealsYouMayLike, isLoading: dealsYouMayLikeLoading } = useQuery(
		{
			queryKey: ['deals-you-may-like', productID],
			queryFn: async () => {
				const returnFilter = {
					listingPrice: 1,
					listingId: 1,
					marketingName: 1,
					defaultImage: 1,
					listingLocation: 1,
					deviceStorage: 1,
					deviceCondition: 1,
					warranty: 1,
					listedBy: 1,
					verified: 1,
				};
				const data = await getSimilarListings({
					includeSelf: true,
					listingId: productID as string,
					limit: 5,
					...(locationVal !== 'India' && { listingLocation: locationVal }),
					...(make && { make: [make] }),
				});
				setDealsYouMayLike(data?.data);
				return data.data;
			},
		}
	);

	return (
		<>
			<Head>
				<title>{data?.marketingName || 'Product Details'} | OruPhones</title>
				<meta
					name="description"
					content={`Buy ${data?.marketingName} at the best price in ${data?.listingLocation} from OruPhones. ${data?.marketingName} is available in ${data?.deviceStorage}GB and ${data?.deviceRam}GB RAM.`}
				/>
				<meta
					name="keywords"
					content={`${data?.marketingName}, ${data?.marketingName} price, ${data?.marketingName} price in ${data?.listingLocation}, ${data?.marketingName} price in India, ${data?.marketingName} price in ${data?.listingLocation} ${data?.deviceStorage}GB ${data?.deviceRam}GB RAM, ${data?.marketingName} price in India ${data?.deviceStorage}GB ${data?.deviceRam}GB RAM, ${data?.marketingName} price in ${data?.listingLocation} ${data?.deviceStorage}GB, ${data?.marketingName} price in India ${data?.deviceStorage}GB, ${data?.marketingName} price in ${data?.listingLocation} ${data?.deviceRam}GB RAM, ${data?.marketingName} price in India ${data?.deviceRam}GB RAM, ${data?.marketingName} price in ${data?.listingLocation} ${data?.deviceStorage}, ${data?.marketingName} price in India ${data?.deviceStorage}, ${data?.marketingName} price in ${data?.listingLocation} ${data?.deviceRam}, ${data?.marketingName} price in India ${data?.deviceRam}`}
				/>
			</Head>
			<main className="container my-6">
				<p className="sr-only"> Product Details page </p>
				<section className="grid grid-cols-4 gap-4">
					<div className="bg-white col-span-5">
						<ProductDetailsCard
							key={productID}
							data={data}
							openFullImage={() => setOpenImageFullView(true)}
							onDataContext={setContextData}
						/>
					</div>
					<div className="col-span-4">
						<p
							className="text-m-black font-Roboto-Light text-regularFontSize my-3"
							style={{ fontSize: 21 }}
						>
							Similar Products ({similarProducts?.totalCount || 0})
						</p>
						<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-4">
							{similarProducts && similarProducts.data.length > 0 ? (
								similarProducts?.data.map((product: any, index: number) => (
									<ProductCard key={index} data={product} prodLink />
								))
							) : (
								<div className="text-center font-Roboto-Light text-regularFontSize pt-2 col-span-4 h-20">
									There are no similar products
								</div>
							)}
						</div>
						{similarProducts &&
							similarProducts.data.length > 0 &&
							make &&
							model && (
								<Link
									href={`/product/buy-old-refurbished-used-mobiles/${make}/${model}`}
									passHref
								>
									<p
										className={`${
											similarProductsLoading ? 'w-[250px]' : 'w-[150px]'
										} rounded-md shadow hover:drop-shadow-lg p-4 bg-m-white flex justify-center items-center hover:cursor-pointer mt-5`}
									>
										{similarProductsLoading
											? 'Fetching products...'
											: 'Load More'}
									</p>
								</Link>
							)}
					</div>
				</section>
				<FullImageView
					open={openImageFullView}
					close={() => setOpenImageFullView(false)}
					currentslide={contextData}
					images={
						(data?.images?.length && data?.images) ||
						(data?.defaultImage?.fullImage && [
							{ fullImage: data?.defaultImage?.fullImage },
						]) ||
						(data?.imagePath && [
							{
								fullImage: data?.imagePath,
								thumbImage: data?.imagePath,
							},
						])
					}
				/>
			</main>
		</>
	);
}

export default ProductDetails;

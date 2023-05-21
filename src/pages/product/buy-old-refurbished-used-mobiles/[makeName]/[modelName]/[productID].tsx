import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../../../../../components/Cards/ProductCard';
import ProductDetailsCard from '../../../../../components/Cards/ProductDetailsCard';
import FullImageView from '@/components/FullImageView';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCookie, setCookie } from 'cookies-next';
import { useHydrateAtoms } from 'jotai/utils';
import { locationAtom } from '@/store/location';
import { QueryClient, dehydrate } from '@tanstack/query-core';
import { getListingByID } from '@/utils/fetchers/filteredFetch';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { getSimilarListings } from '@/utils/fetchers/filteredFetch';
import Link from 'next/link';

type TPageProps = {
	location: string;
	productID: string;
	dehydratedState: any;
	make: string | undefined;
	model: string | undefined;
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
	console.log('Listed By: ', prod.isOtherVendor);
	const { make, model } = prod;
	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=43200, stale-while-revalidate=59' // cached for 12 hours, revalidate after 1 minute
	);
	return {
		props: {
			location: cookie,
			productID,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			make,
			model,
		},
	};
};

function ProductDetails({
	location,
	productID,
	make,
	model,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([[locationAtom, location]]);
	const [simliarProducts, setSimliarProducts] = useState<any>([]);
	const [openImageFullView, setOpenImageFullView] = useState(false);
	const [contextData, setContextData] = useState('');
	const [listingInfo, setListingInfo] = useState<any>(null);
	const locationVal = useAtomValue(locationAtom);
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
					...(locationVal !== 'India' && { listingLocation: locationVal }),
				});
				return data;
			},
		}
	);

	return (
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
								<ProductCard
									key={index}
									data={product}
									setProducts={setSimliarProducts as any}
									prodLink
								/>
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
										isLoading ? 'w-[250px]' : 'w-[150px]'
									} rounded-md shadow hover:drop-shadow-lg p-4 bg-m-white flex justify-center items-center hover:cursor-pointer mt-5`}
								>
									{isLoading ? 'Fetching products...' : 'Load More'}
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
					// ||
					// (data?.vendorLogo && [
					// 	{
					// 		fullImage:
					// 			'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
					// 				?.src,
					// 		thumbImage:
					// 			'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
					// 				?.src,
					// 	},
					// ])
				}
			/>
		</main>
	);
}

export default ProductDetails;

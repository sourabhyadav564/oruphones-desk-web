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
import { useRouter } from 'next/router';
import { detailWithUserInfo } from '@/api/axios';
import { fetchSimilarProducts } from '@/api/axios';
import {  useAtomValue } from 'jotai';

type TPageProps = {
	location: string;
	productID: string;
	dehydratedState: any;
};

// const VENDORS = {
// 	6: 'Amazon',
// 	7: 'Quikr',
// 	8: 'Cashify',
// 	9: '2Gud',
// 	10: 'Budli',
// 	11: 'Paytm',
// 	12: 'Yaantra',
// 	13: 'Sahivalue',
// 	14: 'Shopcluse',
// 	15: 'Xtracover',
// 	16: 'Mobigarage',
// 	17: 'Instacash',
// 	18: 'Cashforphone',
// 	19: 'Recycledevice',
// 	20: 'Quickmobile',
// 	21: 'mbr_Buyblynk',
// 	22: 'mbr_Electronicbazaar',
// 	23: 'Flipkart',
// 	26: 'OLX',
// };

const returnFilter = {
	_id: 1,
	deviceCondition: 1,
	defaultImage: 1,
	listingLocation: 1,
	listingPrice: 1,
	marketingName: 1,
	model: 1,
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
	let productdata = await queryClient.fetchQuery({
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
	return {
		props: {
			location: cookie,
			productID,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	};
};

function ProductDetails({
	location,
	productID,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([[locationAtom, location]]);
	const [simliarProducts, setSimliarProducts] = useState<any>([]);
	const [openImageFullView, setOpenImageFullView] = useState(false);
	const [contextData, setContextData] = useState('');
	const [listingInfo, setListingInfo] = useState<any>(null);
	const locationVal = useAtomValue(locationAtom);
	const router = useRouter();
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
	useEffect(() => {
		const resolverFunction = async () => {
			if (router.query.productID) {
				const isLimited = true;
				await detailWithUserInfo(
					router.query.isOtherVendor,
					router.query.productID,
					'Guest',
					"6459be69282f201c8763619e",
					isLimited
				).then(async (response) => {
					setListingInfo(response?.dataObject);
					await detailWithUserInfo(
						router.query.isOtherVendor,
						router.query.productID,
						'Guest',
						'6459be69282f201c8763619e'
					).then((response) => {
						setListingInfo(response?.dataObject);
					});
				});
			}
		};
		resolverFunction();
	}, [router.query]);

	const loadData = useCallback(
		(intialPage: number) => {
			let payLoad = {
				listingLocation: locationVal,
				make: [listingInfo?.make],
				marketingName: [listingInfo?.marketingName],
				reqPage: 'TSM',
				color: [],
				deviceCondition: [],
				deviceStorage: [],
				deviceRam: [],
				maxsellingPrice: 200000,
				minsellingPrice: 0,
				verified: '',
				warenty: [],
			};
			fetchSimilarProducts(payLoad, 'Guest', intialPage).then((response) => {
				setSimliarProducts(
					response?.dataObject?.otherListings?.filter((items: any) => {
						return items.listingId != listingInfo.listingId;
					})
				);
			});
		},
		[locationVal, listingInfo]
	);

	const loadMoreData = () => {
		let payLoad = {
			listingLocation: locationVal,
			make: [listingInfo.make],
			marketingName: [listingInfo.marketingName],
			reqPage: 'TSM',
			color: [],
			deviceCondition: [],
			deviceStorage: [],
			deviceRam: [],
			maxsellingPrice: 200000,
			minsellingPrice: 0,
			verified: '',
			warenty: [],
		};

		fetchSimilarProducts(payLoad, 'Guest', 1).then((response) => {
			let data = response?.dataObject?.otherListings?.filter((items: any) => {
				return items.listingId != listingInfo.listingId;
			});
			setSimliarProducts((products: any) => [...products, ...data]);

			let tempSimilarProds = simliarProducts?.filter((item: any) => {
				return item.listingId != listingInfo?.listingId;
			});
		});
	};

	useEffect(() => {
		let intialPage = 0;
		loadData(intialPage);
	}, [listingInfo, loadData]);

	return (
		<main className="container my-6">
			<p className="sr-only"> Product Details page </p>
			{/* {JSON.stringify(data?.images)} */}
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
						Similar Products ({simliarProducts?.length || 0})
					</p>
					<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-4">
						{simliarProducts && simliarProducts.length > 0 ? (
							simliarProducts?.map((product: any, index: number) => (
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
					{/* {simliarProducts &&
						simliarProducts.length > 0 &&
						isFinished == false && (
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

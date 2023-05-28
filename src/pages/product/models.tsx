import * as Axios from '../../api/axios';
import TopSellingCard from '../../components/Cards/TopSellingCard';
import ProductSkeletonCard from '@/components/Cards/ProductSkeletonCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const topsellingmodels = await Axios.fetchTopsellingmodels();
	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=43200, stale-while-revalidate=59' // cached for 12 hours, revalidate after 1 minute
	);
	return {
		props: {
			topsellingmodels: topsellingmodels.dataObject,
		},
	};
};

function AllModels({
	topsellingmodels,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head>
				<title>Best Selling Models | Oruphones</title>
				<meta
					name="description"
					content="Buy Best Selling Models of Refurbished, Used and Second Hand Mobile Phones Online in India. Get the best deals on all top selling models of refurbished mobiles."
				/>
				<meta
					name="keywords"
					content="best selling models, best selling models of refurbished mobiles, best selling models of used mobiles, best selling models of second hand mobiles, best selling models of old mobiles, best selling models of pre-owned mobiles, best selling models of preloved mobiles, best selling models of pre-owned mobiles, best selling models of preloved mobiles, best selling models of pre-owned mobiles, best selling models of preloved mobiles, best selling models of pre-owned mobiles, best selling models of preloved mobiles, best selling models of pre-owned mobiles, best selling models of preloved mobiles, best selling models of pre-owned mobiles, best selling models of preloved mobiles, best selling models of pre-owned mobiles, best selling models of preloved mobiles"
				/>
			</Head>
			<main className="container py-4">
				<h1 className="sr-only">All Page</h1>
				{topsellingmodels && topsellingmodels.length > 0 ? (
					<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-4">
						{topsellingmodels?.map((product: any, index: number) => (
							<TopSellingCard
								key={`${index}-${product?.make}`}
								data={product}
							/>
						))}
						<Link
							href={`/product/buy-old-refurbished-used-mobiles/bestdealnearyou`}
							passHref
						>
							<a>
								<div className="w-full h-full hover:bg-gray-100 group   rounded-md shadow-md hover:shadow-lg  p-4 bg-m-white flex justify-center items-center">
									<p className="block group-hover:scale-110 text-m-green">
										{'Show All'}
									</p>
								</div>
							</a>
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-4 gap-4">
						{Array.from({ length: 12 }).map((_, index) => (
							<ProductSkeletonCard popular key={index} />
						))}
					</div>
				)}
			</main>
		</>
	);
}
export default AllModels;

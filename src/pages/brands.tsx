import React from 'react';
import BrandCard from '@/components/Cards/BrandCard';
import DownloadApp from '@/components/DownloadApp';
import { metaTags } from '@/utils/constant';
import getHomeBrands from '@/utils/fetchers/index/getHomeBrands';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

type TBrandsProps = {
	brandsList: any[] | null;
};

export const getServerSideProps: GetServerSideProps<TBrandsProps> = async (
	ctx
) => {
	let brandsList = await getHomeBrands();
	// set cache headers for 12 hours
	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=43200, stale-while-revalidate=86400'
	);
	return {
		props: {
			brandsList: brandsList || null,
		},
	};
};

function brands({ brandsList }: TBrandsProps) {
	return (
		<>
			<Head>
				<title>{metaTags.BRANDS.title}</title>
				<meta name="description" content={metaTags.BRANDS.description} />
				<meta property="og:title" content={metaTags.BRANDS.title} />
				<meta property="og:description" content={metaTags.BRANDS.description} />
			</Head>
			<main className="py-12 min-h-full">
				<section className="container ">
					<div className="flex flex-wrap justify-center m-auto gap-x-4 gap-y-6">
						{brandsList &&
							brandsList
								.sort(
									(list1: any, list2: any) =>
										-(list2.displayOrder - list1.displayOrder)
								)
								.map((item) => <BrandCard key={item.make} data={item} />)}
					</div>
				</section>
				<div className="-mb-16 pt-8">
					<DownloadApp />
				</div>
			</main>
		</>
	);
}

export default brands;

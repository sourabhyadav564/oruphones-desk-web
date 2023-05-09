import TopBrand from '../components/Home/TopBrand';
import TopDeals from '../components/Home/TopDeals';
import DownloadApp from '../components/DownloadApp';
import HomeContent from '../components/Home/HomeContent';
import NewsLetter from '../components/NewsLetter';
import * as Axios from '@/api/axios';
import { metaTags } from '@/utils/constant';
import Head from 'next/head';
import ShowBy from '@/components/Home/ShopBy';
import SellBuyFlow from '@/components/SellBuyFlow';
import TopCarousel from '@/components/TopCarousel';
import { InferGetStaticPropsType, GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	let brands = await Axios.fetchBrands();
	let bestDeals = await Axios.bestDealNearByYou('India', 'Guest', 0);
	return {
		props: {
			brands: brands?.dataObject,
			bestDeals: bestDeals?.dataObject?.otherListings,
			location: 'India',
		},
		revalidate: 24 * 60 * 60,
	};
};
export default function Home({
	brands,
	bestDeals,
	location,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Head>
				<title>{metaTags.HOME.title}</title>
				<meta name="description" content={metaTags.HOME.description} />
				<meta property="og:title" content={metaTags.HOME.title} />
				<meta property="og:description" content={metaTags.HOME.description} />
			</Head>
			<main>
				<TopCarousel />
				<TopBrand brandsList={brands} />
				<TopDeals location={location} bestDeals={bestDeals} />
				<ShowBy />
				<SellBuyFlow />
				<DownloadApp />
				<HomeContent />
				<NewsLetter />
			</main>
		</>
	);
}

import { useRouter } from 'next/router';
import TopBrand from '../components/Home/TopBrand';
import TopDeals from '../components/Home/TopDeals';
import DownloadApp from '../components/DownloadApp';
import HomeContent from '../components/Home/HomeContent';
import NewsLetter from '../components/NewsLetter';
import * as Axios from '../api/axios';
import { metaTags } from '@/utils/constant';
import Head from 'next/head';
import ShowBy from '@/components/Home/ShopBy';
import SellBuyFlow from '@/components/SellBuyFlow';
import TopCarousel from '@/components/TopCarousel';

export async function getStaticProps() {
	let brands = await Axios.fetchBrands();
	return {
		props: {
			brands: brands?.dataObject,
		},
		revalidate: 24 * 60 * 60,
	};
}
export default function Home({ brands }) {
	return (
		<>
			<Head>
				<title>{metaTags.HOME.title}</title>
				<meta name="description" content={metaTags.HOME.description} />
				<meta property="og:title" content={metaTags.HOME.title} />
				<meta property="og:description" content={metaTags.HOME.description} />
			</Head>
			<main>
				{/* <Hero /> */}
				<TopCarousel />
				<TopBrand brandsList={brands} />
				<TopDeals location={'India'} />
				<ShowBy />
				<SellBuyFlow />
				<DownloadApp />
				<HomeContent />
				<NewsLetter />
			</main>
		</>
	);
}

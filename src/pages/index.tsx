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
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { locationAtom } from '@/store/location';
import { getCookie, setCookie } from 'cookies-next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// check if cookie is present
	let cookie = getCookie('location', ctx) as string;
	if (!cookie) {
		// set cookie to India
		setCookie('location', 'India', { ...ctx, maxAge: 24 * 60 * 60 });
		cookie = 'India';
	}
	// TODO: fetch both async simultaneously
	let brands = await Axios.fetchBrands();
	// TODO: Refactor relevant backend with pagination/ truncation
	let bestDeals = await Axios.bestDealNearByYou(cookie, 'Guest', 0);
	console.log('bestDeals', bestDeals.dataObject.otherListings[0]);
	return {
		props: {
			brands: brands?.dataObject,
			bestDeals: bestDeals?.dataObject?.otherListings,
			location: cookie,
		},
	};
};
export default function Home({
	brands,
	bestDeals,
	location,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([[locationAtom, location]]);
	const [locationVal] = useAtom(locationAtom);
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
				<TopDeals location={locationVal} bestDeals={bestDeals} />
				<ShowBy />
				<SellBuyFlow />
				<DownloadApp />
				<HomeContent />
				<NewsLetter />
			</main>
		</>
	);
}

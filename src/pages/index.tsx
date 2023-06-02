import DownloadApp from '@/components/DownloadApp';
import HomeContent from '@/components/Home/HomeContent';
import ShowBy from '@/components/Home/ShopBy';
import TopBrand from '@/components/Home/TopBrand';
import TopDeals from '@/components/Home/TopDeals';
import NewsLetter from '@/components/NewsLetter';
import SellBuyFlow from '@/components/SellBuyFlow';
import TopCarousel from '@/components/TopCarousel';
import { locationAtom } from '@/store/location';
import { topDealsAtom } from '@/store/topDeals';
import { metaTags } from '@/utils/constant';
import getHomeBrands from '@/utils/fetchers/index/getHomeBrands';
import getHomeListings from '@/utils/fetchers/index/getHomeListings';
import { getCookie, setCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// check if cookie is present
	let cookie = getCookie('location', ctx) as string;
	if (!cookie) {
		// set cookie to India
		setCookie('location', 'India', { ...ctx, maxAge: 24 * 60 * 60 });
		cookie = 'India';
	}
	const sliceLength = 10;
	const [brands, bestDeals] = await Promise.all([
		getHomeBrands(),
		getHomeListings(cookie, sliceLength),
	]);
	return {
		props: {
			brands: brands || null,
			bestDeals: bestDeals,
			location: cookie,
		},
	};
};
export default function Home({
	brands,
	bestDeals,
	location,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useHydrateAtoms([
		[locationAtom, location],
		[topDealsAtom, bestDeals],
	]);
	const [locationVal] = useAtom(locationAtom);
	const [topDeals] = useAtom(topDealsAtom);
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
				<TopDeals location={locationVal} bestDeals={topDeals} />
				<ShowBy />
				<SellBuyFlow />
				<DownloadApp />
				<HomeContent />
				<NewsLetter />
			</main>
		</>
	);
}

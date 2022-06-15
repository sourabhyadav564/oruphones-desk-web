import { useRouter } from "next/router";

import Hero from "../components/Hero/Hero";
import StepsSection from "../components/Home/StepsSection";
import TopBrand from "../components/Home/TopBrand";
import TopSellingModels from "../components/Home/TopSellingModels";
import TopDeals from "../components/Home/TopDeals";
import ShopByPrice from "../components/Home/ShopByPrice";
import DownloadApp from "../components/DownloadApp";
import TopArticles from "../components/Home/TopArticles";
import HomeContent from "../components/Home/HomeContent";
import NewsLetter from "../components/NewsLetter";
import en from "../locales/en";
import * as Axios from "../api/axios";
import { useContext } from "react";
import AppContext from "@/context/ApplicationContext";

export default function Home({ brandsList, fetchTopsellingmodels }) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : null;
  const { getSearchLocation } = useContext(AppContext);

  console.log("getSearchLocation ", getSearchLocation);

  return (
    <main>
      <Hero />
      <StepsSection />
      <TopBrand brandsList={brandsList} />
      <TopSellingModels fetchTopsellingmodels={fetchTopsellingmodels} />
      <TopDeals location={getSearchLocation} />
      {/* <ShopByPrice fetchShopByPrice={fetchShopByPrice}/> */}
      <DownloadApp />
      <TopArticles />
      <HomeContent />
      <NewsLetter />
    </main>
  );
}

export async function getServerSideProps() {
  console.log("getServerSideProps");
  const brandsList = await Axios.fetchBrands();
  const fetchTopsellingmodels = await Axios.fetchTopsellingmodels();
  // const fetchShopByPrice = await Axios.fetchShopByPrice();

  return {
    props: {
      brandsList: brandsList?.dataObject || [],
      //fetchShopByPrice:fetchShopByPrice?.dataObject || [],
      fetchTopsellingmodels: fetchTopsellingmodels?.dataObject || [],
    },
  };
}

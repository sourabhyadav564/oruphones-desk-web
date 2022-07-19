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
import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/ApplicationContext";
import Cookies from "js-cookie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCard from "@/components/Cards/SkeletonCard";

export default function Home({ brandsList, fetchTopsellingmodels, sessionId }) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : null;
  const { getSearchLocation } = useContext(AppContext);

  const [brandsList, setBrandsList] = useState([]);
  const [fetchTopsellingmodels, setFetchTopsellingmodels] = useState([]);

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
    Cookies.set("sessionId", sessionId);
  }, []);

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

export async function getServerSideProps({ req, res, query }) {
  // console.log("getServerSideProps");
  const { userUniqueId, sessionId } = req.cookies;
  console.log("userUniqueId", userUniqueId);
  console.log("sessionId", sessionId);
  const brandsList = await Axios.fetchBrands(
    userUniqueId || "Guest",
    sessionId || ""
  );
  const fetchTopsellingmodels = await Axios.fetchTopsellingmodels(
    userUniqueId || "Guest",
    sessionId || ""
  );
  // const fetchShopByPrice = await Axios.fetchShopByPrice();
  let sessionID;
  if (sessionId) {
    sessionID = sessionId;
  } else {
    const session = await getSessionId();
    sessionID = session?.dataObject?.sessionId;
  }

  return {
    props: {
      brandsList: brandsList?.dataObject || [],
      //fetchShopByPrice:fetchShopByPrice?.dataObject || [],
      fetchTopsellingmodels: fetchTopsellingmodels?.dataObject || [],
      sessionId: sessionID,
    },
  };
}

import { useRouter } from "next/router";
import Hero from "../components/Hero/Hero";
import TopBrand from "../components/Home/TopBrand";
import TopDeals from "../components/Home/TopDeals";
import DownloadApp from "../components/DownloadApp";
import HomeContent from "../components/Home/HomeContent";
import NewsLetter from "../components/NewsLetter";
import en from "../locales/en";
import * as Axios from "../api/axios";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/ApplicationContext";
import Cookies from "js-cookie";
import { metaTags } from "@/utils/constant";
import Head from "next/head";
import ShowBy from "@/components/Home/ShopBy";
import SellBuyFlow from "@/components/SellBuyFlow";

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : null;
  const { getSearchLocation } = useContext(AppContext);
  const [shopbyModel, setShopbyModel] = useState([]);
  const [brands, setBrands] = useState([]);
  const [topsellingmodels, setTopsellingmodels] = useState([]);

  useEffect(async () => {
    Cookies.set("sessionId", sessionId);
    localStorage.setItem("sessionId", sessionId);
    const make_models = Cookies.get("make_models");
    let sessionId, top_models;
    const session = await Axios.getSessionId();
    sessionId = session?.dataObject?.sessionId;
    Cookies.set("sessionId", sessionId);
    localStorage.setItem("sessionId", sessionId);
    let brandsList;
    let data = [];
    if (localStorage.getItem("brands") != undefined) {
      brandsList = JSON.parse(localStorage.getItem("brands"));
    } else {
      data = await Axios.fetchBrands();
      brandsList = data?.dataObject;
      localStorage.setItem("brands", JSON.stringify(brandsList));
      Cookies.set("brands", true);
    }
    setBrands(brandsList);

    let fetchTopsellingmodels;
    let shopByModel;
    data = await Axios.fetchTopsellingmodels();
    fetchTopsellingmodels = data?.dataObject;
    shopByModel = data?.allModels;
    localStorage.setItem("top_models", JSON.stringify(fetchTopsellingmodels));
    Cookies.set("top_models", true);
    setTopsellingmodels(fetchTopsellingmodels);
    if (shopbyModel?.length > 0) {
      localStorage.setItem("shopByModel", JSON.stringify(shopByModel));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{metaTags.HOME.title}</title>
        <meta name="description" content={metaTags.HOME.description} />
        <meta property="og:title" content={metaTags.HOME.title} />
        <meta property="og:description" content={metaTags.HOME.description} />
      </Head>
      <main>
        <Hero />
        <TopBrand brandsList={brands} />
        <TopDeals location={getSearchLocation} />
        <ShowBy />
        <SellBuyFlow />
        <DownloadApp />
        <HomeContent />
        <NewsLetter />
      </main>
    </>
  );
}

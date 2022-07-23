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

export default function Home({
  brandsList,
  fetchTopsellingmodels,
  sessionId,
  // fetchTopArticles,
  // fetchShopByPrice
  makeModelLists,
}) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : null;
  const { getSearchLocation } = useContext(AppContext);

  const [brands, setBrands] = useState([]);
  const [topsellingmodels, setTopsellingmodels] = useState([]);

  useEffect(() => {
    Cookies.set("sessionId", sessionId);
    localStorage.setItem("sessionId", sessionId);

    if (brandsList.length === 0) {
      setBrands(JSON.parse(localStorage.getItem("brands")));
    } else {
      localStorage.setItem("brands", JSON.stringify(brandsList));
      Cookies.set("brands", true);
      setBrands(brandsList);
    }
    if (fetchTopsellingmodels.length === 0) {
      setTopsellingmodels(JSON.parse(localStorage.getItem("top_models")));
    } else {
      localStorage.setItem("top_models", JSON.stringify(fetchTopsellingmodels));
      Cookies.set("top_models", true);
      setTopsellingmodels(fetchTopsellingmodels);
    }
    if (makeModelLists.length === 0) {
      // setBrands(JSON.parse(localStorage.getItem("make_models")));
      console.log("makeModelLists from local");
    } else {
      localStorage.setItem("make_models", JSON.stringify(makeModelLists));
      Cookies.set("make_models", true);
      // setBrands(brandsList);
    }
  }, []);

  return (
    <main>
      <Hero />
      <StepsSection />
      {/* <TopBrand brandsList={brandsList} />
      <TopSellingModels fetchTopsellingmodels={fetchTopsellingmodels} /> */}
      <TopBrand brandsList={brands} />
      <TopSellingModels fetchTopsellingmodels={topsellingmodels} />
      <TopDeals location={getSearchLocation} />
      {/* <ShopByPrice fetchShopByPrice={fetchShopByPrice}/> */}
      {/* <TopArticles articles={fetchTopArticles}/> */}
      <DownloadApp />
      <HomeContent />
      <NewsLetter />
    </main>
  );
}

export async function getServerSideProps({ req, res, query }) {
  // console.log("getServerSideProps");
  const { userUniqueId, sessionId, brands, top_models, make_models } =
    req.cookies;
  // const brandsList = await Axios.fetchBrands();
  // const fetchTopsellingmodels = await Axios.fetchTopsellingmodels();
  // const fetchShopByPrice = await Axios.fetchShopByPrice();

  let sessionID;
  if (sessionId) {
    sessionID = sessionId;
  } else {
    const session = await Axios.getSessionId();
    sessionID = session?.dataObject?.sessionId;
  }

  let brandsList;
  if (brands) {
    brandsList = [];
  } else {
    const data = await Axios.fetchBrands();
    brandsList = data?.dataObject;
  }

  let fetchTopsellingmodels;
  if (top_models) {
    fetchTopsellingmodels = [];
  } else {
    const data = await Axios.fetchTopsellingmodels();
    fetchTopsellingmodels = data?.dataObject;
  }

  let makeModelLists;
  if (make_models) {
    makeModelLists = [];
  } else {
    const data = await Axios.fetchMakeModelList(
      userUniqueId || "Guest",
      sessionId || ""
    );
    makeModelLists = data?.dataObject;
  }

  console.log(
    "getServerSideProps",
    brandsList,
    fetchTopsellingmodels,
    makeModelLists
  );
  // return {
  //   props: {
  //     brandsList: brandsList?.dataObject || [],
  //     //fetchShopByPrice:fetchShopByPrice?.dataObject || [],
  //     fetchTopsellingmodels: fetchTopsellingmodels?.dataObject || [],
  //     sessionId: sessionID,
  //   },
  // };

  return {
    props: {
      brandsList: brandsList || [],
      //fetchShopByPrice:fetchShopByPrice?.dataObject || [],
      fetchTopsellingmodels: fetchTopsellingmodels || [],
      sessionId: sessionID,
      makeModelLists: makeModelLists || [],
    },
  };
}

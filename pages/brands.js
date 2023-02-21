import React, { useEffect, useState } from "react";
import BrandCard from "../components/Cards/BrandCard";
import DownloadApp from "../components/DownloadApp";
import * as Axios from "../api/axios";
import Cookies from "js-cookie";
import { metaTags } from "@/utils/constant";
import Head from "next/head";

function brands({ brandsList }) {
  // const [brands, setBrands] = useState([]);

  // useEffect(() => {
  //   if (brandsList.length === 0) {
  //     setBrands(JSON.parse(localStorage.getItem("brands")));
  //   }
  //   if (brandsList.length > 0) {
  //     localStorage.setItem("brands", JSON.stringify(brandsList));
  //     Cookies.set("brands", true);
  //     setBrands(brandsList);
  //   }
  // }, []);

  // brandsList = brands?.sort(
  //   (list1, list2) => list2.isPopular - list1.isPopular
  // );
  // brandsList = brands?.sort(
  //   (list1, list2) =>
  //     parseInt(list1.displayOrder) - parseInt(list2.displayOrder)
  // );

  brandsList = brandsList.sort(
    (list1, list2) => list2.isPopular - list1.isPopular
  );
  brandsList = brandsList.sort(
    (list1, list2) =>
      parseInt(list1.displayOrder) - parseInt(list2.displayOrder)
  );
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
            {brandsList?.map((item) => (
              <BrandCard key={item.make} data={item} />
            ))}
          </div>
        </section>
        <DownloadApp />
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const { brands } = req.cookies;
  const brandsList = await Axios.fetchBrands();

  // let brandsList;
  // if (brands) {
  //   brandsList = [];
  // } else {
  //   const data = await Axios.fetchBrands();
  //   brandsList = data?.dataObject;
  // }

  return {
    props: { brandsList: brandsList?.dataObject || [] },
    // props: { brandsList: brandsList || [] },
  };
}

export default brands;

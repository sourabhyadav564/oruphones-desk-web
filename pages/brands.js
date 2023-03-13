import React from "react";
import BrandCard from "../components/Cards/BrandCard";
import DownloadApp from "../components/DownloadApp";
import * as Axios from "../api/axios";
import { metaTags } from "@/utils/constant";
import Head from "next/head";

function brands({ brandsList }) {
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

  return {
    props: { brandsList: brandsList?.dataObject || [] },
  };
}

export default brands;

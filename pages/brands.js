import React from "react";
import BrandCard from "../components/Cards/BrandCard";
import DownloadApp from "../components/DownloadApp";
import * as Axios from "../api/axios";

function brands({ brandsList }) {
  brandsList = brandsList.sort((list1, list2) => list2.isPopular - list1.isPopular);
  brandsList = brandsList.sort((list1, list2) => parseInt(list1.displayOrder) - parseInt(list2.displayOrder));
  return (
    <main className="py-12 min-h-full">
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-4 gap-y-6">
          {brandsList.map((item) => (
            <BrandCard key={item.make} data={item} />
          ))}
        </div>
      </section>
      <DownloadApp />
    </main>
  );
}

export async function getServerSideProps() {
  const brandsList = await Axios.fetchBrands();

  return {
    props: { brandsList: brandsList?.dataObject || [] },
  };
}

export default brands;

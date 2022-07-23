import React, { useEffect, useState } from "react";
import BrandCard from "../components/Cards/BrandCard";
import DownloadApp from "../components/DownloadApp";
import * as Axios from "../api/axios";
import Cookies from "js-cookie";

function brands({ brandsList }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (brandsList.length === 0) {
      setBrands(JSON.parse(localStorage.getItem("brands")));
    } else {
      localStorage.setItem("brands", JSON.stringify(brandsList));
      Cookies.set("brands", true);
      setBrands(brandsList);
    }
  }, []);
  // brandsList = brandsList.sort((list1, list2) => list2.isPopular - list1.isPopular);
  // brandsList = brandsList.sort((list1, list2) => parseInt(list1.displayOrder) - parseInt(list2.displayOrder));
  brandsList = brands.sort((list1, list2) => list2.isPopular - list1.isPopular);
  brandsList = brands.sort(
    (list1, list2) =>
      parseInt(list1.displayOrder) - parseInt(list2.displayOrder)
  );
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

export async function getServerSideProps({ req, res, query }) {
  const { brands } = req.cookies;
  // const brandsList = await Axios.fetchBrands();

  let brandsList;
  if (brands) {
    brandsList = [];
  } else {
    const data = await Axios.fetchBrands();
    brandsList = data?.dataObject;
  }

  return {
    // props: { brandsList: brandsList?.dataObject || [] },
    props: { brandsList: brandsList || [] },
  };
}

export default brands;

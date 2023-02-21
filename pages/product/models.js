import { useState, useEffect } from "react";
import TopSellingCard from "../../components/Cards/TopSellingCard";
import Filter from "../../components/Filter";

import * as Axios from "../../api/axios";
import ProductSkeletonCard from "@/components/Cards/ProductSkeletonCard";
import Link from "next/link";

function AllModels() {
  const [applyFilter, setApplyFilter] = useState({});
  const [topsellingmodels, setTopsellingmodels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Axios.fetchTopsellingmodels();
      setTopsellingmodels(data.dataObject);
    };

    fetchData();
  }, []);

  function getFilteredValues() {
    const tempProducts = topsellingmodels;
    if (applyFilter && applyFilter.brand && applyFilter.brand.length > 0) {
      tempProducts = tempProducts.filter((items) =>
        applyFilter.brand.includes(items.make)
      );
    }
    // if (applyFilter && applyFilter.condition && applyFilter.condition.length > 0) {
    //   tempProducts = tempProducts.filter((items) => applyFilter.condition.includes(items.deviceCondition));
    // }
    return tempProducts;
  }

  return (
    <main className="container py-4">
      <h1 className="sr-only">All Page</h1>
      {/* <Filter setApplyFilter={setApplyFilter}>
        <div className="grid grid-cols-4 gap-4">
          {getFilteredValues().map((product, index) => (
            <TopSellingCard key={`${index}-${product?.make}`} data={product} />
          ))}
        </div>
      </Filter> */}
      {topsellingmodels && topsellingmodels.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-4">
          {topsellingmodels?.map((product, index) => (
            <TopSellingCard key={`${index}-${product?.make}`} data={product} />
          ))}
          <Link href={`/product/buy-old-refurbished-used-mobiles/bestdealnearyou`} passHref>
            <a>
              <div className="w-full h-full  rounded-md shadow-md hover:shadow-lg  p-4 bg-m-white flex justify-center items-center">
                <p className="block text-m-green">{"Show All"}</p>
              </div>
            </a>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {Array(8)
            .fill()
            .map((_, index) => (
              <ProductSkeletonCard popular />
            ))}
        </div>
      )}
    </main>
  );
}
export default AllModels;

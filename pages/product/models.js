import { useState, useEffect } from "react";
import TopSellingCard from "../../components/Cards/TopSellingCard";
import Filter from "../../components/Filter";

import * as Axios from "../../api/axios";

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
      tempProducts = tempProducts.filter((items) => applyFilter.brand.includes(items.make));
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
        <div className="grid grid-cols-4 gap-4 mt-4">
          {topsellingmodels.map((product, index) => (
            <TopSellingCard key={`${index}-${product?.make}`} data={product} />
          ))}
        </div>
    </main>
  );
}
export default AllModels;

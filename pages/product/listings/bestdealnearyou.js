import BestDealsCard from "@/components/Cards/BestDealsCard";
import Filter from "@/components/Filter";
import React, { useState, useEffect, useContext } from "react";
import * as Axios from "../../../api/axios";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/Cards/ProductCard";
import AppContext from "@/context/ApplicationContext";
import { numberFromString, stringToDate } from "@/utils/util";
import Cookies from "js-cookie";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
  swipeToSlide: true,
};

function Bestdealnearyou() {
  const [products, setProducts] = useState([]);
  const [bestDeal, setBestDeal] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { getSearchLocation } = useContext(AppContext);
  const [applyFilter, setApplyFilter] = useState({});
  const [applySort, setApplySort] = useState();

  useEffect(() => {
    if (getSearchLocation) {
      Axios.bestDealNearYouAll(getSearchLocation, Cookies.get("userUniqueId")).then((response) => {
        setProducts(response?.dataObject?.otherListings);
        setBestDeal(response?.dataObject?.bestDeals);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSearchLocation]);

  useEffect(() => {
    console.log("SBP ", applyFilter);
    const { brand, condition, color, storage, warranty, verification, priceRange } = applyFilter;
    if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
      let payLoad = {
        listingLocation: getSearchLocation,
        reqPage: "BBNM",
      };
      if (brand?.length > 0) {
        payLoad.make = brand.includes("all") ? []:brand;;
      }
      if (priceRange && priceRange.min && priceRange.max) {
        payLoad.minsellingPrice = priceRange.min;
        payLoad.maxsellingPrice = priceRange.max;
      }
      if (condition?.length > 0) {
        payLoad.deviceCondition = condition.includes("all") ? []:condition;
      }
      if (storage?.length > 0) {
        payLoad.deviceStorage = storage.includes("all") ? []:storage;
      }
      if (color?.length > 0) {
        payLoad.color = color.includes("all") ? []:color;
      }
      if (warranty?.length > 0) {
        payLoad.warenty = warranty.includes("all") ? []:warranty;
      }
      if (verification?.length > 0) {
        payLoad.verified = verification.includes("all") ? []:"verified";
      }
      setLoading(true);
      console.log(" BDNY SEARCH FILTER PAYLOAD -->  ", payLoad);
      Axios.searchFilter(payLoad, Cookies.get("userUniqueId") || "Guest").then((response) => {
        console.log("searchFilter ", response?.dataObject);
        // if (verification?.length > 0) {
        //   payLoad.verification = verification;
        // }
        setProducts(response?.dataObject?.otherListings);
        setBestDeal([]);
        setLoading(false);
      });
    }
  }, [applyFilter]);

  const sortingProducts = getSortedProducts(applySort, products);

  return (
    <main className="container py-4">
      <h1 className="sr-only">Best Deal Near You Page</h1>
      <Filter listingsCount={sortingProducts?.length + bestDeal?.length} setApplySort={setApplySort} setApplyFilter={setApplyFilter}>
        {!isLoading && bestDeal && bestDeal.length > 0 && (
          <Carousel {...settings} className="bestDealCarousel">
            {bestDeal.map((items, index) => (
              <BestDealsCard key={index} data={items} />
            ))}
          </Carousel>
        )}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {!isLoading && sortingProducts && sortingProducts.length > 0 ? (
            sortingProducts?.map((product, index) => <ProductCard key={index} data={product} prodLink setProducts={setProducts} />)
          ) : (
            <div className="col-span-3 h-96 items-center flex justify-center ">{isLoading ? "Loading..." : "No match found"}</div>
          )}
        </div>
      </Filter>
    </main>
  );
}

function getSortedProducts(applySort, products) {
  var sortedProducts = products ? [...products] : [];
  if (applySort && applySort === "Price: Low to High") {
    sortedProducts.sort((a, b) => {
      return numberFromString(a.listingPrice) - numberFromString(b.listingPrice);
    });
  } else if (applySort && applySort === "Price: High to Low") {
    sortedProducts.sort((a, b) => {
      return numberFromString(b.listingPrice) - numberFromString(a.listingPrice);
    });
  } else if (applySort && applySort === "Newest First") {
    sortedProducts.sort((a, b) => {
      return stringToDate(b.modifiedDate) - stringToDate(a.modifiedDate);
    });
  } else if (applySort && applySort === "Oldest First") {
    sortedProducts.sort((a, b) => {
      return stringToDate(a.modifiedDate) - stringToDate(b.modifiedDate);
    });
  }
  console.log("--> sortedProducts ", sortedProducts);
  return sortedProducts;
}
export default Bestdealnearyou;

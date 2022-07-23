import BestDealsCard from "@/components/Cards/BestDealsCard";
import Filter from "@/components/Filter";
import React, { useState, useEffect, useContext } from "react";
import * as Axios from "../../../api/axios";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/Cards/ProductCard";
import AppContext from "@/context/ApplicationContext";
import { numberFromString, stringToDate } from "@/utils/util";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// import {
//   otherVendorDataState,
//   // otherVandorListingIdState,
// } from "../../../atoms/globalState";
// import { useRecoilState } from "recoil";

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
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const router = useRouter();
  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  const loadData = () => {
    if (getSearchLocation) {
      Axios.bestDealNearYouAll(
        getSearchLocation,
        Cookies.get("userUniqueId"),
        pageNumber
      ).then((response) => {
        setProducts(response?.dataObject?.otherListings);
        setBestDeal(response?.dataObject?.bestDeals);
        setTotalProducts(response?.dataObject?.totalProducts);
        // setProductsData([
        //   ...response?.dataObject?.otherListings,
        //   ...response?.dataObject?.bestDeals,
        // ]);
        setLoading(false);
        setPageNumber(pageNumber + 1);
      });
    }
  };

  const loadMoreData = () => {
    setIsLoadingMore(true);
    if (getSearchLocation) {
      Axios.bestDealNearYouAll(
        getSearchLocation,
        Cookies.get("userUniqueId"),
        pageNumber
      ).then((response) => {
        setProducts((products) => [
          ...products,
          ...response?.dataObject?.otherListings,
        ]);
        // setBestDeal(bestDeals => [...bestDeals, ...response?.dataObject?.bestDeals]);
        // setTotalProducts(response?.dataObject?.totalProducts);
        // setProductsData([
        //   ...response?.dataObject?.otherListings,
        //   ...response?.dataObject?.bestDeals,
        // ]);
        setLoading(false);
        setPageNumber(pageNumber + 1);
        setIsLoadingMore(false);
      });
    }
  };

  const handelScroll = (e) => {
    // console.log("top", e.target.documentElement.scrollTop);
    // console.log("win", window.innerHeight);
    // console.log("height", e.target.documentElement.scrollHeight);

    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >
      e.target.documentElement.scrollHeight 
    ) {
      loadMoreData();
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("scroll", handelScroll);
  }, [getSearchLocation]);

  useEffect(() => {
    const {
      brand,
      condition,
      color,
      storage,
      warranty,
      verification,
      priceRange,
    } = applyFilter;
    if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
      let payLoad = {
        listingLocation: getSearchLocation,
        reqPage: "BBNM",
        make: [],
        color: [],
        deviceCondition: [],
        deviceStorage: [],
        maxsellingPrice: 200000,
        minsellingPrice: 0,
        verified: "",
      };
      if (brand?.length > 0) {
        payLoad.make = brand.includes("all") ? [] : brand;
      }
      if (priceRange && priceRange.min && priceRange.max) {
        payLoad.minsellingPrice = priceRange.min;
        payLoad.maxsellingPrice = priceRange.max;
      }
      if (condition?.length > 0) {
        payLoad.deviceCondition = condition.includes("all") ? [] : condition;
      }
      if (storage?.length > 0) {
        payLoad.deviceStorage = storage.includes("all") ? [] : storage;
      }
      if (color?.length > 0) {
        payLoad.color = color.includes("all") ? [] : color;
      }
      if (warranty?.length > 0) {
        payLoad.warenty = warranty.includes("all") ? [] : warranty;
      }
      if (verification?.length > 0) {
        payLoad.verified = verification.includes("all") ? [] : "verified";
      }
      setLoading(true);
      Axios.searchFilter(payLoad, Cookies.get("userUniqueId", pageNumber) || "Guest", pageNumber).then(
        (response) => {
          // if (verification?.length > 0) {
          //   payLoad.verification = verification;
          // }
          setProducts(response?.dataObject?.otherListings);
          // setBestDeal([]);
          setBestDeal(response?.dataObject?.bestDeals);
          setLoading(false);
        }
      );
    }
  }, [applyFilter]);

  const sortingProducts = getSortedProducts(applySort, products);

  return (
    <main className="container py-4">
      <h1 className="sr-only">Best Deal Near You Page</h1>
      <Filter
        listingsCount={sortingProducts?.length + bestDeal?.length}
        setApplySort={setApplySort}
        setApplyFilter={setApplyFilter}
      >
        {!isLoading && bestDeal && bestDeal.length > 0 && (
          <Carousel {...settings} className="bestDealCarousel">
            {bestDeal.map((items, index) => (
              <BestDealsCard key={index} data={items} />
            ))}
          </Carousel>
        )}
        <h4 className="font-semibold text-lg opacity-50">
          Total Products ({totalProducts})
        </h4>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {!isLoading && sortingProducts && sortingProducts.length > 0 ? (
            sortingProducts?.map((product, index) => (
              <ProductCard
                key={index}
                data={product}
                prodLink
                setProducts={setProducts}
              />
            ))
          ) : (
            <div className="col-span-3 h-96 items-center flex justify-center ">
              {isLoading ? "Loading..." : "No match found"}
            </div>
          )}
        </div>
        {isLoadingMore && (
          <div className="flex items-center justify-center mt-5 text-lg font-semibold animate-pulse">
            <span>Fetching more products...</span>
          </div>
        )}
      </Filter>
    </main>
  );
}

function getSortedProducts(applySort, products) {
  var sortedProducts = products ? [...products] : [];
  if (applySort && applySort === "Price: Low to High") {
    sortedProducts.sort((a, b) => {
      return (
        numberFromString(a.listingPrice) - numberFromString(b.listingPrice)
      );
    });
  } else if (applySort && applySort === "Price: High to Low") {
    sortedProducts.sort((a, b) => {
      return (
        numberFromString(b.listingPrice) - numberFromString(a.listingPrice)
      );
    });
  } else if (applySort && applySort === "Newest First") {
    sortedProducts.sort((a, b) => {
      return (
        a.updatedAt &&
        b.updatedAt &&
        stringToDate(b.updatedAt) - stringToDate(a.updatedAt)
      );
    });
  } else if (applySort && applySort === "Oldest First") {
    sortedProducts.sort((a, b) => {
      return (
        a.updatedAt &&
        b.updatedAt &&
        stringToDate(a.updatedAt) - stringToDate(b.updatedAt)
      );
    });
  }
  return sortedProducts;
}
export default Bestdealnearyou;

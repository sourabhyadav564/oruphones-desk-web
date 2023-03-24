import BestDealsCard from "@/components/Cards/BestDealsCard";
import Filter from "@/components/Filter";
import React, { useState, useEffect, useContext } from "react";
import * as Axios from "../../../api/axios";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/Cards/ProductCard";
import AppContext from "@/context/ApplicationContext";
import { numberFromString, stringToDate } from "@/utils/util";
import Cookies from "js-cookie";
import NoMatch from "@/components/NoMatch";
import { useRouter } from "next/router";
import ProductSkeletonCard from "@/components/Cards/ProductSkeletonCard";

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
  const [isFinished, setIsFinished] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const router = useRouter();
  let intialPage = 0;
  let newPages = 0;

  const loadData = (intialPage) => {
    if (getSearchLocation && !isFilterApplied) {
      Axios.bestDealNearYouAll(
        getSearchLocation,
        Cookies.get("userUniqueId"),
        intialPage,
        applySort
      ).then((response) => {
        setProducts(response?.dataObject?.otherListings);
        setBestDeal(response?.dataObject?.bestDeals);
        setTotalProducts(response?.dataObject?.totalProducts);
        setLoading(false);
      });
    } else {
      const {
        brand,
        condition,
        storage,
        Ram,
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
          deviceRam: [],
          maxsellingPrice: 200000,
          minsellingPrice: 0,
          verified: "",
          warenty: [],
          pageNumber: intialPage,
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
        if (Ram?.length > 0) {
          payLoad.deviceRam = Ram.includes("all") ? [] : Ram;
        }
        if (warranty?.length > 0) {
          payLoad.warenty = warranty.includes("all") ? [] : warranty;
        }
        if (verification?.length > 0) {
          payLoad.verified = verification.includes("all") ? [] : "verified";
        }
        setLoading(true);
        Axios.searchFilter(
          payLoad,
          Cookies.get("userUniqueId") || "Guest",
          intialPage,
          applySort
        ).then((response) => {
          setProducts(response?.dataObject?.otherListings);
          setTotalProducts(response?.dataObject?.totalProducts);
          setBestDeal(response?.dataObject?.bestDeals);
          setLoading(false);
        });
      }
    }
  };

  const loadMoreData = () => {
    newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (getSearchLocation && !isFilterApplied) {
      Axios.bestDealNearYouAll(
        getSearchLocation,
        Cookies.get("userUniqueId"),
        newPages,
        applySort
      ).then((response) => {
        setProducts((products) => [
          ...products,
          ...response?.dataObject?.otherListings,
        ]);

        if (response?.dataObject?.otherListings.length == 0) {
          setIsFinished(true);
        }
        if (response?.dataObject?.totalProducts > -1) {
          setTotalProducts(
            (response && response?.dataObject?.totalProducts) || 0
          );
        }
        setLoading(false);
        setIsLoadingMore(false);
      });
    } else {
      const {
        brand,
        condition,
        Ram,
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
          deviceRam: [],
          maxsellingPrice: 200000,
          minsellingPrice: 0,
          verified: "",
          warenty: [],
          pageNumber: newPages,
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
        if (Ram?.length > 0) {
          payLoad.deviceRam = Ram.includes("all") ? [] : Ram;
        }
        if (warranty?.length > 0) {
          payLoad.warenty = warranty.includes("all") ? [] : warranty;
        }
        if (verification?.length > 0) {
          payLoad.verified = verification.includes("all") ? [] : "verified";
        }
        Axios.searchFilter(
          payLoad,
          Cookies.get("userUniqueId") || "Guest",
          newPages,
          applySort
        ).then((response) => {
          if (newPages == 0) {
            setProducts(response?.dataObject?.otherListings);
          } else {
            setProducts((products) => [
              ...products,
              ...response?.dataObject?.otherListings,
            ]);
          }
          setTotalProducts(response?.dataObject?.totalProducts);
          if (newPages == 0) {
            setBestDeal(response?.dataObject?.bestDeals);
          } else {
            setBestDeal((products) => [
              ...products,
              ...response?.dataObject?.bestDeals,
            ]);
          }
          setLoading(false);
          setIsLoadingMore(false);
        });
      }
    }
  };

  useEffect(() => {
    intialPage = 0;
    newPages = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [getSearchLocation, applySort, applyFilter]);

  useEffect(() => {
    const {
      brand,
      condition,
      Ram,
      storage,
      warranty,
      verification,
      priceRange,
    } = applyFilter;
    if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
      setIsFilterApplied(true);
      let payLoad = {
        listingLocation: getSearchLocation,
        reqPage: "BBNM",
        make: [],
        color: [],
        deviceCondition: [],
        deviceStorage: [],
        deviceRam: [],
        maxsellingPrice: 200000,
        minsellingPrice: 0,
        verified: "",
        warenty: [],
        pageNumber: intialPage,
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
      if (Ram?.length > 0) {
        payLoad.deviceRam = Ram.includes("all") ? [] : Ram;
      }
      if (warranty?.length > 0) {
        payLoad.warenty = warranty.includes("all") ? [] : warranty;
      }
      if (verification?.length > 0) {
        payLoad.verified = verification.includes("all") ? [] : "verified";
      }
      setLoading(true);
      Axios.searchFilter(
        payLoad,
        Cookies.get("userUniqueId") || "Guest",
        intialPage,
        applySort
      ).then((response) => {
        setProducts(response?.dataObject?.otherListings);
        setTotalProducts(response?.dataObject?.totalProducts);
        setBestDeal(response?.dataObject?.bestDeals);
        setLoading(false);
      });
    }
  }, [applyFilter, applySort]);

  return (
    <main className="container py-4">
      <h1 className="sr-only">Best Deal Near You Page</h1>
      <Filter
        listingsCount={products?.length + bestDeal?.length}
        setApplySort={setApplySort}
        setApplyFilter={setApplyFilter}
        makename={bestDeal[0]?.make}
      >
        {isLoading ? (
          <ProductSkeletonCard isBestDeal={true} />
        ) : (
          !isLoading &&
          bestDeal &&
          bestDeal.length > 0 && (
            <Carousel {...settings} className="bestDealCarousel z-0 ">
              {bestDeal.map((items, index) => (
                <BestDealsCard key={index} data={items} />
              ))}
            </Carousel>
          )
        )}
        <h4 className="font-Roboto-Semibold text-xlFontSize opacity-50 mb-8  mt-8">
          Total Products ({totalProducts})
        </h4>
        <div className="grid md:grid-cols-3 grid-cols-2 m-auto justify-center gap-4  mt-4">
          {isLoading ? (
            Array(10)
              .fill()
              .map((_, index) => <ProductSkeletonCard isTopSelling={true} />)
          ) : !isLoading &&
            isFinished == false &&
            products &&
            products.length > 0 ? (
            products?.map((product, index) => (
              <ProductCard
                key={index}
                data={product}
                prodLink
                setProducts={setProducts}
              />
            ))
          ) : (
            <div className="col-span-3 h-96 items-center flex justify-center ">
              {isLoading ? "Loading..." : <NoMatch />}
            </div>
          )}
        </div>
        {!isLoading &&
          isFinished == false &&
          products?.length != totalProducts && (
            <span
              className={`${
                isLoadingMore ? "w-[250px]" : "w-[150px]"
              } rounded-md shadow hover:drop-shadow-lg p-4 bg-m-white flex justify-center items-center hover:cursor-pointer mt-5`}
              onClick={loadMoreData}
            >
              <p className="block text-m-green font-semibold">
                {isLoadingMore ? "Fetching more products..." : "Load More"}
              </p>
            </span>
          )}
      </Filter>
    </main>
  );
}

export default Bestdealnearyou;

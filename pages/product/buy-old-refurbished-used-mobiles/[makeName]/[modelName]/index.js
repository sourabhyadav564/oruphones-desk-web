import Carousel from "@/components/Carousel";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import BestDealsCard from "@/components/Cards/BestDealsCard";
import ProductCard from "@/components/Cards/ProductCard";
import Filter from "@/components/Filter";
import AppContext from "@/context/ApplicationContext";
import * as Axios from "../../../../../api/axios";
import { numberFromString, stringToDate } from "@/utils/util";
import Cookies from "js-cookie";

// import {
//   otherVendorDataState,
//   // otherVandorListingIdState,
// } from "../../../../../atoms/globalState";
// import { useRecoilState } from "recoil";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
  swipeToSlide: true,
};

const Products = () => {
  const router = useRouter();
  var { makeName, modelName } = router.query;
  const { getSearchLocation } = useContext(AppContext);
  modelName = modelName?.replaceAll("-", " ");

  const [products, setProducts] = useState([]);
  const [bestDeals, setBestDeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [applyFilter, setApplyFilter] = useState({});
  const [applySort, setApplySort] = useState();
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  const loadData = (intialPage) => {
    const fetchData = async () => {
      const data = await Axios.fetchByMarketingName(
        getSearchLocation,
        modelName,
        Cookies.get("userUniqueId"),
        intialPage,
        applySort
      );
      if (data?.dataObject?.otherListings.length > -1) {
        setProducts((data && data?.dataObject?.otherListings));
        // setProductsData((data && data?.dataObject?.otherListings) || []);
      }
      if (data?.dataObject?.bestDeals.length > -1) {
        setBestDeals((data && data?.dataObject?.bestDeals));
        // setProductsData((data && data?.dataObject?.bestDeals) || []);
      }
      if (data?.dataObject?.totalProducts > -1) {
        setTotalProducts((data && data?.dataObject?.totalProducts - data?.dataObject?.bestDeals.length) || 0);
      }
      setLoading(false);
      // setPageNumber(pageNumber + 1);
    };
    if (modelName) {
      fetchData();
    }
  };

  const loadMoreData = () => {
    let newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    const fetchData = async () => {
      const data = await Axios.fetchByMarketingName(
        getSearchLocation,
        modelName,
        Cookies.get("userUniqueId"),
        newPages,
        applySort
      );
      if (data?.dataObject?.otherListings.length > 0) {
        setProducts((products) => [
          ...products,
          ...data?.dataObject?.otherListings,
        ]);
        // setProductsData((data && data?.dataObject?.otherListings) || []);
      }

      if (data?.dataObject?.otherListings.length == 0) {
        setIsFinished(true);
      }

      if (data?.dataObject?.totalProducts > -1) {
        setTotalProducts(
          (data && data?.dataObject?.totalProducts - data?.dataObject?.bestDeals.length) || 0
        );
      }

      // if (data?.dataObject?.bestDeals.length > -1) {
      //   setBestDeals((data && data?.dataObject?.bestDeals) || []);
      //   // setProductsData((data && data?.dataObject?.bestDeals) || []);
      // }
      setLoading(false);
      // setPageNumber(pageNumber + 1);
      setIsLoadingMore(false);
    };
    if (modelName) {
      fetchData();
    }
  };

  useEffect(() => {
    let intialPage = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [modelName, getSearchLocation, applySort]);

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
      if (makeName === "oneplus") {
        makeName = "OnePlus";
      } else {
        makeName = makeName.charAt(0).toUpperCase() + makeName.slice(1);
      }
      let payLoad = {
        listingLocation: getSearchLocation,
        make: brand?.length > 0 ? brand : [makeName],
        marketingName: [modelName],
        reqPage: "TSM",
        color: [],
        deviceCondition: [],
        deviceStorage: [],
        deviceRam: [],
        maxsellingPrice: 200000,
        minsellingPrice: 0,
        verified: "",
        warenty: []
      };
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
      Axios.searchFilter(
        payLoad,
        Cookies.get("userUniqueId") || "Guest",
        pageNumber
      ).then((response) => {
        // if (verification?.length > 0) {
        //   payLoad.verification = verification;
        // }
        setProducts(response?.dataObject?.otherListings);
        // setBestDeals([]);
        setTotalProducts(response?.dataObject?.totalProducts - response?.dataObject?.bestDeals.length);
        setBestDeals(response?.dataObject?.bestDeals);
        setLoading(false);
      });
    }
  }, [applyFilter]);

  console.log("isFinished", isFinished);

  const sortingProducts = getSortedProducts(applySort, products);

  return (
    <main className="container py-4">
      <h1 className="sr-only">{modelName} Page</h1>
      <Filter
        listingsCount={sortingProducts?.length + bestDeals?.length}
        setApplySort={setApplySort}
        setApplyFilter={setApplyFilter}
      >
        {!isLoading && bestDeals && bestDeals.length > 0 && (
          <div className="mb-4">
            <Carousel
              {...settings}
              key={bestDeals.length > 0 ? bestDeals[0] : -1}
            >
              {bestDeals.map((items, index) => (
                <BestDealsCard
                  key={index}
                  data={items}
                  setProducts={setBestDeals}
                  className="bestDealCarousel"
                />
              ))}
            </Carousel>
          </div>
        )}
        <h4 className="font-semibold text-lg opacity-50">
          Total Products ({totalProducts})
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {!isLoading && sortingProducts && sortingProducts.length > 0 ? (
            sortingProducts?.map((product, index) => (
              <div
                key={index}
                onClick={() => {
                  // setListingId(item.listingId);
                  // setProductsData(products);
                }}
              >
                <ProductCard
                  data={product}
                  prodLink
                  setProducts={setProducts}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 h-96 items-center flex justify-center ">
              {isLoading ? "Loading..." : "No match found"}
            </div>
          )}
        </div>
        {!isLoading &&
          isFinished == false && products.length != totalProducts && (
            <span
              className={`${isLoadingMore ? "w-[250px]" : "w-[150px]"
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
};

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

export default Products;

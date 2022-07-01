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

import {
  otherVendorDataState,
  // otherVandorListingIdState,
} from "../../../../../atoms/globalState";
import { useRecoilState } from "recoil";

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

  const [product, setProductsData] = useRecoilState(otherVendorDataState);
  console.log("product from make page----->", product);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await Axios.fetchByMarketingName(
        getSearchLocation,
        modelName,
        Cookies.get("userUniqueId")
      );
      if (data?.dataObject?.otherListings.length > -1) {
        setProducts((data && data?.dataObject?.otherListings) || []);
        setProductsData((data && data?.dataObject?.otherListings) || []);
      }
      if (data?.dataObject?.bestDeals.length > -1) {
        setBestDeals((data && data?.dataObject?.bestDeals) || []);
        setProductsData((data && data?.dataObject?.bestDeals) || []);
      }
      setLoading(false);
      console.log("Products --> Data ", data.dataObject);
    };
    if (modelName) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelName, getSearchLocation]);

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
        maxsellingPrice: 200000,
        minsellingPrice: 0,
        verified: "",
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
      console.log("MODEL FILTER PAYLOAD ", payLoad);
      setLoading(true);
      Axios.searchFilter(payLoad, Cookies.get("userUniqueId") || "Guest").then(
        (response) => {
          console.log("searchFilter ", response?.dataObject);
          // if (verification?.length > 0) {
          //   payLoad.verification = verification;
          // }
          setProducts(response?.dataObject?.otherListings);
          // setBestDeals([]);
          setBestDeals(response?.dataObject?.bestDeals);
          setLoading(false);
        }
      );
    }
  }, [applyFilter]);

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
        <div className="grid grid-cols-3 gap-4">
          {!isLoading && sortingProducts && sortingProducts.length > 0 ? (
            sortingProducts?.map((product, index) => (
              <div
                key={index}
                onClick={() => {
                  // setListingId(item.listingId);
                  setProductsData(products);
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
      return (a.updatedAt && b.updatedAt) && stringToDate(b.updatedAt) - stringToDate(a.updatedAt);
    });
  } else if (applySort && applySort === "Oldest First") {
    sortedProducts.sort((a, b) => {
      return (a.updatedAt && b.updatedAt) && stringToDate(a.updatedAt) - stringToDate(b.updatedAt);
    });
  }
  console.log("--> sortedProducts ", sortedProducts);
  return sortedProducts;
}

export default Products;

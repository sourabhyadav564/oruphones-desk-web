import { useRouter } from "next/router";
import BestDealsCard from "@/components/Cards/BestDealsCard";
import Filter from "@/components/Filter";
import React, { useState, useEffect, useContext } from "react";
import * as Axios from "../../../../api/axios";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/Cards/ProductCard";
import AppContext from "@/context/ApplicationContext";
import { numberFromString, stringToDate } from "@/utils/util";
import Cookies from "js-cookie";
import NoMatch from "@/components/NoMatch";

import {
  otherVendorDataState,
  // otherVandorListingIdState,
} from "../../../../atoms/globalState";
import { useRecoilState } from "recoil";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
};

function BrandPage() {
  const router = useRouter();
  const { makeName } = router.query;
  const [products, setProducts] = useState([]);
  const [bestDeal, setBestDeal] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [applyFilter, setApplyFilter] = useState({});
  const [applySort, setApplySort] = useState();
  const { getSearchLocation } = useContext(AppContext);

  const [product, setProductsData] = useRecoilState(otherVendorDataState);
  console.log("product from make page----->", product);

  useEffect(() => {
    if (makeName) {
      Axios.getListingbyMake(
        getSearchLocation,
        makeName,
        Cookies.get("userUniqueId")
      ).then((response) => {
        console.log("GetListingbyMake --> ", response?.dataObject);
        // setProducts(response?.dataObject?.otherListings);
        // setBestDeal(response?.dataObject?.bestDeals);
        if (response?.dataObject?.otherListings.length > -1) {
          setProducts((response && response?.dataObject?.otherListings) || []);
          setProductsData(
            (response && response?.dataObject?.otherListings) || []
          );
        }
        if (response?.dataObject?.bestDeals.length > -1) {
          setBestDeal((response && response?.dataObject?.bestDeals) || []);
          setProductsData((response && response?.dataObject?.bestDeals) || []);
        }

        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeName, getSearchLocation]);

  useEffect(() => {
    console.log("BRAND ", applyFilter);
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
        make: brand?.length > 0 ? brand : [makeName],
        reqPage: "BRAND",
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
      console.log("MAKE applyFilter payload--> ", payLoad);
      Axios.searchFilter(payLoad, Cookies.get("userUniqueId") || "Guest").then(
        (response) => {
          console.log("searchFilter ", response?.dataObject);
          setProducts(response?.dataObject?.otherListings);
          setBestDeal([]);
          setLoading(false);
        }
      );
    }
  }, [applyFilter]);

  // const sortingProducts = useMemo(() => getSortedProducts(applySort, products), [applySort, products]);
  const sortingProducts = getSortedProducts(applySort, products);

  return (
    <main className="container py-4">
      <h1 className="sr-only">{makeName} Page</h1>
      <Filter
        listingsCount={sortingProducts?.length + bestDeal?.length}
        setApplySort={setApplySort}
        setApplyFilter={setApplyFilter}
        makeName={makeName}
      >
        {!isLoading && bestDeal && bestDeal.length > 0 && (
          <div className="mb-4">
            <Carousel
              {...settings}
              key={bestDeal.length > 0 ? bestDeal[0] : -1}
              className="bestDealCarousel"
            >
              {bestDeal.map((items, index) => (
                <BestDealsCard
                  key={index}
                  data={items}
                  setProducts={setBestDeal}
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
              {isLoading ? "Loading..." : <NoMatch />}
            </div>
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

export default BrandPage;

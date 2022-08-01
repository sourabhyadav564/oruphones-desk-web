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
import { Helmet } from "react-helmet";
import { metaTags } from "@/utils/constant";

// import {
//   otherVendorDataState,
//   // otherVandorListingIdState,
// } from "../../../../atoms/globalState";
// import { useRecoilState } from "recoil";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
};

function BrandPage() {
  const router = useRouter();
  let { makeName } = router.query;
  const [products, setProducts] = useState([]);
  const [bestDeal, setBestDeal] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [applyFilter, setApplyFilter] = useState({});
  const [applySort, setApplySort] = useState();
  const { getSearchLocation } = useContext(AppContext);
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [title, setTitle] = useState(metaTags.BRANDS.title);
  const [description, setDescription] = useState(metaTags.BRANDS.description);

  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  const loadData = () => {
    if (makeName) {
      Axios.getListingbyMake(
        getSearchLocation,
        makeName,
        Cookies.get("userUniqueId"),
        pageNumber
      ).then((response) => {
        // setProducts(response?.dataObject?.otherListings);
        // setBestDeal(response?.dataObject?.bestDeals);
        if (response?.dataObject?.otherListings.length > -1) {
          setProducts((response && response?.dataObject?.otherListings) || []);
          // setProductsData(
          //   (response && response?.dataObject?.otherListings) || []
          // );
        }
        if (response?.dataObject?.bestDeals.length > -1) {
          setBestDeal((response && response?.dataObject?.bestDeals) || []);
          // setProductsData((response && response?.dataObject?.bestDeals) || []);
        }
        if (response?.dataObject?.totalProducts > -1) {
          setTotalProducts(
            (response && response?.dataObject?.totalProducts) || 0
          );
        }

        setLoading(false);
        setPageNumber(pageNumber + 1);
      });
    }
  };

  const loadMoreData = () => {
    setIsLoadingMore(true);
    if (makeName) {
      Axios.getListingbyMake(
        getSearchLocation,
        makeName,
        Cookies.get("userUniqueId"),
        pageNumber
      ).then((response) => {
        // setProducts(response?.dataObject?.otherListings);
        // setBestDeal(response?.dataObject?.bestDeals);
        if (response?.dataObject?.otherListings.length > -1) {
          setProducts((products) => [
            ...products,
            ...response?.dataObject?.otherListings,
          ]);
          // setProductsData(
          //   (response && response?.dataObject?.otherListings) || []
          // );
        }
        // if (response?.dataObject?.bestDeals.length > -1) {
        //   setBestDeal((response && response?.dataObject?.bestDeals) || []);
        //   // setProductsData((response && response?.dataObject?.bestDeals) || []);
        // }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeName, getSearchLocation]);

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
        reqPage: "BRAND",
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
      setLoading(true);
      Axios.searchFilter(
        payLoad,
        Cookies.get("userUniqueId") || "Guest",
        pageNumber
      ).then((response) => {
        setProducts(response?.dataObject?.otherListings);
        // setBestDeal([]);
        setBestDeal(response?.dataObject?.bestDeals);
        setLoading(false);
      });
    }
  }, [applyFilter]);

  // const sortingProducts = useMemo(() => getSortedProducts(applySort, products), [applySort, products]);
  const sortingProducts = getSortedProducts(applySort, products);

  useEffect(() => {
    switch (makeName) {
      case "apple":
        setTitle(metaTags.APPLE.title);
        setDescription(metaTags.APPLE.description);
        break;
      case "samsung":
        setTitle(metaTags.SAMSUNG.title);
        setDescription(metaTags.SAMSUNG.description);
        break;
      case "oppo":
        setTitle(metaTags.OPPO.title);
        setDescription(metaTags.OPPO.description);
        break;
      case "oneplus":
        setTitle(metaTags.ONEPLUS.title);
        setDescription(metaTags.ONEPLUS.description);
        break;
      case "xiaomi":
        setTitle(metaTags.XIAOMI.title);
        setDescription(metaTags.XIAOMI.description);
        break;
      case "vivo":
        setTitle(metaTags.VIVO.title);
        setDescription(metaTags.VIVO.description);
        break;
      case "realme":
        setTitle(metaTags.REALME.title);
        setDescription(metaTags.REALME.description);
        break;
      case "lenovo":
        setTitle(metaTags.LENOVO.title);
        setDescription(metaTags.LENOVO.description);
        break;
      case "nokia":
        setTitle(metaTags.NOKIA.title);
        setDescription(metaTags.NOKIA.description);
        break;
      case "google":
        setTitle(metaTags.GOOGLE.title);
        setDescription(metaTags.GOOGLE.description);
        break;
      case "honor":
        setTitle(metaTags.HONOR.title);
        setDescription(metaTags.HONOR.description);
        break;
      case "asus":
        setTitle(metaTags.ASUS.title);
        setDescription(metaTags.ASUS.description);
        break;
      case "blackberry":
        setTitle(metaTags.BLACKBERRY.title);
        setDescription(metaTags.BLACKBERRY.description);
        break;
      default:
        setTitle(metaTags.BRANDS.title);
        setDescription(metaTags.BRANDS.description);
        break;
    }
  }, [makeName]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* <meta property="og:url" content={window.location.href} /> */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
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
                {isLoading ? "Loading..." : <NoMatch />}
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
    </>
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

export default BrandPage;

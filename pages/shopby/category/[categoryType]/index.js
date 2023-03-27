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
import { metaTags } from "@/utils/constant";
import Head from "next/head";
import ProductSkeletonCard from "@/components/Cards/ProductSkeletonCard";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed:4000,
  pauseOnHover: true,
  dots: true,
  arrows: true,
  infinite: true,
};

function CategoryPage() {
  const router = useRouter();
  let { categoryType } = router.query;
  const [products, setProducts] = useState([]);
  const [bestDeal, setBestDeal] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [applyFilter, setApplyFilter] = useState({});
  const [applySort, setApplySort] = useState();
  const { getSearchLocation } = useContext(AppContext);
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  let newPages = 0;
  const [title, setTitle] = useState(metaTags.BRANDS.title);
  const [description, setDescription] = useState(metaTags.BRANDS.description);

  const loadData = (intialPage) => {
    if (categoryType && !isFilterApplied) {
      Axios.shopByCategory(
        getSearchLocation,
        categoryType,
        Cookies.get("userUniqueId"),
        intialPage,
        applySort
      ).then((response) => {
        if (response?.dataObject?.otherListings.length > -1) {
          setProducts((response && response?.dataObject?.otherListings) || []);
        }
        if (response?.dataObject?.bestDeals.length > -1) {
          setBestDeal((response && response?.dataObject?.bestDeals) || []);
        }
        if (response?.dataObject?.totalProducts > -1) {
          setTotalProducts(
            (response && response?.dataObject?.totalProducts) || 0
          );
        }

        setLoading(false);
      });
    } else {
      const {
        brand,
        condition,
        color,
        storage,
        Ram,
        warranty,
        verification,
        priceRange,
      } = applyFilter;
      if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
        let payLoad = {
          listingLocation: getSearchLocation,
          make: [],
          marketingName: [],
          reqPage: "BRAND",
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
        if (condition?.length > 0 && router.query.categoryType != "like new") {
          payLoad.deviceCondition = condition.includes("all") ? [] : condition;
        } else if (router.query.categoryType == "like new") {
          payLoad.deviceCondition = "Like New";
        }
        if (storage?.length > 0) {
          payLoad.deviceStorage = storage.includes("all") ? [] : storage;
        }
        if (Ram?.length > 0) {
          payLoad.deviceRam = Ram.includes("all") ? [] : Ram;
        }
        if (color?.length > 0) {
          payLoad.color = color.includes("all") ? [] : color;
        }
        if (
          warranty?.length > 0 &&
          (router.query.categoryType != "brandWarranty" ||
            router.query.categoryType != "sellerWarranty")
        ) {
          payLoad.warenty = warranty.includes("all") ? [] : warranty;
        } else if (router.query.categoryType == "brandWarranty") {
          payLoad.warenty = "Brand Warranty";
        } else if (router.query.categoryType == "sellerWarranty") {
          payLoad.warenty = "Seller Warranty";
        }
        if (
          verification?.length > 0 &&
          router.query.categoryType != "verified"
        ) {
          payLoad.verified = verification.includes("all") ? "" : "verified";
        } else if (router.query.categoryType == "verified") {
          payLoad.verified = "verified";
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

    if (categoryType && !isFilterApplied) {
      Axios.shopByCategory(
        getSearchLocation,
        categoryType,
        Cookies.get("userUniqueId"),
        newPages,
        applySort
      ).then((response) => {
        setLoading(false);
        setIsLoadingMore(false);

        if (response?.dataObject?.otherListings.length > 0) {
          setProducts((products) => [
            ...products,
            ...response?.dataObject?.otherListings,
          ]);
        }

        if (response?.dataObject?.otherListings.length == 0) {
          setIsFinished(true);
        }

        if (response?.dataObject?.totalProducts > -1) {
          setTotalProducts(
            (response && response?.dataObject?.totalProducts) || 0
          );
        }
        setIsLoadingMore(false);
      });
    } else {
      setIsFilterApplied(true);
      const {
        condition,
        color,
        brand,
        storage,
        Ram,
        warranty,
        verification,
        priceRange,
      } = applyFilter;
      if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
        let payLoad = {
          listingLocation: getSearchLocation,
          make: [],
          marketingName: [],
          reqPage: "BRAND",
          color: [],
          deviceCondition: [],
          deviceStorage: [],
          deviceRam: [],
          maxsellingPrice: 200000,
          minsellingPrice: 0,
          verified: "",
          warenty: [],
        };
        if (brand?.length > 0) {
          payLoad.make = brand.includes("all") ? [] : brand;
        }
        if (priceRange && priceRange.min && priceRange.max) {
          payLoad.minsellingPrice = priceRange.min;
          payLoad.maxsellingPrice = priceRange.max;
        }
        if (condition?.length > 0 && router.query.categoryType != "like new") {
          payLoad.deviceCondition = condition.includes("all") ? [] : condition;
        } else if (router.query.categoryType == "like new") {
          payLoad.deviceCondition = "Like New";
        }
        if (storage?.length > 0) {
          payLoad.deviceStorage = storage.includes("all") ? [] : storage;
        }
        if (Ram?.length > 0) {
          payLoad.deviceRam = Ram.includes("all") ? [] : Ram;
        }
        if (
          warranty?.length > 0 &&
          (router.query.categoryType != "brandWarranty" ||
            router.query.categoryType != "sellerWarranty")
        ) {
          payLoad.warenty = warranty.includes("all") ? [] : warranty;
        } else if (router.query.categoryType == "brandWarranty") {
          payLoad.warenty = "Brand Warranty";
        } else if (router.query.categoryType == "sellerWarranty") {
          payLoad.warenty = "Seller Warranty";
        }
        if (
          verification?.length > 0 &&
          router.query.categoryType != "verified"
        ) {
          payLoad.verified = verification.includes("all") ? "" : "verified";
        } else if (router.query.categoryType == "verified") {
          payLoad.verified = "verified";
        }
        Axios.searchFilter(
          payLoad,
          Cookies.get("userUniqueId") || "Guest",
          newPages
        ).then((response) => {
          setIsFilterApplied(true);
          setIsLoadingMore(false);
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
        });
      }
    }
  };

  useEffect(() => {
    let intialPage = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [categoryType, getSearchLocation, applySort]);

  useEffect(() => {
    const {
      brand,
      condition,
      color,
      storage,
      Ram,
      warranty,
      verification,
      priceRange,
    } = applyFilter;
    if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
      setIsFilterApplied(true);
      let payLoad = {
        listingLocation: getSearchLocation,
        make: [],
        marketingName: [],
        reqPage: "BRAND",
        color: [],
        deviceCondition: [],
        deviceStorage: [],
        deviceRam: [],
        maxsellingPrice: 200000,
        minsellingPrice: 0,
        verified: "",
        warenty: [],
      };
      if (brand?.length > 0) {
        payLoad.make = brand.includes("all") ? [] : brand;
      }
      if (priceRange && priceRange.min && priceRange.max) {
        payLoad.minsellingPrice = priceRange.min;
        payLoad.maxsellingPrice = priceRange.max;
      }

      if (
        (condition?.length > 0 && router.query.categoryType != "like new") ||
        (condition?.length > 0 && router.query.categoryType == "like%20new")
      ) {
        payLoad.deviceCondition = condition.includes("all") ? [] : condition;
      } else if (router.query.categoryType == "like new") {
        payLoad.deviceCondition = "Like New";
      }
      if (storage?.length > 0) {
        payLoad.deviceStorage = storage.includes("all") ? [] : storage;
      }
      if (Ram?.length > 0) {
        payLoad.deviceRam = Ram.includes("all") ? [] : Ram;
      }
      if (color?.length > 0) {
        payLoad.color = color.includes("all") ? [] : color;
      }
      if (
        warranty?.length > 0 &&
        (router.query.categoryType != "brandWarranty" ||
          router.query.categoryType != "sellerWarranty")
      ) {
        payLoad.warenty = warranty.includes("all") ? [] : warranty;
      } else if (router.query.categoryType == "brandWarranty") {
        payLoad.warenty = "Brand Warranty";
      } else if (router.query.categoryType == "sellerWarranty") {
        payLoad.warenty = "Seller Warranty";
      }
      if (verification?.length > 0 && router.query.categoryType != "verified") {
        payLoad.verified = verification.includes("all") ? "" : "verified";
      } else if (router.query.categoryType === "verified") {
        payLoad.verified = "verified";
      }
      setLoading(true);
        if((applySort !== undefined) && (applySort)){
        Axios.searchFilter(
          payLoad,
          Cookies.get("userUniqueId") || "Guest",
          pageNumber
        ).then((response) => {
          setLoading(false);
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
        });
      }
    }
  }, [applyFilter, applySort]);

  useEffect(() => {
    switch (categoryType) {
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
  }, [categoryType]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <main className="container py-4">
        <h1 className="sr-only">{categoryType} Page</h1>
        <Filter
          listingsCount={products?.length + bestDeal?.length}
          setApplySort={setApplySort}
          setApplyFilter={setApplyFilter}
        >
          {isLoading ? (
            <ProductSkeletonCard isBestDeal={true} />
          ) : (
            !isLoading &&
            bestDeal &&
            bestDeal.length > 0 && (
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
            )
          )}
          <h4 className="font-Roboto-Semibold text-xlFontSize opacity-50 mb-4">
            Total Products ({totalProducts})
          </h4>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            {isLoading ? (
              Array(10)
                .fill()
                .map((_, index) => <ProductSkeletonCard isTopSelling={true} />)
            ) : !isLoading &&
              isFinished === false &&
              products &&
              products.length > 0 ? (
              products?.map((product, index) => (
                <div key={index}>
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
          {!isLoading &&
            isFinished === false &&
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
    </>
  );
}

export default CategoryPage;

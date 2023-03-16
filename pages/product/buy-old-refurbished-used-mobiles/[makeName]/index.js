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
import { useRecoilValue } from "recoil";
import { makeState } from "atoms/globalState";
import ShopByBrandSection from "@/components/ShopByBrandSection";

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
  const [shopByModel, setShopByModel] = useState([]);
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
  const [title, setTitle] = useState(metaTags.BRANDS.title);
  const [description, setDescription] = useState(metaTags.BRANDS.description);
  let intialPage = 0;
  let newPages = 0;
  let brandResult = [];

  const loadData = (intialPage) => {
    if (!isFilterApplied) {
      const getMakeModel = async () => {
        brandResult = await getMakeModel(
          Cookies.get("userUniqueId") || "Guest",
          Cookies.get("sessionId") != undefined
            ? Cookies.get("sessionId")
            : localStorage.getItem("sessionId") != undefined
            ? localStorage.getItem("sessionId")
            : ""
        );
      };
      let makemodel;
      if (localStorage.getItem("shopByModel") != undefined) {
        if (makeName === "oneplus") {
          makeName = "OnePlus";
        } else if (makeName === "lg") {
          makeName = "LG";
        } else if (makeName === "htc") {
          makeName = "HTC";
        } else if (makeName === "zte") {
          makeName = "ZTE";
        } else {
          makeName =
            String(makeName).charAt(0).toUpperCase() +
            String(makeName).slice(1);
        }

        makemodel = JSON.parse(localStorage.getItem("shopByModel"));
        makemodel.map((item) => {
          if (item.make == makeName) {
            setTitle(item.make);
            setDescription(item.make);
            // setshopbymodel(item.models);
            if (shopByModel == []) {
              setShopByModel(JSON.stringify(item.marketingName));
            } else {
              setShopByModel((shopByModel) => [
                ...shopByModel,
                JSON.stringify(item.marketingName),
              ]);
            }
          }
        });
      } else {
        if (makeName === "oneplus") {
          makeName = "OnePlus";
        } else {
          makeName =
            String(makeName).charAt(0).toUpperCase() +
            String(makeName).slice(1);
        }
        Axios.fetchTopsellingmodels();
        makemodel = JSON.parse(localStorage.getItem("shopByModel"));
        makemodel?.map((item) => {
          if (item.make == makeName) {
            setTitle(item.make);
            setDescription(item.make);
            if (shopByModel == []) {
              setShopByModel(JSON.stringify(item.marketingName));
            } else {
              setShopByModel((shopByModel) => [
                ...shopByModel,
                JSON.stringify(item.marketingName),
              ]);
            }
          }
        });
      }
      if (makemodel != undefined) {
        makemodel.map((item) => {
          if (item.make == makeName) {
            setTitle(item.make);
            setDescription(item.make);
            if (shopByModel == []) {
              setShopByModel(JSON.stringify(item.marketingName));
            } else {
              setShopByModel((shopByModel) => [
                ...shopByModel,
                JSON.stringify(item.marketingName),
              ]);
            }
          }
        });
      }
    }

    if (makeName && !isFilterApplied) {
      Axios.getListingbyMake(
        getSearchLocation,
        makeName,
        Cookies.get("userUniqueId") || "Guest",
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
        storage,
        Ram,
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
          deviceCondition: [],
          deviceStorage: [],
          deviceRam: [],
          maxsellingPrice: 200000,
          minsellingPrice: 0,
          verified: "",
          warenty: [],
          pageNumber: intialPage,
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
          intialPage,
          applySort
        ).then((response) => {
          setProducts(response?.dataObject?.otherListings);
          setTotalProducts(response?.dataObject?.totalProducts);
          setBestDeal(response?.dataObject?.bestDeals);
        });
      }
    }
  };

  const loadMoreData = () => {
    newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (makeName && !isFilterApplied) {
      Axios.getListingbyMake(
        getSearchLocation,
        makeName,
        Cookies.get("userUniqueId"),
        newPages,
        applySort
      ).then((response) => {
        if (response?.dataObject?.otherListings.length > 0) {
          setProducts((products) => [
            ...products,
            ...response?.dataObject?.otherListings,
          ]);
          if (response?.dataObject?.totalProducts > -1) {
            setTotalProducts(
              (response && response?.dataObject?.totalProducts) || 0
            );
          }
        }

        if (response?.dataObject?.otherListings.length == 0) {
          setIsFinished(true);
        }
        setLoading(false);
        setIsLoadingMore(false);
      });
    } else {
      if (applyFilter) {
        setIsFilterApplied(true);
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
          if (makeName === "oneplus") {
            makeName = "OnePlus";
          } else {
            makeName = makeName.charAt(0).toUpperCase() + makeName.slice(1);
          }
          let payLoad = {
            listingLocation: getSearchLocation,
            make: brand?.length > 0 ? brand : [makeName],
            reqPage: "BRAND",
            deviceCondition: [],
            deviceStorage: [],
            deviceRam: [],
            maxsellingPrice: 200000,
            minsellingPrice: 0,
            verified: "",
            warenty: [],
            pageNumber: newPages,
          };
          if (priceRange && priceRange.min && priceRange.max) {
            payLoad.minsellingPrice = priceRange.min;
            payLoad.maxsellingPrice = priceRange.max;
          }
          if (condition?.length > 0) {
            payLoad.deviceCondition = condition.includes("all")
              ? []
              : condition;
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
            setIsLoadingMore(false);
            if (newPages == 0) {
              setProducts(response?.dataObject?.otherListings);
            } else {
              setProducts((products) => [
                ...products,
                ...response?.dataObject?.otherListings,
              ]);
            }
            setIsFilterApplied(true);
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
    }
  };

  useEffect(() => {
    intialPage = 0;
    newPages = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [makeName, getSearchLocation, applySort]);

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
      if (makeName === "oneplus") {
        makeName = "OnePlus";
      } else {
        makeName = makeName.charAt(0).toUpperCase() + makeName.slice(1);
      }
      let payLoad = {
        listingLocation: getSearchLocation,
        make: brand?.length > 0 ? brand : [makeName],
        reqPage: "BRAND",
        deviceCondition: [],
        deviceStorage: [],
        deviceRam: [],
        maxsellingPrice: 200000,
        minsellingPrice: 0,
        verified: "",
        warenty: [],
        pageNumber: intialPage,
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
        intialPage,
        applySort
      ).then((response) => {
        setProducts(response?.dataObject?.otherListings);
        setTotalProducts(response?.dataObject?.totalProducts);
        setBestDeal(response?.dataObject?.bestDeals);
      });
    }
  }, [applyFilter, applySort]);

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
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <main className="container py-4">
        <h1 className="sr-only">{makeName} Page</h1>
        <Filter
          listingsCount={products?.length + bestDeal?.length}
          setApplySort={setApplySort}
          setApplyFilter={setApplyFilter}
          makeName={makeName}
        >
          {!isLoading && bestDeal && bestDeal.length > 0 && (
            <div className="mb-4 ">
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
          {
            <div className="font-Roboto-Semibold text-xlFontSize">
              <p className="opacity-50">Shop By Model</p>
              <ShopByBrandSection
                shopbymodeldata={shopByModel}
                shopbymakedata={makeName}
              />
            </div>
          }
          <h4 className="font-Roboto-Semibold text-xlFontSize opacity-50 md:py-8 py-4 mb-4">
            Total Products ({totalProducts})
          </h4>
          <div className="grid md:grid-cols-3 grid-cols-2 m-auto md:pl-0 pl-4  justify-center gap-8 ">
            {!isLoading && isFinished == false && products.length > 0 ? (
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
              <div className="col-span-3 pt-20 h-96 items-center flex justify-center ">
                {isLoading ? "Loading..." : <NoMatch />}
              </div>
            )}
          </div>
          {!isLoading &&
            isFinished === false &&
            products.length != totalProducts && (
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

export default BrandPage;

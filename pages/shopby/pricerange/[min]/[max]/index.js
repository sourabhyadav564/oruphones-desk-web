import BestDealsCard from "@/components/Cards/BestDealsCard";
import ProductCard from "@/components/Cards/ProductCard";
import Carousel from "@/components/Carousel";
import Filter from "@/components/Filter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Axios from "../../../../../api/axios";
import AppContext from "@/context/ApplicationContext";
import { useContext } from "react";
import { numberFromString, stringToDate } from "@/utils/util";
import Cookies from "js-cookie";
import NoMatch from "@/components/NoMatch";


const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
  swipeToSlide: true,
};

const Pricerange = () => {
  const router = useRouter();
  const { min, max } = router.query;
  const [bestDeal, setBestDeal] = useState();
  const [otherListings, setOtherListings] = useState([]);
  const { getSearchLocation } = useContext(AppContext);
  const [applyFilter, setApplyFilter] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [applySort, setApplySort] = useState();
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  let intialPage = 0;
  let newPages = 0;

  const loadData = (intialPage) => {
    if (!isFilterApplied) {
      const fetchData = async () => {
        const priceRange = await Axios.shopByPriceRange(
          max,
          getSearchLocation,
          min,
          Cookies.get("userUniqueId") || "Guest",
          intialPage,
          applySort
        );
        setBestDeal(priceRange?.dataObject?.bestDeals);
        setOtherListings(priceRange?.dataObject?.otherListings);
        setTotalProducts(priceRange?.dataObject?.totalProducts);
        setLoading(false);
      };
      if (min != undefined && max != undefined) {
        fetchData();
      }
    } else {
      const {
        brand,
        condition,
        color,
        storage,
        Ram,
        warranty,
        verification,
        minPrice,
        maxPrice,
      } = applyFilter;
      if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
        let payLoad = {
          listingLocation: getSearchLocation,
          maxsellingPrice: max,
          minsellingPrice: min,
          reqPage: "SBYP",
          make: [],
          marketingName: [],
          color: [],
          deviceRam: [],
          deviceCondition: [],
          deviceStorage: [],
          verified: "",
          warenty: [],
          pageNumber: intialPage,
        };
        if (brand?.length > 0) {
          payLoad.make = brand.includes("all") ? [] : brand;
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
        Axios.searchFilter(payLoad, Cookies.get("userUniqueId") || "Guest", intialPage, applySort).then(
          (response) => {
            setOtherListings(response?.dataObject?.otherListings);
            setBestDeal(response?.dataObject?.bestDeals);
            setTotalProducts(response?.dataObject?.totalProducts);
            setLoading(false);
          }
        );
      }
    }
  };

  const loadMoreData = () => {
    newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (!isFilterApplied) {
      const fetchData = async () => {
        const priceRange = await Axios.shopByPriceRange(
          max,
          getSearchLocation,
          min,
          Cookies.get("userUniqueId") || "Guest",
          newPages,
          applySort
        );
        setOtherListings((products) => [
          ...products,
          ...priceRange?.dataObject?.otherListings,
        ]);

        if (priceRange?.dataObject?.otherListings.length == 0) {
          setIsFinished(true);
        }
        if (priceRange?.dataObject?.totalProducts > -1) {
          setTotalProducts(
            (priceRange && priceRange?.dataObject?.totalProducts) || 0
          );
        }
        setLoading(false);
        setIsLoadingMore(false);
      };
      if (min != undefined && max != undefined) {
        fetchData();
      }
    } else {
      const {
        brand,
        condition,
        color,
        storage,
        Ram,
        warranty,
        verification,
        minPrice,
        maxPrice,
      } = applyFilter;
      if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
        let payLoad = {
          listingLocation: getSearchLocation,
          maxsellingPrice: max,
          minsellingPrice: min,
          reqPage: "SBYP",
          make: [],
          marketingName: [],
          color: [],
          deviceRam: [],
          deviceCondition: [],
          deviceStorage: [],
          verified: "",
          warenty: [],
          pageNumber: newPages,
        };
        if (brand?.length > 0) {
          payLoad.make = brand.includes("all") ? [] : brand;
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
        if (color?.length > 0) {
          payLoad.color = color.includes("all") ? [] : color;
        }
        if (warranty?.length > 0) {
          payLoad.warenty = warranty.includes("all") ? [] : warranty;
        }
        if (verification?.length > 0) {
          payLoad.verified = verification.includes("all") ? [] : "verified";
        }
        Axios.searchFilter(payLoad, Cookies.get("userUniqueId") || "Guest", newPages, applySort).then(
          (response) => {
            if (newPages == 0) {
              setOtherListings(response?.dataObject?.otherListings);
            } else {
              setOtherListings((products) => [
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
            };
            setLoading(false);
            setIsLoadingMore(false);
          }
        );
      }
    }
  };

  useEffect(() => {
    intialPage = 0;
    newPages = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [min, max, getSearchLocation, applySort, applyFilter]);

  useEffect(() => {
    const {
      brand,
      condition,
      color,
      storage,
      Ram,
      warranty,
      verification,
      minPrice,
      maxPrice,
    } = applyFilter;
    if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
      setIsFilterApplied(true);
      let payLoad = {
        listingLocation: getSearchLocation,
        maxsellingPrice: max,
        minsellingPrice: min,
        reqPage: "SBYP",
        make: [],
        marketingName: [],
        color: [],
        deviceRam: [],
        deviceCondition: [],
        deviceStorage: [],
        verified: "",
        warenty: [],
        pageNumber: intialPage,
      };
      if (brand?.length > 0) {
        payLoad.make = brand.includes("all") ? [] : brand;
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
      Axios.searchFilter(payLoad, Cookies.get("userUniqueId") || "Guest", intialPage, applySort).then(
        (response) => {
          setOtherListings(response?.dataObject?.otherListings);
          setBestDeal(response?.dataObject?.bestDeals);
          setTotalProducts(response?.dataObject?.totalProducts);
          setLoading(false);
        }
      );
    }
  }, [applyFilter, applySort]);

  return (
    <main className="container py-4">
      <h1 className="sr-only">Listing nearme</h1>
      <Filter setApplyFilter={setApplyFilter} setApplySort={setApplySort}>
        {!isLoading && bestDeal && bestDeal.length > 0 && (
          <Carousel {...settings}>
            {bestDeal.map((items, index) => (
              <BestDealsCard
                key={index}
                data={items}
                setProducts={setBestDeal}
                className="bestDealCarousel"
              />
            ))}
          </Carousel>
        )}
        <h4 className="font-Roboto-Semibold text-xlFontSize opacity-50 mb-4">
          Total Products ({totalProducts})
        </h4>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-3">
          {!isLoading &&
            isFinished == false && otherListings.length > 0 ? (
            otherListings?.map((product, index) => (
              <ProductCard
                key={index}
                data={product}
                prodLink
                setProducts={setOtherListings}
              />
            ))
          ) : (
            <div className="col-span-3 h-96 items-center flex justify-center ">
              {isLoading ? "Loading..." : <NoMatch/>}
            </div>
          )}
        </div>
        {!isLoading &&
          isFinished == false && otherListings.length != totalProducts && (
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

export default Pricerange;

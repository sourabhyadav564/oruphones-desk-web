import { useContext, useEffect, useState } from "react";
import ProductCard from "../../../../../components/Cards/ProductCard";
import ProductDetailsCard from "../../../../../components/Cards/ProductDetailsCard";
import * as Axios from "../../../../../api/axios";
import AppContext from "@/context/ApplicationContext";
import FullImageView from "@/components/FullImageView";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function ProductDetails() {
  const router = useRouter();
  let [simliarProducts, setSimliarProducts] = useState([]);
  const { getSearchLocation } = useContext(AppContext);
  const [openImageFullView, setOpenImageFullView] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [listingInfo, setListingInfo] = useState(null);

  useEffect(async () => {
    const userUniqueId = Cookies.get("userUniqueId");
    const sessionId =
      Cookies.get("sessionId") != undefined
        ? Cookies.get("sessionId")
        : localStorage.getItem("sessionId");
    const listingInfo = await Axios.detailWithUserInfo(
      router.query.isOtherVendor,
      router.query.productID,
      userUniqueId || "Guest",
      sessionId
    );
    setListingInfo(listingInfo?.dataObject);
  }, [router.query]);

  const loadData = (intialPage) => {
    let payLoad = {
      listingLocation: getSearchLocation,
      make: [listingInfo?.make],
      marketingName: [listingInfo?.marketingName],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      deviceRam: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
      warenty: [],
    };
    Axios.fetchSimilarProducts(
      payLoad,
      Cookies.get("userUniqueId") || "Guest",
      intialPage
    ).then((response) => {
      setSimliarProducts(
        response?.dataObject?.otherListings?.filter((items) => {
          return items.listingId != listingInfo.listingId;
        })
      );
      setTotalProducts(response?.dataObject?.totalProducts);
    });
  };

  const loadMoreData = () => {
    let newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    let payLoad = {
      listingLocation: getSearchLocation,
      make: [listingInfo.make],
      marketingName: [listingInfo.marketingName],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      deviceRam: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
      warenty: [],
    };

    Axios.fetchSimilarProducts(
      payLoad,
      Cookies.get("userUniqueId") || "Guest",
      newPages
    ).then((response) => {
      let data = response?.dataObject?.otherListings?.filter((items) => {
        return items.listingId != listingInfo.listingId;
      });
      setSimliarProducts((products) => [...products, ...data]);

      if (response?.dataObject?.otherListings.length == 0) {
        setIsFinished(true);
      }
      setIsLoadingMore(false);
    });
  };

  useEffect(() => {
    let intialPage = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [listingInfo]);

  simliarProducts = simliarProducts?.filter((item) => {
    return item.listingId != listingInfo?.listingId;
  });

  return (
    <main className="container my-6">
      <p className="sr-only"> Product Details page </p>
      <section className="grid grid-cols-4 gap-4">
        <div className="bg-white col-span-5">
          {listingInfo == null ? (
            <ProductSkeleton />
          ) : (
            <ProductDetailsCard
              key={listingInfo?.listingId}
              data={listingInfo}
              openFullImage={() => setOpenImageFullView(true)}
            />
          )}
        </div>
        <div className="col-span-4">
          <p
            className="text-m-black font-Roboto-Light text-regularFontSize my-3"
            style={{ fontSize: 21 }}
          >
            Similar Products ({simliarProducts?.length || 0})
          </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-4">
            {simliarProducts && simliarProducts.length > 0 ? (
              simliarProducts?.map((product, index) => (
                <ProductCard
                  key={index}
                  data={product}
                  setProducts={setSimliarProducts}
                  prodLink
                />
              ))
            ) : (
              <div className="text-center font-Roboto-Light text-regularFontSize pt-2 col-span-4 h-20">
                There are no similar products
              </div>
            )}
          </div>
          {simliarProducts &&
            simliarProducts.length > 0 &&
            isFinished == false && (
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
        </div>
      </section>
      <FullImageView
        open={openImageFullView}
        close={() => setOpenImageFullView(false)}
        images={
          (listingInfo?.images?.length && listingInfo?.images) ||
          (listingInfo?.defaultImage?.fullImage && [
            { fullImage: listingInfo?.defaultImage?.fullImage },
          ]) ||
          (listingInfo?.imagePath && [
            {
              fullImage: listingInfo?.imagePath,
              thumbImage: listingInfo?.imagePath,
            },
          ]) ||
          (listingInfo?.vendorLogo && [
            {
              fullImage:
                "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  ?.src,
              thumbImage:
                "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  ?.src,
            },
          ])
        }
      />
    </main>
  );
}

export default ProductDetails;

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      <div>
        <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col">
          <div className="flex flex-col">
            <div className="lg:h-[300px] w-[250px] sm:h-[300px] h-[300px] justify-items-center mx-36 sm:mx-18 lg:mx-36 mt-14 bg-gray-300 rounded-md"></div>
            <div className="flex flex-row">
              <div className="lg:h-[100px] w-[60px] ml-36 mt-14 bg-gray-300 rounded-md"></div>
              <div className="lg:h-[100px] w-[60px] ml-8 mt-14 bg-gray-300 rounded-md"></div>
              <div className="lg:h-[100px] w-[60px] ml-8 mt-14 bg-gray-300 rounded-md"></div>
            </div>
          </div>
          <div className="flex flex-col gap-6 pl-4 w-full">
            <div className="flex flex-col gap-6 pl-4 w-full pt-8">
              <div className="flex flex-col gap-4 pl-4 h-3 p-4 w-72 bg-gray-300 rounded-md" />
              <div className="flex flex-col gap-4 pl-4 h-3 p-4 bg-gray-300 rounded-md" />
              <div className="flex flex-col gap-4 pl-4 h-3 p-3 bg-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col gap-4 pl-4 pt-4">
              <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
              </div>
              <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
              </div>
              <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
              </div>
              <div className="flex flex-row gap-10 pt-12 items-stretch justify-between">
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-12 bg-gray-300 rounded-full" />
                  <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-32 bg-gray-300 rounded-md" />
                </div>
                <div className="flex flex-col gap-4 pl-16 h-3 p-6 w-60 space bg-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

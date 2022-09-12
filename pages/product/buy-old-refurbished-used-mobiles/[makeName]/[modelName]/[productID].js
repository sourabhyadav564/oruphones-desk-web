import { useContext, useEffect, useState } from "react";
import ProductCard from "../../../../../components/Cards/ProductCard";
import ProductDetailsCard from "../../../../../components/Cards/ProductDetailsCard";
import SellerDetailsCard from "../../../../../components/Cards/SellerDetailsCard";
import * as Axios from "../../../../../api/axios";
import AppContext from "@/context/ApplicationContext";
import FullImageView from "@/components/FullImageView";
import Cookies from "js-cookie";
import Logo from "@/assets/oru_phones_logo.png";

// import {
//   otherVandorDataSelector,
//   // otherVandorListingIdSelector,
// } from "../../../../../atoms/globalState";

// import {
//   otherVendorDataState,
//   // otherVandorListingIdState,
// } from "../../../../../atoms/globalState";
// import { useRecoilState } from "recoil";

// import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

function ProductDetails({ listingInfo }) {
  let [simliarProducts, setSimliarProducts] = useState([]);
  const { getSearchLocation } = useContext(AppContext);
  const [openImageFullView, setOpenImageFullView] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  // const productData = useRecoilValue(otherVandorDataSelector);

  // const router = useRouter();
  // const listingId = router.query.productID;

  // let otherVendorData = [];

  // productData.filter((item) => {
  //   if (item.listingId === listingId) {
  //     otherVendorData.push(item);
  //   }
  // });

  const loadData = (intialPage) => {
    let payLoad = {
      listingLocation: getSearchLocation,
      make: [listingInfo.make],
      marketingName: [listingInfo.marketingName],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
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
      // setPageNumber(pageNumber + 1);
      console.log("pageNumber from initial", pageNumber);
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
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
    };
    console.log("pageNumber from loadMore", newPages);
    Axios.fetchSimilarProducts(
      payLoad,
      Cookies.get("userUniqueId") || "Guest",
      pageNumber
    ).then((response) => {
      let data = response?.dataObject?.otherListings?.filter((items) => {
        return items.listingId != listingInfo.listingId;
      });
      setSimliarProducts((products) => [...products, ...data]);

      if (response?.dataObject?.otherListings.length == 0) {
        setIsFinished(true);
      }
      // setPageNumber(pageNumber + 1);
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
      <h1 className="sr-only"> Product Details page </h1>
      <section className="grid grid-cols-4 gap-4">
        <div className="bg-white col-span-3 shadow rounded p-6">
          <ProductDetailsCard
            key={listingInfo?.listingId}
            data={listingInfo}
            openFullImage={() => setOpenImageFullView(true)}
          />
        </div>
        <div className="bg-white shadow rounded">
          <SellerDetailsCard data={listingInfo} />
        </div>
        <div className="col-span-4">
          <h1
            className="text-m-black font-semibold my-3"
            style={{ fontSize: 21 }}
          >
            Similar Products ({simliarProducts?.length || 0})
          </h1>
          <div
            className="grid grid-cols-4 gap-6 mt-5"
            // onClick={() => {
            //   setProductsData(
            //     simliarProducts.length > 0 &&
            //     simliarProducts?.filter((items) => {
            //         return items.listingId != listingInfo.listingId;
            //       }) || []
            //   );
            // }}
          >
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
              <div className="text-center pt-2 col-span-4 h-20">
                There are no similar products
              </div>
            )}
          </div>
          {/* {isLoadingMore && (
            <div className="flex items-center justify-center mt-5 text-lg font-semibold animate-pulse">
              <span>Fetching more products...</span>
            </div>
          )} */}
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
          // listingInfo?.defaultImage ||
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
              fullImage: Logo?.src,
              thumbImage: Logo?.src,
            },
          ])
        }
      />
    </main>
  );
}

export default ProductDetails;

export async function getServerSideProps({ req, res, query }) {
  const { userUniqueId, sessionId } = req.cookies;
  const listingInfo = await Axios.detailWithUserInfo(
    query.isOtherVendor,
    query.productID,
    userUniqueId || "Guest",
    sessionId || ""
  );
  return {
    props: { listingInfo: listingInfo?.dataObject || [] },
  };
}

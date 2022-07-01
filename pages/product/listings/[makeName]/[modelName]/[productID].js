import { useContext, useEffect, useState } from "react";
import ProductCard from "../../../../../components/Cards/ProductCard";
import ProductDetailsCard from "../../../../../components/Cards/ProductDetailsCard";
import SellerDetailsCard from "../../../../../components/Cards/SellerDetailsCard";
import * as Axios from "../../../../../api/axios";
import AppContext from "@/context/ApplicationContext";
import FullImageView from "@/components/FullImageView";
import Cookies from "js-cookie";

import {
  otherVandorDataSelector,
  // otherVandorListingIdSelector,
} from "../../../../../atoms/globalState";

import {
  otherVendorDataState,
  // otherVandorListingIdState,
} from "../../../../../atoms/globalState";
import { useRecoilState } from "recoil";

import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

function ProductDetails({ listingInfo }) {
  let [simliarProducts, setSimliarProducts] = useState([]);
  const { getSearchLocation } = useContext(AppContext);
  const [openImageFullView, setOpenImageFullView] = useState(false);

  const [product, setProductsData] = useRecoilState(otherVendorDataState);
  console.log("product from productID page----->", product);

  const productData = useRecoilValue(otherVandorDataSelector);
  console.log("productData ---->", productData);

  const router = useRouter();
  const listingId = router.query.productID;
  console.log("listingId ---->", listingId);

  const otherVendorData = [];

  productData.filter((item) => {
    if (item.listingId === listingId) {
      otherVendorData.push(item);
    }
  });

  console.log("otherVendorData ---->", otherVendorData);

  useEffect(() => {
    let payLoad = {
      listingLocation: getSearchLocation,
      make: [listingInfo.make || otherVendorData[0]?.make],
      marketingName: [
        listingInfo.marketingName || otherVendorData[0]?.marketingName,
      ],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
    };
    console.log("fetchSimilarProducts payload", payLoad);
    Axios.fetchSimilarProducts(
      payLoad,
      Cookies.get("userUniqueId") || "Guest"
    ).then((response) => {
      console.log("fetchSimilarProducts ", response);
      setSimliarProducts(
        response?.dataObject?.otherListings?.filter((items) => {
          return items.listingId != listingInfo.listingId;
        })
      );
      setProductsData(
        response &&
          response?.dataObject?.otherListings?.filter((items) => {
            return items.listingId != listingInfo.listingId;
          }) || []
      );
    });
  }, [listingInfo]);

  console.log("listingInfo", listingInfo);

  simliarProducts = simliarProducts?.filter((item) => {
    return item.listingId != otherVendorData[0]?.listingId || listingInfo?.listingId
  })

  return (
    <main className="container my-6">
      <h1 className="sr-only"> Product Details page </h1>
      <section className="grid grid-cols-4 gap-4">
        <div className="bg-white col-span-3 shadow rounded p-6">
          <ProductDetailsCard
            key={otherVendorData[0]?.listingId || listingInfo?.listingId}
            data={otherVendorData[0] || listingInfo}
            openFullImage={() => setOpenImageFullView(true)}
          />
        </div>
        <div className="bg-white shadow rounded">
          <SellerDetailsCard data={otherVendorData[0] || listingInfo} />
        </div>
        <div className="col-span-4">
          <h1
            className="text-m-black font-semibold my-3"
            style={{ fontSize: 21 }}
          >
            Similar Products
          </h1>
          <div className="grid grid-cols-4 gap-6 mt-5">
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
        </div>
      </section>
      <FullImageView
        open={openImageFullView}
        close={() => setOpenImageFullView(false)}
        images={
          (listingInfo?.images?.length && listingInfo?.images) ||
          (otherVendorData[0]?.images.length && otherVendorData[0].images) ||
          listingInfo?.defaultImage ||
          (listingInfo?.imagePath && [
            {
              fullImage: listingInfo?.imagePath,
              thumbImage: listingInfo?.imagePath,
            },
          ]) ||
          (otherVendorData[0]?.imagePath && [
            {
              fullImage: otherVendorData[0]?.imagePath,
              thumbImage: otherVendorData[0]?.imagePath,
            },
          ]) ||
          (otherVendorData[0]?.vendorLogo && [
            {
              fullImage: otherVendorData[0]?.vendorLogo,
              thumbImage: otherVendorData[0]?.vendorLogo,
            },
          ])
        }
      />
    </main>
  );
}

export default ProductDetails;

export async function getServerSideProps({ req, res, query }) {
  const { userUniqueId } = req.cookies;
  console.log("fetchSimilarProducts userUniqueId", userUniqueId);
  const listingInfo = await Axios.detailWithUserInfo(
    query.isOtherVendor,
    query.productID,
    userUniqueId || "Guest"
  );
  console.log("fetchSimilarProducts listingInfo", listingInfo);
  return {
    props: { listingInfo: listingInfo?.dataObject || [] },
  };
}

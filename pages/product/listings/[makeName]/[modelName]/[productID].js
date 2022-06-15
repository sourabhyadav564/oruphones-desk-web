import { useContext, useEffect, useState } from "react";
import ProductCard from "../../../../../components/Cards/ProductCard";
import ProductDetailsCard from "../../../../../components/Cards/ProductDetailsCard";
import SellerDetailsCard from "../../../../../components/Cards/SellerDetailsCard";
import * as Axios from "../../../../../api/axios";
import AppContext from "@/context/ApplicationContext";
import FullImageView from "@/components/FullImageView";
import Cookies from "js-cookie";

function ProductDetails({ listingInfo }) {
  const [simliarProducts, setSimliarProducts] = useState([]);
  const { getSearchLocation } = useContext(AppContext);
  const [openImageFullView, setOpenImageFullView] = useState(false);

  useEffect(() => {
    let payLoad = {
      listingLocation: getSearchLocation,
      make: [listingInfo.make],
      marketingName: [listingInfo.marketingName],
      reqPage: "TSM",
    };
    console.log("fetchSimilarProducts payload", payLoad);
    Axios.fetchSimilarProducts(payLoad, Cookies.get("userUniqueId") || "Guest").then((response) => {
      console.log("fetchSimilarProducts ", response);
      setSimliarProducts(
        response?.dataObject?.otherListings?.filter((items) => {
          return items.listingId != listingInfo.listingId;
        })
      );
    });
  }, [listingInfo]);

  return (
    <main className="container my-6">
      <h1 className="sr-only"> Product Details page </h1>
      <section className="grid grid-cols-4 gap-4">
        <div className="bg-white col-span-3 shadow rounded p-6">
          <ProductDetailsCard key={listingInfo.listingId} data={listingInfo} openFullImage={() => setOpenImageFullView(true)} />
        </div>
        <div className="bg-white shadow rounded">
          <SellerDetailsCard data={listingInfo} />
        </div>
        <div className="col-span-4">
          <h1 className="text-m-black font-semibold my-3" style={{ fontSize: 21 }}>
            Similar Products
          </h1>
          <div className="grid grid-cols-4 gap-6 mt-5">
            {simliarProducts && simliarProducts.length > 0 ? simliarProducts?.map((product, index) => (
              <ProductCard key={index} data={product} setProducts={setSimliarProducts} prodLink/>
            )):<div className="text-center pt-2 col-span-4 h-20">There are no similar products</div>}
          </div>
        </div>
      </section>
      <FullImageView
        open={openImageFullView}
        close={() => setOpenImageFullView(false)}
        images={
          listingInfo?.images ||
          listingInfo?.defaultImage || [{ fullImage: listingInfo?.imagePath, thumbImage: listingInfo?.imagePath }]
        }
      />
    </main>
  );
}

export default ProductDetails;

export async function getServerSideProps({ req, res, query }) {
  const { userUniqueId } = req.cookies;
  const listingInfo = await Axios.detailWithUserInfo(query.isOtherVendor, query.productID, userUniqueId);
  return {
    props: { listingInfo: listingInfo?.dataObject },
  };
}

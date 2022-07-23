import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ListingDetailsCard from "../../../components/Cards/ListingDetailsCard";
import * as Axios from "../../../api/axios";
import Cookies from "js-cookie";

function ListingDetials() {
  const router = useRouter();
  const { listingID } = router.query;
  const [listedDeviceInfo, setListedDeviceInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const getListedDeviceInfo = await Axios.getListedDeviceInfo(listingID, Cookies.get("userUniqueId"));
      setListedDeviceInfo(getListedDeviceInfo?.dataObject);
    };
    if (listingID !== undefined && listingID !== null && listingID !== "") {
      fetchData();
    } else {
      router.push("/user/listings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingID]);

  return (
    <main className="container my-12">
      {listedDeviceInfo ? (
        <section className="bg-white shadow rounded p-4">
          <h1 className="sr-only"> Listing Detials {listingID} </h1>
          <ListingDetailsCard data={listedDeviceInfo} />
        </section>
      ) : (
        <div className="h-80 flex justify-center items-center">Loading...</div>
      )}
    </main>
  );
}

// export async function getServerSideProps() {
//   const brandsList = await Axios.fetchBrands();
//   const fetchShopByPrice = await Axios.fetchShopByPrice();
//   const fetchTopsellingmodels = await Axios.fetchTopsellingmodels();

//   return {
//     props: {
//       brandsList: brandsList?.dataObject || [],
//       fetchShopByPrice:fetchShopByPrice?.dataObject,
//       fetchTopsellingmodels:fetchTopsellingmodels?.dataObject }
//   }
// }

export default ListingDetials;

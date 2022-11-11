import { useEffect, useState } from "react";
import TopDealCard from "../Cards/TopDealCard";
// import Carousel from "../Carousel";
import Title from "../Title";
import * as Axios from "../../api/axios";
import Cookies from "js-cookie";
import LocationPopup from "../Popup/LocationPopup";
import Loader from "../Loader/Loader";
import Spinner from "../Loader/Spinner";
import Link from "next/link";

// const settings = {
//   dots: false,
//   infinite: false,
//   speed: 500,
//   slidesToShow: 6,
//   slidesToScroll: 1,
// };

function TopDeals({ location }) {
  // const [loc, setLoc] = useState("Best Deals Near You (" + location + ")");
  const [bestDeals, setBeatDeals] = useState();
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const [isLoading, setLoading] = useState(true);
  let [pageNumber, setPageNumber] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // console.log(bestDeals);

  const loadData = (initialPage) => {
    const fetchNestDealsNearByMe = async () => {
      await Axios.bestDealNearByYou(
        location,
        Cookies.get("userUniqueId") || "Guest",
        initialPage
      ).then((response) => {
        setBeatDeals(
          [
            ...response?.dataObject?.bestDeals,
            ...response?.dataObject?.otherListings,
          ] || []
        );
        setLoading(false);
      });
    };
    if (location != undefined) {
      fetchNestDealsNearByMe();
    }
  };

  const loadMoreData = () => {
    let newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    const fetchNestDealsNearByMe = async () => {
      await Axios.bestDealNearByYou(
        location,
        Cookies.get("userUniqueId") || "Guest",
        newPages
      ).then((response) => {
        setBeatDeals(
          (products) =>
            [
              ...products,
              ...response?.dataObject?.otherListings,
            ] || []
        );

        if (response?.dataObject?.otherListings.length == 0) {
          setIsFinished(true);
        }

        setLoading(false);
        // setPageNumber(pageNumber + 1);
        setIsLoadingMore(false);
      });
    };
    if (location != undefined) {
      fetchNestDealsNearByMe();
    }
  };

  useEffect(() => {
    let intialPage = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [location]);

  return (
    <section className="container pt-[25px] px-20 top_deals">
      <Title
        text={`Best Deals Near You`}
        onClick={() => setOpenLocationPopup(true)}
        location={`(${location})`}
      />
      {bestDeals && bestDeals?.length > 1 ? (
        <div className="grid grid-cols-5 gap-3 py-4">
          {bestDeals &&
            bestDeals
              .slice(0, 10)
              .map((item, index) => (
                <TopDealCard
                  key={index}
                  prodLink
                  data={item}
                  setProducts={setBeatDeals}
                />
              ))}
          {isFinished && (
            <TopDealCard data={{ name: "show all" }} />
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <Spinner />
          <div className="text-center">
            Please wait, while we are fetching data for you...{" "}
          </div>
        </div>
      )}
      {!isLoading && isFinished === false && (
        <Link
          className={`${isLoadingMore ? "w-full" : "w-full "
            }  flex justify-center items-center  hover:cursor-pointer`}
          // onClick={loadMoreData}
          href={{
            pathname: `/product/buy-old-refurbished-used-mobiles/bestdealnearyou`,
            // query: prodLink && { isOtherVendor: data?.isOtherVendor },
          }}
        >
          <p className="flex justify-center w-full items-center font-semibold pb-[61px] text-m-blue underline">
            {isLoadingMore ? "Fetching more products..." : "View All >"}
          </p>
        </Link>
      )}
      <LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
    </section>
  );
}

export default TopDeals;

import { useEffect, useState } from "react";
import TopDealCard from "../Cards/TopDealCard";
// import Carousel from "../Carousel";
import Title from "../Title";
import * as Axios from "../../api/axios";
import Cookies from "js-cookie";
import LocationPopup from "../Popup/LocationPopup";
import Loader from "../Loader/Loader";
import Spinner from "../Loader/Spinner";

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

  // console.log(bestDeals);

  useEffect(() => {
    // setLoc("Best Deals Near You (" + location + ")");
    const fetchNestDealsNearByMe = async () => {
      await Axios.bestDealNearByYou(
        location,
        Cookies.get("userUniqueId") || "Guest"
      ).then((response) => {
        setBeatDeals(response?.dataObject?.bestDeals || []);
      });
    };
    if (location != undefined) {
      fetchNestDealsNearByMe();
    }
  }, [location]);

  return (
    <section className="container top_deals px-4">
      <Title
        text={`Best Deals Near You`}
        onClick={() => setOpenLocationPopup(true)}
        location={`(${location})`}
      />
      {bestDeals && bestDeals?.length > 1 ? (
        <div className="grid grid-cols-5 gap-4 py-4">
          {bestDeals &&
            bestDeals
              .slice(0, 19)
              .map((item, index) => (
                <TopDealCard
                  key={index}
                  prodLink
                  data={item}
                  setProducts={setBeatDeals}
                />
              ))}
          {bestDeals && bestDeals.length > 0 && (
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
      <LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
    </section>
  );
}

export default TopDeals;

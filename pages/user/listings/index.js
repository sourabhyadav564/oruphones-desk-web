import { useState, useEffect } from "react";
import Link from "next/link";
import ProfileListingTile from "../../../components/User/ProfileListingTile";
import UserListingTab from "../../../components/User/UserListingTab";
import UserProfile from "../../../components/User/UserProfile";
import * as Axios from "../../../api/axios";
import router from "next/router";
import Cookies from "js-cookie";
import Loader from "@/components/Loader/Loader";

function Listings() {
  const [currentTab, setCurrentTab] = useState(0);
  const [userListings, setUserListing] = useState([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUserListings = await Axios.fetchUserListings(
        Cookies.get("userUniqueId"),
        Cookies.get("sessionId") || localStorage.getItem("sessionId")
      );
      setUserListing(fetchUserListings?.dataObject);
      setLoading(false);
    };
    if (Cookies.get("userUniqueId") !== undefined) {
      fetchData();
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <UserProfile>
        <UserListingTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="lg:flex lg:flex-col grid grid-cols-2 gap-4 lg:space-y-4 px-4 my-4">
          {currentTab === 0
            ? // userListings && userListings.sort((a, b) => b.date - a.date) && userListings.filter((item)=>{if(item.status === "Active"){return item}}).map((item, index) => (
            userListings &&
            userListings
              .filter((item) => {
                if (item.status === "Active") {
                  return item;
                }
              })
              .map((item, index) => (
                <div
                // href={`/user/listings/${item.listingId}`}
                // key={index}
                // passHref
                >
                  <a
                  //  href=""
                  >
                    <ProfileListingTile data={item} />
                  </a>
                </div>
              ))
            : userListings &&
            userListings
              .filter((item) => {
                if (item.status === "Paused" || item.status === "InActive") {
                  return item;
                }
              })
              .map((item, index) => (
                <div
                // href={`/user/listings/${item.listingId}`}
                // key={index}
                // passHref
                >
                  <a>
                    <ProfileListingTile data={item} />
                  </a>
                </div>
              ))}

          {isLoading && (
            <div className="flex gap-4 col-span-2 h-60  items-center justify-center text-xlFontSize font-Roboto-Regular">
              <Loader />
              Please wait, while we are fetching your listings...
            </div>
          )}

          {!isLoading && userListings?.length == 0 && (
            <div className="flex h-60 items-center justify-center text-xlFontSize font-Roboto-Regular">
              Listings Not Found
            </div>
          )}
        </div>
      </UserProfile>
    </>
  );
}

export default Listings;

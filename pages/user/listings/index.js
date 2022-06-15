import { useState,useEffect } from "react";
import Link from "next/link";
import ProfileListingTile from "../../../components/User/ProfileListingTile";
import UserListingTab from "../../../components/User/UserListingTab";
import UserProfile from "../../../components/User/UserProfile";
import * as Axios from "../../../api/axios";
import router from "next/router";
import Cookies from "js-cookie";

function Listings() {
  const [currentTab, setCurrentTab] = useState(0);
  const [userListings, setUserListing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUserListings = await Axios.fetchUserListings(Cookies.get("userUniqueId"));
      console.log("LISTINGS ",fetchUserListings.dataObject)
      setUserListing(fetchUserListings?.dataObject);
    }
    if(Cookies.get("userUniqueId") !== undefined){
      fetchData();
    }else{
      router.push("/")
    }
  }, [])

  return (
    <UserProfile>
      <UserListingTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex flex-col space-y-4 px-4 my-4">
          {currentTab === 0
          ? 
          // userListings && userListings.sort((a, b) => b.date - a.date) && userListings.filter((item)=>{if(item.status === "Active"){return item}}).map((item, index) => (
            userListings && userListings.filter((item)=>{if(item.status === "Active"){return item}}).map((item, index) => (
              <Link href={`/user/listings/${item.listingId}`} key={index} passHref>
                <a>
                  <ProfileListingTile data={item} />
                </a>
              </Link>
            ))
          : userListings && userListings.filter((item)=>{if(item.status === "Paused" || item.status === "InActive"){return item}}).map((item, index) => (
              <Link href={`/user/listings/${item.listingId}`} key={index} passHref>
                <a>
                  <ProfileListingTile data={item} />
                </a>
              </Link>
            ))}


      </div>
    </UserProfile>
  );
}

export default Listings;

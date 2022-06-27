import Cookies from "js-cookie";
import { useState, useEffect, createContext } from "react";
import * as Axios from "../api/axios";

const AppContext = createContext();

export const ApplicationContext = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [userLogged, setUserLogged] = useState();
  const [getSearchLocation, setSearchLocation] = useState("India");

  useEffect(() => {
    console.log("ApplicationContext getUserProfile ", Cookies.get("mobileNumber"));
    const fetchUserProfileData = async () => {
      const userProfile = await Axios.getUserProfile("91", Cookies.get("mobileNumber"));
      console.log("userProfile -> ", userProfile?.dataObject);
      setUserInfo(userProfile?.dataObject);
    };
    fetchUserProfileData();
  }, [userLogged, refresh]);

  useEffect(() => {
    console.log("userInfo --> ",userInfo);
    // const searchLoc = userInfo?.userdetails?.address?.filter((items) => {
    //   return items.addressType === "SearchLocation";
    // });
    // console.log("LOCATION --> ", getSearchLocation, searchLoc);
    // setSearchLocation(() => {
    //   if (searchLoc && searchLoc.length >= 1) {
    //     return searchLoc[0].city;
    //   } else {
    //     return "India";
    //   }
    // });
    localStorage.getItem("usedLocation");
  }, [userInfo]);

  return (
    <AppContext.Provider
      value={{
        cities,
        setCities,
        userInfo,
        setUserInfo,
        getSearchLocation,
        setUserLogged,
        setSearchLocation,
        setRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

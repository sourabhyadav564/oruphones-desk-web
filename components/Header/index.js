import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiCurrentLocation, BiChevronDown } from "react-icons/bi";

import DesktopMenu from "./DesktopMenu";
import Geocode from "react-geocode";
import MobileMenu from "./MobileMenu";
// import home_logo from "../../assets/home_logo.svg";
// import home_logo from "https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg";
import LoginOrProfile from "./LoginOrProfile";
import LocationPopup from "../Popup/LocationPopup";
import AppContext from "@/context/ApplicationContext";
import SearchBar from "./SearchBar";
import SellNowBtn from "./SellNowBtn";
import Cookies from "js-cookie";
import LocationPicker from "./LocationPicker";

// Loading bar configuration
// import LoadingBar from "react-top-loading-bar";

// import {
//   topLoadingBarSelector,
// } from "../../atoms/globalState";

// import {
//   topLoadingBarState,
// } from "../../atoms/globalState";

// import { useRecoilState } from "recoil";
// import { useRecoilValue } from "recoil";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function Header({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const { getSearchLocation } = useContext(AppContext);
  const [currentLocation, setCurrentLocation] = useState(false);

  const [location, setLocation] = useState({
    loaded: false,
    city: "",
  });
  const { userInfo, setUserInfo, setSearchLocation } = useContext(AppContext);


  const onSuccess = async (location) => {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    Geocode.setApiKey("AIzaSyAh6-hbxmUdNaznjA9c05kXi65Vw3xBl3w");

    Geocode.setLanguage("en");
    // Geocode.setRegion("es");
    // Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    // Get address from latitude & longitude.
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        let address = response?.plus_code?.compound_code;
        address = getCityFromResponse(address);
        setLocation({
          loaded: true,
          city: address,
        });
      },
      (error) => {
        console.error(error);
        setLocation({
          loaded: true,
          city: "India",
        });
      }
    );
  };

  const onError = (error) => {
    // alert(error.message);
    setLocation({
      loaded: true,
      city: "India",
    });
  };

  const handleNearme = async () => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  };

  // useEffect(() => {
  //   const initialState = localStorage.getItem("usedLocation");
  //   if (!initialState || initialState == null) {
  //     handleNearme();
  //   } else {
  //     setSearchLocation(initialState);
  //   }
  // }, []);

  useEffect(() => {
    if (location.loaded && location.city && location.city.length > 0) {
      if (Cookies.get("userUniqueId") !== undefined) {
        let searchID = 0;
        let searchLocId = userInfo?.address?.filter((items) => {
          return items.addressType === "SearchLocation";
        });
        if (searchLocId) {
          searchID = searchLocId[0]?.locationId;
        }
        let payLoad = {
          city: location.city,
          country: "India",
          state: "",
          locationId: searchID,
          userUniqueId: Cookies.get("userUniqueId"),
        };
        // Axios.updateAddress(payLoad).then((res) => {
        //   Axios.getUserProfile("91", Cookies.get("mobileNumber")).then((resp) => {
        //     setUserInfo(resp.dataObject);
        //   });
        // });
      }
      setSearchLocation(location.city);
      localStorage.setItem("usedLocation", location.city);
    }
  }, [location]);

  // const [progress, setProgress] = useState(100)
  // const [progress, setProgress] = useRecoilState(topLoadingBarState);
  // const progress_number = useRecoilValue(topLoadingBarSelector);

  return (
    <header>
      {/* <LoadingBar
        color="#00a483"
        shadow={true}
        waitingTime={1000}
        height={3}
        progress={progress_number}
        // onLoaderFinished={() => setProgress(0)}
      /> */}
      <div className=" container lg:w-10/12 w-full h-16 bg-m-white bg-no-repeat  flex justify-center items-center opacity-100 px-0 py-0 ">

        <Link href="/">
          <a className="h-9 md:w-[75px] px-32 pr-0 py-[14px] mr-4 lg:mr-8 block relative">
            <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"} alt="ORUphones" layout="fill" priority />
          </a>
        </Link>
        <div className="hidden sm:flex  justify-center mx-12 flex-1 text-sm">
          <SearchBar />

          {/* <div
            className="hover:cursor-pointer md:mx-4 hidden flex-shrink-0 md:flex justify-center items-center text-gray-600 "
            style={{ minWidth: 175, boxShadow: "0px 2px 3px #00000008" }}
            onClick={() => setOpenLocationPopup(true)}
          >
            <span className="h-full w-10 bg-gray-200 rounded-l inline-flex justify-center items-center">
              <BiCurrentLocation className="h-5 w-5" />
            </span>
            <div className="flex-1 flex h-full w-full items-center border border-l-0 rounded rounded-l-none pr-2 bg-white border-m-grey-5">
              <span className="flex-1 text-center px-4">
                {getSearchLocation}
              </span>
              <BiChevronDown className="h-5 w-5" />
            </div>
          </div> */}

        </div>

        <div className="hidden lg:flex  space-x-2 flex-shrink-0 text-sm">
          <SellNowBtn />
          <LoginOrProfile />

        </div>
        {/* Mobile Toggler */}
        <div className="-mr-1 sm:mr-2 px-4 flex lg:hidden w-16 justify-end ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-m-green inline-flex items-center justify-center h-full p-2 rounded-md text-m-white hover:bg-green-700 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? <OpenIcon /> : <CloseIcon />}
          </button>
        </div>
      </div>
      <DesktopMenu menuItems={menuItems} />
      <MobileMenu isOpen={isOpen} />
      <LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
      <LocationPicker />
    </header>
  );
}

export default Header;

const OpenIcon = () => (
  <svg
    className="block h-6 w-7"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="block h-6 w-7"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

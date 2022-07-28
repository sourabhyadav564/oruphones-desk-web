import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiCurrentLocation, BiChevronDown } from "react-icons/bi";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
// import home_logo from "../../assets/home_logo.svg";
import home_logo from "../../assets/logo_square.svg";
import LoginOrProfile from "./LoginOrProfile";
import LocationPopup from "../Popup/LocationPopup";
import AppContext from "@/context/ApplicationContext";
import SearchBar from "./SearchBar";
import SellNowBtn from "./SellNowBtn";
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

function Header({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const { getSearchLocation } = useContext(AppContext);

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
      <div className="container bg-m-white sm:bg-m-grey flex items-center h-16 ">
        <Link href="/">
          <a className="w-36 h-9 mr-4 lg:mr-8 block relative">
            <Image src={home_logo} alt="ORUphones" layout="fill" priority />
          </a>
        </Link>
        <div className="hidden sm:flex justify-center mx-auto flex-1 text-sm">
          <SearchBar />
          <div
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
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 text-sm">
          <LoginOrProfile />
          <SellNowBtn />
        </div>
        {/* Mobile Toggler */}
        <div className="-mr-1 sm:mr-2 flex lg:hidden w-16 justify-end ml-auto">
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

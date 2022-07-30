import React, { useState, useContext, useEffect } from "react";
import LoginPopup from "../Popup/LoginPopup";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import AppContext from "@/context/ApplicationContext";
import Notifications from "../Notifications";
import Cookies from "js-cookie";

function LoginOrProfile() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const { logout } = useContext(AuthContext);
  const { setUserInfo } = useContext(AppContext);

  const isUserAuthenticated = false;
  useEffect(() => {
    if (Cookies.get("userUniqueId") !== undefined) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
    return () => {};
  });

  return (
    <React.Fragment>
      {userAuthenticated ? (
        <div className="flex space-x-4 items-center h-full w-20">
          <Notifications />
          <div className="relative inline-block group">
            <FaRegUserCircle
              size={30}
              className="text-m-green cursor-pointer"
            />
            <div className="absolute z-50 hidden group-hover:block transform -translate-x-1/2 left-1/2 bg-transparent">
              <div className="flex flex-col items-center">
                <div className="w-10 overflow-hidden inline-block">
                  <div className="h-7 w-7 bg-white rotate-45 transform origin-bottom-left"></div>
                </div>
                <div className="-mt-1 grid grid-cols-1 w-64 rounded px-4 shadow-md pb-2 bg-white border-t-4 border-transparent">
                  <p className="text-center text-lg pt-4 pb-2 font-semibold text-m-grey-1">
                    My Account
                  </p>
                  <NavListItem text="My Profile" link="/user/profile" />
                  <NavListItem text="My Listings" link="/user/listings" />
                  <NavListItem text="My Favorites" link="/user/favorites" />
                  <NavListItem text="ORU Services" link="/user/services" />
                  {/* Add logout function */}
                  <NavListItem
                    text="Logout"
                    link="/"
                    onClick={() => {
                      logout();
                      setUserInfo();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <p
            className="cursor-pointer py-2 border border-m-green rounded px-7 text-m-green  uppercase hover:bg-m-green hover:text-m-white"
            onClick={() => setShowLogin(true)}
          >
            Login
          </p>
          <LoginPopup open={showLogin} setOpen={setShowLogin} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default LoginOrProfile;

const NavListItem = ({ text, link, onClick }) => (
  <Link href={link || "#"} passHref>
    <a
      className="px-4 py-2 my-1 hover:bg-gray-100 rounded text-black-60"
      onClick={onClick}
    >
      {text}
    </a>
  </Link>
);

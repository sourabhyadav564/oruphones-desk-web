import React, { useState, useContext, useEffect } from "react";
import LoginPopup from "../Popup/LoginPopup";
import RegUser from "@/assets/user2.svg";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import AppContext from "@/context/ApplicationContext";
import Notifications from "../Notifications";
import Cookies from "js-cookie";
import { getAllNotificationByUserd } from "api/axios";
import { useRouter } from "next/router";
import Image from "next/image";


function LoginOrProfileInMobileMenu() {
  const router = useRouter();
  const [showLogin, setShowLogin] = React.useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState();
  const [notifications, setNotifications] = useState();
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [performAction, setPerformAction] = useState(false);
  const { logout } = useContext(AuthContext);
  const { setUserInfo } = useContext(AppContext);
  const [ItemLink,setItemLink] = useState('');

  const isUserAuthenticated = false;
  useEffect(() => {
    if (Cookies.get("userUniqueId") !== undefined) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
    return () => { };
  });

  
  useEffect(() => {
    getAllNotificationByUserd(Cookies.get("userUniqueId")).then((response) => {
      setNotifications(response?.dataObject?.notifications);
     
      setUnreadNotificationsCount(
        response?.dataObject?.unReadCount
      );
    });
  }, []);

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(performAction == true && showLogin == false && ItemLink !== '' && Cookies.get('userUniqueId')!==undefined){
        setPerformAction(false);
        clearInterval(interval);
        router.push(ItemLink);
      }
    },1000) 
  },[showLogin]);

  return (
    <React.Fragment className="z-50">
      {userAuthenticated ? (
        <div className=" flex space-x-1 items-center h-full w-20 mt-1">
          {/* <Notifications /> */}
          {/* <span>
            {(
              <span className="absolute mr-16 text-smallFontSize font-Roboto-Semibold text-m-green rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </span> */}
          <div className="relative inline-block group">
            {/* <FaRegUserCircle
              size={30}
              className="cursor-pointer"
            /> */}
              <Image src={RegUser} width={30} height={30} alt=""/>
            <div className="absolute z-50 hidden group-hover:block transform -translate-x-1/2 left-1/2 bg-transparent">
              <div className="flex flex-col items-center">
                <div className="w-10 overflow-hidden inline-block">
                  <div className="h-7 w-7 bg-white rotate-45 transform origin-bottom-left"></div>
                </div>
                <div className="-mt-1 grid grid-cols-1 w-64 rounded px-4 shadow-md pb-2 bg-white border-t-4 border-transparent">
                  <p className="text-center text-regularFontSize pt-4 pb-2 font-Roboto-Semibold text-m-grey-1">
                    My Account
                  </p>
                  <NavListItem text="My Profile" link="/user/profile" />
                  <NavListItem text="My Listings" link="/user/listings" />
                  <NavListItem text="My Favorites" link="/user/favorites" />
                  <div className=" absolute  ml-24 mt-44  bg-red-600 text-right rounded items-center px-1 text-xs2FontSize   text-white">
              NEW
            </div>
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
           <div className="flex space-x-1 items-center h-full w-20 mt-1">
          {/* <Notifications /> */}
          {/* <span>
            {(
              <span className="absolute mr-16 text-smallFontSize font-Roboto-Semibold text-m-green rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </span> */}
          <div className="relative inline-block group ">
            {/* <FaRegUserCircle
              size={30}
              className="text-white cursor-pointer"
            /> */}
              <Image src={RegUser} width={30} height={30} alt="" />
            <div className="absolute z-50 hidden group-hover:block transform -translate-x-1/2 left-1/2 bg-transparent">
              <div className="flex flex-col items-center">
                <div className="w-10 overflow-hidden inline-block">
                  <div className="h-7 w-7 bg-white rotate-45 transform origin-bottom-left"></div>
                </div>
                <div className="-mt-1 grid grid-cols-1 w-64 rounded px-4 shadow-md pb-2 bg-white border-t-4 border-transparent">
                  <p className="text-center text-regularFontSize pt-4 pb-2 font-Roboto-Semibold text-m-grey-1">
                    My Account
                  </p>
                  <NavListItem text="My Profile" 
                  // link="/user/profile"
                    onClick={() => {
                      setShowLogin(true)
                      setPerformAction(true);
                      setItemLink('/user/profile')
                    }}/>
                  <NavListItem text="My Listings" 
                  // link="/user/listings"  
                  onClick={() => {
                      setShowLogin(true)
                      setPerformAction(true);
                      setItemLink('/user/listings')
                    }} />
                  <NavListItem text="My Favorites"
                  //  link="/user/favorites"
                     onClick={() => {
                      setShowLogin(true)
                      setPerformAction(true);
                      setItemLink('/user/favorites')
                    }}/>
                    <div className=" absolute  ml-24 mt-44  bg-red-600 text-right rounded items-center px-1 text-xs2FontSize   text-white">
              NEW
            </div>
                  <NavListItem text="ORU Services"
                  //  link="/user/services" 
                    onClick={() => {
                      setShowLogin(true)
                      setPerformAction(true);
                      setItemLink('/user/services');
                    }}/>
                  {/* Add logout function */}
                  <NavListItem
                    text="Login"
                    // link="/"
                    onClick={() => {
                      setShowLogin(true)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

          <LoginPopup open={showLogin} setOpen={setShowLogin} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default LoginOrProfileInMobileMenu;

const NavListItem = ({ text, link, onClick }) => (
  <Link href={link || "#"} passHref>
    <a
      className="px-4 py-2 my-1 font-Roboto-Regular hover:bg-gray-100 rounded text-black-60"
      onClick={onClick}
    >
      {text}
    </a>
  </Link>
);

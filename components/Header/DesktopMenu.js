import { useEffect, useState } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import * as Axios from "../../api/axios";
import LocationPopup from "../Popup/LocationPopup";
import Title from "../Title";
import { useContext } from "react";
import AppContext from "@/context/ApplicationContext";
import Location from "@/assets/location.svg";
import Cookies from "js-cookie";
import LoginPopup from "../Popup/LoginPopup";
import { useRouter } from "next/router";


const menus = [
  {
    name: "Popular Models",
    options: [],
    chlink: "/product/models",
  },
  {
    name: "Apple",
    options: [],
    make: "apple",
    chlink: "/product/buy-old-refurbished-used-mobiles/apple",
  },
  {
    name: "Samsung",
    options: [],
    make: "samsung",
    chlink: "/product/buy-old-refurbished-used-mobiles/samsung",
  },
  {
    name: "OnePlus",
    options: [],
    make: "oneplus",
    chlink: "/product/buy-old-refurbished-used-mobiles/oneplus",
  },
  { name: "Blog", href: "https://www.oruphones.com/blog" },
  {
    name: "Best Deals",
    options: [],
    chlink: "/product/buy-old-refurbished-used-mobiles/bestdealnearyou",
  },
  // {
  //   name: "Services",
  //   options: [],
  //   chlink: "/user/services",
  // },
  // {
  //   name: "Shop by Grade",
  //   options: [],
  // },

];

function DesktopMenu({ menuItems }) {
  const router = useRouter();
  let menusResponse = [];
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const { getSearchLocation } = useContext(AppContext);
  const [authenticated,setauthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
 const [ItemLink,setItemLink] =useState('');
 const [performAction, setPerformAction] = useState(false);

 useEffect(() => {
  if (Cookies.get("userUniqueId") !== undefined) {
    setauthenticated(true);
  } else {
    setauthenticated(false);
  }
  return () => { };
});

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(showLogin == false && ItemLink !== ''  && Cookies.get('userUniqueId')!==undefined){
        setPerformAction(false);
        clearInterval(interval);
        router.push(ItemLink);
      }
    },1000) 
  },[showLogin]);

  // const [toggle, setToggle] = useState(false)

  // useEffect(() => {
  //   Axios.getMenu().then(
  //       (data) => {
  //         menusResponse = data?.dataObject;
  //         menus.map((items) => {
  //           if (items.name === "Popular Models") {
  //             menusResponse.menu.popularModels.map((data) => {
  //               items.options = menusResponse.menu.popularModels.slice(0, 19);
  //             });
  //           }

  //           if (items.name === "IPhones") {
  //             menusResponse.menu.MakeWiseModels.map((data) => {
  //               if (data.make === "Apple") {
  //                 items.options = data.marketingName && data.marketingName.slice(0, 19);
  //               }
  //             });
  //           }

  //           if (items.name === "Samsung Phones") {
  //             menusResponse.menu.MakeWiseModels.map((data) => {
  //               if (data.make === "Samsung") {
  //                 items.options = (data?.marketingName && data.marketingName.slice(0, 19)) || [];
  //               }
  //             });
  //           }

  //           if (items.name === "OnePlus Phones") {
  //             menusResponse.menu.MakeWiseModels.map((data) => {
  //               if (data.make === "OnePlus") {
  //                 items.options = (data?.marketingName && data.marketingName.slice(0, 19)) || [];
  //               }
  //             });
  //           }

  //           if (items.name === "Shop by Brand") {
  //             menusResponse = menusResponse?.menu?.ShopByBrand.sort((list1, list2) => parseInt(list1.displayOrder) - parseInt(list2.displayOrder));
  //             items.options = menusResponse?.slice(0, 7);
  //           }

  //           if (items.name === "Shop by Grade") {
  //             menusResponse.menu.shopByGrade.map((data) => {
  //               items.options.push(data);
  //             });
  //           }
  //         });
  //       },
  //       (error) => {
  //         console.log("Error while fetching master/menu ", error);
  //       }
  //     );
  // }, []);

  

  return (
    <nav className="px-0 h-12 bg-m-green-1 bg-no-repeat items-center flex flex-row justify-between " data-aos="fade-down">
      <span
        className="text-white  lg:pl-52 pl-8  flex flex-row justify-start items-center space-x-1 hover:cursor-pointer hover:underline hover:opacity-70"
        onClick={() => setOpenLocationPopup(true)}>
        {/* <MdLocationOn className="mt-1.5 mr-1 text-[#fffffff]" /> */}
        <Image src={Location} width={14} height={15} alt=""/>
        <span
          className="text-white font-Roboto-Semibold items-center "
          location={`${getSearchLocation} ${getSearchLocation != "India" ? " ,India" : ""}`}
          color={"white"}
          fontsize={"mediumFontSize"}
        >{`${getSearchLocation} ${getSearchLocation != "India" ? " ,India" : ""}`}</span>
      </span>
      <span>
        <Popover.Group className=" container hidden lg:flex items-center pt-[7px] text-mediumFontSize font-Roboto-Light justify-end text-m-white pr-40">
          {menus.map((item, index) =>
            item && item.options ? (
              <Popover key={item.name}>
                {({ open, close }) => (
                  <>
                    <Popover.Button
                      className={`${open ? "" : "text-opacity-90"
                        }text-m-white px-4 opacity-100 hover:opacity-60  font-light `}
                    >
                      <Link key={index} href={{ pathname: item.chlink }}>
                        {/* <span> {item.name} </span> */}
                        <span> {item.name}   </span>
                      </Link>
                    </Popover.Button>
                    {/* <Transition
                    as={Fragment}
                    enter="transition ease-out duration-50"
                    enterFrom="opacity-50 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-50"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-50 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-50 w-full px-4 mt-3 transform -translate-x-1/2 left-1/2">
                      <div className="overflow-hidden rounded-b-md shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-4">
                          {item.options &&
                            item.options.map((item1) =>
                              item?.name.includes("Brand") ? (
                                <Link key={item1?.make} href={{ pathname: `/product/listings/${item1?.make?.toLowerCase()}`}}>
                                  <a
                                    className="flex justify-center group items-center p-2 -m-3 transition duration-150 ease-in-out rounded-sm focus:outline-none"
                                    onClick={() => close()}
                                  >
                                    <div className="ml-4 relative w-24 h-24">
                                      <Image src={item1?.imagePath} alt={item1?.make} layout="fill" />
                                    </div>
                                  </a>
                                </Link>
                              ) : item?.name.includes("Popular") ? (
                                <Link key={item1.marketingname} href={`/product/listings/${item1.make}/${item1.marketingname}`}>
                                  <a
                                    className="flex group items-center p-2 -m-3 transition duration-150 ease-in-out rounded-sm hover:bg-m-green group-hover:text-white focus:outline-none"
                                    onClick={() => close()}
                                  >
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900 group-hover:text-white">{item1.marketingname}</p>
                                    </div>
                                  </a>
                                </Link>
                              ):(
                                <Link key={item1} href={`/product/listings/${item.make}/${item1}`}>
                                <a
                                  className="flex group items-center p-2 -m-3 transition duration-150 ease-in-out rounded-sm hover:bg-m-green group-hover:text-white focus:outline-none"
                                  onClick={() => close()}
                                >
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-white">{item1}</p>
                                  </div>
                                </a>
                              </Link>
                              )
                            )}
                          {item?.name.includes("Brand") ? (
                            <div className="flex justify-center items-center">
                              {" "}
                              <Link href={item?.chlink}>
                                <a
                                  className="h-9 flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-sm  focus:outline-none"
                                  onClick={() => close()}
                                >
                                  <div className="mx-4">
                                    <p className="text-sm whitespace-nowrap underline cursor-pointer text-blue-600">View All {">>"}</p>
                                  </div>
                                </a>
                              </Link>{" "}
                            </div>
                          ) : (
                            <Link href={item?.chlink}>
                              <a
                                className=" flex group items-center p-2 -m-3 transition duration-150 ease-in-out rounded-sm focus:outline-none"
                                onClick={() => close()}
                              >
                                <div className="ml-4">
                                  <p className="text-sm whitespace-nowrap underline cursor-pointer text-blue-600">View All {">>"}</p>
                                </div>
                              </a>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition> */}
                  </>
                )}
              </Popover>
            ) : (
              <Link href={item.href} key={item.name} passHref >
                <a className="px-4 hover:opacity-60">{item.name}</a>
              </Link>
            )
          )}
          {
            authenticated ? (
              <div>
                 <div className="animate-pulse absolute  ml-14 -mt-2  bg-red-600 text-right rounded items-center px-1 text-xs2FontSize   text-white">
              NEW
            </div>
              <NavListItem text="Services" 
              link="/user/services"
              />
              
              </div>
          ):(
            <div>
              <div className="animate-pulse absolute  ml-14 -mt-2  bg-red-600 text-right rounded items-center px-1 text-xs2FontSize   text-white">
              NEW
            </div>
            
             <NavListItem text="Services" 
             // link="/user/profile"
               onClick={() => {
                 setShowLogin(true)
                 setPerformAction(true);
                 setItemLink('/user/services')
               }}/>
               </div>
            )
          }
         
        </Popover.Group>
      </span>
      <LoginPopup open={showLogin} setOpen={setShowLogin} />
      <LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
    </nav>
  );
}

export default DesktopMenu;

const NavListItem = ({ text, link, onClick }) => (
  <Link href={link || "#"} passHref>
    <a
      className="text-m-white px-4 opacity-100  hover:opacity-60 font-light px-2"
      onClick={onClick}
    >
      {text}
    </a>
  </Link>
);

import { useEffect } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import * as Axios from "../../api/axios";

const menus = [
  {
    name: "Popular Models",
    options: [],
    chlink: "/product/models",
  },
  {
    name: "IPhones",
    options: [],
    make: "apple",
    chlink: "/product/listings/apple",
  },
  {
    name: "Samsung Phones",
    options: [],
    make: "samsung",
    chlink: "/product/listings/samsung",
  },
  {
    name: "OnePlus Phones",
    options: [],
    make: "oneplus",
    chlink: "/product/listings/oneplus",
  },
  {
    name: "Shop by Brand",
    options: [],
    chlink: "/brands",
  },
  // {
  //   name: "Shop by Grade",
  //   options: [],
  // },
  { name: "Blog", href: "https://www.oruphones.com/blog" },
];

function DesktopMenu({ menuItems }) {
  let menusResponse = [];

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
    <nav className="bg-m-green ">
      <Popover.Group className="relative container hidden lg:flex items-center justify-between h-12 uppercase text-m-white">
        {menus.map((item, index) =>
          item && item.options ? (
            <Popover key={item.name}>
              {({ open, close }) => (
                <>
                  <Popover.Button
                    className={`${
                      open ? "" : "text-opacity-90"
                    }text-white uppercase`}
                  >
                    <Link key={index} href={{ pathname: item.chlink }}>
                      <span> {item.name} </span>
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
            <Link href={item.href} key={item.name} passHref>
              <a>{item.name}</a>
            </Link>
          )
        )}
      </Popover.Group>
    </nav>
  );
}

export default DesktopMenu;

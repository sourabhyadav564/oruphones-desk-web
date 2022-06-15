import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import Select from "../Form/Select";

import bgImage from "@/assets/location/bg.png";
import * as Axios from "../../api/axios";
import AppContext from "@/context/ApplicationContext";
import Cookies from "js-cookie";

function LocationPopup({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [citiesResponse, setCitiesResponse] = useState([]);
  const [searchLocationID, setSearchLocationID] = useState();
  const cityInfo = [];
  const selectedCity = useRef();

  const { userInfo, setCities, setUserInfo, setSearchLocation } = useContext(AppContext);

  const handleCityChange = (city) => {
    selectedCity.current = city;
    if (Cookies.get("userUniqueId") !== undefined) {
      cityInfo = citiesResponse.filter((item) => item.city === city);
      // console.log("cityInfo", cityInfo);
      let payLoad = {
        city: selectedCity.current,
        country: cityInfo[0].country,
        state: cityInfo[0].state,
        locationId: searchLocationID,
        userUniqueId: Cookies.get("userUniqueId"),
      };
      Axios.updateAddress(payLoad).then((res) => {
        console.log("updateAddress RES -> ", res);
        Axios.getUserProfile("91", Cookies.get("mobileNumber")).then((resp) => {
          setUserInfo(resp.dataObject);
        });
      });
    } else {
      setSearchLocation(selectedCity.current);
    }
    setOpen(false);
  };

  useEffect(() => {
    let searchID = searchLocationID;
    let searchLocId = userInfo?.address?.filter((items) => {
      return items.addressType === "SearchLocation";
    });
    if (searchLocId) {
      searchID = searchLocId[0]?.locationId;
    }
    console.log("setSearchLocationID ", searchID);
    setSearchLocationID(searchID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.address]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await Axios.getGlobalCities();
        setCitiesResponse(citiesResponse.dataObject);
        setCities(citiesResponse.dataObject);
      } catch (err) {
        console.error(err);
        setCities([]);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-center justify-center min-h-screen ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
              <div className="pt-3 px-6 flex flex-col items-start relative bg-gray-50" style={{ height: 235 }}>
                <div className="flex justify-between items-center absolute top-2 left-4 right-4 z-50">
                  <span className="text-black-20 text-lg capitalize"> Location </span>
                  <GrClose onClick={() => setOpen(false)} className="cursor-pointer" />
                </div>
                <Image src={bgImage} layout="fill" />
                <div className="mx-auto w-72 flex flex-col h-full justify-center items-center">
                  <div className="w-full">
                    <Select
                      onChange={(e) => {
                        setSelectedCity(e.value);
                      }}
                      options={
                        citiesResponse &&
                        citiesResponse
                          .filter((item) => item.displayWithImage === "0")
                          .map((items) => {
                            return { label: items.city, value: items.city };
                          })
                      }
                    ></Select>
                  </div>
                  <span className="my-5 block text-m-grey-1">or</span>
                  <p className="text-lg text-black-20"> Pick from below </p>
                </div>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="grid grid-cols-6 gap-2 text-center">
                  {citiesResponse &&
                    citiesResponse
                      .filter((item) => item.displayWithImage === "1")
                      // .slice(0, 9)
                      .map((items) => (
                        <div
                          className={`border rounded px-0 py-3 ${selectedCity.current === items.city && "border-m-green"}`}
                          key={items.city}
                          onClick={() => handleCityChange(items.city)}
                        >
                          <div className="relative w-14 h-14 mx-auto">
                            <Image src={items.imgpath} alt="hyderabad" layout="fill" />
                          </div>
                          <span className="block capitalize text-m-grey-1 mt-2 text-sm px-2 w-full">{items.city}</span>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default LocationPopup;

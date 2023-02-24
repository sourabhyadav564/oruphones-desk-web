import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import Select from "../Form/Select";

// import bgImage from "https://d1tl44nezj10jx.cloudfront.net/assets/bg_loc.png";
import * as Axios from "../../api/axios";
import AppContext from "@/context/ApplicationContext";
import Cookies from "js-cookie";
import Geocode from "react-geocode";
import { getCityFromResponse } from "@/utils/util";
import { BiCurrentLocation } from "react-icons/bi";

function LocationPopup({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [citiesResponse, setCitiesResponse] = useState([]);
  const [searchLocationID, setSearchLocationID] = useState();
  // const [selectedCity, setSelectedCity] = useState();
  let cityInfo = [];
  const selectedCity = useRef();
  const { userInfo, setCities, setUserInfo, setSearchLocation } =
    useContext(AppContext);

  const handleCityChange = (city) => {
    selectedCity.current = city;
    // if (Cookies.get("userUniqueId") !== undefined) {
    cityInfo = citiesResponse.filter((item) => item.city === city);
    let payLoad = {
      city: selectedCity.current,
      country: cityInfo[0].country,
      state: cityInfo[0].state,
      locationId: searchLocationID,
      userUniqueId: Cookies.get("userUniqueId"),
    };
    // Axios.updateAddress(payLoad).then((res) => {
    //   Axios.getUserProfile("91", Cookies.get("mobileNumber")).then((resp) => {
    //     // setUserInfo(resp?.dataObject);
    //     console.log("userProfile -> ", resp?.dataObject);
    //   });
    // });
    // } else {
    setSearchLocation(selectedCity.current);
    localStorage.setItem("usedLocation", selectedCity.current);
    // }
    setOpen(false);
  };

  const [currentLocation, setCurrentLocation] = useState(false);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const [location, setLocation] = useState({
    loaded: false,
    city: "",
  });

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
        setOpen(false);
      },
      (error) => {
        console.error(error);
        setLocation({
          loaded: true,
          city: "India",
        });
        setOpen(false);
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

  useEffect(() => {
    let searchID = searchLocationID;
    let searchLocId = userInfo?.userdetails?.address?.filter((items) => {
      return items.addressType === "SearchLocation";
    });
    if (searchLocId) {
      searchID = searchLocId[0]?.locationId;
    }
    setSearchLocationID(searchID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.userdetails?.address]);

  useEffect(() => {
    if (
      localStorage.getItem("cities") != undefined &&
      JSON.parse(localStorage.getItem("cities"))?.length > 0
    ) {
      setCitiesResponse(JSON.parse(localStorage.getItem("cities")));
      setCities(JSON.parse(localStorage.getItem("cities")));
    } else {
      const fetchData = async () => {
        try {
          const citiesResponse = await Axios.getGlobalCities();
          setCitiesResponse(citiesResponse?.dataObject);
          setCities(citiesResponse?.dataObject);
          localStorage.setItem(
            "cities",
            JSON.stringify(citiesResponse?.dataObject)
          );
        } catch (err) {
          console.error(err);
          setCities([]);
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[800px]">
              <div
                className="pt-3 px-6 flex flex-col items-start relative bg-gray-50"
                style={{ height: 235 }}
              >
                <div className="flex justify-between items-center absolute top-2 left-4 right-4 z-40">
                  <span className="text-black-20 text-xl2FontSize font-Roboto-Semibold capitalize">
                    {" "}
                    Location{" "}
                  </span>
                  <GrClose
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
                <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/bg_loc.png"} alt="location" layout="fill" />
                <div className="mx-auto w-72 flex flex-col h-full justify-center items-center">
                  <div className="flex flex-row w-72 justify-center items-center">
                    <div className="h-full z-50 w-16 bg-gray-200 rounded-l-lg inline-flex justify-center items-center hover:cursor-pointer"
                      onClick={ handleNearme}>
                      <BiCurrentLocation size={22} />
                    </div>
                    <div className="w-full">
                      <Select
                        onChange={(e) => {
                          handleCityChange(e.value);
                        }}
                        ref={selectedCity}
                        options={
                          citiesResponse &&
                          citiesResponse
                          ?.sort((a, b) => a.city.localeCompare(b.city))
                          ?.map((items, index) => {
                            return { label: items.city, value: items.city };
                          })
                        }
                      ></Select>
                    </div>
                  </div>
                  <span className="my-5 block text-m-grey-1 text-xlFontSize font-Roboto-Light">or</span>
                  <p className="text-lg text-black-20 text-xl2FontSize font-Roboto-Regular"> Pick from below </p>
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
                          className={`border hover:cursor-pointer rounded px-0 py-3 font-Roboto-Regular text-xl2FontSize ${selectedCity.current === items.city &&
                            "border-m-green"
                            }`}
                          key={items.city}
                          onClick={() => handleCityChange(items.city)}
                        >
                          <div className="relative w-14 h-14 mx-auto ">
                            <Image
                              src={items.imgpath}
                              alt="hyderabad"
                              layout="fill"
                              className="Object-contain"
                            />
                          </div>
                          <span className="block capitalize text-m-grey-1 mt-2 text-sm px-2 w-full">
                            {items.city}
                          </span>
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

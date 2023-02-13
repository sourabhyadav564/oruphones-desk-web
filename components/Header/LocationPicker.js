import { useState } from "react";
import Geocode from "react-geocode";
import { getCityFromResponse } from "@/utils/util";
import { useEffect } from "react";
import Cookies from "js-cookie";
import * as Axios from "../../api/axios";
import { useContext } from "react";
import AppContext from "@/context/ApplicationContext";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function LocationPicker() {
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


  
  useEffect(() => {
    const initialState = localStorage.getItem("usedLocation");
    if (!initialState || initialState == null) {
      handleNearme();
    } else {
      setSearchLocation(initialState);
    }
  }, []);

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


  return null;
}



export default LocationPicker;

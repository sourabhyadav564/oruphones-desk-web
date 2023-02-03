import Axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1";

let headers = {
  "Content-Type": "application/json",
  srcFrom: "Desktop Web",
  eventName: "NA",
  userUniqueId: Cookies.get("userUniqueId")
    ? Cookies.get("userUniqueId")
    : "Guest",
  sessionId:
    typeof window !== "undefined"
      ? localStorage.getItem("sessionId")
      : Cookies.get("sessionId") || "",
  devicePlatform: "Desktop Web",
  location:
    typeof window !== "undefined" ? localStorage.getItem("usedLocation") : "",
};

// const MULTIPART_HEADER = { headers: { "Content-Type": "multipart/form-data" } };

Axios.interceptors.request.use(
  async (request) => {
    
    return request;
  },
  (err) => {
   
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  async (response) => {
    
    if (response?.data?.status === "SESSION_INVALID") {
      headers = { ...headers, eventName: "NA" };
      const API_ENDPOINT = BASE_URL + "/api/auth/sessionid";
      const result = await Axios.get(API_ENDPOINT, { headers: { ...headers } });
      
      if (typeof window !== "undefined") {
        localStorage.setItem("sessionId", result?.data?.dataObject?.sessionId);
      }
      Cookies.set("sessionId", result?.data?.dataObject?.sessionId);
      window.location.reload();
      
    }
    return response;
  },
  async (error) => {
    
    return Promise.reject(error);
  }
);

export function getSessionId() {
  headers = { ...headers, eventName: "NA" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + "/api/auth/sessionid";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function getAboutUsContent() {
  const url = `${BASE_URL}/web/aboutus.html`;
  return await Axios.get(url);
}

export function getSearchResults(q) {
  headers = { ...headers, eventName: "SEARCH_TEXT_SUGGESTIONS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + "/cscglobal/search";
  return Axios.post(
    API_ENDPOINT,
    // { params: { userInputText: q } },
    { userInputText: q },
    DEFAULT_HEADER
  ).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchBrands() {
  headers = { ...headers, eventName: "GET_ALL_BRANDS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + "/master/brands";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchMenuItems() {
  const API_ENDPOINT = BASE_URL + "/master/menu";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function signUp(mobileNumber) {
  headers = { ...headers, eventName: "SIGNIN_REQUEST" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return Axios.post(
    BASE_URL +
    "/login/otp/generate?countryCode=91&mobileNumber=" +
    mobileNumber,
    {},
    DEFAULT_HEADER
  ).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function otpValidate(data) {
  headers = { ...headers, eventName: "VERIFY_OTP" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return Axios.post(
    BASE_URL +
    "/login/otp/validate?countryCode=91&mobileNumber=" +
    data.mobile.split("-")[1] +
    "&otp=" +
    data.otp,
    {},
    DEFAULT_HEADER
  ).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchShopByPrice() {
  headers = { ...headers, eventName: "GET_SHOP_BY_PRICE" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + "/global/shopbyprice";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchTopsellingmodels() {
  headers = { ...headers, eventName: `GET_TOP_SELLING_MODELS` };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + "/home/topselling/models";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchByMarketingName(
  location,
  marketingName,
  userUniqueId,
  pageNumber,
  sortBy
) {
  headers = {
    ...headers,
    eventName: `HOME_TOP_SELLING_MODEL_SELECTED ${marketingName}`,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    "/home/listbymarketingname?location=" +
    location +
    "&marketingName=" +
    marketingName +
    "&userUniqueId=" +
    userUniqueId +
    "&pageNumber=" +
    pageNumber + `&sortBy=` + sortBy;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchByMakeList(makeName) {
  headers = { ...headers, eventName: `BRAND_SELECTED ${makeName}` };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + "/home/listingsbymake?make=" + makeName;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function fetchMakeModelList(userUniqueId, sessionId) {
  headers = {
    ...headers,
    eventName: "GET_MAKE_MODEL_LIST",
    userUniqueId: userUniqueId,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + "/master/makemodellist";
  return await Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      localStorage.setItem("make_models", JSON.stringify(response.data.dataObject))
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getListingbyMake(location, makeName, userUniqueId, pageNumber, sortBy) {
  headers = { ...headers, eventName: `BRAND_SELECTED ${makeName}` };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/home/listingsbymake?listingLocation=` +
    location +
    `&make=` +
    makeName +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber + `&sortBy=` + sortBy;

  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getUserUniqueId(payload) {
  headers = { ...headers, eventName: "SIGNUP_REQUEST" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/login/user/create`;
  return Axios.post(API_ENDPOINT, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function addUserSearchLocation(payload) {
  headers = { ...headers, eventName: "LOCATION_CHANGED_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/login/address/addSearchLocation`;
  return Axios.post(API_ENDPOINT, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function addUserProfileLocation(payload) {
  headers = { ...headers, eventName: "PROFILE_LOCATION_ADDED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/login/address/addProfileLocation`;
  return Axios.post(API_ENDPOINT, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function uploadImage(
  deviceImage,
  panelName,
  storage,
  make,
  marketingName,
  userUniqueId
) {
  //const API_ENDPOINT = BASE_URL+`/device/uploadimage`;
  const API_ENDPOINT =
    BASE_URL +
    `/device/uploadimage?deviceFace=` +
    panelName +
    `&deviceStorage=` +
    storage +
    `&make=` +
    make +
    `&model=` +
    marketingName +
    `&userUniqueId=` +
    userUniqueId;
  var header = {
    ...headers,
    eventName: "ADDLISTING_UPLOAD_PHOTOS_SUCCESS",
    "Content-Type": "multipart/form-data",
  };
  const MULTIPART_HEADER = { headers: { ...header } };
  return Axios.post(API_ENDPOINT, deviceImage, MULTIPART_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function saveSellNowDeviceInfo(payLoad) {
  headers = { ...headers, eventName: "ADDLISTING_ADD_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/device/listing/save`;
  return Axios.post(API_ENDPOINT, JSON.stringify(payLoad), DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function saveUpdatedDeviceInfo(payLoad) {
  headers = { ...headers, eventName: "EDITLISTING_EDIT_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/device/listing/update`;
  return Axios.post(API_ENDPOINT, JSON.stringify(payLoad), DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchUserListings(userUniqueId, sessionId) {
  headers = {
    ...headers,
    eventName: "MYLISTINGS_VIEW_LISTING",
    userUniqueId: userUniqueId,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL + `/device/listings?userUniqueId=` + userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getRecommandedPrice(data) {
  headers = { ...headers, eventName: "FETCH_RECOMMENDED_PRICE", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/global/recomanded/price`;
  return Axios.post(API_ENDPOINT, JSON.stringify(data), DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getListedDeviceInfo(listingid, userUniqueId, sessionId) {
  headers = {
    ...headers,
    eventName: "FETCH_LISTING_DETAILS",
    userUniqueId: userUniqueId,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };

  const API_ENDPOINT =
    BASE_URL +
    `/device/listing/detail?listingid=` +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function deteleListedDevice(deletePayload) {
  headers = { ...headers, eventName: "MYLISTINGS_DELETE_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/device/listing/delete`;
  return Axios.post(
    API_ENDPOINT,
    JSON.stringify(deletePayload),
    DEFAULT_HEADER
  ).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function activeListedDevice(deletePayload) {
  headers = { ...headers, eventName: "MYLISTINGS_ACTIVATENOW_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/device/listing/activate`;
  return Axios.post(
    API_ENDPOINT,
    JSON.stringify(deletePayload),
    DEFAULT_HEADER
  ).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function pauseListingDevice(payload) {
  headers = { ...headers, eventName: "MYLISTINGS_PAUSE_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/device/listing/pause`;
  return Axios.post(API_ENDPOINT, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getGlobalCities() {
  headers = { ...headers, eventName: "FETCH_CITIES" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/global/cities`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getUserProfile(countryCode, mobileNumber) {
  headers = { ...headers, eventName: "FETCH_USER_DETAILS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/login/user/details?countryCode=` +
    countryCode +
    `&mobileNumber=` +
    mobileNumber;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function updateUserDetails(payload) {
  headers = { ...headers, eventName: "UPDATE_USER_DETAILS", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/login/user/update`;
  return Axios.post(API_ENDPOINT, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getShowSerchFilters() {
  headers = { ...headers, eventName: "FETCH_SEARCH_FILTERS",userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/master/showserchFilters`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function updateAddress(payload) {
  headers = { ...headers, eventName: "UPDATE_ADDRESS_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/login/address/update`;
  return Axios.post(API_ENDPOINT, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function detailWithUserInfo(
  isOtherVendor,
  listingid,
  userUniqueId,
  sessionId
) {
  const API_ENDPOINT =
    BASE_URL +
    `/device/listing/detailwithuserinfo?isOtherVendor=` +
    isOtherVendor +
    "&listingid=" +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  headers = {
    ...headers,
    eventName: "PRODUCT_DETAIL_WITH_SELLER_DETAIL",
    userUniqueId: userUniqueId,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return Axios.post(API_ENDPOINT, {}, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchSellerMobileNumber(listingid, userUniqueid) {
  headers = { ...headers, eventName: "GET_SELLER_CONTACT" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/device/listing/user/mobilenumber?listingId=` +
    listingid +
    `&userUniqueId=` +
    userUniqueid;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function bestDealNearByYou(location, userUniqueId, pageNumber) {
  headers = { ...headers, eventName: "GET_BEST_DEALS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/home/listings/best/nearme?location=` +
    location +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber + `&sortBy=`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function shopByPriceRange(
  endPrice,
  location,
  startPrice,
  listingid,
  pageNumber,
  sortBy
) {
  headers = { ...headers, eventName: "GET_BEST_DEALS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/home/shopbyprice/listmodel?end=` +
    endPrice +
    `&listingLocation=` +
    location +
    `&start=` +
    startPrice +
    `&userUniqueId=` +
    listingid +
    `&pageNumber=` +
    pageNumber + `&sortBy=` + sortBy;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function addFavotie(payload) {
  headers = { ...headers, eventName: "FAVORITE_ADD_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/favorite/add`;
  return Axios.post(API_ENDPOINT, payload, DEFAULT_HEADER).then(
    (response) => {
      // localStorage.setItem("favoriteList", JSON.stringify(response.data.updateList.fav_listings));
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function removeFavotie(listingId, userUniqueId) {
  headers = { ...headers, eventName: "FAVORITE_REMOVE_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/favorite/deactivate?listingId=` +
    listingId +
    `&userUniqueId=` +
    userUniqueId;
  return Axios.post(API_ENDPOINT, {}, DEFAULT_HEADER).then(
    (response) => {
      // localStorage.setItem("favoriteList", JSON.stringify(response.data.updateList.fav_listings));
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function bestDealNearYouAll(location, userUniqueId, pageNumber, sortBy) {
  headers = { ...headers, eventName: "HOME_BESTDEAL_VIEW_ALL" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/device/listings/best/nearall?userLocation=` +
    location +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber + `&sortBy=` + sortBy;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchMyFavorites(userUniqueId) {
  headers = { ...headers, eventName: "FETCH_FAVORITE_LIST", userUniqueId:0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL + `/favorite/fetch?userUniqueId=` + userUniqueId;
  return Axios.post(API_ENDPOINT, {}, DEFAULT_HEADER).then(
    (response) => {
      localStorage.setItem("favoriteList", response?.data?.dataObject?.map((item) => item?.listingId));
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchSimilarProducts(payLoad, userUniqueId, pageNumber) {
  headers = { ...headers, eventName: "FETCH_SIMILAR_PRODUCTS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/home/listings/search?userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber;
  return Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function sendverification(listingid, userUniqueId) {
  headers = { ...headers, eventName: "REQUEST_VERIFICATION" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/device/listing/sendverification?listingId=` +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function searchFilter(payLoad, userUniqueId, pageNumber, sortBy) {
  headers = { ...headers, eventName: "FETCH_SEARCH_LISTINGS", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/home/listings/search?userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber +
    `&sortBy=` +
    sortBy;
  return Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchWebLinkByShareId(shareId) {
  const API_ENDPOINT = BASE_URL + `/global/share/weblink?shareId=` + shareId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getTinyUrl() {
  headers = { ...headers, eventName: "GET_TINY_URL" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/global/tinyurl`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getExternalSellSourceData(payLoad) {
  headers = { ...headers, eventName: "GET_EXTERNAL_SELL_SOURCE", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/device/price/externalsellsource`;
  return Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function infoTemplates() {
  headers = { ...headers, eventName: "FETCH_INFO_LINKS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/global/getinfotemplates`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getMenu() {
  const API_ENDPOINT = BASE_URL + `/master/menu`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function uploadUserProfilePic(userProfilePicData, userUniqueId) {
  const API_ENDPOINT =
    BASE_URL +
    `/device/uploadimage?deviceFace=profilePic&userUniqueId=` +
    userUniqueId;
  var headers = {
    ...headers,
    eventName: "UPLOAD_PROFILE_PIC",
    "Content-Type": "multipart/form-data",
    userUniqueId: 0
  };
  const MULTIPART_HEADER = { headers: { ...headers } };
  return Axios.post(API_ENDPOINT, userProfilePicData, MULTIPART_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function prepareShareLink(listingId, userUniqueId) {
  headers = { ...headers, eventName: "PRODUCTINFO_SHARE_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL +
    `/global/share/link?listingId=` +
    listingId +
    `&userUniqueId=` +
    userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getAllNotificationByUserd(userUniqueId) {
  headers = { ...headers, eventName: "FETCH_NOTIFICATIONS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/notification/byUserId/` + userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function markAsRead(notificationId) {
  headers = { ...headers, eventName: "NOTIFICATION_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/notification/read/` + notificationId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function deleteNotification(notificationId, userUniqueId) {
  headers = { ...headers, eventName: "NOTIFICATION_REMOVED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    BASE_URL + `/notification/remove?id=` + notificationId + "&userUniqueId=" + userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function addsubscription(email) {
  headers = { ...headers, eventName: "ADD_SUBSCRIPTION" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/global/addsubscription?email=` + email;
  return Axios.post(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function contactUs(payLoad) {
  headers = { ...headers, eventName: "CONTACT_US" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/global/contactus`;
  return Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchTopArticles() {
  headers = { ...headers, eventName: "FETCH_TOP_ARTICLES" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + "/wordpress/blogs/info";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function shopByCategory(location, category, userUniqueId, pageNumber, sortBy) {
  const API_ENDPOINT =
    BASE_URL +
    `/home/listings/category?location=` +
    location +
    `&category=` +
    category +
    `&pageNumber=` +
    pageNumber +
    `&userUniqueId=` +
    userUniqueId + `&sortBy=` + sortBy;
  headers = { ...headers, eventName: "FETCH_TOP_ARTICLES" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function logEventInfo(eventName) {
  headers = { ...headers, eventName: eventName };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = BASE_URL + `/cscglobal/logeventinfo`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

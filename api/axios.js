import Axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1";
const DEFAULT_HEADER = { headers: { "Content-Type": "application/json" } };
const MULTIPART_HEADER = { headers: { "Content-Type": "multipart/form-data" } };

export async function getAboutUsConent() {
  const url = `${BASE_URL}/web/aboutus.html`;
  return await Axios.get(url);
}

export function getSearchResults(q) {
  const API_ENDPOINT = BASE_URL + "/cscglobal/search";
  return Axios.post(
    API_ENDPOINT,
    // { params: { userInputText: q } },
    {userInputText: q},
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
  console.log("API_ENDPOINT --> ", API_ENDPOINT);
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
  return Axios.post(
    BASE_URL + "/login/otp/generate?countryCode=91&mobileNumber=" + mobileNumber
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
  return Axios.post(
    BASE_URL +
      "/login/otp/validate?countryCode=91&mobileNumber=" +
      data.mobile.split("-")[1] +
      "&otp=" +
      data.otp
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

export function fetchByMarketingName(location, marketingName, userUniqueId) {
  const API_ENDPOINT =
    BASE_URL +
    "/home/listbymarketingname?location=" +
    location +
    "&marketingName=" +
    marketingName +
    "&userUniqueId=" +
    userUniqueId;
  console.log("fetchByMarketingName URL ", API_ENDPOINT);
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

export function fetchMakeModelList() {
  const API_ENDPOINT = BASE_URL + "/master/makemodellist";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function getListingbyMake(location, makeName, userUniqueId) {
  const API_ENDPOINT =
    BASE_URL +
    `/home/listingsbymake?listingLocation=` +
    location +
    `&make=` +
    makeName +
    `&userUniqueId=` +
    userUniqueId;
  console.log("getListingbyMake URL ", API_ENDPOINT);
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

export function fetchUserListings(userUniqueId) {
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

export function getListedDeviceInfo(listingid, userUniqueId) {
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

export function detailWithUserInfo(isOtherVendor, listingid, userUniqueId) {
  const API_ENDPOINT =
    BASE_URL +
    `/device/listing/detailwithuserinfo?isOtherVendor=` +
    isOtherVendor +
    "&listingid=" +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  return Axios.post(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchSellerMobileNumber(listingid, userUniqueid) {
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

export function bestDealNearByYou(location, userUniqueId) {
  console.log(
    "bestDealNearByYou --> ",
    BASE_URL +
      `/home/listings/best/nearme?location=` +
      location +
      `&userUniqueId=` +
      userUniqueId
  );
  const API_ENDPOINT =
    BASE_URL +
    `/home/listings/best/nearme?location=` +
    location +
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

export function shopByPriceRange(endPrice, location, startPrice, listingid) {
  const API_ENDPOINT =
    BASE_URL +
    `/home/shopbyprice/listmodel?end=` +
    endPrice +
    `&listingLocation=` +
    location +
    `&start=` +
    startPrice +
    `&userUniqueId=` +
    listingid;
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
  const API_ENDPOINT = BASE_URL + `/favorite/add`;
  return Axios.post(API_ENDPOINT, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function removeFavotie(listingId, userUniqueId) {
  const API_ENDPOINT =
    BASE_URL +
    `/favorite/deactivate?listingId=` +
    listingId +
    `&userUniqueId=` +
    userUniqueId;
  return Axios.post(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function bestDealNearYouAll(location, userUniqueId) {
  const API_ENDPOINT =
    BASE_URL +
    `/device/listings/best/nearall?userLocation=` +
    location +
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

export function fetchMyFavorites(userUniqueId) {
  const API_ENDPOINT =
    BASE_URL + `/favorite/fetch?userUniqueId=` + userUniqueId;
  return Axios.post(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchSimilarProducts(payLoad, userUniqueId) {
  const API_ENDPOINT =
    BASE_URL + `/home/listings/search?userUniqueId=` + userUniqueId;
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

export function searchFilter(payLoad, userUniqueId) {
  const API_ENDPOINT =
    BASE_URL + `/home/listings/search?userUniqueId=` + userUniqueId;
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
  const API_ENDPOINT = BASE_URL + `/global/tinyurl`;
  console.log("getTinyUrl ", API_ENDPOINT);
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

export function addsubscription(email) {
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

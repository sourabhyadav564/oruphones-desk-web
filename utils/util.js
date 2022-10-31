import moment from "moment";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  // return x;
}

export const ENV = {
  PRODUCTION: {
    KEY: 'production',
    URL: 'https://api.oruphones.com',
  },
  DEVELOPMENT: {
    KEY: 'development',
    URL: 'https://api.oruphones.com',
  },
  LOCAL: {
    KEY: 'local',
    URL: 'https://new-test-application-001.herokuapp.com',
  },
  MENULISTSECRETKEY: 'DSJDGJLGFJLGADUEJMBNBDSHULFBFNBHJGXY',
};

export function numberFromString(x) {
  return x?.replace(/[^0-9]/g, "");
}

export const stringToDate = (dateString) => {
  let new_data_string = moment(dateString).format('L');
  const [day, month, year] = new_data_string?.split("/");
  return new Date([month, day, year].join("/"));
};

export const getCityFromResponse = (resString) => {
  try {
    let address = resString.substring(resString.indexOf(" ") + 1);
    address = address.split(",");
    address = address[0];
    if (address.length > 0) {
      return address;
    }
  } catch (e) {
    return "India";
  }
};

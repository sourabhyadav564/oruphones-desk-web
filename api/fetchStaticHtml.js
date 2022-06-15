import Axios from "axios";

function fetchStaticHTML(url) {
  return Axios.get(url).then(
    (response) => {
      return response;
    },
    (error) => {
      console.error(error);
    }
  );
}

export default fetchStaticHTML;

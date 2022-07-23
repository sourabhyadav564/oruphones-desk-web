import Cookies from "js-cookie";
import React, {useState} from "react";
import * as Axios from "../api/axios";
import LoginPopup from "./Popup/LoginPopup";

function AddFav({ data, setProducts, ...rest }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  function handleFavoties() {
    setProducts((prevState) => {
      let tempVal;
      if (Array.isArray(prevState)) {
        let index = prevState.findIndex((i) => i.listingId === data.listingId);
        tempVal = [...prevState];
        tempVal[index] = { ...tempVal[index], favourite: !data.favourite };
      } else {
        tempVal = { ...prevState, favourite: !data.favourite };
      }
      return tempVal;
    });
    let payLoad = {
      listingId: data.listingId,
      userUniqueId: Cookies.get("userUniqueId") || "Guest",
    };
    const addFavorite = async () => {
      const addFav = await Axios.addFavotie(payLoad);
    };
    const removeFavorite = async () => {
      const removeFav = await Axios.removeFavotie(data.listingId, Cookies.get("userUniqueId") || "Guest");
    };
    if (data.favourite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  }

  if (Cookies.get("userUniqueId") === undefined) {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          onClick={(e) => {
            e.preventDefault();
            setShowLoginPopup(true);
          }}
          {...rest}
          className="hover:cursor-pointer"
        >
          <path
            id="hearts"
            d="M8.024,16a1.135,1.135,0,0,0-.274-.672,4.437,4.437,0,0,0-.734-.734q-.461-.375-1.062-.812T4.688,12.8q-.664-.539-1.328-1.164a11.035,11.035,0,0,1-1.266-1.43,11.907,11.907,0,0,1-1.062-1.7A9.065,9.065,0,0,1,.3,6.445,10.626,10.626,0,0,1,.024,4,3.854,3.854,0,0,1,1.2,1.172,3.854,3.854,0,0,1,4.024,0,3.854,3.854,0,0,1,6.852,1.172,3.854,3.854,0,0,1,8.024,4,3.854,3.854,0,0,1,9.2,1.172,3.854,3.854,0,0,1,12.024,0a3.854,3.854,0,0,1,2.828,1.172A3.854,3.854,0,0,1,16.024,4a10.659,10.659,0,0,1-.274,2.445,9.037,9.037,0,0,1-.734,2.062,11.96,11.96,0,0,1-1.062,1.7,10.991,10.991,0,0,1-1.266,1.43q-.664.625-1.328,1.164t-1.266.977q-.6.437-1.062.812a4.46,4.46,0,0,0-.734.734A1.131,1.131,0,0,0,8.023,16Z"
            transform="translate(-0.024)"
            fill={"#C7C7C7"}
          />
        </svg>

        <LoginPopup open={showLoginPopup} setOpen={setShowLoginPopup} />
      </div>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      onClick={(e) => {
        e.preventDefault();
        handleFavoties(data);
      }}
      {...rest}
      className="hover:cursor-pointer"
    >
      <path
        id="hearts"
        d="M8.024,16a1.135,1.135,0,0,0-.274-.672,4.437,4.437,0,0,0-.734-.734q-.461-.375-1.062-.812T4.688,12.8q-.664-.539-1.328-1.164a11.035,11.035,0,0,1-1.266-1.43,11.907,11.907,0,0,1-1.062-1.7A9.065,9.065,0,0,1,.3,6.445,10.626,10.626,0,0,1,.024,4,3.854,3.854,0,0,1,1.2,1.172,3.854,3.854,0,0,1,4.024,0,3.854,3.854,0,0,1,6.852,1.172,3.854,3.854,0,0,1,8.024,4,3.854,3.854,0,0,1,9.2,1.172,3.854,3.854,0,0,1,12.024,0a3.854,3.854,0,0,1,2.828,1.172A3.854,3.854,0,0,1,16.024,4a10.659,10.659,0,0,1-.274,2.445,9.037,9.037,0,0,1-.734,2.062,11.96,11.96,0,0,1-1.062,1.7,10.991,10.991,0,0,1-1.266,1.43q-.664.625-1.328,1.164t-1.266.977q-.6.437-1.062.812a4.46,4.46,0,0,0-.734.734A1.131,1.131,0,0,0,8.023,16Z"
        transform="translate(-0.024)"
        fill={data.favourite ? "#FF0000" : "#C7C7C7"}
      />
    </svg>
  );
}

export default AddFav;

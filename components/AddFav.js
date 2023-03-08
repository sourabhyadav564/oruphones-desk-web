import Cookies from "js-cookie";
import React, { useState } from "react";
import { useEffect } from "react";


import OutlineHeartBlack from "@/assets/heart_black.svg";
import OutlineHeart from "@/assets/heartoutline.svg";
import FillHeart from "@/assets/heartfill.svg";
import { toast } from "react-toastify";
import * as Axios from "../api/axios";
import LoginPopup from "./Popup/LoginPopup";
import Image from "next/image";

function AddFav({ data, setProducts, ...rest }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [performAction, setPerformAction] = useState(false);
  
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
      let favList = localStorage.getItem("favoriteList");
      if (favList) {
        favList = favList.split(",");
        favList.push(data.listingId);
        localStorage.setItem("favoriteList", favList);
      } else {
        localStorage.setItem("favoriteList", data.listingId);
      }
      const addFav = await Axios.addFavotie(payLoad);
    };
    const removeFavorite = async () => {
      let favList = localStorage.getItem("favoriteList");
      if (favList) {
        favList = favList.split(",");
        favList = favList.filter((item) => item !== data.listingId);
        localStorage.setItem("favoriteList", favList);
      }
      const removeFav = await Axios.removeFavotie(data.listingId, Cookies.get("userUniqueId") || "Guest");
    };
  
    if (data.favourite) {
      data?.status == "Active" ? removeFavorite() : toast.warning("This device is sold out");
    } else {
      data?.status == "Active" ? addFavorite() : toast.warning("This device is sold out");
    }
  }


  useEffect(() => {
    // let payLoad = {
    //   listingId: data.listingId,
    //   userUniqueId: Cookies.get("userUniqueId") || "Guest",
    // };
    // const addFavorite = async () => {
    //   let favList = localStorage.getItem("favoriteList");
    //   if (favList) {
    //     favList = favList.split(",");
    //     favList.push(data.listingId);
    //     localStorage.setItem("favoriteList", favList);
    //   } else {
    //     localStorage.setItem("favoriteList", data.listingId);
    //   }
    //   const addFav = await Axios.addFavotie(payLoad);
    // };
    if(showLoginPopup==false && performAction==true && Cookies.get("userUniqueId") !== undefined){
      // data?.status == "Active" ? addFavorite() : toast.warning("This device is sold out");
      handleFavoties();
    }
  },[showLoginPopup])

  if (Cookies.get("userUniqueId") === undefined) {
    return (
      <div>
        {/* <svg
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
        </svg> */}
        {/* <AiOutlineHeart
          className="hover:cursor-pointer"
          size='18px'
          fill={"#000000"}
          onClick={
            (e) => {
              e.preventDefault();
              setPerformAction(true);
              setShowLoginPopup(true);
            }
          }
        /> */}
        <Image src={OutlineHeartBlack} width={20} height={20} 
        onClick={
            (e) => {
              e.preventDefault();
              setPerformAction(true);
              setShowLoginPopup(true);
            }
          }
           className="hover:scale-110 "/>

        <LoginPopup open={showLoginPopup} setOpen={setShowLoginPopup} />
      </div>
    );
  }

  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="16"
    //   height="16"
    //   viewBox="0 0 16 16"
    //   onClick={(e) => {
    //     e.preventDefault();
    //     handleFavoties(data);
    //   }}
    //   {...rest}
    //   className="hover:cursor-pointer"
    // >
    //   <path
    //     id="hearts"
    //     d="M8.024,16a1.135,1.135,0,0,0-.274-.672,4.437,4.437,0,0,0-.734-.734q-.461-.375-1.062-.812T4.688,12.8q-.664-.539-1.328-1.164a11.035,11.035,0,0,1-1.266-1.43,11.907,11.907,0,0,1-1.062-1.7A9.065,9.065,0,0,1,.3,6.445,10.626,10.626,0,0,1,.024,4,3.854,3.854,0,0,1,1.2,1.172,3.854,3.854,0,0,1,4.024,0,3.854,3.854,0,0,1,6.852,1.172,3.854,3.854,0,0,1,8.024,4,3.854,3.854,0,0,1,9.2,1.172,3.854,3.854,0,0,1,12.024,0a3.854,3.854,0,0,1,2.828,1.172A3.854,3.854,0,0,1,16.024,4a10.659,10.659,0,0,1-.274,2.445,9.037,9.037,0,0,1-.734,2.062,11.96,11.96,0,0,1-1.062,1.7,10.991,10.991,0,0,1-1.266,1.43q-.664.625-1.328,1.164t-1.266.977q-.6.437-1.062.812a4.46,4.46,0,0,0-.734.734A1.131,1.131,0,0,0,8.023,16Z"
    //     transform="translate(-0.024)"
    //     fill={data.favourite ? "#FF0000" : "#C7C7C7"}
    //   />
    // </svg>
    Cookies.get("userUniqueId") != undefined && Cookies.get("userUniqueId") != "" && Cookies.get("userUniqueId") != "Guest" && localStorage.getItem("favoriteList") != null && localStorage.getItem("favoriteList").includes(data?.listingId) ?
      (
      // <AiFillHeart
      //   className="hover:cursor-pointer"
      //   color="#FF0000"
      //   size='18px'
      //   onClick={
      //     (e) => {
      //       e.preventDefault();
      //       // !listings.includes(data.listingId) ? 
      //       handleFavoties(data);
      //       //  : toast.error("You can't add your own listing to your favorites");
      //     }
      //   }
      // />
      <Image src={FillHeart} width={24} height={24} 
        onClick={
          (e) => {
            e.preventDefault();
            // !listings.includes(data.listingId) ? 
            handleFavoties(data);
            className="hover:scale-110"
            //  : toast.error("You can't add your own listing to your favorites");
          }
        }
        />    
      
      )
      :
      // OutlineHeart
      (
      // <AiOutlineHeart
      //   className="hover:cursor-pointer"
      //   color="#FF0000"
      //   size='18px'
      //   onClick={
      //     (e) => {
      //       e.preventDefault();
      //       // !listings.includes(data.listingId) ? 
      //       handleFavoties(data);
      //       //  : toast.error("You can't add your own listing to your favorites");
      //     }
      //   }
      // />
      <Image src={OutlineHeart} width={24} height={24} 
      onClick={
        (e) => {
          e.preventDefault();
          // !listings.includes(data.listingId) ? 
          handleFavoties(data);
          className="hover:scale-110 "
          //  : toast.error("You can't add your own listing to your favorites");
        }
      }
      />
      )
  );
}

export default AddFav;

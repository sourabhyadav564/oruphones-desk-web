import Modal2 from "./Model2";
import { useState, useEffect } from "react";
import * as Axios from "../../api/axios";
import Loader from "../Loader/Loader";
import Cookies from "js-cookie";

// import { BsCheck2Circle } from "react-icons/bs";
// import { FiAlertOctagon } from "react-icons/fi";
import Alert from "@/assets/alert.svg";
import gcheck from "@/assets/gcheck.svg";
import Image from "next/image";

function RequestVerificationSuccessPopup({ open, setOpen, data }) {
    const [resData, setResData] = useState(data);
    const [listingid, setListingid] = useState(data?.listingId);
    const [statuscode, setStatuscode] = useState(data?.statusCode);

    // useEffect(() => {
    //   const requestVerificarion = async () => {
    //     await Axios.sendverification(
    //       data?.listingId,
    //       Cookies.get("userUniqueId")
    //     ).then((response) => {
    //       console.log("sendverification ", response);
    //     });
    //   };
    //   if (open && (data != undefined || data != null)) {
    //     requestVerificarion();
    //   } else if (open && (data === undefined || data === null)) {
    //     setOpen(true);
    //   }
    // }, [open]);

    useEffect(() => {
        setListingid(data?.listingId);
        setStatuscode(data?.statusCode);
      
        // if (open) {
        // Axios.sendverification(listingid,Cookies.get("userUniqueId") || "Guest").then(
        //   (response) => {

        //     // setResData(response?.statusCode);
        //    
        //     setStatuscode(response?.statusCode);
        //   }
        // );
        // }
    }, [data]);



    return (
        <Modal2 open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center max-w-lg py-4 px-6 text-base text-black-4e">
              
                {statuscode ? (
                    <>
                        {statuscode === 200 ? (
                            // <BsCheck2Circle size={42} color="#00A483" />
                            <Image src={gcheck} width={32} height={32}/>
                        ) : (
                            // <FiAlertOctagon size={44} color="#f7e17d" />
                            <Image src={Alert} width={40} height={40} alt=""/> 
                        )}
                        <p className="font-Roboto-Bold my-2 text-lg">
                            {statuscode === 200
                                ? "Request Sent"
                                : "Request Already Sent"}
                        </p>
                        <p className="text-md my-2 text-center font-Roboto-Regular">
                            {statuscode === 200
                                ? "You will receive a notification once Seller completes verification."
                                : "You have already sent verification request for this listing."}
                            <br />{" "}
                            {statuscode === 200
                                ? "This listing will also be added to My Favorites"
                                : "You will receive a notification once Seller completes verification. A new verification request can only be sent after 7 days of the previous request."}
                        </p>
                    </>
                ) : (
                    <div className="font-Roboto-Regular">
                        <Loader />
                        <p className="text-mx">Your verification request will be sent soon...</p>
                    </div>
                )}
                <div className="mb-2 mt-4 font-Roboto-Regular">
                    <button
                        className="bg-m-green w-32 px-4 py-2 rounded text-white"
                        onClick={(e) => {
                            setOpen(false);
                        }}
                    >
                        {" "}
                        OK{" "}
                    </button>
                </div>
            </div>
        </Modal2>
    );
}

export default RequestVerificationSuccessPopup;
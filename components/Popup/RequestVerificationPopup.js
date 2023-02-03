import Cookies from "js-cookie";
import Modal2 from "./Model2";
import { FiAlertOctagon } from "react-icons/fi";
import * as Axios from "../../api/axios";
import RequestVerificationSuccessPopup from "./RequestVerificationSuccessPopup";
import { useState } from "react";
// import RequestVerificationSuccessPopup from "./RequestVerificationSuccessPopup";
function RequestVerificationPopup({
    open,
    setOpen,
    data,
    setShowNumber,
    openRequestVerificationSuccessPopup,
    setRequestVerificationSuccessPopup,
}) {
    // const [openRequestVerificationSuccessPopup, setRequestVerificationSuccessPopup] = useState(false);
    const [resData, setResData] = useState([]);
    const [listingid, setListingid] = useState(data?.listingId);
    const requestVerification = async () => {
        setOpen(false);
        setListingid(data?.listingId);
        await Axios.sendverification(
            listingid,
            Cookies.get("userUniqueId") || "Guest"
        ).then((response) => {
            setResData(response);
         
            // if (response.status == "SUCCESS") {
            setOpen(false);
            setRequestVerificationSuccessPopup(true);
            // }
        });
    };
   

    return (
        <Modal2 open={open} setOpen={setOpen} title={"This device is unverified"}>
            <div className="flex flex-col items-center max-w-2xl px-6 text-base text-black-4e py-4  ">

                <FiAlertOctagon size={44} color="#f7e17d" />
                <p className="font-Roboto-Bold text-xl mt-1">Alert</p>
                <div className="text-md my-2 text-center font-Roboto-Regular">
                    <p>
                        This device is unverified. Press Request Verification button to ask the seller to perform verification. You will receive a notification
                        once Seller completes verification. This listing will also be added to My Favorites. Press Continue to proceed without verification
                    </p>
                </div>
                <div className="mb-2 mt-4  flex items-center ">
                    <button className="border  bg-m-green  px-4 py-2 rounded text-white uppercase font-Roboto-Medium"
                        // onClick={() => requestVerification()}
                        onClick={() => {
                           
                            // Cookies.get("userUniqueId") === undefined
                            //   ? () => {
                            //       setPerformAction2(true);
                            //       setShowLoginPopup(true);
                            //     }
                            //   : setRequestVerificationSuccessPopup(true);
                            if (Cookies.get("userUniqueId") === undefined) {
                                setPerformAction2(true);
                                setShowLoginPopup(true);
                            } else {
                                // setOpen(false);
                                requestVerification();
                            }
                        }}
                    >
                        Request Verification
                    </button>
                    <button
                        className=" px-4 py-2 border-0  rounded text-primary  font-Roboto-Medium"
                        onClick={() => {
                            setShowNumber(true);
                            setOpen(false);
                        }}
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
            <RequestVerificationSuccessPopup open={openRequestVerificationSuccessPopup} data={resData} setOpen={setRequestVerificationSuccessPopup} />
        </Modal2>
    );
}
export default RequestVerificationPopup;

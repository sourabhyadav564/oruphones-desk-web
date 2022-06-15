import Modal from ".";
import { useEffect } from "react";
import * as Axios from "../../api/axios";
import Cookies from "js-cookie";

function RequestVerificationSuccessPopup({ open, setOpen, data }) {
  useEffect(() => {
    // console.log("RequestVerificationSuccessPopup ", open, " ",);
    const requestVerificarion = async () => {
      await Axios.sendverification(
        data?.listingId,
        Cookies.get("userUniqueId")
      ).then((response) => {
        console.log("sendverification ", response);
      });
    };
    if (open && (data != undefined || data != null)) {
      requestVerificarion();
    } else if (open && (data === undefined || data === null)) {
      setOpen(true);
    }
  }, [open]);

  return (
    <Modal open={open} setOpen={setOpen} title={"Request Sent"}>
      <div className="flex flex-col space-y-3 text-base text-m-grey-1">
        <div className="my-6 px-20 flex flex-col space-y-10">
          <h1 className="mb-2">
            You will receive a notification once Seller completes verification.
            <br /> This listing will also be added to My Favorites
          </h1>
        </div>
        <div className="flex space-x-8 justify-end text-white items-center">
          <span
            className="font-semibold px-4 py-2 bg-m-green rounded uppercase cursor-pointer"
            onClick={() => setOpen(false)}
          >
            OK
          </span>
        </div>
      </div>
    </Modal>
  );
}

export default RequestVerificationSuccessPopup;

import Modal from ".";
import Select from "../Form/Select";
import { useEffect, useState } from "react";
import * as Axios from "../../api/axios";
import router, { useRouter } from "next/router";
import Cookies from "js-cookie";

function ActivatePauseListingPopup({ open, setOpen, data }) {
  const [callPause, setCallPause] = useState(null);

  const optionsList = [
    { value: "Sold my mobile", label: "Sold my mobile" },
    // { value: 'Reason - 1', label: 'Reason - 1' },
    // { value: 'Reason - 2', label: 'Reason - 2' },
  ];

  useEffect(() => {
    if (callPause === "true") {
      let payLoad = {
        listingId: data,
        userUniqueId: Cookies.get("userUniqueId"),
      };

      const fetchData = async () => {
        const pauseListingDevice = await Axios.pauseListingDevice(payLoad);
        if (pauseListingDevice.status === "SUCCESS") {
          //router.push('/user/listings');
          router.reload();
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callPause]);

  return (
    <Modal open={open} setOpen={setOpen} title={"Pause"}>
      <div className="flex flex-col space-y-3 text-base text-m-grey-1">
        <div className="my-6 px-20 flex flex-col space-y-10 items-center">
          <h1 className="mb-2">Are you sure you want to pause the listing?</h1>
        </div>
        <div className="flex space-x-8 justify-end text-white items-center">
          <span
            className="font-semibold text-m-green rounded uppercase cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </span>
          <span
            className="font-semibold px-4 py-2 bg-m-green rounded uppercase cursor-pointer"
            onClick={() => setCallPause("true")}
          >
            {" "}
            Submit{" "}
          </span>
        </div>
      </div>
    </Modal>
  );
}

export default ActivatePauseListingPopup;

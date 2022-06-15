import Modal from ".";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";

function ActivateListingPopup({ open, setOpen, data }) {

  const [activateListing, setActivateListing] = useState(null);

  useEffect(() => {
    if(activateListing !== null){
      router.reload('/user/listings');
      setActivateListing(false);
    }
  }, [activateListing])


 
  return (
    <Modal open={open} setOpen={setOpen} title={data?.isActive ? "Pause" : "Activate"}>
      <div className="flex flex-col space-y-3 text-base text-m-grey-1">
        <div className="my-6 px-20 flex flex-col space-y-10">
          <h1 className=" font-bold mb-2">Your listing is now activated</h1>
        </div>
        <div className="flex space-x-8 justify-end text-white items-center">
          
          <span className="font-semibold px-4 py-2 bg-m-green rounded uppercase cursor-pointer" onClick={() => setActivateListing("true")}> OK </span>
        </div>
      </div>
    </Modal>
  );
}

export default ActivateListingPopup;

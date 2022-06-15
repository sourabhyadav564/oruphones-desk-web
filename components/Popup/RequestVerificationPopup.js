import Cookies from "js-cookie";
import Modal from ".";
import * as Axios from "../../api/axios";
// import RequestVerificationSuccessPopup from "./RequestVerificationSuccessPopup";

function RequestVerificationPopup({
  open,
  setOpen,
  data,
  setShowNumber,
  setRequestVerificationSuccessPopup,
}) {
  // const [openRequestVerificationSuccessPopup, setRequestVerificationSuccessPopup] = useState(false);

  const requestVerificarion = async () => {
    await Axios.sendverification(
      data?.listingId,
      Cookies.get("userUniqueId")
    ).then((response) => {
      if (response.status === "SUCCESS") {
        setOpen(false);
        setRequestVerificationSuccessPopup(true);
      }
    });
  };

  return (
    <Modal open={open} setOpen={setOpen} title={"This device is unverified"}>
      <div className="flex flex-col space-y-3 text-base text-m-grey-1 max-w-lg">
        <div className="my-6 px-6 flex flex-col space-y-10 text-center">
          <h1 className="mb-2">
            <p>
              Press Request Verification button to ask the seller to perform
              verification.
            </p>
            <p>
              You will receive a notification once Seller completes
              verification.
            </p>
            <p>
              This listing will also be added to My Favorites. Press Continue to
              proceed without verification​
            </p>
          </h1>
        </div>
        <div className="flex space-x-8 justify-end text-white items-center">
          <span
            className="font-semibold px-4 py-2 bg-m-green rounded uppercase cursor-pointer"
            onClick={requestVerificarion}
          >
            Request Verification
          </span>
          <span
            className="font-semibold text-m-green rounded uppercase cursor-pointer"
            onClick={() => {
              setShowNumber(true);
              setOpen(false);
            }}
          >
            {" "}
            Continue
          </span>
        </div>
        {/* <RequestVerificationSuccessPopup open={openRequestVerificationSuccessPopup} setOpen={setRequestVerificationSuccessPopup}/> */}
      </div>
    </Modal>
  );
}

export default RequestVerificationPopup;

import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import LoginPopup from "../Popup/LoginPopup";
import AppDownloadPopup from "../Popup/AppDownloadPopup";

function SellNowBtn() {
  const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);
  // const [showLoginPopup, setShowLoginPopup] = useState(false);
  // const router = useRouter();

  const handleClick = () => {
    setShowAppDownloadPopup(true);

    //  router.push("/sell-old-refurbished-used-mobiles/add");
    // if (localStorage.getItem("isUserLogged") === "true") {
    //     router.push("/sell/add");
    // } else {
    //      setShowLoginPopup(true);
    // }
  };
  return (
    <Fragment>
      <button
        style={{
          boxShadow: "0px 0px 20px #00A48333",
          // border: "1px solid #00AC8A",


        }}
        className=" bg-m-yellow-1  py-1 w-20 h-8 rounded-md border-2  border-m-yellow-1 text-m-green-1 text-smallFontSize self-center items-center font-Roboto-Semibold "
        onClick={() => handleClick()}
      >
        Sell Now
      </button>
      {/* <LoginPopup open={showLoginPopup} setOpen={setShowLoginPopup} /> */}
      <AppDownloadPopup open={showAppDownloadPopup} setOpen={setShowAppDownloadPopup} />
    </Fragment>
  );
}

export default SellNowBtn;

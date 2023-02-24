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
          boxShadow: "0px 0px 20px #002c2f44",
          // border: "1px solid #00AC8A",


        }}
        className=" bg-m-yellow-1  py-1 w-20 h-8 rounded-md border-2   md:border-m-yellow-1 hover:border-white text-m-green-1 text-smallFontSize self-center items-center font-Roboto-Semibold hover:bg-[rgb(44,47,69)] duration-500 hover:border-[rgb(44,47,69)] hover:text-white hover:scale-110"
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

import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import LoginPopup from "../Popup/LoginPopup";

function SellNowBtn() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/sell-old-refurbished-used-mobiles/add");
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
          borderRadius: "4px",
        }}
        className="py-2  bg-m-green hover:bg-white hover:text-m-green  px-4 text-m-white  hover:shadow uppercase duration-300"
        onClick={() => handleClick()}
      >
        + SELL NOW
      </button>
      <LoginPopup open={showLoginPopup} setOpen={setShowLoginPopup} />
    </Fragment>
  );
}

export default SellNowBtn;

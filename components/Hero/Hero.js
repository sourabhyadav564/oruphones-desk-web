import React from "react";
import { useState } from "react";
import AppDownloadPopup from "../Popup/AppDownloadPopup";

export default function Hero() {
  const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );

  const [qrValue2, setQrValue2] = useState(
    "https://play.google.com/store/apps/details?id=com.oruphones.oru"
  );

  const handleClick = () => {
    setShowAppDownloadPopup(true);
  };

  return (
    <section className="flex-grow w-full  px-0 ">
      <img
        className="hover:cursor-pointer"
        data-aos="fade-down"
        src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/banner_4.webp"}
        alt="BannerImage"
        priority
        onClick={() => handleClick()}
      />
      <AppDownloadPopup
        open={showAppDownloadPopup}
        setOpen={setShowAppDownloadPopup}
      />
    </section>
  );
}

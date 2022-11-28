import { useEffect } from "react";
import QRCode from "qrcode.react";
import { useState } from "react";
import * as Axios from "../api/axios";

function DownloadApp() {
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );

  const [qrValue2, setQrValue2] = useState("https://play.google.com/store/apps/details?id=com.oruphones.oru");

  // useEffect(() => {
  //   Axios.getTinyUrl().then((response) => {
  //     setQrValue(response?.dataObject.tinyurl);
  //   });
  // }, []);

  return (
    <section className="w-full pt-5">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 pt-12 sm:p-12 bg-bg-mask-1 bg-no-repeat bg-cover sm:bg-center bg-m-green text-white rounded-md" data-aos="zoom-in">
        <div className="px-8">
          <h1 className="pb-4 font-Roboto-Bold" style={{ fontSize: 40 }}>
            Download ORUphones app
          </h1>
          <p style={{ fontSize: 22, }} className="font-Roboto-Medium">
            Want to get the best price for your mobile or want to get a mobile
            at your best price, ORUphones app is the one stop solution.
          </p>
        </div>
        <div className="flex space-x-5 pt-4 sm:pt-0 justify-start">
          <div className="flex flex-col justify-end">
            {/* <p className="text-black text-sm text-center pt-2">
              Scan & Download ORUphones app now
            </p> */}
            <QRCode
              id="qr-gen"
              value={qrValue1 || ""}
              size={130}
              level={"H"}
              includeMargin={true}
            />
            <a target={"_blank"} rel="noreferrer" href={qrValue1}>
              <p className="w-32 mt-4 h-10 bg-app-store bg-no-repeat bg-contain" />
            </a>
          </div>
          <div className="flex flex-col justify-end">
            <QRCode
              id="qr-gen"
              value={qrValue2 || ""}
              size={130}
              level={"H"}
              includeMargin={true}
            />
            <a target={"_blank"} rel="noreferrer" href={qrValue2}>
              <p className="w-32 mt-4 h-10 bg-play-store bg-no-repeat bg-contain" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadApp;

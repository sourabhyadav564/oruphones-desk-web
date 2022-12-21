import Image from "next/image";
import condition from "../assets/svgicons/star-dac.svg"
import warranty from "../assets/svgicons/warranty.svg";
import color from "../assets/svgicons/color.svg";
import storage from "../assets/svgicons/micro-sd.svg";
import ram from "../assets/svgicons/memory.svg";
import accessories from "../assets/svgicons/charger2.svg";
import box from "../assets/box.png";
import verified from "../assets/svgicons/quality.svg";
import listedon from "../assets/svgicons/calendar.svg";

// import calendar1 from "../assets/calendar-1.png";
// import calendar2 from "../assets/calendar-2.png";
// import calendar3 from "../assets/calendar-3.png";
// import color from "../assets/color.png";
// import storage from "../assets/storage.png";
// import ram from "../assets/ram.png";
import { BsInfoCircle } from "react-icons/bs";

function LabelAndValue({ label, value, showDeviceReport, showInfoPopup,showWarrantyInfoPopup, showConditionInfoPopup, textAsLink, showRequestVerificationSuccessPopup, labelTextSize }) {
  if (label) {
    return (
      <div className="flex items-start justify-start flex-row">
        <span className="">
          <div className="w-6 h-5 flex items-center pt-4 ">
            {label.toUpperCase().includes("CONDITION") ? (
              <Image src={condition} alt="ORU CONDITION" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("COLOR") ? (
              <Image src={color} alt="ORU COLOR" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("STORAGE") ? (
              <Image src={storage} alt="ORU STORAGE" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("RAM") ? (
              <Image src={ram} alt="ORU RAM" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("ACCESSORIES") ? (
              <Image src={accessories} alt="ORU ACCESSORIES" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("WARRANTY") ? (
              <Image src={warranty} alt="ORU WARRANTY" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("VERIFIED") ? (
              <Image src={verified} alt="ORU VERIFIED" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("LISTED") ? (
              <Image src={listedon} alt="ORU LISTED" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("REPORT") ? (
              <Image src={box} alt="ORU REPORT" width={25} height={25} objectFit="contain" />
            ) : (
              ""
            )}
          </div>

        </span>
        <span className="flex flex-col pl-2">
          <div className="flex items-start justify-start">
            {showInfoPopup ? (
              <p className="text-smallFontSize font-Roboto-Light whitespace-nowrap flex items-center ml-2" style={{ color: "#878787" }}>
                {label}
                <BsInfoCircle size={10} className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showInfoPopup} />
              </p>
            ) : showConditionInfoPopup ? (
              <p className="text-smallFontSize font-Roboto-Light whitespace-nowrap flex items-center ml-2" style={{ color: "#878787" }}>
                {label}
                <BsInfoCircle size={10} className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showWarrantyInfoPopup} />
              </p>
            ) :  showWarrantyInfoPopup ? (
              <p className="text-smallFontSize font-Roboto-Light whitespace-nowrap flex items-center ml-2" style={{ color: "#878787" }}>
                {label}
                <BsInfoCircle size={10} className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showWarrantyInfoPopup} />
              </p>
            ) : (
              <span className="text-smallFontSize font-Roboto-Light whitespace-nowrap ml-2" style={{ color: "#878787" }}>
                {label}
              </span>
            )}
          </div>
          <div className="flex justify-start items-start ml-2" style={{ color: "#373737" }}>
            {showDeviceReport ? (
              <p className="text-smallFontSize font-Roboto-Medium whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800">
                {value}
              </p>
            ) : showInfoPopup ? (
              <p className={textAsLink ? "text-smallFontSize font-Roboto-Medium whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800" : "text-smallFontSize font-Roboto-Medium whitespace-nowrap"} onClick={showRequestVerificationSuccessPopup}>{value}</p>
            ) : (
              <p className={labelTextSize ? "text-smallFontSize font-Roboto-Medium whitespace-nowrap" : "text-smallFontSize font-Roboto-Medium whitespace-nowrap"}>{value}</p>
            )}
          </div>
        </span>
      </div>
    );
  }
  return null;
}

export default LabelAndValue;

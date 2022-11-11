import Image from "next/image";
import box from "../assets/box.png";
import condition from "../assets/condition.png";
import calendar1 from "../assets/calendar-1.png";
import calendar2 from "../assets/calendar-2.png";
import calendar3 from "../assets/calendar-3.png";
import color from "../assets/color.png";
import storage from "../assets/storage.png";
import ram from "../assets/ram.png";
import { BsInfoCircle } from "react-icons/bs";

function LabelAndValue({ label, value, showDeviceReport, showInfoPopup, showConditionInfoPopup, textAsLink, showRequestVerificationSuccessPopup, labelTextSize }) {
  if (label) {
    return (
      <div className="flex items-start justify-start flex-row">
        <span className="">
          <div className="w-6 h-5 flex items-center pt-4 ">
            {label.toUpperCase().includes("CONDITION") ? (
              <Image src={condition} alt="CONDITION" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("COLOR") ? (
              <Image src={color} alt="COLOR" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("STORAGE") ? (
              <Image src={storage} alt="STORAGE" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("RAM") ? (
              <Image src={ram} alt="RAM" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("ACCESSORIES") ? (
              <Image src={box} alt="ACCESSORIES" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("WARRANTY") ? (
              <Image src={calendar2} alt="WARRANTY" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("VERIFIED") ? (
              <Image src={calendar1} alt="VERIFIED" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("LISTED") ? (
              <Image src={calendar3} alt="LISTED" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("REPORT") ? (
              <Image src={box} alt="REPORT" width={25} height={25} objectFit="contain" />
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
                <BsInfoCircle size={10} className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showConditionInfoPopup} />
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

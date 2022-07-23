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

function LabelAndValue({ label, value, showDeviceReport, showInfoPopup, showConditionInfoPopup, textAsLink,showRequestVerificationSuccessPopup, labelTextSize}) {
  if (label) {
    return (
      <div className="flex items-center justify-between flex-wrap space-x-2">
        <div className="flex-1 flex items-center flex-nowrap">
          <div className="w-4 h-4 flex items-center">
            {label.toUpperCase().includes("CONDITION") ? (
              <Image src={condition} alt="CONDITION" width={15} height={15} objectFit="contain" />
            ) : label.toUpperCase().includes("COLOR") ? (
              <Image src={color} alt="COLOR" width={15} height={15} objectFit="contain" />
            ) : label.toUpperCase().includes("STORAGE") ? (
              <Image src={storage} alt="STORAGE" width={15} height={15} objectFit="contain" />
            ) : label.toUpperCase().includes("RAM") ? (
              <Image src={ram} alt="RAM" width={15} height={15} objectFit="contain" />
            ) : label.toUpperCase().includes("ACCESSORIES") ? (
              <Image src={box} alt="ACCESSORIES" width={15} height={15} objectFit="contain" />
            ) : label.toUpperCase().includes("WARRANTY") ? (
              <Image src={calendar2} alt="WARRANTY" width={15} height={15} objectFit="contain" />
            ) : label.toUpperCase().includes("VERIFIED") ? (
              <Image src={calendar1} alt="VERIFIED" width={15} height={15} objectFit="contain" />
            ) : label.toUpperCase().includes("LISTED") ? (
              <Image src={calendar3} alt="LISTED" width={15} height={15} objectFit="contain" />
            ) : label.toUpperCase().includes("REPORT") ? (
              <Image src={box} alt="REPORT" width={15} height={15} objectFit="contain" />
            ) : (
              ""
            )}
          </div>
          {showInfoPopup ? (
            <p className="text-xs whitespace-nowrap flex items-center ml-2" style={{ color: "#7E7E7E" }}>
              {label}
              <BsInfoCircle className="text-sm cursor-pointer ml-1" onClick={showInfoPopup} />
            </p>
          ) : showConditionInfoPopup ? (
            <p className="text-xs whitespace-nowrap flex items-center ml-2" style={{ color: "#7E7E7E" }}>
              {label}
              <BsInfoCircle className="text-sm cursor-pointer ml-1" onClick={showConditionInfoPopup} />
            </p>
          ) : (
            <span className="text-xs whitespace-nowrap ml-2" style={{ color: "#7E7E7E" }}>
              {label}
            </span>
          )}
        </div>
        <div className="flex-1" style={{ color: "#606060" }}>
          {showDeviceReport ? (
            <p className="text-sm whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800" onClick={showDeviceReport}>
              {value}
            </p>
            ):showInfoPopup?(
            <p className={textAsLink?"text-sm whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800":"text-sm whitespace-nowrap"} onClick={showRequestVerificationSuccessPopup}>{value}</p>
          ):(
            <p className={labelTextSize?"text-sm whitespace-nowrap":"text-sm whitespace-nowrap"}>{value}</p>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export default LabelAndValue;

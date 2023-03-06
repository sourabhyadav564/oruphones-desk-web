import Image from "next/image";

// import calendar1 from "../assets/calendar-1.png";
// import calendar2 from "../assets/calendar-2.png";
// import calendar3 from "../assets/calendar-3.png";
// import color from "../assets/color.png";
// import storage from "../assets/storage.png";
// import ram from "../assets/ram.png";


import InfoCircle from "@/assets/infocircle2.svg";

function LabelAndValue({ label, value, showDeviceReport, showInfoPopup, showWarrantyInfoPopup, showConditionInfoPopup, textAsLink, showRequestVerificationSuccessPopup, labelTextSize }) {
  if (label) {
    return (
      <div className="flex items-start justify-start flex-row">
        <span className="">
          <div className="w-6 h-5 flex items-center pt-4 ">
            {label.toUpperCase().includes("CONDITION") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/star-dac.svg"} alt="ORU CONDITION" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("COLOR") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/color.svg"} alt="ORU COLOR" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("STORAGE") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/micro-sd.svg"} alt="ORU STORAGE" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("RAM") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/memory.svg"} alt="ORU RAM" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("ACCESSORIES") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/charger2.svg"} alt="ORU ACCESSORIES" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("WARRANTY") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/warranty.svg"} alt="ORU WARRANTY" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("VERIFIED") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/quality.svg"} alt="ORU VERIFIED" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("LISTED") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/calendar.svg"} alt="ORU LISTED" width={25} height={25} objectFit="contain" />
            ) : label.toUpperCase().includes("REPORT") ? (
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/box.png"} alt="ORU REPORT" width={25} height={25} objectFit="contain" />
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
                {/* <BsInfoCircle size={10} className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showInfoPopup} /> */}
                <div className="px-1 pt-0.5">
                <Image src={InfoCircle} width={10} height={10}  className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showInfoPopup}/>
                </div>
              </p>
            ) : showConditionInfoPopup ? (
              <p className=" text-smallFontSize font-Roboto-Light whitespace-nowrap flex items-center ml-2" style={{ color: "#878787" }}>
                {label}
                {/* <BsInfoCircle size={10} className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showConditionInfoPopup} /> */}
                <div className="px-1 pt-0.5">
                <Image src={InfoCircle} width={10} height={10}  className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showConditionInfoPopup}/>
              </div>
              </p>
            ) : showWarrantyInfoPopup ? (
              <p className="text-smallFontSize font-Roboto-Light whitespace-nowrap flex items-center ml-2" style={{ color: "#878787" }}>
                {label}
                {/* <BsInfoCircle size={10} className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showWarrantyInfoPopup} /> */}
                <div className="px-1 pt-0.5">
                <Image src={InfoCircle} width={10} height={10}  className="text-smallFontSize font-Roboto-Light cursor-pointer ml-2" onClick={showWarrantyInfoPopup}/>
              </div>
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

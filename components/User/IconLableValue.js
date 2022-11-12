import Image from "next/image";
import box from "../../assets/box.png";
import condition from "../../assets/condition.png";
import calendar1 from "../../assets/calendar-1.png";
import calendar2 from "../../assets/calendar-2.png";
import calendar3 from "../../assets/calendar-3.png";
import color from "../../assets/color.png";
import storage from "../../assets/storage.png";

function LabelAndValue({ label, value }) {
  if (label) {
    return (
      <div className="flex items-center flex-wrap">
        <div className="flex-1 flex items-center flex-nowrap">
          {label.toUpperCase().includes("CONDITION") ? (
            <Image src={condition} width={13} height={13} layout="fixed" alt={label} />
          ) : label.toUpperCase().includes("COLOR") ? (
            <Image src={color} width={13} height={13} layout="fixed" alt={label} />
          ) : label.toUpperCase().includes("STORAGE") ? (
            <Image src={storage} width={13} height={13} layout="fixed" alt={label} />
          ) : label.toUpperCase().includes("ACCESSORIES") ? (
            <Image src={box} width={13} height={13} layout="fixed" alt={label} />
          ) : label.toUpperCase().includes("WARRANTY") ? (
            <Image src={calendar2} width={13} height={13} layout="fixed" alt={label} />
          ) : label.toUpperCase().includes("VERIFIED") ? (
            <Image src={calendar1} width={13} height={13} layout="fixed" alt={label} />
          ) : label.toUpperCase().includes("LISTED") ? (
            <Image src={calendar3} width={13} height={13} layout="fixed" alt={label} />
          ) : label.toUpperCase().includes("REPORT") ? (
            <Image src={box} width={13} height={13} layout="fixed" alt={label} />
          ) : (
            ""
          )}
          <span className="text-smallFontSize font-Roboto-Light whitespace-nowrap ml-2" style={{ color: "#7E7E7E" }}>
            {label}
          </span>
        </div>
        <div className="flex-1 text-black-60">
          <p className="text-mediumFontSize font-Roboto-Regular whitespace-nowrap">{value}</p>
        </div>
      </div>
    );
  }
  return null;
}

export default LabelAndValue;

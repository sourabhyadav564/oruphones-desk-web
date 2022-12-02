import { FaMapMarkerAlt } from "react-icons/bi";

function Title({ text, location, onClick, color, fontsize }) {
  return (
    <p
      className="text-center font-Roboto-Regular text-regularFontSize" data-aos="flip-up"
      style={{ fontSize: 24, letterSpacing: 0, color: "#2C2F45" }}
    >
      {text}
      <span>{"  "}</span>
      <span className={`cursor-pointer text-left text-${fontsize || 15} opacity-100 underline text-m-${color || "blue"}`} onClick={onClick}>{location}</span>
    </p>
  );
}

export default Title;

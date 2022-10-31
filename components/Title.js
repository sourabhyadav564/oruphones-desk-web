import { FaMapMarkerAlt } from "react-icons/bi";

function Title({ text, location, onClick, color, fontsize }) {
  return (
    <h1
      className="text-left text-lg opacity-100  font-medium "
      style={{ fontSize: 18, letterSpacing: 0, color: "#000000" }}
    >
      {text}
      <span>{"  "}</span>
      <span className={`cursor-pointer text-left text-${fontsize|| 15} opacity-100 underline text-m-${color || "blue"}`} onClick={onClick}>{location}</span>
    </h1>
  );
}

export default Title;

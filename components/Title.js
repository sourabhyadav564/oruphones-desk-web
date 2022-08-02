import { FaMapMarkerAlt } from "react-icons/bi";

function Title({ text, location, onClick }) {
  return (
    <h1
      className="text-center my-4 font-semibold"
      style={{ fontSize: 21, color: "#2c2f44" }}
    >
      {text}
      <span>{"  "}</span>
      <span className="cursor-pointer underline" onClick={onClick}>{location}</span>
    </h1>
  );
}

export default Title;

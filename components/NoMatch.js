import React from "react";
import nomatching from "@/assets/noMatching.png";

function NoMatch({ text = "" }) {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ minHeight: "300px", height: "60vh" }}
    >
      <img src={nomatching.src}  alt={text}/>
      <p className="font-semibold text-black mt-5">{text}</p>
    </div>
  );
}

export default NoMatch;

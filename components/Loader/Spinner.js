import React from "react";
import loader from "../../assets/loading.gif";

export default function Spinner() {
  return (
    <div>
      <span className="flex justify-center items-center">
        <img src={loader.src} width={25} height={25} alt="loading.." />
      </span>
    </div>
  );
}
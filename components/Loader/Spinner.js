import React from "react";
// import loader from "https://d1tl44nezj10jx.cloudfront.net/assets/loading.gif";
import Image from "next/image";

export default function Spinner() {
  return (
    <div>
      <span className="flex justify-center items-center">
        <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/loading.gif"} width={25} height={25} alt="loading.." />
      </span>
    </div>
  );
}
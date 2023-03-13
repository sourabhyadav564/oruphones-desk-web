import React from "react";
import Image from "next/image";

function NoMatch({ text = "" }) {
  return (
    <div
      className="flex flex-col mt-16 justify-center  items-center"
      style={{ minHeight: "300px", height: "60vh" }}
    >
      <Image
        src={"https://d1tl44nezj10jx.cloudfront.net/assets/noMatching.png"}
        width={600}
        height={400}
        alt={text}
        className="object-contain select-none"
      />
      <p className="font-semibold text-black mt-5 pb-28 ">{text}</p>
    </div>
  );
}

export default NoMatch;

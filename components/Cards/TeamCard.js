import React from "react";

function TeamCard({ imgsrc, name, position, description, qualification }) {
  return (
    <div className="bg-gray-100 grayscale saturate-50 hover:bg-m-green hover:text-white hover:grayscale-0 overflow-y-scroll no-scrollbar py-8 mt-8 mx-4 border rounded-md drop-shadow flex flex-row h-72 px-4 pl-12">
      <div className="w-[600px] pt-6">
        <img
          src={imgsrc}
          width={120}
          height={120}
          className="rounded-full drop-shadow-md flex justify-center"
        />
      </div>
      <div className="text-left w-[900px]">
        <p className="font-Roboto-Bold opacity-80 mt-4">{name}</p>
        <p className="text-[14px] opacity-60 font-Roboto-Medium">{position}</p>
        <p className="text-[14px] opacity-60 font-Roboto-Medium">
          {qualification}
        </p>
        <p className="font-Roboto-Regular text-[14px]">{description}</p>
      </div>
    </div>
  );
}

export default TeamCard;

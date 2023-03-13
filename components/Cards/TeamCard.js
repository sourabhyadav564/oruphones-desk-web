import Image from "next/image";
import React from "react";
import linkedin from "@/assets/linkedIn1.svg";
import Tilt from 'react-parallax-tilt';

function TeamCard({ imgsrc, name, position, description, twittersrc, linkedInsrc}) {
  return (
    <Tilt scale="1.09" glareEnable="true" data-tilt-scale="1.1" transitionSpeed="800" glareColor="white" className="bg-gray-100 grayscale saturate-50 hover:bg-m-green  hover:text-white hover:grayscale-0  h-[44vh] overflow-y-scroll no-scrollbar pt-16 my-8 mx-4 border rounded-md p-2 drop-shadow">
      <Image
        src={imgsrc}
        width={100}
        height={100}
        className="rounded-full drop-shadow-md object-cover"
      />
      <p className="font-Roboto-Bold opacity-80 mt-4">{name}</p>
      <p className="text-[14px] opacity-60 font-Roboto-Medium">{position}</p>
      <p className="font-Roboto-Regular text-[14px]">{description}</p>
      <div className=" m-auto justify-center gap-2  py-2">
        <a href={linkedInsrc} target="_blank" className="">
        <Image src={linkedin} width={20} height={20} alt=""/>
        </a>
      </div>
    </Tilt>
  );
}

export default TeamCard;

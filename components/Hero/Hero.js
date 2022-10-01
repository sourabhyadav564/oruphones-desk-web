import React from "react";
import Link from "next/link";
import Image from "next/image";
import bg from "../../assets/bg_buy_step.png";
import homepage_banner from "../../assets/homepage_banner.png";
import banner_one from "../../assets/banner_1.png";
import banner_two from "../../assets/banner_2.png";
import banner_three from "../../assets/banner_3.png";
import Carousel from "../Carousel";
import QRCode from "qrcode.react";
import { useState } from "react";

const tutorialSteps = {
  id: 0,
  imgPathDesktop: bg,
  imgPathMobile: bg,
  url: "#why_oruphones",
  heading: "Welcome to",
  desc: "India's leading marketplace to buy and sell used/refurbished mobile phones",
};

export default function Hero() {
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );

  const [qrValue2, setQrValue2] = useState(
    "https://play.google.com/store/apps/details?id=com.oruphones.oru"
  );

  return (
    // <section className="min-h-80 mb-4 bg-sell-step bg-no-repeat bg-cover">
    //   <div className="container h-full flex flex-col md:flex-row items-center justify-between space-x-16">
    //     <div className="w-8/12 md:w-4/12">
    //       <Image
    //         src={homepage_banner}
    //         alt="BannerImage"
    //         priority
    //         width="100%"
    //         height="90%"
    //         layout="responsive"
    //         objectFit="contain"
    //       />
    //     </div>
    //     <div className="w-full md:w-8/12 mb-6 md:m-0 flex flex-col justify-center h-full">
    //       <h1 className="text-m-green font-semibold text-2xl md:text-4xl">
    //         {tutorialSteps.heading}
    //       </h1>
    //       <p
    //         className="font-light text-black-1 mt-2 mb-4"
    //         style={{
    //           fontSize: "40px",
    //           lineHeight: "48px",
    //         }}
    //       >
    //         {tutorialSteps.desc}
    //       </p>
    //       <Link href={tutorialSteps && tutorialSteps.url}>
    //         <a className="py-2 my-2 block w-32 bg-m-green rounded-md px-5 text-sm text-white uppercase min-w-max">
    //           Learn More
    //         </a>
    //       </Link>
    //     </div>
    //   </div>
    // </section>
    <section className="flex-grow border-t border-gray-400">
      <Carousel>
        <Link href="/product/buy-old-refurbished-used-mobiles/bestdealnearyou">
          <a>
            <Image
              src={banner_one}
              alt="BannerImage"
              priority
            // width="100%"
            // height="90%"
            // layout="responsive"
            // objectFit="contain"
            />
          </a>
        </Link>
        <Link href="/sell-old-refurbished-used-mobiles/add">
          <a>
            <Image
              src={banner_two}
              alt="BannerImage"
              priority
            // width="100%"
            // height="90%"
            // layout="responsive"
            // objectFit="contain"
            />
          </a>
        </Link>
        <div className="relative">
          <div className="flex space-x-10 pt-4 sm:pt-0 justify-start absolute z-50 right-16 top-10">
            <div className="flex flex-col justify-end">
              <QRCode
                id="qr-gen"
                value={qrValue1 || ""}
                size={150}
                level={"H"}
                includeMargin={true}
              />
              <a target={"_blank"} rel="noreferrer" href={qrValue1}>
                <p className="w-32 mt-4 h-10 bg-app-store bg-no-repeat bg-contain" />
              </a>
            </div>
            <div className="flex flex-col justify-end">
              <QRCode
                id="qr-gen"
                value={qrValue2 || ""}
                size={150}
                level={"H"}
                includeMargin={true}
              />
              <a target={"_blank"} rel="noreferrer" href={qrValue2}>
                <p className="w-32 mt-4 h-10 bg-play-store bg-no-repeat bg-contain" />
              </a>
            </div>
          </div>
          <Image
            src={banner_three}
            alt="BannerImage"
            priority
          // width="100%"
          // height="90%"
          // layout="responsive"
          // objectFit="contain"
          />
        </div>
      </Carousel>
    </section>
  );
}

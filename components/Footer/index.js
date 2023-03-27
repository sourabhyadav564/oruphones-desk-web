import Link from "next/link";
import Fb from "@/assets/fb.svg";
import gmail from "@/assets/gmail.svg";
import instagram from "@/assets/ig.svg";
import pinterest from "@/assets/pinterest.svg";
import linkedin from "@/assets/linkedIn.svg";
import youtube from "@/assets/yt.svg";
import twitter from "@/assets/twitter.svg";

import { addListingBrandState } from "../../atoms/globalState";
import { useRecoilState } from "recoil";
import AppDownloadPopup from "../Popup/AppDownloadPopup";
import { useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [addListingBrand, setAddListingBrand] =
    useRecoilState(addListingBrandState);
  const [openAppDownload, setOpenAppDownload] = useState(false);
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );

  const [qrValue2, setQrValue2] = useState(
    "https://play.google.com/store/apps/details?id=com.oruphones.oru"
  );

  const brandData = [
    {
      id: 1,
      prefill: "Samsung",
      name: "Samsung",
    },
    {
      id: 2,
      prefill: "Apple",
      name: "Apple",
    },
    {
      id: 3,
      prefill: "OnePlus",
      name: "OnePlus",
    },
    {
      id: 4,
      prefill: "Asus",
      name: "Asus",
    },
    {
      id: 5,
      prefill: "Xiaomi",
      name: "Xiaomi",
    },
    {
      id: 6,
      prefill: "Oppo",
      name: "Oppo",
    },
    {
      id: 7,
      prefill: "LG",
      name: "LG",
    },
    {
      id: 8,
      prefill: "Realme",
      name: "Realme",
    },
    {
      id: 9,
      prefill: "Xiaomi",
      name: "Poco",
    },
    {
      id: 10,
      prefill: "Vivo",
      name: "IQOO",
    },
    {
      id: 11,
      prefill: "Sony",
      name: "Sony",
    },
    {
      id: 12,
      prefill: "Google",
      name: "Google",
    },
    {
      id: 13,
      prefill: "Honor",
      name: "Honor",
    },
    {
      id: 14,
      prefill: "Infinix",
      name: "Infinix",
    },
    {
      id: 15,
      prefill: "Tecno",
      name: "Tecno",
    },
    {
      id: 16,
      prefill: "vivo",
      name: "Vivo",
    },
    {
      id: 17,
      prefill: "Micromax",
      name: "Micromax",
    },
    {
      id: 18,
      prefill: "Nokia",
      name: "Nokia",
    },
    {
      id: 19,
      prefill: "Lenovo",
      name: "Lenovo",
    },
    {
      id: 20,
      prefill: "Motorola",
      name: "Motorola",
    },
    {
      id: 21,
      prefill: "HTC",
      name: "HTC",
    },
    {
      id: 22,
      prefill: "Blackberry",
      name: "Blackberry",
    },
    {
      id: 23,
      prefill: "Panasonic",
      name: "Panasonic",
    },
    {
      id: 24,
      prefill: "Gionee",
      name: "Gionee",
    },
    {
      id: 25,
      prefill: "Karbonn",
      name: "Karbonn",
    },
    {
      id: 26,
      prefill: "Lava",
      name: "Lava",
    },
    {
      id: 27,
      prefill: "Intex",
      name: "Intex",
    },
    {
      id: 28,
      prefill: "Meizu",
      name: "Meizu",
    },
    {
      id: 29,
      prefill: "Huawei",
      name: "Huawei",
    },
    {
      id: 20,
      prefill: "ZTE",
      name: "ZTE",
    },
    {
      id: 31,
      prefill: "Alcatel",
      name: "Alcatel",
    },
  ];

  return (
    <footer className="mx-auto bg-gradient-to-b from-m-green to-m-black py-16 xl:px-20 lg:px-12 sm:px-6 px-4">
      <div>
        <div className="lg:pl-24 lg:pr-28 px-8 pb-20 flex flex-col items-center justify-center text-regularFontSize font-Roboto-Regular">
          <p className="text-white  tracking-[0.15em] leading-8 text-justify">
            {brandData &&
              brandData.map((brand, index) => (
                <a
                  className="hover:cursor-pointer hover:opacity-60 "
                  onClick={() => setOpenAppDownload(true)}
                >
                  Sell {brand.name} Phone {brand.id != 31 && "|"}{" "}
                </a>
              ))}
          </p>
        </div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 text-m-white">
        <div className="flex flex-col">
          <p className="font-Roboto-Semibold text-xlFontSize">
            Customer Service
          </p>
          <Link href="/privacy-policy">
            <a className="hover:scale-125 hover:opacity-70 font-Roboto-Bold hover:pl-4 duration-300 mt-4 max-w-max font-Roboto-Light text-regularFontSize">
              Privacy policy
            </a>
          </Link>
          <Link href="/terms">
            <a className="hover:scale-125 hover:opacity-70 font-Roboto-Bold duration-300 hover:pl-4 mt-4 max-w-max font-Roboto-Light text-regularFontSize">
              Terms of service
            </a>
          </Link>
          <Link href="/faq">
            <a className="hover:scale-125 hover:opacity-70 font-Roboto-Bold duration-300 hover:pl-2 mt-4 max-w-max font-Roboto-Light text-regularFontSize">
              FAQs
            </a>
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="font-Roboto-Semibold text-xlFontSize">Links</p>
          <Link href="https://www.oruphones.com/blog/">
            <a
              className="hover:scale-125 hover:opacity-70 font-Roboto-Bold duration-300 hover:pl-1  mt-4 max-w-max font-Roboto-Light text-regularFontSize"
              target="_blank"
            >
              Blog
            </a>
          </Link>
          <Link href="/about-us">
            <a className="hover:scale-125 hover:opacity-70 font-Roboto-Bold duration-300 hover:pl-2  mt-4 max-w-max font-Roboto-Light text-regularFontSize">
              About Us
            </a>
          </Link>
          <Link href="/contact-us">
            <a className="hover:scale-125 hover:opacity-70 font-Roboto-Bold duration-300 hover:pl-2  mt-4 max-w-max font-Roboto-Light text-regularFontSize">
              Contact Us
            </a>
          </Link>
        </div>
        <div>
          <div className="flex flex-col">
            <p className="font-Roboto-Semibold text-xlFontSize">
              DOWNLOAD ORUphones App
            </p>
            <div className="flex flex-row">
              <a target={"_blank"} rel="noreferrer" href={qrValue2}>
                <p className="w-32 mt-2 mb-2 mr-2 h-10 bg-play-store bg-no-repeat hover:scale-105 hover:duration-300  bg-contain" />
              </a>
              <a target={"_blank"} rel="noreferrer" href={qrValue1}>
                <p className="w-32 mt-2 mb-2 ml-2 h-10 hover:scale-105 hover:duration-300  bg-app-store bg-no-repeat bg-contain" />
              </a>
            </div>
          </div>
          <div>Follow us on Social Media</div>
          <div className="flex items-center gap-x-1 mt-4 space-x-4">
            <div className="cursor-pointer  rounded-full flex items-center justify-center hover:scale-125 font-Roboto-Bold duration-300">
              <a
                href="https://www.facebook.com/ORUphones"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Fb} width={20} height={20} alt="" />
              </a>
            </div>
            <div className="cursor-pointer  rounded-full flex items-center justify-center hover:scale-125 font-Roboto-Bold duration-300">
              <a
                href="https://twitter.com/ORUPhones"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={twitter} width={20} height={20} alt="" />
              </a>
            </div>
            <div className=" cursor-pointer  rounded-full flex items-center justify-center hover:scale-125 font-Roboto-Bold duration-300">
              <a
                href="https://www.instagram.com/oruphones/?igshid=YmMyMTA2M2Y%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={instagram} width={20} height={20} alt="" />
              </a>
            </div>
            <div className=" cursor-pointer  rounded-full flex items-center justify-center hover:scale-125 font-Roboto-Bold duration-300">
              <a
                href="https://www.pinterest.com/ORUphones/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={pinterest} width={20} height={20} alt="" />
              </a>
            </div>
            <div className=" cursor-pointer  rounded-full flex items-center justify-center hover:scale-125 font-Roboto-Bold duration-300">
              <a
                href="https://www.linkedin.com/company/oruphones/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={linkedin} width={20} height={20} alt="" />
              </a>
            </div>
            <div className=" cursor-pointer  rounded-full flex items-center justify-center hover:scale-125 font-Roboto-Bold duration-300">
              <a
                href="https://www.youtube.com/channel/UCJTgZUz7jkMCECYVO1uFE6A"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={youtube} width={20} height={20} alt="" />
              </a>
            </div>
            <div className=" cursor-pointer  rounded-full flex items-center justify-center hover:scale-125 font-Roboto-Bold duration-300">
              <a
                href="mailto:contact@oruphones.com?subject = Feedback"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={gmail} width={20} height={20} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
    </footer>
  );
};

export default Footer;

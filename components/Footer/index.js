import Link from "next/link";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaPinterestSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

import {
  addListingBrandState,
} from "../../atoms/globalState";
import { useRecoilState } from "recoil";
import AppDownloadPopup from "../Popup/AppDownloadPopup";
import { useState } from "react";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  const [addListingBrand, setAddListingBrand] = useRecoilState(addListingBrandState);
  const [openAppDownload, setOpenAppDownload] = useState(false);
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );

  const [qrValue2, setQrValue2] = useState("https://play.google.com/store/apps/details?id=com.oruphones.oru");

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
      id: 30,
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
      <div><div className="lg:pl-24 lg:pr-28 px-8 pb-20 flex flex-col items-center justify-center text-regularFontSize font-Roboto-Regular">
        <p className='text-white tracking-[0.15em] leading-8'>
          {brandData && brandData.map((brand, index) => (
            <a className="hover:cursor-pointer"
              // href="/sell-old-refurbished-used-mobiles/add"
              // onClick={() => setAddListingBrand(brand.prefill)}>
              onClick={() => setOpenAppDownload(true)}>
                    Sell {" "}{brand.name} Phone   {brand.id!=31&& "|"} </a>
          ))}          
        </p>
      </div></div>
      <div className="container grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 text-m-white">
        <div className="flex flex-col">
          <p className="font-Roboto-Semibold text-xlFontSize">Customer Service</p>
          <Link href="/privacy-policy">
            <a className="hover:scale-150 hover:pl-4 duration-500 mt-4 max-w-max font-Roboto-Light text-regularFontSize">Privacy policy</a>
          </Link>
          <Link href="/terms">
            <a className="hover:scale-150 duration-500 hover:pl-4 mt-4 max-w-max font-Roboto-Light text-regularFontSize">
              Terms of service
            </a>
          </Link>
          <Link href="/faq">
            <a className="hover:scale-150 duration-500 hover:pl-2 mt-4 max-w-max font-Roboto-Light text-regularFontSize">FAQs</a>
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="font-Roboto-Semibold text-xlFontSize">Links</p>
          <Link href="https://www.oruphones.com/blog/">
            <a className="hover:scale-150 duration-500 hover:pl-1  mt-4 max-w-max font-Roboto-Light text-regularFontSize" target="_blank">Blog</a>
          </Link>
          <Link href="/about-us">
            <a className="hover:scale-150 duration-500 hover:pl-2  mt-4 max-w-max font-Roboto-Light text-regularFontSize">About Us</a>
          </Link>
          <Link href="/contact-us">
            <a className="hover:scale-150 duration-500 hover:pl-2  mt-4 max-w-max font-Roboto-Light text-regularFontSize">Contact Us</a>
          </Link>
          <Link href="/team">
            <a className="hover:scale-150 duration-500 hover:pl-2  mt-4 max-w-max font-Roboto-Light text-regularFontSize">Team</a>
          </Link>
        </div>
        <div>
          <div className="flex flex-col">
            <p className="font-Roboto-Semibold text-xlFontSize">DOWNLOAD ORUphones App</p>
            <div className="flex flex-row">
              <a target={"_blank"} rel="noreferrer" href={qrValue2}>
                <p className="w-32 mt-2 mb-2 mr-2 h-10 bg-play-store bg-no-repeat bg-contain" />
              </a>
              <a target={"_blank"} rel="noreferrer" href={qrValue1}>
                <p className="w-32 mt-2 mb-2 ml-2 h-10 bg-app-store bg-no-repeat bg-contain" />
              </a>
            </div>
          </div>
          <div>
            Follow us on Social Media
          </div>
          <div className="flex items-center gap-x-1 mt-4 ">
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center hover:scale-150 duration-500">
              <a
                href="https://www.facebook.com/ORUphones"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare size={25} />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center hover:scale-150 duration-500">
              <a
                href="https://twitter.com/ORUPhones"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitterSquare size={25} />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center hover:scale-150 duration-500">
              <a
                href="https://www.instagram.com/oruphones/?igshid=YmMyMTA2M2Y%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={25} />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center hover:scale-150 duration-500">
              <a
                href="https://www.pinterest.com/ORUphones/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterestSquare size={25} />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center hover:scale-150 duration-500">
              <a
                href="https://www.linkedin.com/company/oruphones/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={25} />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center hover:scale-150 duration-500">
              <a
                href="https://www.youtube.com/channel/UCJTgZUz7jkMCECYVO1uFE6A"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={25} />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center hover:scale-150 duration-500">
              <a
                href="mailto:contact@oruphones.com?subject = Feedback"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiMail size={25} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
    </footer >
  );
};

export default Footer;

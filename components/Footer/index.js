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

const Footer = () => {
  const [addListingBrand, setAddListingBrand] = useRecoilState(addListingBrandState);
  // console.log("addListingBrand", addListingBrand);
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
      <div><div className="pl-24 pr-28 pb-20 flex flex-col items-center justify-center">
        <p className='text-white'>
          {brandData && brandData.map((brand, index) => (
            <a className="hover:underline" href="/sell-old-refurbished-used-mobiles/add"
              onClick={() => setAddListingBrand(brand.prefill)}>Sell
              {" "}{brand.name} Phone | </a>
          ))}
        </p>
      </div></div>
      <div className="container grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 text-m-white">
        <div className="flex flex-col">
          <h1 className="font-bold">Customer Service</h1>
          <Link href="/privacy-policy">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">Privacy policy</a>
          </Link>
          <Link href="/terms">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">
              Terms of service
            </a>
          </Link>
          <Link href="/faq">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">FAQs</a>
          </Link>
        </div>
        <div className="flex flex-col">
          <h1 className=" font-bold">Links</h1>
          <Link href="https://www.oruphones.com/blog/">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max" target="_blank">Blog</a>
          </Link>
          <Link href="/about-us">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">About Us</a>
          </Link>
          <Link href="/contact-us">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">Contact Us</a>
          </Link>
        </div>
        <div>
          <div className="flex flex-col">
            <h1 className="font-bold">Email Us</h1>
            <a
              href="mailto:contact@oruphones.com?subject = Feedback"
              className="hover:pl-2 delay-75 mt-4 max-w-max"
            >
              contact@oruphones.com
            </a>
          </div>
          <div className="flex items-center gap-x-4 mt-4 ">
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.facebook.com/ORUphones"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://twitter.com/ORUPhones"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitterSquare />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.instagram.com/oruphones/?igshid=YmMyMTA2M2Y%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.pinterest.com/ORUphones/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterestSquare />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.linkedin.com/company/oruphones/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.youtube.com/channel/UCJTgZUz7jkMCECYVO1uFE6A"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

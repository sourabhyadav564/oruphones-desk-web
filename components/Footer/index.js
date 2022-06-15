import Link from "next/link";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaPinterestSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mx-auto bg-m-green-dark py-16 xl:px-20 lg:px-12 sm:px-6 px-4">
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
          <Link href="/blog">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">Blog</a>
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
                href="https://www.facebook.com/mobiruindia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://twitter.com/mobiruindia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitterSquare />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.instagram.com/mobiruindia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.pinterest.com/refurbishedphonedeals/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterestSquare />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.linkedin.com/company/mobiruindia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="w-10 h-10 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a
                href="https://www.youtube.com/channel/UCf05rmUN5_t2KzgmjQtvXKg/"
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

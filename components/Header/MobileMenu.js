import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BiCurrentLocation, BiChevronDown } from "react-icons/bi";
import LoginPopup from "../Popup/LoginPopup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import SellNowBtn from "./SellNowBtn";
import LoginOrProfile from "./LoginOrProfile";
import LoginOrProfileInMobileMenu from "./LoginOrProfileInMobileMenu";
import SearchBarMobile from "./SearchBarMobile";

function MobileMenu({ isOpen }) {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [performAction, setPerformAction] = useState(false);
  const [authenticated,setauthenticated] = useState(false);
  const [ItemLink,setItemLink] =useState('');

  useEffect(() => {
    if (Cookies.get("userUniqueId") !== undefined) {
      setauthenticated(true);
    } else {
      setauthenticated(false);
    }
    return () => { };
  });

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(showLogin == false && ItemLink !== ''  && Cookies.get('userUniqueId')!==undefined){
        setPerformAction(false);
        clearInterval(interval);
        router.push(ItemLink);
      }
    },1000) 
  },[showLogin]);


  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {(ref) => (
        <div className="lg:hidden bg-m-green text-m-white" id="mobile-menu">
          <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* <form className="flex w-full sm:hidden mb-2">
              <input
                placeholder="Search with make and model"
                className="flex-1 border py-2 px-4 bg-white text-gray-600 focus:outline-none rounded-l"
              />
              <button type="button" className="rounded-r bg-gray-700 text-white uppercase py-2 px-4 hover:bg-gray-800 focus:outline-none">
                Search
              </button>
            </form> */}
             <div className="md:hidden flex  justify-center mx-4 flex-1 text-m-green text-sm">
                <SearchBarMobile />
              </div>

            {/* <div className="flex relative md:hidden justify-center items-center border border-l-0 rounded pl-0 p-2 text-gray-600 bg-white focus:outline-none">
              <span className="absolute top-0 bottom-0 left-0 w-10 bg-gray-200 rounded-l inline-flex justify-center items-center">
                <BiCurrentLocation className="h-5 w-5" />
              </span>
              <span className="flex-1 text-center">Hyderbad</span>
              <BiChevronDown className="h-5 w-5" />
            </div> */}
            
            <div className="lg:hidden flex px-4 space-x-2 flex-shrink-0 text-sm">
              <SellNowBtn />
            
              <LoginOrProfileInMobileMenu />
             
            </div>

            <Item href="/product/models">Popular Models</Item>
            <Item href='/product/buy-old-refurbished-used-mobiles/apple'>Apple</Item>
            <Item href='/product/buy-old-refurbished-used-mobiles/samsung'>Samsung</Item>
            <Item href='/product/buy-old-refurbished-used-mobiles/oneplus'>One Plus</Item>
            <Item href='https://www.oruphones.com/blog/'>Blog</Item>
            <Item href='/product/buy-old-refurbished-used-mobiles/bestdealnearyou'>Best Deals</Item>
            {
            authenticated ? (
              <Item  
              href="/user/services"
              >Services</Item>
          ):(
             <Item  
             // link="/user/profile"
               onClick={() => {
                 setShowLogin(true)
                 setPerformAction(true);
                 setItemLink('/user/services')
               }}>Services</Item>)
          }
           
          </div>
          <LoginPopup open={showLogin} setOpen={setShowLogin} />
        </div>
     )}
    </Transition>
  );
}

export default MobileMenu;

const Item = ({ href, children,onClick }) => (
  <a href={href || "#"}  onClick={onClick} className="hover:bg-gray-700 hover:text-white block px-4 py-2 rounded-md text-base font-medium">
    {children}
  </a>
);

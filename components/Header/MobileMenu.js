import { Transition } from "@headlessui/react";
import { BiCurrentLocation, BiChevronDown } from "react-icons/bi";

function MobileMenu({ isOpen }) {
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
            <form className="flex w-full sm:hidden mb-2">
              <input
                placeholder="Search with make and model"
                className="flex-1 border py-2 px-4 bg-white text-gray-600 focus:outline-none rounded-l"
              />
              <button type="button" className="rounded-r bg-gray-700 text-white uppercase py-2 px-4 hover:bg-gray-800 focus:outline-none">
                Search
              </button>
            </form>
            <div className="flex relative md:hidden justify-center items-center border border-l-0 rounded pl-0 p-2 text-gray-600 bg-white focus:outline-none">
              <span className="absolute top-0 bottom-0 left-0 w-10 bg-gray-200 rounded-l inline-flex justify-center items-center">
                <BiCurrentLocation className="h-5 w-5" />
              </span>
              <span className="flex-1 text-center">Hyderbad</span>
              <BiChevronDown className="h-5 w-5" />
            </div>
            <Item>IPhones</Item>
            <Item>Samsung Phones</Item>
            <Item>OnePlus Phones</Item>
            <Item>Shop by Brand</Item>
            <Item>Shop by Grade</Item>
            <Item>Blogs</Item>
            <Item>Mobiru App</Item>
          </div>
        </div>
      )}
    </Transition>
  );
}

export default MobileMenu;

const Item = ({ href, children }) => (
  <a href={href || "#"} className="hover:bg-gray-700 hover:text-white block px-4 py-2 rounded-md text-base font-medium">
    {children}
  </a>
);

import { Fragment, useEffect, useState } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { GrFormDown, GrFormFilter } from "react-icons/gr";
import DesktopFilter from "./DesktopFilter";
import { useRouter } from "next/router";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export default function Sort({ sortOptions, setApplySort, setFilters }) {
  const router = useRouter();
 
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  function handleOnChange(data) {
    setApplySort(data.name);
    sortOptions?.map((items) => {
      return items.name === data.name ? (items.current = true) : (items.current = false);
    });
  }

  useEffect(() => {
    sortOptions?.map((items) => {
      return items.name === "Featured" ? (items.current = true) : (items.current = false);
    });
    setApplySort("Featured");
  }, [router.pathname]);

  return (
    <Fragment>
      <div className="relative z-10 flex items-baseline justify-end py-4">
        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left ">
            <div>
              <Menu.Button className="group inline-flex justify-center px-4 py-2 rounded-md bg-white text-sm font-Roboto-Regular text-regularFontSize text-gray-700 hover:text-gray-900 border">
                {(sortOptions && sortOptions.filter((i) => i.current)[0]?.name) || "Sort"}
                <GrFormDown className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <a
                          onClick={(e) => handleOnChange(option)}
                          className={classNames(
                            option.current ? "font-Roboto-Medium text-regularFontSize text-gray-900" : "text-gray-500 font-Roboto-Light",
                            active ? "bg-gray-100 font-Roboto-Medium text-regularFontSize" : "",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <button
            type="button"
            className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="sr-only">Filters</span>
            <GrFormFilter className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex  lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10  p-2 rounded-md flex items-center justify-center text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <DesktopFilter setFilters={setFilters} />
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
}

import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";

import Minus from "@/assets/minus.svg";
import Plus from "@/assets/plus.svg";
import InfoCircle from "@/assets/infocircle2.svg";
import Image from "next/image";


function FilterUI({ optionObj, setter, selected, openPopup }) {
  const handleChange = (e, value) => {
    const { checked } = e.target;

    if (optionObj && optionObj.id === "verification") {
      if (checked) {
        setter((prev) => (prev && [...prev, value]) || [value]);
      }
      else {
        setter((prev) => prev && prev.length > 0 && prev?.filter((item) => item !== value));
      }
    } else {
      if (checked) {
        if (value === "all") {
          setter(optionObj?.options.map((i) => i.value));
        } else {
          setter((prev) => {
            return prev?.length + 2 === optionObj?.options.length ? [...prev, value, "all"] : (prev && [...prev, value]) || [value];
          });
        }
      } else {
        if (value === "all") {
          setter([]);
        } else {
          setter((prev) => prev && prev.length > 0 && prev?.filter((item) => item !== value && item !== "all"));
        }
      }
    }
  };

  return (
    <Disclosure defaultOpen as="div" className="border-b border-gray-200 py-4">
      {({ open }) => (
        <Fragment>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="py-3  w-full flex items-center justify-between text-sm text-gray-900 hover:text-gray-500">
              <p className="flg:font-Roboto-Regular gap-1 mt-0.5 font-Roboto-Semibold lg:text-regularFontSize text-smallFontSize  text-m-green flex whitespace-nowrap items-center">{optionObj?.name}
                {openPopup && 
                // <BsInfoCircle className="text-sm cursor-pointer ml-1" onClick={(e) => { e.stopPropagation(); e.preventDefault(); openPopup() }} />
                <Image src={InfoCircle} width={12} height={12}  className="text-sm cursor-pointer ml-1 " onClick={(e) => { e.stopPropagation(); e.preventDefault(); openPopup() }} />
                }
              </p>
              <span className="md:ml-6 ml-2 flex items-center">
                {open ? 
                // <FiMinus className="h-5 w-5" aria-hidden="true" />
                <Image src={Minus} width={20} height={20}/>
                 :
                  // <FiPlus className="h-5 w-5" aria-hidden="true" />
                  <Image src={Plus} width={20} height={20}/>
                 }
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6  ">
            <div className="space-y-4">
              {optionObj?.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center font-Roboto-Light text-smallFontSize">
                  <input
                    id={`filter-${optionObj?.id}-${optionIdx}`}
                    name={`${optionObj?.id}`}
                    type="checkbox"
                    checked={selected?.includes(option.value) || option?.checked}
                    disabled={option?.disabled}
                    onChange={(e) => handleChange(e, option.value)}
                    className="h-4 w-4 border-gray-300 rounded text-m-green focus:ring-transparent"
                  />
                  <label htmlFor={`filter-${optionObj?.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600 capitalize">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  );
}

export default FilterUI;

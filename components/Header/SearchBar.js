import { getSearchResults } from "api/axios";
import Link from "next/link";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const [searchResults, setSearchResults] = useState();
  const [input, setInput] = useState("");
  const [brands, setBrands] = useState([]);
  const ref = useRef();

  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (input.trim().length >= 2) {
        getSearchResults(input).then(
          (res) => {
            if (res && res.status === "SUCCESS") {
              setSearchResults(res.dataObject);
            }
          },
          (err) => {
            console.error(err);
          }
        );
      }
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [input]);

  useEffect(() => {
    setBrands(JSON.parse(localStorage.getItem("brands")));
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSearchResults();
        setInput("");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);

    if (e.target.value.trim().length < 2 && searchResults && searchResults.results) {
      setSearchResults();
    }
  };

  // if (brandsList.length === 0) {
  // setBrands(JSON.parse(localStorage.getItem("brands")));
  // } else {
  //   localStorage.setItem("brands", JSON.stringify(brandsList));
  //   Cookies.set("brands", true);
  //   setBrands(brandsList);
  // }

  return (
    <Fragment>
      <div className="flex-1 relative custom-scroll h-8" ref={ref}>
        <div className="flex w-[715px] rounded bg-m-white-1 ">
          {/* <select className="w-[104px] pr-6 py-1 h-10 rounded border-none m-auto  items-center text-m-green-1 font-normal bg-[#D9D9D9] text-xs" >
            {brands.map((brand, index) => (
              <option key={index} value={brand.make}
                onClick={
                  <Link href={{ pathname: `/product/buy-old-refurbished-used-mobiles/${brand?.make?.toLowerCase()}` }}>
                  </Link>
                }>
                {brand.make}
              </option>
            ))}
          </select> */}
          <input
            placeholder="Search on ORUphones"
            onChange={handleChange}
            value={input}
            className={`px-4 pt-3 py-3 h-8 w-full bg-m-white-1 text-smallFontSize font-Roboto-Regular rounded bg-no-repeat ${searchResults && "rounded-b-none"}`}
            style={{ boxShadow: "0px 2px 3px #0000000A" }}
          />
        </div>
        {searchResults && (
          <div
            className="absolute z-20 left-0 right-0 rounded-b-lg  bg-white overflow-y-auto text-black"
            style={{
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.16)",
              maxHeight: 315,
            }}
          >
            {searchResults.brandList && searchResults.brandList.length > 0 && <p className="px-4 py-3 block border-b text-m-green">Brand</p>}
            {searchResults.brandList &&
              searchResults.brandList.length > 0 &&
              searchResults.brandList.map((item) => (
                <ListItem
                  clicked={() => {
                    setInput("");
                    setSearchResults();
                  }}
                  key={item}
                  make={item}
                  makeLink
                />
              ))}
            {searchResults.results && searchResults.results.length > 0 && <p className="px-4 py-3 block border-b text-m-green">Mobile Model</p>}

            {searchResults.results &&
              searchResults.results.length > 0 &&
              searchResults.results.map((item) => (
                <ListItem
                  clicked={() => {
                    setInput("");
                    setSearchResults();
                  }}
                  key={item}
                  make={searchResults && searchResults.marketingNameAndMakeMap && searchResults.marketingNameAndMakeMap[item]}
                  marketingName={item}
                />
              ))}
            {searchResults &&
              (!searchResults.results || (searchResults.results && searchResults.results.length < 1)) &&
              (!searchResults.brandList || (searchResults.brandList && searchResults.brandList.length < 1)) && (
                <ListItem
                  clicked={() => {
                    setInput("");
                    setSearchResults();
                  }}
                >
                  Not found
                </ListItem>
              )}
          </div>
        )}
        <div className="absolute right-[10px]  top-0 bottom-0 flex items-center px-4 ">
          <BiSearch className="text-black-1" size={20} />
        </div>
      </div>
    </Fragment>
  );
}

export default SearchBar;

const ListItem = ({ make, makeLink, marketingName, children, clicked }) => {
  if (children) {
    return (
      <p className="px-6 py-3 block border-b last:border-0 capitalize" onClick={clicked}>
        {children}
      </p>
    );
  }
  return (
    <Link href={makeLink ? `/product/buy-old-refurbished-used-mobiles/${make}/` : `/product/buy-old-refurbished-used-mobiles/${make}/${marketingName}`}>
      <a className="px-6 py-3 block border-b last:border-0 capitalize" onClick={clicked}>
        {marketingName || make}
      </a>
    </Link>
  );
};

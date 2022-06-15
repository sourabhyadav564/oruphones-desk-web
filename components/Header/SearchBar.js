import { getSearchResults } from "api/axios";
import Link from "next/link";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const [searchResults, setSearchResults] = useState();
  const [input, setInput] = useState("");
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

  return (
    <Fragment>
      <div className="flex-1 relative custom-scroll" ref={ref}>
        <input
          placeholder="Search with make and model"
          onChange={handleChange}
          value={input}
          className={`py-2 px-4 w-full bg-white text-gray-800 focus:outline-none rounded ${searchResults && "rounded-b-none"}`}
          style={{ boxShadow: "0px 2px 3px #0000000A" }}
        />
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
        <div className="absolute right-2 top-0 bottom-0 flex items-center pr-2">
          <BiSearch className="text-m-green " size={20} />
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
    <Link href={makeLink ? `/product/listings/${make}/` : `/product/listings/${make}/${marketingName}`}>
      <a className="px-6 py-3 block border-b last:border-0 capitalize" onClick={clicked}>
        {marketingName || make}
      </a>
    </Link>
  );
};

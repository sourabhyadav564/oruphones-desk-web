import React from "react";
import Sort from "./Sort";
import DesktopFilter from "./DesktopFilter";
import useFilterOptions from "hooks/useFilterOptions";

const sortOptions = [
  { name: "Price - Low to High", href: "#", current: false },
  { name: "Price - High to Low", href: "#", current: false },
  { name: "Newest First", href: "#", current: false },
  { name: "Oldest First", href: "#", current: false },
  { name: "Featured", href: "#", current: true },
];

function Filter({ listingsCount, children, setApplySort, setApplyFilter, makeName }) {
  const { filterOptions } = useFilterOptions();

  // console.log("filterOptions", setApplySort);

  return (
    <React.Fragment>
      <div className="flex justify-between items-center">
        {listingsCount && listingsCount > 0 ? <h1> {listingsCount && `Total listings (${listingsCount || "..."}) `}</h1> : <span></span>}
        <Sort sortOptions={sortOptions} setApplySort={setApplySort} filterOptions={filterOptions} />
      </div>
      <section aria-labelledby="products-heading" className="">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6">
          <div className="hidden lg:block">
            <DesktopFilter setFilters={setApplyFilter} filterOptions={filterOptions} key={makeName} />
          </div>
          <div className="lg:col-span-3">{children}</div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Filter;

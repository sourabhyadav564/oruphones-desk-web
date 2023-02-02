import { getShowSerchFilters } from "api/axios";
import { useEffect, useRef, useState } from "react";

const initialState = [
  {
    id: "price",
    name: "Price",
    MIN: 300,
    MAX: 10000,
  },
  {
    id: "brand",
    name: "Brand",
    options: [],
  },
  {
    id: "condition",
    name: "Condition",
    options: [],
  },
  // {
  //   id: "color",
  //   name: "Color",
  //   options: [],
  // },
  {
    id: "Ram",
    name: "Ram(GB)",
    options: [],
  },
  {
    id: "storage",
    name: "Storage(GB)",
    options: [],
  },
  {
    id: "warranty",
    name: "Warranty",
    options: [],
  },
  {
    id: "verification",
    name: "Verification",
    options: [
      { value: "all", label: "All", checked: false },
      { value: "verified", label: "Verified", checked: false },
      // { value: "unverified", label: "Unverified", checked: false },
    ],
  },
];

const useFilterOptions = () => {
  const cache = useRef({});
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState(initialState);

  const fetchApi = () => {
    getShowSerchFilters().then(
      (res) => {
        if (res?.status === "SUCCESS") {
          let tempFilters = filterOptions.map((item) => {
            if (item.id === "condition") {
              return {
                ...item,
                options: [
                  { value: "all", label: "All", checked: false },
                  ...res?.dataObject?.Conditions.map((items) => {
                    return { value: items, label: items, checked: false };
                  }),
                ],
              };
            }
            else {
              return item;
            }
          });
          setFilterOptions(tempFilters);
          cache.current["filterOption"] = tempFilters;
          setLoading(false);
        }
      },
      (err) => console.error(err)
    );
  };

  useEffect(() => {
    if (cache.current["filterOption"]) {
      const data = cache.current["filterOption"];
      setFilterOptions(data);
      setLoading(false);
    } else {
      fetchApi();
    }
  }, []);

  return { loading, filterOptions };
};

export default useFilterOptions;

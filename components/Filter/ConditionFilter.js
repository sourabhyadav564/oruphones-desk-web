import FilterUI from "./FilterUI";

function ConditionFilter({ options, router, ...rest }) {
  if (router && router?.pathname === "/product/models") {
    return null;
  }
  return <FilterUI optionObj={options} {...rest} />;
}

export default ConditionFilter;

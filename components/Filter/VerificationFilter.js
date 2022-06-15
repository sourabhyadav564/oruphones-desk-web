import FilterUI from "./FilterUI";

function VerificationFilter({ options, router, ...rest }) {
  if (router && router?.pathname === "/product/models") {
    return null;
  }
  return <FilterUI optionObj={options} {...rest} />;
}

export default VerificationFilter;

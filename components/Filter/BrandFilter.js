import FilterUI from "./FilterUI";

function BrandFilter({ options, router, ...rest }) {
  const { makeName } = router.query;
  let optionObj;
  if (makeName !== null && makeName !== undefined) {
    optionObj = { ...options, options: [{ value: makeName, label: makeName, checked: true, disabled: true }] };
  } else {
    optionObj = options;
  }
  
  return <FilterUI optionObj={optionObj} {...rest} />;
}

export default BrandFilter;

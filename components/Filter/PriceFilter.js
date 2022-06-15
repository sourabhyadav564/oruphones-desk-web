
function PriceFilter({ options,router,setPriceRange}) {
  const { min,max } = router.query;

  const handleMinChange = (e) => {
    setPriceRange((prev)=>({...prev,min:parseInt(e.target.value)}))
  }
  const handleMaxChange = (e) => {
    setPriceRange((prev)=>({...prev,max:parseInt(e.target.value)}))
  }

  if (router && router?.pathname === "/product/models") {
    return null;
  }
  return (
    <div key={options?.id} className="border-b border-gray-200 py-4">
      <h3 className="flow-root">
        <span className="font-medium text-gray-900">{options?.name}</span>
      </h3>
      <div className="flex justify-between items-center space-x-4 py-2 text-sm">
        <input type="number" className="w-full rounded h-10 text-sm sm:h-8" min={300} placeholder={min} disabled={min === undefined ?false:true} style={{ border: "1px solid #e4e3e3" }} onChange={(e) => handleMinChange(e,options)}/>
        <input type="number" className="w-full rounded h-10 text-sm sm:h-8" max={300} placeholder={max} disabled={max === undefined ?false:true} style={{ border: "1px solid #e4e3e3" }} onChange={(e) => handleMaxChange(e,options)}/>
      </div>
    </div>
  );
}

export default PriceFilter;

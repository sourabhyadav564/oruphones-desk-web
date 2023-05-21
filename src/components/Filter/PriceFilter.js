function PriceFilter({ options, router, priceRange, setPriceRange }) {
	const handleMinChange = (e) => {
		setPriceRange([+e.target.value, priceRange[1]]);
	};
	const handleMaxChange = (e) => {
		setPriceRange([priceRange[0], +e.target.value]);
	};

	if (router && router?.pathname === '/product/models') {
		return null;
	}
	return (
		<div
			key={options?.id}
			className="border-b border-gray-200 py-4  cursor-pointer select-none"
		>
			<h3 className="flow-root">
				<span className="lg:font-Roboto-Regular font-Roboto-Semibold lg:text-regularFontSize text-smallFontSize  text-m-green">
					{options?.name}
				</span>
			</h3>
			<div className="lg:flex lg:justify-between gap-4 items-center lg:space-x-4 gap-4 lg:space-y-0 space-y-4 text-sm">
				<input
					type="number"
					className="w-full rounded h-10 text-sm sm:h-8"
					min={300}
					placeholder={0}
					value={priceRange[0]}
					// disabled={min === undefined ? false : true}
					style={{ border: '1px solid #e4e3e3' }}
					onChange={(e) => handleMinChange(e, options)}
				/>
				<input
					type="number"
					className="w-full rounded h-10 text-sm sm:h-8"
					max={300}
					placeholder={999999}
					value={priceRange[1]}
					// disabled={max === undefined ? false : true}
					style={{ border: '1px solid #e4e3e3' }}
					onChange={(e) => handleMaxChange(e, options)}
				/>
			</div>
		</div>
	);
}

export default PriceFilter;

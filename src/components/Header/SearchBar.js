import { getSearchResults } from '@/api/axios';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Search from '@/assets/search.svg';
import Recent from '@/assets/recent.svg';
import Image from 'next/image';

function SearchBar() {
	const [searchResults, setSearchResults] = useState();
	const [input, setInput] = useState('');
	const [brands, setBrands] = useState([]);
	const [recentSearch, setRecentSearch] = useState(false);
	let showRecentSearch = true;
	const ref = useRef();

	useEffect(() => {
		const interval = setInterval(() => {
			if (
				localStorage.getItem('pastSearches') &&
				recentSearch !== JSON.parse(localStorage.getItem('pastSearches'))
			) {
				setRecentSearch(JSON.parse(localStorage.getItem('pastSearches')));
				clearInterval(interval);
			}
		}, 1000);
	}, [input, recentSearch]);

	useEffect(() => {
		let timeOut = setTimeout(() => {
			showRecentSearch = false;
			if (input.trim().length >= 2) {
				getSearchResults(input).then(
					(res) => {
						if (res && res.status === 'SUCCESS') {
							setSearchResults(res.dataObject);
							showRecentSearch = true;
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
		setBrands(JSON.parse(localStorage.getItem('brands')));
		const checkIfClickedOutside = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setSearchResults();
				setInput('');
			}
		};
		document.addEventListener('mousedown', checkIfClickedOutside);
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, []);

	const handleChange = (e) => {
		setInput(e.target.value);

		if (
			e.target.value.trim().length < 2 &&
			searchResults &&
			searchResults.results
		) {
			setSearchResults();
		}
	};

	return (
		<Fragment>
			<div className="flex-1 relative custom-scroll h-8" ref={ref}>
				<div className="flex w-full rounded bg-m-white-1 ">
					<input
						placeholder="Search with make and models . . ."
						onChange={handleChange}
						value={input}
						className={`px-4 pt-3 py-3 h-8 w-full bg-m-white-1 text-smallFontSize font-Roboto-Regular rounded bg-no-repeat ${
							searchResults && 'rounded-b-none'
						}`}
						style={{ boxShadow: '0px 2px 3px #0000000A' }}
					/>
					<div className=" flex items-center px-4 cursor-pointer hover:bg-gray-200 hover:rounded-r-md">
						<Image src={Search} width={20} height={20} alt="" />
					</div>
				</div>
				{searchResults && (
					<div
						className="absolute z-20 left-0 right-0 rounded-b-lg  bg-white overflow-y-auto text-black"
						style={{
							boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.16)',
							maxHeight: 400,
						}}
					>
						{searchResults.brandList && searchResults.brandList.length > 0 && (
							<p className="px-4 py-3 block border-b text-m-green">Brand</p>
						)}
						{searchResults.brandList &&
							searchResults.brandList.length > 0 &&
							searchResults.brandList.map((item) => (
								<ListItem
									clicked={() => {
										setInput('');
										setSearchResults();
										showRecentSearch = true;
									}}
									key={item}
									make={item}
									makeLink
								/>
							))}
						{searchResults.results && searchResults.results.length > 0 && (
							<p className="px-4 py-3 block border-b text-m-green">
								Mobile Model
							</p>
						)}

						{searchResults.results &&
							searchResults.results.length > 0 &&
							searchResults.results.map((item) => (
								<ListItem
									clicked={() => {
										setInput('');
										setSearchResults();
										showRecentSearch = true;
									}}
									key={item}
									make={
										searchResults &&
										searchResults.marketingNameAndMakeMap &&
										searchResults.marketingNameAndMakeMap[item]
									}
									marketingName={item}
								/>
							))}
						{searchResults &&
							(!searchResults.results ||
								(searchResults.results && searchResults.results.length < 1)) &&
							(!searchResults.brandList ||
								(searchResults.brandList &&
									searchResults.brandList.length < 1)) && (
								<ListItem
									clicked={() => {
										setInput('');
										setSearchResults();
										showRecentSearch = true;
									}}
								>
									Not found
								</ListItem>
							)}
						<div>
							{recentSearch && showRecentSearch && recentSearch.length > 0 && (
								<>
									<p className="px-4 py-3 block border-b text-primary text-regularFontSize">
										Recent Searches
									</p>
									<div>
										{recentSearch.map((item, index) => (
											<div
												className="ml-4  flex items-center hover:bg-gray-100"
												key={index}
											>
												<Image src={Recent} width={20} height={20} alt="" />
												<ListItem
													clicked={() => {
														setInput('');
														setSearchResults();
														showRecentSearch = true;
													}}
													marketingName={item}
													make={item && item.split(' ')[0]}
												/>
											</div>
										))}
									</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</Fragment>
	);
}

export default SearchBar;

const ListItem = ({ make, makeLink, marketingName, children, clicked }) => {
	if (children) {
		return (
			<p
				className="px-6 py-3 block border-b last:border-0 capitalize"
				onClick={clicked}
			>
				{children}
			</p>
		);
	}

	const pastSearches = () => {
		let pastSearch = [];
		if (localStorage.getItem('pastSearches')) {
			pastSearch = localStorage.getItem('pastSearches');
			pastSearch = JSON.parse(pastSearch);
			pastSearch = pastSearch.filter(
				(item) => item !== (marketingName || make)
			);
		}
		if (pastSearch.length >= 5) {
			pastSearch.shift();
		}
		pastSearch.push(marketingName || make);
		localStorage.setItem('pastSearches', JSON.stringify(pastSearch));
	};
	const handleClick = () => {
		clicked();
		pastSearches();
		window.open(
			makeLink
				? `/product/buy-old-refurbished-used-mobiles/${make}/`
				: `/product/buy-old-refurbished-used-mobiles/${make}/${marketingName}`,
			'_blank'
		);
	};

	return (
		<div onClick={() => handleClick()} className="hover:bg-gray-100">
			<a
				className="px-6 py-3 block border-b last:border-0 capitalize  cursor-pointer"
				onClick={clicked}
			>
				{marketingName || make}
			</a>
		</div>
	);
};

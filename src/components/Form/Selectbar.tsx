import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import CurrentLocation from '@/assets/currentlocation.svg';
import LocationIcon from '@/assets/location2.svg';
import SearchIcon from '@/assets/search.svg';
import useDebounce from '@/hooks/useDebounce';
import {
	updateLocationAtom,
	updateLocationLatLongAtom,
} from '@/store/location';
import { Search } from '@/utils/fetchers/location';
import { useAtom } from 'jotai';
import Image from 'next/image';

interface Location {
	locality: string;
	city: string;
	state: string;
	latitude: number;
	longitude: number;
	location: string;
	type: string;
}

interface LocationInputBarProps {
	setOpen: (value: boolean) => void;
}

function LocationInputBar({ setOpen }: LocationInputBarProps) {
	const [recentSearch, setRecentSearch] = useState<Location[]>(
		JSON.parse(localStorage.getItem('pastLocSearches') || '[ ]') || [
			{
				type: 'Country',
				location: 'India',
				city: 'India',
				state: 'India',
				latitude: 0,
				longitude: 0,
			},
		]
	);
	const [, setLocation] = useAtom(updateLocationAtom);
  const [, setLatLong] = useAtom(updateLocationLatLongAtom);


	let indiaobj = [
		{
			type: 'Country',
			location: 'India',
			city: 'India',
			state: 'India',
			latitude: 0,
			longitude: 0,
		},
	];

	const [input, setInput] = useState('');
	const [inputClicked, setInputClicked] = useState(false); // New state variable
	const debouncedSearchText = useDebounce(input, 400);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setInput('');
			}
		};

		document.addEventListener('mousedown', checkIfClickedOutside);
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	useEffect(() => {
		const searchLocations = async () => {
			if (input.trim().length > 2) {
				handleInputClickForLoc();
			}
		};

		const timeout = setTimeout(searchLocations, 300);
		return () => clearTimeout(timeout);
	}, [input]);

	const { data: searchResults } = useQuery({
		queryKey: ['Searchlocation', debouncedSearchText, recentSearch],
		queryFn: async () => {
			if (debouncedSearchText) {
				const resp = await Search(debouncedSearchText);
				console.log(resp);
				return resp;
			} else {
				console.log(recentSearch);
				return recentSearch.slice().reverse();
			}
		},
		enabled: inputClicked, // Only execute the query if inputClicked is true
	});

  const handleNearme = async () => {
		if (!('geolocation' in navigator)) {
			onError();
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	};

  const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	const onSuccess = async (location: any) => {
		await setLatLong(location);
		setOpen(false);
	}

	const onError = () => {
		setLocation({
      locality : "",
      city : "India", 
      state : "India",
      latitude : 0,
      longitude : 0,
      location: "India"
    });
	};

	const handleLocationSelection = (location: any) => {
		// Handle the selected location
		console.log('Selected location:', location);

		let locationObj = {
			locality: location.locality,
			city: location.city,
			state: location.state,
			latitude: location.latitude,
			longitude: location.longitude,
			location: location.location,
			type: 'City',
		};
		console.log(locationObj);
		let pastLocSearches = [];

		if (localStorage.getItem('pastLocSearches')) {
			pastLocSearches = JSON.parse(
				localStorage.getItem('pastLocSearches') || '[]'
			);
		}

		// Remove the first search if the array length exceeds 5
		if (pastLocSearches?.length >= 5) {
			pastLocSearches.shift();
		}
		locationObj.locality
			? (locationObj.type = 'Area')
			: (locationObj.type = 'City');

		if (
			!pastLocSearches.some((loc: any) => loc.location === locationObj.location)
		) {
			pastLocSearches.push(locationObj);
			localStorage.setItem('pastLocSearches', JSON.stringify(pastLocSearches));
		}
		setLocation(locationObj);
		setOpen(false);
	};

	const handleInputClick = () => {
		setInputClicked(!inputClicked);
	};
	const handleInputClickForLoc = () => {
		setInputClicked(true);
	};

	return (
		<div className="relative" ref={ref}>
			<input
				placeholder="Search location..."
				onChange={handleChange}
				onClick={handleInputClick} // Call handleInputClick when the input is clicked
				value={input}
				className="w-full bg-white text-gray-800 focus:outline-none rounded-md py-2 pl-2 pr-10 text-xs"
				style={{ boxShadow: '0px 2px 3px #0000000A' }}
			/>
			{searchResults && inputClicked && (
				<>
					<div
						className="absolute z-20 left-0 right-0 rounded-lg bg-white overflow-y-auto text-black"
						style={{
							boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.16)',
							maxHeight: 400,
						}}
					>
						{input.trim().length == 0 && inputClicked && (
							<>
								<p className="px-4 py-3 text-primary text-xs border-b flex items-center hover:bg-gray-200" onClick={handleNearme}>
									<Image
										src={CurrentLocation}
										width={16}
										height={16}
										alt="Location Icon"
										className="mr-2"
									/>
									<span className="text-black-600 ml-2">Use Your location</span>
								</p>

								<p className="px-3 py-2  border-b  hover:bg-gray-200">
									{indiaobj.map((location: any) => (
										<div
											key={location.location}
											className="hover:bg-gray-200 cursor-pointer rounded-md py-2 pl-2 pr-10 text-xs flex items-center"
											onClick={() => handleLocationSelection(location)}
										>
											<Image
												src={LocationIcon}
												width={16}
												height={16}
												alt="Location Icon"
												className="mr-2"
											/>
											<div className="flex items-center">
												<div className="ml-1" style={{ maxWidth: '250px' }}>
													{location.location}
												</div>
											</div>
										</div>
									))}
								</p>

								{recentSearch?.some((item) => item.location) && (
									<p className="px-4 py-4 block border-b text-primary text-xs">
										Recent Searches
									</p>
								)}
							</>
						)}

						{searchResults.map((location: any) => (
							<div
								key={location.location}
								className="hover:bg-gray-200 cursor-pointer rounded-md py-2 pl-2 pr-10 text-xs flex items-center"
								onClick={() => handleLocationSelection(location)}
							>
								<Image
									src={LocationIcon}
									width={16}
									height={16}
									alt="Location Icon"
									className="mr-2"
								/>
								<div className="flex">
									<div className="ml-1" style={{ maxWidth: '150px' }}>
										<div className="flex flex-col items-start">
											<span>{location.location}</span>
											<div className="flex justify-end mt-1">
												<span
													className="border border-gray-400 p-[2px] text-xs flex justify-end"
													style={{ fontSize: '10px' }}

												>
													{location.type}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}

			<div className="absolute right-2 top-0 bottom-0 flex items-center">
				<Image src={SearchIcon} width={20} height={20} alt="search icon" />
			</div>
		</div>
	);
}

export default LocationInputBar;

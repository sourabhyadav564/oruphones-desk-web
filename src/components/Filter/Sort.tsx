import { Dialog, Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import DesktopFilter from './DesktopFilter';
import ArrowDown from '@/assets/arrow-drop-down.svg';
import Cross from '@/assets/cross.svg';
import Filter from '@/assets/filter.svg';
import useFilterOptions from '@/hooks/useFilterOptions';
import filterAtom from '@/store/productFilter';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';

const sortsAtomRW = atom(
	(get) => {
		const sort = get(filterAtom)?.sort;
		if (sort) {
			if (sort.price === 1) {
				return 'Price - Low to High';
			} else if (sort.price === -1) {
				return 'Price - High to Low';
			} else if (sort.date === -1) {
				return 'Newest First';
			} else if (sort.latlong === 1) {
				return 'Distance';
			}
		}
		return 'Featured';
	},
	(get, set, update: string) => {
		let tempUpdate:
			| {
					price?: number;
					date?: number;
					latlong? : number;
			  }
			| undefined;
		switch (update) {
			case 'Featured': {
				tempUpdate = undefined;
				break;
			}
			case 'Price - High to Low': {
				tempUpdate = {
					price: -1,
				};
				break;
			}
			case 'Price - Low to High': {
				tempUpdate = {
					price: 1,
				};
				break;
			}
			case 'Newest First': {
				tempUpdate = {
					date: -1,
				};
				break;
			}
			case 'Distance': {
				tempUpdate = {
					latlong: 1,
				};
			}
		}
		set(filterAtom, (prev) => ({
			...prev,
			sort: tempUpdate,
		}));
	}
);

export default function Sort({
	sortOptions,
	setFilters,
	makeName,
}: {
	sortOptions: any;
	setFilters: any;
	makeName: string;
}) {
	const [sorts, setSorts] = useAtom(sortsAtomRW);
	const { filterOptions } = useFilterOptions();
	let tempFilters = filterOptions;
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	function handleOnChange(data: any) {
		setSorts(data.name);
		// Set active
	}

	return (
		<Fragment>
			<div className="relative z-10 flex items-baseline justify-end py-4">
				<div className="flex items-center">
					<Menu as="div" className=" relative inline-block text-left ">
						<div>
							<Menu.Button className="group inline-flex justify-center px-4 py-2 rounded-md bg-white text-sm font-Roboto-Regular text-regularFontSize text-gray-700 hover:text-gray-900 border">
								{sorts || 'Sort'}
								<Image
									src={ArrowDown}
									width={20}
									height={20}
									alt=""
									className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
								/>
							</Menu.Button>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white focus:outline-none">
								<div className="py-1">
									{sortOptions.map((option: any) => (
										<Menu.Item key={option.name}>
											{({ active }) => (
												<a
													onClick={(e) => handleOnChange(option)}
													className={`${
														option.name === sorts
															? 'bg-gray-100 font-Roboto-Medium text-regularFontSize'
															: 'text-gray-700'
													} ${
														active &&
														'bg-gray-100 font-Roboto-Medium text-regularFontSize'
													} block px-4 py-2 text-sm`}
												>
													{option.name}
												</a>
											)}
										</Menu.Item>
									))}
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
					<button
						type="button"
						className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 hidden"
						onClick={() => setMobileFiltersOpen(true)}
					>
						<span className="sr-only">Filters</span>
						<Image src={Filter} width={20} height={20} alt="" />
					</button>
				</div>
			</div>
			<Transition.Root appear={true} show={mobileFiltersOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 flex z-40 lg:hidden"
					onClose={setMobileFiltersOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
					>
						<div className="ml-auto relative max-w-xs w-full h-[100vh]  bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto ">
							<div className="px-4 flex items-center justify-between">
								<h2 className="text-lg font-medium text-gray-900">Filters</h2>
								<button
									type="button"
									className="-mr-2 w-10 h-10  p-2 rounded-md flex items-center justify-center text-gray-400"
									onClick={() => setMobileFiltersOpen(false)}
								>
									<span className="sr-only">Close menu</span>
									<Image src={Cross} width={10} height={10} alt="" />
								</button>
							</div>
							<div className="">
								<DesktopFilter
									filterOptions={tempFilters}
									setFilters={setFilters}
									key={makeName}
								/>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition.Root>
		</Fragment>
	);
}

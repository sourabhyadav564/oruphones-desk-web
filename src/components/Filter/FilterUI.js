import { Disclosure } from '@headlessui/react';
import { Fragment } from 'react';
import { selectedBrandRWAtom } from './DesktopFilter';
import InfoCircle from '@/assets/infocircle2.svg';
import Minus from '@/assets/minus.svg';
import Plus from '@/assets/plus.svg';
import { useAtomValue } from 'jotai';
import Image from 'next/image';

function FilterUI({ optionObj, setter, selected, openPopup }) {
	const readBrand = useAtomValue(selectedBrandRWAtom);
	const handleChange = (e, value) => {
		const { checked } = e.target;

		if (optionObj && optionObj.id === 'verification') {
			if (checked) {
				if (value === 'all') {
					const computed = optionObj?.options.map((i) => i.value);
					setter(computed);
				} else {
					let computed = [...selected, value];
					setter(computed);
				}
			} else {
				if (value === 'all') {
					setter([]);
				} else {
					const computed = selected.filter((i) => i !== value);
					setter(computed);
				}
			}
		} else {
			if (checked) {
				if (value === 'all') {
					setter(optionObj?.options.map((i) => i.value));
				} else {
					const computed = [...selected, value];

					if (computed.length === optionObj?.options.length - 1) {
						computed.push('all');
					}
					setter(computed);
				}
			} else {
				if (value === 'all') {
					setter([]);
				} else {
					const computed = selected.filter((i) => i !== value);
					if (
						computed.length < optionObj?.options.length &&
						computed.includes('all')
					) {
						computed.splice(computed.indexOf('all'), 1);
					}
					setter(computed);
				}
			}
		}
	};

	return (
		<Disclosure defaultOpen as="div" className="border-b border-gray-200 py-4 ">
			{({ open }) => (
				<Fragment>
					<h3 className="-my-3 flow-root">
						<Disclosure.Button className="py-3  w-full flex items-center justify-between text-sm text-gray-900 hover:text-gray-500">
							<p className="flg:font-Roboto-Regular gap-1 mt-0.5 font-Roboto-Semibold lg:text-regularFontSize text-smallFontSize  text-m-green flex whitespace-nowrap items-center">
								{optionObj?.name}
								{openPopup && (
									<Image
										src={InfoCircle}
										width={12}
										height={12}
										className="text-sm cursor-pointer ml-1 "
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											openPopup();
										}}
										alt="someImageidk"
									/>
								)}
							</p>
							<span className="md:ml-6 ml-2 flex items-center">
								{open ? (
									<Image src={Minus} width={20} height={20} />
								) : (
									<Image src={Plus} width={20} height={20} />
								)}
							</span>
						</Disclosure.Button>
					</h3>
					<Disclosure.Panel className="pt-6  ">
						<div className="space-y-4">
							{optionObj?.options.map((option, optionIdx) => (
								<div
									key={option.value}
									className="flex items-center font-Roboto-Light text-smallFontSize select-none"
								>
									<input
										id={`filter-${optionObj?.id}-${optionIdx}`}
										name={`${optionObj?.id}`}
										type="checkbox"
										checked={
											selected?.includes(option.value) ||
											readBrand?.includes(
												option.value.charAt(0).toUpperCase() +
													option.value.slice(1)
											)
										}
										disabled={option?.disabled}
										onChange={(e) => handleChange(e, option.value)}
										className="h-4 w-4 border-gray-300 rounded text-m-green focus:ring-transparent  cursor-pointer select-none"
									/>
									<label
										htmlFor={`filter-${optionObj?.id}-${optionIdx}`}
										className="ml-3 text-sm text-gray-600 capitalize"
									>
										{option.label}
									</label>
								</div>
							))}
						</div>
					</Disclosure.Panel>
				</Fragment>
			)}
		</Disclosure>
	);
}

export default FilterUI;

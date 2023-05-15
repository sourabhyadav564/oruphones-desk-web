import React from 'react';
import Sort from './Sort';
import DesktopFilter from './DesktopFilter';
import useFilterOptions from '@/hooks/useFilterOptions';
import { useRouter } from 'next/router';

const sortOptions = [
	{ name: 'Price - Low to High', href: '#', current: false },
	{ name: 'Price - High to Low', href: '#', current: false },
	{ name: 'Newest First', href: '#', current: false },
	{ name: 'Featured', href: '#', current: true },
];

function Filter({
	listingsCount,
	children,
	setApplySort=()=>{},
	setApplyFilter=()=>{},
	makeName='Apple',
	makename=null,
}) {
	const { filterOptions } = useFilterOptions();
	const router = useRouter();
	let tempFilters = filterOptions;

	if (filterOptions && makeName !== null && makeName !== undefined) {
		tempFilters = filterOptions.map((i) =>
			i.id === 'brand'
				? {
						...i,
						options: [
							{
								value: makeName,
								label: makeName,
								active: true,
								disabled: true,
							},
						],
				  }
				: i
		);
	} else if (filterOptions && router.pathname === '/product/models') {
		tempFilters = filterOptions.filter((i) => i.id === 'brand');
	} else if (
		filterOptions &&
		(router.query.categoryType == 'brandWarranty' ||
			router.query.categoryType == 'sellerWarranty' ||
			router.query.categoryType == 'warranty')
	) {
		tempFilters = filterOptions.map((i) =>
			i.id === 'warranty' &&
			router.query.categoryType.toString() == 'brandWarranty'
				? {
						...i,
						options: [
							{
								value: 'Brand Warranty',
								label: 'Brand Warranty',
								checked: true,
								active: true,
								disabled: true,
							},
						],
				  }
				: i.id === 'warranty' &&
				  router.query.categoryType.toString() == 'sellerWarranty'
				? {
						...i,
						options: [
							{
								value: 'Seller Warranty',
								label: 'Seller Warranty',
								checked: true,
								active: true,
								disabled: true,
							},
						],
				  }
				: i.id === 'warranty' &&
				  router.query.categoryType.toString() == 'warranty'
				? {
						...i,
						options: [
							{
								value: 'All',
								label: 'All',
								checked: true,
								active: true,
								disabled: true,
							},
						],
				  }
				: i
		);
	} else if (filterOptions && router.query.categoryType == 'like new') {
		tempFilters = filterOptions.map((i) =>
			i.id === 'condition'
				? {
						...i,
						options: [
							{
								value: 'Like New',
								label: 'Like New',
								checked: true,
								active: true,
								disabled: true,
							},
						],
				  }
				: i
		);
	} else if (filterOptions && router.query.categoryType == 'verified') {
		tempFilters = filterOptions.map((i) =>
			i.id === 'verification'
				? {
						...i,
						options: [
							{
								value: 'verified',
								label: 'Verified',
								checked: true,
								active: true,
								disabled: true,
							},
						],
				  }
				: i
		);
	}

	if (
		filterOptions &&
		(router.query['makeName'] == 'apple' ||
			router.query['makeName'] == 'Apple' ||
			makename == 'Apple' ||
			makename == 'apple')
	) {
		tempFilters = filterOptions.map((i) =>
			i.id == 'Ram'
				? {
						...i,
						options: [
							{
								value: 'All',
								label: 'All',
								disabled: true,
								checked: true,
								active: false,
							},
						],
				  }
				: i
		);
	}

	return (
		<React.Fragment>
			<div className="flex justify-end items-center hover:cursor-pointer">
				<Sort
					sortOptions={sortOptions}
					setApplySort={setApplySort}
					filterOptions={tempFilters}
					setFilters={setApplyFilter}
					makeName={makeName}
				/>
			</div>
			<section aria-labelledby="products-heading" className="">
				<div className="grid grid-cols-4 gap-x-6">
					<div className="">
						<DesktopFilter
							setFilters={setApplyFilter}
							filterOptions={tempFilters}
							key={makeName}
						/>
					</div>
					<div className="col-span-3">{children}</div>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Filter;

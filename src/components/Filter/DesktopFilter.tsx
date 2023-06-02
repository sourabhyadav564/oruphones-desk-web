import { useState } from 'react';
import BrandFilter from './BrandFilter';
import ConditionFilter from './ConditionFilter';
import PriceFilter from './PriceFilter';
import RamFilter from './RamFilter';
import StorageFilter from './StorageFilter';
import VerificationFilter from './VerificationFilter';
import WarrantyFilter from './WarrantyFilter';
import ConditionInfoPopup from '@/components/Popup/ConditionInfoPopup';
import VerifiedInfoPopup from '@/components/Popup/VerifiedInfoPopup';
import WarrantyInfo from '@/components/Popup/WarrantyInfo';
import filterAtom from '@/store/productFilter';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';

// TODO: implement warranty filter logic

export const selectedBrandRWAtom = atom(
	(get) => get(filterAtom)?.make || [],
	(get, set, update: string[]) => {
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { make: update } : { make: undefined }),
		}));
	}
);
export const selectedConditionRWAtom = atom(
	(get) => get(filterAtom)?.condition || [],
	(get, set, update: string[]) => {
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0
				? { condition: update }
				: { condition: undefined }),
		}));
	}
);
const selectedStorageRWAtom = atom(
	(get) => get(filterAtom)?.storage || [],
	(get, set, update: string[]) => {
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { storage: update } : { storage: undefined }),
		}));
	}
);
const selectedWarrantyRWAtom = atom(
	(get) => get(filterAtom)?.warranty || [],
	(get, set, update: string[]) => {
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { warranty: update } : { warranty: undefined }),
		}));
	}
);

const selectedRamRWAtom = atom(
	(get) => get(filterAtom)?.ram || [],
	(get, set, update: string[]) => {
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { ram: update } : { ram: undefined }),
		}));
	}
);
const selectedVerificationRWAtom = atom(
	(get) => (get(filterAtom)?.verified ? ['verified', 'all'] : []),
	(get, set, update: string[]) => {
		set(filterAtom, (prev) => ({
			...prev,
			...(update.length > 0 && update.includes('verified')
				? { verified: true }
				: { verified: undefined }),
		}));
	}
);
const selectedPriceRangeRWAtom = atom(
	(get) => get(filterAtom)?.priceRange || [],
	(get, set, update: number[]) => {
		let computedPriceRange: any = structuredClone(update);
		if (computedPriceRange && computedPriceRange.length > 0) {
			if (computedPriceRange[0] === 0) {
				computedPriceRange[0] = null;
			}
			if (computedPriceRange[1] === 0) {
				computedPriceRange[1] = null;
			}
		}
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0
				? { priceRange: computedPriceRange }
				: { priceRange: undefined }),
		}));
	}
);

//TODO: map types for filterOptions
const DesktopFilter = ({ filterOptions, defaultBrands }: any) => {
	const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandRWAtom);
	const [selectedCondition, setSelectedCondition] = useAtom(
		selectedConditionRWAtom
	);
	const [selectedStorage, setSelectedStorage] = useAtom(selectedStorageRWAtom);
	const [selectedWarranty, setSelectedWarranty] = useAtom(
		selectedWarrantyRWAtom
	);
	const [selectedVerification, setSelectedVerification] = useAtom(
		selectedVerificationRWAtom
	);
	const [selectedPriceRange, setSelectedPriceRange] = useAtom(
		selectedPriceRangeRWAtom
	);
	const [selectedRam, setSelectedRam] = useAtom(selectedRamRWAtom);

	const [openConditionPopup, setOpenConditionPopup] = useState(false);
	const [openVerificationPopup, setOpenVerificationPopup] = useState(false);
	const [openWarrantyPopup, setWarrantyPopup] = useState(false);

	const router = useRouter();

	return (
		<form className="block bg-m-white p-6 rounded shadow">
			<h3 className="sr-only">Filters</h3>
			{filterOptions &&
				filterOptions.map((section: any) =>
					section?.id === 'price' ? (
						<PriceFilter
							options={section}
							key={section?.id}
							priceRange={selectedPriceRange}
							setPriceRange={setSelectedPriceRange}
							router={router}
						/>
					) : section?.id === 'brand' ? (
						<BrandFilter
							options={defaultBrands}
							key={section?.id}
							setter={setSelectedBrand}
							selected={selectedBrand}
							router={router}
						/>
					) : section?.id === 'condition' ? (
						<ConditionFilter
							options={section}
							key={section?.id}
							setter={setSelectedCondition}
							selected={selectedCondition}
							router={router}
							openPopup={() => setOpenConditionPopup(true)}
						/>
					) : section?.id === 'storage' ? (
						<StorageFilter
							options={section}
							key={section?.id}
							setter={setSelectedStorage}
							selected={selectedStorage}
							router={router}
						/>
					) : section?.id === 'warranty' ? (
						<WarrantyFilter
							options={section}
							key={section?.id}
							setter={setSelectedWarranty}
							selected={selectedWarranty}
							router={router}
							openPopup={() => setWarrantyPopup(true)}
						/>
					) : section?.id === 'Ram' ? (
						<RamFilter
							options={section}
							key={section?.id}
							router={router}
							setter={setSelectedRam}
							selected={selectedRam}
						/>
					) : section?.id === 'verification' ? (
						<VerificationFilter
							options={section}
							key={section?.id}
							setter={setSelectedVerification}
							selected={selectedVerification}
							router={router}
							openPopup={() => setOpenVerificationPopup(true)}
						/>
					) : null
				)}

			<WarrantyInfo
				open={openWarrantyPopup}
				setOpen={setWarrantyPopup}
			></WarrantyInfo>
			<ConditionInfoPopup
				open={openConditionPopup}
				setOpen={setOpenConditionPopup}
			></ConditionInfoPopup>
			<VerifiedInfoPopup
				open={openVerificationPopup}
				setOpen={setOpenVerificationPopup}
			></VerifiedInfoPopup>
		</form>
	);
};

export default DesktopFilter;

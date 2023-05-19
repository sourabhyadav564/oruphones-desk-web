import { useState } from 'react';
import BrandFilter from './BrandFilter';
import ColorFilter from './ColorFilter';
import ConditionFilter from './ConditionFilter';
import StorageFilter from './StorageFilter';
import PriceFilter from './PriceFilter';
import WarrantyFilter from './WarrantyFilter';
import VerificationFilter from './VerificationFilter';
import { useRouter } from 'next/router';
import ConditionInfoPopup from '../Popup/ConditionInfoPopup';
import VerifiedInfoPopup from '../Popup/VerifiedInfoPopup';
import RamFilter from './RamFilter';
import WarrantyInfo from '../Popup/WarrantyInfo';
import filterAtom from '@/store/productFilter';
import { atom, useAtom } from 'jotai';

// TODO: implement warranty filter logic

const selectedBrandAtom = atom<string[]>([]);
const selectedBrandRWAtom = atom(
	(get) => get(selectedBrandAtom),
	(get, set, update: string[]) => {
		set(selectedBrandAtom, update);
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { brand: update } : { brand: undefined }),
		}));
	}
);
const selectedConditionAtom = atom<string[]>([]);
export const selectedConditionRWAtom = atom(
	(get) => get(selectedConditionAtom),
	(get, set, update: string[]) => {
		set(selectedConditionAtom, update);
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0
				? { condition: update }
				: { condition: undefined }),
		}));
	}
);
const selectedColorAtom = atom<string[]>([]);
const selectedColorRWAtom = atom(
	(get) => get(selectedColorAtom),
	(get, set, update: string[]) => {
		set(selectedColorAtom, update);
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { color: update } : { color: undefined }),
		}));
	}
);
const selectedRamAtom = atom<string[]>([]);
const selectedRamRWAtom = atom(
	(get) => get(selectedRamAtom),
	(get, set, update: string[]) => {
		set(selectedRamAtom, update);
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { ram: update } : { ram: undefined }),
		}));
	}
);
const selectedStorageAtom = atom<string[]>([]);
const selectedStorageRWAtom = atom(
	(get) => get(selectedStorageAtom),
	(get, set, update: string[]) => {
		set(selectedStorageAtom, update);
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { storage: update } : { storage: undefined }),
		}));
	}
);
const selectedWarrantyAtom = atom<string[]>([]);
const selectedWarrantyRWAtom = atom(
	(get) => get(selectedWarrantyAtom),
	(get, set, update: string[]) => {
		set(selectedWarrantyAtom, update);
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0 ? { warranty: update } : { warranty: undefined }),
		}));
	}
);
const selectedVerificationAtom = atom<string[]>([]);
const selectedVerificationRWAtom = atom(
	(get) => get(selectedVerificationAtom),
	(get, set, update: string[]) => {
		set(selectedVerificationAtom, update);
		set(filterAtom, (prev) => ({
			...prev,
			...(update.length > 0 && update.includes('verified')
				? { verified: true }
				: { verified: undefined }),
		}));
	}
);
const selectedPriceRangeAtom = atom<number[]>([]);
const selectedPriceRangeRWAtom = atom(
	(get) => get(selectedPriceRangeAtom),
	(get, set, update: number[]) => {
		set(selectedPriceRangeAtom, update);
		set(filterAtom, (prev) => ({
			...prev,
			...(update?.length > 0
				? { priceRange: update }
				: { priceRange: undefined }),
		}));
	}
);

//TODO: map types for filterOptions
const DesktopFilter = ({ filterOptions, defaultBrands }: any) => {
	// const [selectedBrand, setSelectedBrand] = useState([]);
	// const [selectedCondition, setSelectedCondition] = useState();
	// const [selectedColor, setSelectedColor] = useState();
	// const [selectedRam, setSelectedRam] = useState();
	// const [selectedStorage, setSelectedStorage] = useState();
	// const [selectedWarranty, setSelectedWarranty] = useState();
	// const [selectedVerification, setSelectedVerification] = useState();
	// const [selectedPriceRange, setSelectedPriceRange] = useState();
	const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandRWAtom);
	const [selectedCondition, setSelectedCondition] = useAtom(
		selectedConditionRWAtom
	);
	const [selectedColor, setSelectedColor] = useAtom(selectedColorRWAtom);
	const [selectedRam, setSelectedRam] = useAtom(selectedRamRWAtom);
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
					) : section?.id === 'color' ? (
						<ColorFilter
							options={section}
							key={section?.id}
							setter={setSelectedColor}
							selected={selectedColor}
							router={router}
						/>
					) : section?.id === 'storage' ? (
						<StorageFilter
							options={section}
							key={section?.id}
							setter={setSelectedStorage}
							selected={selectedStorage}
							router={router}
						/>
					) : section?.id === 'Ram' ? (
						<RamFilter
							options={section}
							key={section?.id}
							setter={setSelectedRam}
							selected={selectedRam}
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

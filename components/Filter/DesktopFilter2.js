import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import ConditionFilter from "./ConditionFilter";
import StorageFilter from "./StorageFilter";
import PriceFilter from "./PriceFilter";
import WarrantyFilter from "./WarrantyFilter";
import VerificationFilter from "./VerificationFilter";
import { useRouter } from "next/router";
import ConditionInfoPopup from "../Popup/ConditionInfoPopup";
import VerifiedInfoPopup from "../Popup/VerifiedInfoPopup";
import RamFilter from "./RamFilter";
import WarrantyPopup from "../Popup/WarrantyPopup";
import WarrantyInfo from "../Popup/WarrantyInfo";
import { compareDocumentPosition } from "domutils";

const DesktopFilter = ({ setFilters, filterOptions }) => {
    const [selectedBrand, setSelectedBrand] = useState();
    const [selectedCondition, setSelectedCondition] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [selectedRam, setSelectedRam] = useState();
    const [selectedStorage, setSelectedStorage] = useState();
    const [selectedWarranty, setSelectedWarranty] = useState();
    const [selectedVerification, setSelectedVerification] = useState();
    const [selectedPriceRange, setSelectedPriceRange] = useState();
    const [openConditionPopup, setOpenConditionPopup] = useState(false);
    const [openVerificationPopup, setOpenVerificationPopup] = useState(false);
    const [openWarrantyPopup, setWarrantyPopup] = useState(false);

    const router = useRouter();


    useEffect(() => {
        setFilters((prev) => ({ ...prev, condition: selectedCondition?.filter((val) => val !== "all") }));
    }, [selectedCondition]);



    return (
        <form className="block bg-m-white p-6 rounded shadow">
            <h3 className="sr-only">Filtes</h3>
            {filterOptions &&
                filterOptions.map((section) =>
                    section?.id === "condition" ? (
                        <ConditionFilter options={section} key={section?.id} setter={setSelectedCondition} selected={selectedCondition} router={router} openPopup={() => setOpenConditionPopup(true)} />
                    ) : null
                )}


            <ConditionInfoPopup open={openConditionPopup} setOpen={setOpenConditionPopup} ></ConditionInfoPopup>

        </form>
    );
};

export default DesktopFilter;

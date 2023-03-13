import { useEffect, useState } from "react";
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
import WarrantyInfo from "../Popup/WarrantyInfo";

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
    setFilters((prev) => ({ ...prev, brand: selectedBrand?.filter((val) => val !== "all") }));
  }, [selectedBrand]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, condition: selectedCondition?.filter((val) => val !== "all") }));
  }, [selectedCondition]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, color: selectedColor?.filter((val) => val !== "all") }));
  }, [selectedColor]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, Ram: selectedRam?.filter((val) => val !== "all") }));
  }, [selectedRam]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, storage: selectedStorage?.filter((val) => val !== "all") }));
  }, [selectedStorage]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, warranty: selectedWarranty?.filter((val) => val !== "all") }));
  }, [selectedWarranty]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, verification: selectedVerification?.includes("all") ? [] : selectedVerification }));
  }, [selectedVerification]);

  useEffect(() => {
    
    if (selectedPriceRange && selectedPriceRange?.min && selectedPriceRange?.max && selectedPriceRange?.min < selectedPriceRange?.max) {
      setFilters((prev) => ({ ...prev, priceRange: selectedPriceRange }));
      
    }
  }, [selectedPriceRange]);


  return (
    <form className="block bg-m-white p-6 rounded shadow">
      <h3 className="sr-only">Filtes</h3>
      {filterOptions &&
        filterOptions.map((section) =>
          section?.id === "price" ? (
            <PriceFilter options={section} key={section?.id} setPriceRange={setSelectedPriceRange} selected={selectedPriceRange} router={router} />
          ) : section?.id === "brand" ? (
            <BrandFilter options={section} key={section?.id} setter={setSelectedBrand} selected={selectedBrand} router={router} />
          ) : section?.id === "condition" ? (
            <ConditionFilter options={section} key={section?.id} setter={setSelectedCondition} selected={selectedCondition} router={router} openPopup={() => setOpenConditionPopup(true)} />
          ) : section?.id === "color" ? (
            <ColorFilter options={section} key={section?.id} setter={setSelectedColor} selected={selectedColor} router={router} />
          ) : section?.id === "storage" ? (
            <StorageFilter options={section} key={section?.id} setter={setSelectedStorage} selected={selectedStorage} router={router} />
          ) : section?.id === "Ram" ? (
            <RamFilter options={section} key={section?.id} setter={setSelectedRam} selected={selectedRam} router={router} />
          ) : section?.id === "warranty" ? (
            <WarrantyFilter options={section} key={section?.id} setter={setSelectedWarranty} selected={selectedWarranty} router={router} openPopup={() => setWarrantyPopup(true)} />
          ) : section?.id === "verification" ? (
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

      <WarrantyInfo open={openWarrantyPopup} setOpen={setWarrantyPopup} ></WarrantyInfo>
      <ConditionInfoPopup open={openConditionPopup} setOpen={setOpenConditionPopup} ></ConditionInfoPopup>
      <VerifiedInfoPopup open={openVerificationPopup} setOpen={setOpenVerificationPopup}></VerifiedInfoPopup>
    </form>
  );
};

export default DesktopFilter;

import EditListingForm from "@/components/User/EditListingForm";
import GuideToSell from "@/components/User/GuideToSell";
import { useRouter } from "next/router";
import * as Axios from "../../../api/axios";
import { useState,useEffect } from "react";
import ListingAddedPopup from "@/components/Popup/ListingAddedPopup";
import TermAndConditionPopup from "@/components/Popup/TermAndConditionPopup";

function EditListing({brandsList}) {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [openTCPopup, setOpenTCPopup] = useState(false);
  
  return (
    <main className="container grid grid-cols-3 gap-6 my-8">
      <div className="col-span-2 bg-white rounded shadow">
        <EditListingForm id={id} openPopup={() => setOpen(true)}  openTCPopup={() => setOpenTCPopup(true)} brandsList={brandsList}/>
      </div>
      <div className="bg-white rounded rounded-t-lg shadow">
        <GuideToSell />
      </div>
      <ListingAddedPopup open={open} setOpen={setOpen} />
      <TermAndConditionPopup open={openTCPopup} setOpen={setOpenTCPopup} />
    </main>
  );
}

// export async function getServerSideProps() {
//   const makeModelLists = await Axios.fetchMakeModelList();
//   console.log("makeModelLists ID ",makeModelLists);
//   return {
//     props: { makeModelLists: makeModelLists?.dataObject || [] }
//   }
// }

export async function getServerSideProps() {
  const brandsList = await Axios.fetchMakeModelList();
  //console.log("makeModelLists ",brandsList);
  return {
    props: { brandsList: brandsList?.dataObject || [] },
  };
}

export default EditListing;

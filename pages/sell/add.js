import ListingAddedPopup from "@/components/Popup/ListingAddedPopup";
import TermAndConditionPopup from "@/components/Popup/TermAndConditionPopup";
import AddListingForm from "@/components/User/AddListingForm";
import GuideToSell from "@/components/User/GuideToSell";
import { useState } from "react";
import * as Axios from "../../api/axios";

function AddListing({ brandsList }) {
  const [open, setOpen] = useState(false);
  const [openTCPopup, setOpenTCPopup] = useState(false);
  return (
    <main className="container grid grid-cols-3 gap-4 my-8">
      <div className="col-span-2 bg-white rounded shadow">
        <AddListingForm
          brandsList={brandsList}
          openPopup={() => setOpen(true)}
          openTCPopup={() => setOpenTCPopup(true)}
        />
      </div>
      <div className="bg-white rounded rounded-t-lg shadow">
        <GuideToSell />
      </div>
      <ListingAddedPopup open={open} setOpen={setOpen} />
      <TermAndConditionPopup open={openTCPopup} setOpen={setOpenTCPopup} />
    </main>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const { userUniqueId, sessionId } = req.cookies;
  console.log("userUniqueId", userUniqueId);
  console.log("sessionId", sessionId);
  const brandsList = await Axios.fetchMakeModelList(
    userUniqueId || "Guest",
    sessionId || ""
  );
  //console.log("makeModelLists ",brandsList);
  return {
    props: { brandsList: brandsList?.dataObject || [] },
  };
}

export default AddListing;

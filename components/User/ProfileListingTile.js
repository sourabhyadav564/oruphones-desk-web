import Link from "next/link";
import { BiDotsVerticalRounded, BiRupee } from "react-icons/bi";
import { useState, useEffect, useCallback } from "react";
import { numberWithCommas } from "../../utils/util";
import IconLabelValue from "./IconLableValue";
import AppDownloadPopup from "../Popup/AppDownloadPopup";
import ActivateListingPopup from "../Popup/ActivateListingPopup";
import * as Axios from "../../api/axios";
import ActivatePauseListing from "../Popup/ActivatePauseListingPopup";
import DeleteListingPopup from "../Popup/DeleteListingPopup";
import { useRouter } from "next/router";
import VerifiedIcon from "../VerifiedIcon";
import UnVerifiedIcon from "../UnVerifiedIcon";
import Cookies from "js-cookie";
import Logo from "@/assets/oru_phones_logo.png"

function ProfileListingTile({ data, fromMyFav, setProducts }) {
  const router = useRouter();
  const [frontImagePath, setFrontImagePath] = useState();
  const [openAppDownload, setOpenAppDownload] = useState(false);
  const [openActivatePopup, setOpenActivatePopup] = useState(false);
  const [openActivatePausePopup, setOpenActivatePausePopup] = useState(false);
  const [openDeletePopup, setDeletePopup] = useState(false);
  const frontImage = data?.images?.filter((img) => {
    if (img?.panel === "front") {
      return img?.fullImage;
    }
  });

  useEffect(() => {
    if (frontImage?.length > 0) {
      var data = frontImage.filter((item) => item.panel === "front");
      setFrontImagePath(data[0]?.fullImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActivateClick = (e) => {
    let payload = {
      listingId: data?.listingId,
      userUniqueId: Cookies.get("userUniqueId") || "Guest",
    };
    const fetchData = async () => {
      const activeListedDevice = await Axios.activeListedDevice(payload);
      if (activeListedDevice.status === "SUCCESS") {
        setOpenActivatePopup(true);
      }
    };
    fetchData();
  };

  function handlePauseLIsting() {
    setOpenActivatePausePopup(true);
  }

  function handleVerifyListing() {
    setOpenAppDownload(true);
  }

  function uploadPhotos() {
    // router.push(`/sell-old-refurbished-used-mobiles/edit/${data?.listingId}`);
  }

  return (
    <div className="grid grid-cols-8 rounded border p-3 hover:shadow relative"
      onClick={() => { setOpenAppDownload(true) }}>
      <div className="absolute top-1 left-0 z-10 px-3">
        {data?.verified ? (
          <VerifiedIcon width={69} height={29} />
        ) : (
          <UnVerifiedIcon width={69} height={29} />
        )}
      </div>
      <div className="col-span-3 flex">
        {data?.images && frontImagePath && (
          <div className="flex justify-center w-32 h-24 pr-4">
            <img
              src={frontImagePath}
              alt={data?.marketingName || Logo}
              style={{ width: "auto", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}

        {!data?.images && (
          <div className="flex justify-center w-32 h-24 pr-4">
            <img
              src={data?.defaultImage?.fullImage || data?.imagePath || Logo}
              alt={data?.marketingName}
              style={{ width: "auto", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}

        {data?.images && (
          <div className="flex justify-center w-32 h-24 pr-4">
            <img
              src={data?.defaultImage?.fullImage || data?.imagePath || Logo}
              alt={data?.marketingName}
              style={{ width: "auto", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}

        <div>
          <p className="text-mediumFontSize font-Roboto-Semibold text-m-grey-1 my-1.5">
            {" "}
            {data?.marketingName}​{" "}
          </p>
          {/* <span className="text-m-grey-2 text-sm">List Price</span> */}
          <p className="flex items-center font-Roboto-Bold text-xl2FontSize text-m-grey-1">
            {data?.listingPrice && <BiRupee className="h-full" />}{" "}
            {numberWithCommas(data?.listingPrice || "")}
          </p>
        </div>
      </div>
      <div className=" col-span-4 grid grid-cols-2 gap-x-2">
        <IconLabelValue label="Condition" value={data?.deviceCondition} />
        <IconLabelValue
          label="Warranty"
          value={data?.warranty === null ? "--" : data?.warranty}
        />
        <IconLabelValue label="Storage" value={data?.deviceStorage} />
        <IconLabelValue
          label="Verified on"
          value={data?.verifiedDate === null ? "--" : data?.verifiedDate}
        />
        <IconLabelValue label="Color" value={data?.color || ""} />
        <IconLabelValue
          label="Listed on"
          value={data?.listingDate === null ? "--" : data?.listingDate}
        />
      </div>
      <div className="flex flex-col justify-between items-end pr-2 font-Roboto-Semibold text-smallFontSize">
        {/* <Image src={chartIcon} width={15} height={15} alt="Chart Icon" className="cursor-pointer" /> */}
        {/* <div
          className="listing-tile dropdown inline-block relative"
          onClick={(e) => e.preventDefault()}
        >
          <BiDotsVerticalRounded size={22}></BiDotsVerticalRounded>
          <div className="dropdown-menu absolute hidden pt-1">
            <div className="w-24 text-left border rounded bg-white">
              {data?.status === "Active" && (
                <span
                  className="rounded-t hover:bg-gray-100 text-black-60 py-1 px-4 w-full block whitespace-no-wrap"
                  onClick={handlePauseLIsting}
                >
                  Pause
                </span>
              )}
              {/* <Link href={`/sell-old-refurbished-used-mobiles/edit/${data?.listingId}`}>
                <span className="hover:bg-gray-100 text-black-60 py-1 px-4 w-full block whitespace-no-wrap">
                  Edit
                </span>
              </Link> */}
        {/* <span className="hover:bg-gray-100 text-black-60 py-1 px-4 w-full block whitespace-no-wrap"
              onClick={() => setOpenAppDownload(true)}>
                Edit
              </span>
              <span
                className="rounded-b hover:bg-gray-100 text-black-60 py-1 px-4 w-full block whitespace-no-wrap"
                onClick={() => setDeletePopup(true)}
              >
                Delete
              </span>
            </div>
          </div> */}
        {/* </div> */}
        {data?.status === "Active" &&
          data?.verified &&
          !data?.deviceImagesAvailable ? (
          <Link href="#">
            <a
              className="text-xs cursor-pointer self-end min-w-max"
              style={{ color: "#00A483" }}
              onClick={() => uploadPhotos()}
            >
              UPLOAD PHOTOS
            </a>
          </Link>
        ) : (
          data?.status === "Active" &&
          !data?.verified && (
            <Link href="#">
              <p
                className="text-xs cursor-pointer self-end"
                style={{ color: "#00A483" }}
                onClick={handleVerifyListing}
              >
                <a>VERIFY NOW</a>
              </p>
            </Link>
          )
        )}
        {data?.status === "Paused" && !data?.verified && (
          <Link href="#">
            <p
              className="text-xs cursor-pointer self-end"
              style={{ color: "#00A483" }}
              onClick={handleActivateClick}
            >
              <a>ACTIVATE NOW</a>
            </p>
          </Link>
        )}
      </div>
      <AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
      {/* <ActivateListingPopup
        open={openActivatePopup}
        setOpen={setOpenActivatePopup}
      /> */}
      {/* <ActivatePauseListing
        open={openActivatePausePopup}
        setOpen={setOpenActivatePausePopup}
        data={data?.listingId}
      /> */}
      {/* <DeleteListingPopup
        open={openDeletePopup}
        setOpen={setDeletePopup}
        data={data}
      /> */}
    </div>
  );
}

export default ProfileListingTile;

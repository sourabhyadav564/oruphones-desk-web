import { Fragment, useState } from "react";
import { BiRupee } from "react-icons/bi";
import devicePlaceholder from "../../assets/stock_image.png";
import { numberWithCommas } from "../../utils/util";
import ImageSlider from "../ImageSlider";
import LabelAndValue from "../LabelAndValue";
import DeviceVerificationReport from "../Popup/DeviceVerificationReport";
import VerifiedInfoPopup from "../Popup/VerifiedInfoPopup";
import ConditionInfoPopup from "../Popup/ConditionInfoPopup";
import AddFav from "../AddFav";
import RequestVerificationSuccessPopup from "../Popup/RequestVerificationSuccessPopup";
import LoginPopup from "../Popup/LoginPopup";
import Cookies from "js-cookie";
import VerifiedIcon from "../VerifiedIcon";
import UnVerifiedIcon from "../UnVerifiedIcon";
import ShareIcon from "../ShareIcon";

function ProductDetailsCard({ data, openFullImage }) {
  console.log("ProductDetailsCard ", data);
  const [openDeviceReport, setOpenDeviceReport] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openConditionInfoPopup, setConditionInfoPopup] = useState(false);
  const [openRequestVerificationSuccessPopup, setRequestVerificationSuccessPopup] = useState(false);
  const [deviceListingInfo, setDeviceListingInfo] = useState(data);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const accessoriesList = [];
  if (data?.originalbox === "Y") {
    accessoriesList.push("Original box");
  }
  if (data?.charger === "Y") {
    accessoriesList.push("Charger");
  }
  if (data?.earphone === "Y") {
    accessoriesList.push("Earphones");
  }

  console.log("1", data?.images)
  console.log("2", data?.imagePath)
  console.log("3", data?.defaultImage)

  return (
    <Fragment>
      <div className="grid grid-cols-3 p-2 relative ">
        <div className="space-x-4 absolute -right-2 flex items-center justify-content-end -top-2">
          {!(data?.isOtherVendor === "Y") && (
            <Fragment>
              <ShareIcon data={deviceListingInfo} width={16} height={16} />
              <AddFav data={deviceListingInfo} setProducts={setDeviceListingInfo} />
            </Fragment>
          )}
        </div>
        <div className="">
          {(data?.images || data?.defaultImage || data?.imagePath) && (
            <ImageSlider
              openFullImage={openFullImage}
              images={
                data?.images ||
                (data?.imagePath && {
                  fullImage: data?.imagePath,
                  thumbImage: data?.imagePath,
                }) ||
                (data?.defaultImage && {
                  fullImage: data?.defaultImage,
                  thumbImage: data?.defaultImage,
                })
              }
            />
          )}
        </div>
        <div className="col-span-2">
          <div className="mb-3 px-2">
            <h1 className="capitalize text-2xl font-semibold text-black-20">{data?.marketingName}</h1>
            <h2 className="capitalize text-2xl font-semibold text-black-20">
              ({data?.color} {data?.deviceStorage}){data?.deviceRam && <span>({data?.deviceRam + " RAM"})</span>}
            </h2>
            {(!(data?.isOtherVendor === "Y") && (
              <div className="my-2">{data?.verified ? <VerifiedIcon height={42} width={86} /> : <UnVerifiedIcon height={42} width={86} />}</div>
            )) || <span className="h-5 block"></span>}
            <p className="block text-base text-m-grey-2">List price</p>
            <p className="font-semibold flex items-center -ml-1 text-m-grey-1" style={{ fontSize: 42 }}>
              {data?.listingPrice && <BiRupee />} {numberWithCommas(data?.listingPrice || "")}
            </p>
          </div>
          {data?.isOtherVendor === "Y" ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 px-2">
              <LabelAndValue
                label="Condition"
                value={data?.deviceCondition || "--"}
                labelTextSize
                showConditionInfoPopup={() => setConditionInfoPopup(true)}
              />
              <LabelAndValue label="Listed on" value={data?.listingDate || "--"} labelTextSize />
              <LabelAndValue label="Storage" value={data?.deviceStorage || "--"} labelTextSize />
              <span></span>
              <LabelAndValue label="Color" value={data?.color || "--"} labelTextSize />
              <span />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 px-2">
              <LabelAndValue
                label="Condition"
                value={data?.deviceCondition || "--"}
                showConditionInfoPopup={() => setConditionInfoPopup(true)}
                labelTextSize
              />
              {<LabelAndValue label="Warranty" value={data?.warranty || "--"} />}
              <LabelAndValue label="Color" value={data?.color || "--"} />
              <LabelAndValue label="Storage" value={data?.deviceStorage || "--"} />
              {
                <LabelAndValue
                  label="Verified on"
                  value={data?.verifiedDate || "Request Verification"}
                  showInfoPopup={() => setOpenInfo(true)}
                  showRequestVerificationSuccessPopup={() => {
                    Cookies.get("userUniqueId") === undefined ? setShowLoginPopup(true) : setRequestVerificationSuccessPopup(true);
                  }}
                  textAsLink={data?.verifiedDate != null ? false : true}
                  labelTextSize
                />
              }
              <LabelAndValue label="Listed on" value={data?.listingDate || "--"} labelTextSize />
              {<LabelAndValue label="Accessories" value={accessoriesList.join(", ")} labelTextSize />}
              {data?.verified && (
                <LabelAndValue label="Report" value={"Device Verification Report"} showDeviceReport={() => setOpenDeviceReport(true)} labelTextSize />
              )}
            </div>
          )}
        </div>
      </div>
      <DeviceVerificationReport open={openDeviceReport} setOpen={setOpenDeviceReport} data={data} />
      <ConditionInfoPopup open={openConditionInfoPopup} setOpen={setConditionInfoPopup} data={data} />
      <VerifiedInfoPopup open={openInfo} setOpen={setOpenInfo} />
      <RequestVerificationSuccessPopup open={openRequestVerificationSuccessPopup} setOpen={setRequestVerificationSuccessPopup} data={data} />
      <LoginPopup open={showLoginPopup} setOpen={setShowLoginPopup} redirect={false} />
    </Fragment>
  );
}

export default ProductDetailsCard;

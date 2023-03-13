import Image from "next/image";
import Select from "../Form/Select";
import Input from "../Form/Input";
import { useState, useEffect, useContext } from "react";
import ImageInput from "../Form/ImageInput";
import { numberWithCommas, numberFromString } from "../../utils/util";
import * as Axios from "../../api/axios";
import Cookies from "js-cookie";
import AppContext from "@/context/ApplicationContext";
import DeviceConditionPopup from "../Popup/DeviceConditionPopup";

function EditListingForm({ id, openPopup, openTCPopup, brandsList }) {
  const initialState = [
    { name: "image-1" },
    { name: "image-2" },
    { name: "image-3" },
    { name: "image-4" },
  ];
  const { setRefresh } = useContext(AppContext);
  const [images, setImages] = useState([]);
  const [make, setMake] = useState();
  const [marketingName, setmarketingName] = useState();
  const [storage, setStorage] = useState();
  const [color, setColor] = useState(null);
  const [deviceCondition, setDeviceCondition] = useState(null);
  const [name, setName] = useState(null);
  const [charger1, setCharger] = useState("N");
  const [headphone1, setHeadphone1] = useState("N");
  const [originalBox1, setOriginalBox1] = useState("N");
  const [sellPrice, setSellPrice] = useState("");
  const [leastSellingprice, setLeastSellingprice] = useState("0000");
  const [getExternalSellerData, setGetExternalSellerData] = useState([]);
  const [maxsellingprice, setMaxsellingprice] = useState("0000");

  const [listedDeviceInfo, setListedDeviceInfo] = useState();
  const [formData, setFormData] = useState({ termsAndCondition: true });
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [deviceColors, setDeviceColors] = useState();
  const [open, setOpen] = useState(false);
  const [conditionEdit, setConditionEdit] = useState(deviceCondition);
  const [conditionQuesEdit, setConditionQuesEdit] = useState(listedDeviceInfo?.cosmetic);
  const [showWarranty, setShowWarranty] = useState("N");
  const [warranty, setWarranty] = useState("more");
  const [conditionResults, setConditionResults] = useState({});

  function listedDeviceImages(data, setImages) {
    let initialState;

    if (data?.images && data.images.length === 1) {
      initialState = [
        ...data?.images,
        { panel: "back" },
        { name: "image-1" },
        { name: "image-2" },
      ];
    } else if (data?.images && data.images.length === 2) {
      initialState = [
        ...data?.images,
        { name: "image-1" },
        { name: "image-2" },
      ];
    } else if (data?.images && data.images.length === 3) {
      initialState = [...data?.images, { panel: 4 }];
    } else if (data?.images && data.images.length === 5) {
      initialState = [...data?.images, { panel: 6 }];
    } else {
      initialState = [
        ...(data?.images || [
          { panel: "front" },
          { panel: "back" },
          { name: "image-1" },
          { name: "image-2" },
        ]),
      ];
    }
    setImages(initialState);
  }

  const deviceWarrantyCheck = [
    { value: "zero", label: "0-3 Months Ago" },
    { value: "four", label: "4-6 Months Ago" },
    { value: "seven", label: "7-11 Months Ago" },
    { value: "more", label: "More Than 11 Months Ago" },
  ];

  useEffect(() => {
    setDeviceCondition(conditionEdit);
    setConditionResults(conditionQuesEdit);
  }, [conditionEdit, conditionResults, open]);

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (numberFromString(sellPrice) >= 1000) {
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }
  }, [sellPrice]);

  useEffect(() => {
    if (listedDeviceInfo != undefined && listedDeviceInfo != null) {
      let modelData = brandsList?.filter(
        (item) => item.make === listedDeviceInfo?.make
      );
      let models = modelData[0].models.filter(
        (item) => item.marketingname === listedDeviceInfo?.marketingName
      );
      setDeviceColors(models[0].color);
    }
  }, [listedDeviceInfo]);

  useEffect(() => {
    const fetchData = async () => {
      const getListedDeviceInfo = await Axios.getListedDeviceInfo(
        id,
        Cookies.get("userUniqueId"),
        Cookies.get("sessionId")
      );
      if (getListedDeviceInfo) {
        setListedDeviceInfo(getListedDeviceInfo?.dataObject);
        if (getListedDeviceInfo?.dataObject.images !== null) {
          listedDeviceImages(getListedDeviceInfo?.dataObject, setImages);
        } else {
          setImages(initialState);
        }
        setCharger(getListedDeviceInfo?.dataObject.charger);
        setHeadphone1(getListedDeviceInfo?.dataObject.earphone);
        setOriginalBox1(getListedDeviceInfo?.dataObject.originalbox);
        setWarranty(getListedDeviceInfo?.dataObject.warranty);
        setDeviceCondition(getListedDeviceInfo?.dataObject.deviceCondition);
        setSellPrice(getListedDeviceInfo?.dataObject.listingPrice);
      }
    };
    if (id !== null && Cookies.get("userUniqueId") !== undefined) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let payload = {
      deviceCondition: deviceCondition,
      devicestorage: listedDeviceInfo?.deviceStorage,
      deviceRam: listedDeviceInfo?.deviceRam,
      make: listedDeviceInfo?.make,
      marketingName: listedDeviceInfo?.marketingName,
      originalBox: originalBox1 === "Y" ? "Y" : "N",
      charger: charger1 === "Y" ? "Y" : "N",
      earPhones: headphone1 === "Y" ? "Y" : "N",
      warrantyPeriod: warranty,
      verified: "no",
    };

    const fetchData = async () => {
      const getRecommandedPrice = await Axios.getRecommandedPrice(payload);
      setLeastSellingprice(getRecommandedPrice?.dataObject?.leastSellingprice);
      setMaxsellingprice(getRecommandedPrice?.dataObject?.maxsellingprice);
    };
    if (deviceCondition != null) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceCondition, charger1, headphone1, originalBox1, warranty]);

  useEffect(() => {
    let payload = {
      deviceStorage: listedDeviceInfo?.deviceStorage,
      make: listedDeviceInfo?.make,
      marketingName: listedDeviceInfo?.marketingName,
      deviceCondition: deviceCondition,
      warrantyPeriod: warranty,
      hasCharger: charger1 === "Y" ? "Y" : "N",
      hasEarphone: headphone1 === "Y" ? "Y" : "N",
      hasOriginalBox: originalBox1 === "Y" ? "Y" : "N",
    };
    if (deviceCondition != null) {
      Axios.getExternalSellSourceData(payload).then((response) => {
        setGetExternalSellerData(response?.dataObject);
      });
    }
  }, [
    make,
    marketingName,
    storage,
    deviceCondition,
    charger1,
    headphone1,
    originalBox1,
    warranty
  ]);

  const handleImageChange = async (e, index) => {
    let panelName = index === 0 ? "front" : index === 1 ? "back" : index - 1;
    const { name, files } = e.target;
    if (files && files.length) {
      let data = new FormData();
      data.append("image", e.target.files[0]);
      const data1 = await Axios.uploadImage(
        data,
        panelName,
        listedDeviceInfo?.storage,
        listedDeviceInfo?.make,
        listedDeviceInfo?.marketingName,
        Cookies.get("userUniqueId")
      );

      const tempImages = [...images];

      tempImages[index] = {
        ...tempImages[index],
        thumbImage: data1?.dataObject?.thumbnailImagePath,
        fullImage: data1?.dataObject?.imagePath,
        panel: index === 0 ? "front" : index === 1 ? "back" : index - 1,
      };
      setImages(tempImages);
    }
  };

  const clearImage = (e, index) => {
    e.preventDefault();
    const tempImages = [...images];
    tempImages[index] = { ...tempImages[index], thumbImage: "", fullImage: "" };
    setImages(tempImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgList = [];
    images.map((item) => {
      if (
        item.fullImage !== undefined &&
        item.fullImage !== "" &&
        item.panel !== undefined &&
        item.thumbImage !== undefined
      ) {
        imgList.push(item);
      }
    });

    let payload = {
      listingId: id,
      charger: charger1,
      color: color || listedDeviceInfo.color,
      deviceCondition: deviceCondition || listedDeviceInfo.deviceCondition,
      deviceStorage: listedDeviceInfo.deviceStorage,
      deviceUniqueId: "",
      earphone: headphone1,
      images: imgList.map((item) => {
        return {
          fullImage: item?.fullImage,
          panel: item.panel,
          thumbImage: item.thumbImage,
        };
      }),
      imei: "",
      listedBy: name,
      listingPrice: numberFromString(sellPrice),
      make: listedDeviceInfo.make,
      marketingName: listedDeviceInfo.marketingName,
      originalbox: originalBox1,
      platform: make === "Apple" ? "iOS" : "Android",
      verified: listedDeviceInfo.verified,
      recommendedPriceRange: leastSellingprice + "-" + maxsellingprice,
      userUniqueId: Cookies.get("userUniqueId"),
    };
    const saveUpdatedDeviceInfoRes = await Axios.saveUpdatedDeviceInfo(payload);
    setRefresh((prev) => !prev);
    openPopup();
  };

  return (
    <div className="p-8">
      <p className="mb-8">Edit Listing</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8 ">
          <Input
            labelName="Brand"
            value={listedDeviceInfo?.make}
            disabled
            onChange={(e) => {
              setMake(e.value);
            }}
          ></Input>

          <Input
            value={listedDeviceInfo?.marketingName}
            labelName="Model"
            disabled
            onChange={(e) => {
              setmarketingName(e.value);
            }}
          ></Input>
          {listedDeviceInfo?.verified ? (
            <Input value={listedDeviceInfo?.deviceStorage} disabled>
              Storage
            </Input>
          ) : (
            <Select
              labelName="Storage"
              placeholder={listedDeviceInfo?.deviceStorage}
              onChange={(e) => {
                setStorage(e.value);
              }}
              value={listedDeviceInfo?.deviceStorage}
            />
          )}
          <Select
            placeholder={listedDeviceInfo?.color}
            value={color === null ? "Select.." : { label: color, value: color }}
            labelName="Color"
            onChange={(e) => {
              setColor(e.value);
            }}
            options={deviceColors?.map((item) => {
              return { label: item, value: item };
            })}
          ></Select>
          <>
            <div
              className="flex flex-col justify-center items-start px-4 border h-14 rounded-md text-gray-500"
              open={open}
              setOpen={setOpen}
              onClick={() => setOpen(true)}
            >
              {deviceCondition ? deviceCondition : listedDeviceInfo?.deviceCondition}
              <div className="absolute top-[390px] text-lg bg-white py-1 z-1 duration-300 origin-0 text-[13px]" style={{ color: "#00000099" }}>
                Device Condition*
              </div>
            </div>
          </>
          <span />
          <Input
            placeholder={listedDeviceInfo?.listedBy}
            labelName="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
        </div>
        <p className="mt-6 mb-4 ml-0.5" style={{ color: "#00000099" }}>
          Upload Photos
        </p>
        <div className="col-span-2 grid grid-cols-4 gap-4 relative">
          {images &&
            images.map((item, index) => (
              <div className="flex flex-col gap-y-1" key={index}>
                <span style={{ color: "#00000099" }}>
                  {" "}
                  {index === 0 ? (
                    "Front Panel"
                  ) : index === 1 ? (
                    "Back Panel"
                  ) : (
                    <>&nbsp;</>
                  )}{" "}
                </span>
                <ImageInput
                  type="file"
                  preview={item?.thumbImage}
                  name={item?.panel || item?.name}
                  onChange={(e) => handleImageChange(e, index)}
                  clearImage={(e) => clearImage(e, index)}
                  accept="image/*"
                />
              </div>
            ))}
          {images && images.length < 8 && (
            <span
              className="absolute -bottom-6 text-sm right-0 text-m-green cursor-pointer"
              onClick={() =>
                setImages((prev) => [
                  ...prev,
                  { name: `image-${images.length}` },
                  { name: `image-${images.length + 1}` },
                ])
              }
            >
              + Add more
            </span>
          )}
        </div>
        <p className="mt-6 mb-4 ml-0.5" style={{ color: "#00000099" }}>
          Add accessories
        </p>
        {listedDeviceInfo?.charger &&
          listedDeviceInfo?.earphone &&
          listedDeviceInfo?.originalbox && (
            <div className="grid grid-cols-4 gap-4 mb-8">
              <Checkbox
                src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/charging-station.svg"}
                text="Charger"
                onClick={(e) => {
                  e.target.checked ? setCharger("Y") : setCharger("N");
                }}
                isChecked={listedDeviceInfo?.charger === "Y"}
              />
              <Checkbox
                src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/svgicons/earphones.svg"}
                text="Earphones"
                onClick={(e) => {
                  e.target.checked ? setHeadphone1("Y") : setHeadphone1("N");
                }}
                isChecked={listedDeviceInfo?.earphone === "Y"}
              />
              <Checkbox
                src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/box.svg"}
                text="Original Box"
                onClick={(e) => {
                  e.target.checked
                    ? setOriginalBox1("Y")
                    : setOriginalBox1("N");
                }}
                isChecked={listedDeviceInfo?.originalbox === "Y"}
              />
              <Checkbox
                src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/original-bill.svg"}
                text="Original Bill"
                checked={showWarranty}
                onClick={(e) => {
                  e.target.checked ? setShowWarranty("Y") : setShowWarranty("N");
             
                  setWarranty((listedDeviceInfo?.warranty != "None" || listedDeviceInfo?.warranty != "" || listedDeviceInfo?.warranty != null) ? listedDeviceInfo?.warranty : "more");
                }}
                isChecked={listedDeviceInfo?.warranty !== "more"}
              />
            </div>
          )}
        {showWarranty === "Y" && (
          <div className="my-5 grid grid-cols-2 gap-5">
            {deviceWarrantyCheck?.map((item, index) => (
              <div
                key={index}
                className={`${warranty == item?.value ? "bg-gray-200" : "bg-white"
                  } py-3 px-5 rounded-md hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 duration-300 border-2 border-gray-200 flex items-center justify-center`}
                onClick={() => setWarranty(item.value)}
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-7 gap-1">
          {listedDeviceInfo?.listingPrice && (
            <div className="col-span-2">
              <Input
                value={numberFromString(sellPrice)}
                prefix={"₹"}
                type="number"
                max="999999"
                inputClass="text-3xl font-bold"
                className={`text-3xl font-bold rounded-r-none border-r-0`}
                onChange={(e) => {
                  setSellPrice(e.target.value);
                }}
              >
                Enter your sell price
              </Input>
            </div>
          )}
          <div className="col-span-2 text-sm bg-gray-100 py-2 justify-evenly items-center flex flex-col w-full rounded">
            <span>Recommended Price</span>
            {(leastSellingprice && (
              <p className="font-bold text-base">
                {"₹ " + numberWithCommas(leastSellingprice)} -{" "}
                {numberWithCommas(maxsellingprice)}
              </p>
            )) || <p>--</p>}
          </div>
        </div>
        {getExternalSellerData && getExternalSellerData.length > 0 && (
          <p
            className="mt-6 mb-4 ml-0.5 font-semibold"
            style={{ color: "#707070" }}
          >
            Check prices from other buyers:
          </p>
        )}
        {getExternalSellerData && getExternalSellerData.length > 0 && (
          <div className="grid border rounded max-w-sm">
            {getExternalSellerData.map((items, index) => (
              <div
                className="grid grid-cols-2 px-4 py-2 gap-4 text-xs text-m-grey-2"
                key={index}
              >
                <div className="flex flex-col space-1">
                  <span>You will get</span>
                  <p className="font-semibold text-2xl text-m-grey-1 h-9">
                    {"₹" + numberWithCommas(items.externalSourcePrice)}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <span>Buyer</span>
                  <div className="w-full h-full">
                    <img
                      src={items.externalSourceImage}
                      alt={items.externalSourceName}
                      style={{ height: 33, width: "auto" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex mt-8 items-center">
          <input
            type="checkbox"
            name="termsAndCondition"
            defaultChecked={formData?.termsAndCondition || false}
            onChange={handleChange}
            className="border-gray-300 rounded text-m-green focus:ring-transparent"
          />
          <label
            className="ml-2 underline cursor-pointer"
            style={{ color: "#00000099" }}
            onClick={() => openTCPopup()}
          >
            Accept terms and conditions
          </label>
        </div>
        <div className="w-1/2 mt-10 ">
          <button
            disabled={disableSubmitButton}
            className="w-full border rounded border-m-green text-m-green px-4 py-2 disabled:cursor-not-allowed"
          >
            SUBMIT
          </button>
        </div>
      </form>
      <DeviceConditionPopup open={open} setOpen={setOpen} setConditionEdit={setConditionEdit} setConditionQuesEdit={setConditionQuesEdit} />
    </div>
  );
}

export default EditListingForm;

const Checkbox = ({ src, text, onClick, isChecked }) => (
  <div
    className={`border rounded px-6 py-4 relative ${isChecked && "bg-gray-ef"
      } hover:cursor-pointer`}
  >
    <div className="relative w-14 h-14 mx-auto">
      <Image src={src} layout="fill" alt="buyer" />
    </div>
    <input
      type="checkbox"
      defaultChecked={isChecked}
      className="absolute top-2 left-2 rounded focus:ring-0 focus:ring-offset-0 hover:cusror-pointer"
      onClick={onClick}
    />
    <span className="text-xs mt-2 text-center block"> {text} </span>
  </div>
);

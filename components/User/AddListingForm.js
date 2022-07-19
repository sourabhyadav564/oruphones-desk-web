import Image from "next/image";
import Select from "../Form/Select";
import Input from "../Form/Input";
import { useState, useEffect, useContext } from "react";
import ImageInput from "../Form/ImageInput";
import { numberWithCommas, numberFromString } from "../../utils/util";
import charging from "../../assets/charging-station.png";
import headphone from "../../assets/headphones.png";
import originalBox from "../../assets/original-box.png";
import * as Axios from "../../api/axios";
import AppContext from "@/context/ApplicationContext";
import ConditionInfoPopup from "../Popup/ConditionInfoPopup";
import LoginPopup from "../Popup/LoginPopup";
import Cookies from "js-cookie";

function AddEditListing({
  data,
  isFromEdit,
  brandsList,
  openPopup,
  openTCPopup,
}) {
  const { cities, userInfo, getSearchLocation, setRefresh } =
    useContext(AppContext);
  const userSelectedCity =
    getSearchLocation === "India" ? "Select..." : getSearchLocation;
  const [totalCities, setTotalCities] = useState([cities]);
  const [selectedCity, setSelectedCity] = useState(userSelectedCity);
  const initialState = [
    { name: "image-1" },
    { name: "image-2" },
    { name: "image-3" },
    { name: "image-4" },
  ];
  const [images, setImages] = useState(initialState);
  //console.log("DATA -> ", brandsList);
  const [makeOptions, setMakeOptions] = useState(brandsList);
  const [modelOptions, setModelOptions] = useState([]);
  const [colorAndStorageOption, setColorAndStorageOption] = useState([]);
  const [make, setMake] = useState(null);
  const [marketingName, setmarketingName] = useState(null);
  const [storage, setStorage] = useState(null);
  const [color, setColor] = useState(null);
  const [deviceCondition, setDeviceCondition] = useState(null);
  const [name, setName] = useState(null);
  const [charger, setCharger] = useState("N");
  const [headphone1, setHeadphone1] = useState("N");
  const [originalBox1, setOriginalBox1] = useState("N");
  const [sellPrice, setSellPrice] = useState(null);
  const [leastSellingprice, setLeastSellingprice] = useState("");
  const [maxsellingprice, setMaxsellingprice] = useState("");
  const [formData, setFormData] = useState({ termsAndCondition: true });
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  // const [makeRequired, setMakeRequired] = useState("border-red-700 border rounded");
  const [makeRequired, setMakeRequired] = useState("");
  const [marketingNameRequired, setMarketingNameRequired] = useState("");
  const [storageRequired, setStorageRequired] = useState("");
  const [deviceConditionRequired, setDeviceConditionRequired] = useState("");
  const [sellValueRequired, setSellValueRequired] = useState("");
  const [nameValueRequired, setNameValueRequired] = useState("");
  const [locationRequired, setLocationRequired] = useState("");
  const [getExternalSellerData, setGetExternalSellerData] = useState([]);
  const [openConditionInfoPopup, setConditionInfoPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const deviceConditionCheck = [
    { value: "Like New", label: "Like New" },
    { value: "Excellent", label: "Excellent" },
    { value: "Good", label: "Good" },
    { value: "Fair", label: "Fair" },
  ];

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    var totalCities1 = cities?.map((items) => {
      return items.city;
    });
    setTotalCities(totalCities1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  useEffect(() => {
    let makeData = makeOptions.filter((item) => item.make === make);
    if (makeData && makeData.length > 0) {
      setModelOptions((makeData && makeData[0]?.models) || []);
      setmarketingName(null);
      setStorage(null);
      setColor(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [make]);

  useEffect(() => {
    let modelData = modelOptions.filter(
      (item) => item.marketingname === marketingName
    );
    if (modelData && modelData.length > 0) {
      setColorAndStorageOption(modelData[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingName]);

  useEffect(() => {
    if (numberFromString(sellPrice) >= 1000) {
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }
  }, [sellPrice]);

  useEffect(() => {
    let payload = {
      charger: charger === "Y" ? "Y" : "N",
      deviceCondition: deviceCondition,
      devicestorage: storage?.split("/")[0],
      earPhones: headphone1 === "Y" ? "Y" : "N",
      make: make,
      marketingName: marketingName,
      originalBox: originalBox1 === "Y" ? "Y" : "N",
      warrantyPeriod: "more",
      verified: "no",
    };
    const fetchData = async () => {
      const getRecommandedPrice = await Axios.getRecommandedPrice(payload);
      setLeastSellingprice(getRecommandedPrice?.dataObject.leastSellingprice);
      setMaxsellingprice(getRecommandedPrice?.dataObject.maxsellingprice);
    };
    if (
      make != null &&
      marketingName != null &&
      storage != null &&
      deviceCondition != null &&
      (charger != null || headphone1 != null || originalBox1 != null)
    ) {
      fetchData();
    }
  }, [
    make,
    marketingName,
    storage,
    deviceCondition,
    charger,
    headphone1,
    originalBox1,
  ]);

  useEffect(() => {
    let payload = {
      deviceStorage: storage?.split("/")[0],
      make: make,
      marketingName: marketingName,
      deviceCondition: deviceCondition,
      warrantyPeriod: "more",
      hasCharger: charger === "Y" ? "Y" : "N",
      hasEarphone: headphone1 === "Y" ? "Y" : "N",
      hasOriginalBox: originalBox1 === "Y" ? "Y" : "N",
    };
    if (make !== null && marketingName !== null && storage !== null) {
      Axios.getExternalSellSourceData(payload).then((response) => {
        console.log("getExternalSellSourceData ", response?.dataObject);
        setGetExternalSellerData(response?.dataObject);
      });
    }
  }, [
    make,
    marketingName,
    storage,
    deviceCondition,
    charger,
    headphone1,
    originalBox1,
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
        storage,
        make,
        marketingName,
        Cookies.get("userUniqueId")
      );
      console.log("UPLOAD IMAGE ", data1?.dataObject);
      setImages((prev) =>
        prev.map((item) => {
          return item.name === name
            ? {
                ...item,
                thumbnailImagePath: data1?.dataObject?.thumbnailImagePath,
                imagePath: data1?.dataObject?.imagePath,
                panel: index === 0 ? "front" : index === 1 ? "back" : index - 1,
              }
            : item;
        })
      );
    }
  };

  const clearImage = (e, index) => {
    e.preventDefault();
    const tempImages = [...images];
    tempImages[index] = {
      ...tempImages[index],
      thumbnailImagePath: "",
      imagePath: "",
    };
    setImages(tempImages);
  };

  // const handleFocus = async (e) => {
  //   alert("FOCUS");
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var sellValueTag = document.querySelector("#sellValue");
    var sellValue = sellValueTag.value;
    // console.log("sellValue ", sellValue);

    var inputNameTag = document.querySelector("#inputName");
    var inputName = inputNameTag.value;

    if (
      selectedCity === undefined ||
      selectedCity === "" ||
      selectedCity === "India" ||
      selectedCity === "Select..." ||
      make === null ||
      marketingName === null ||
      storage === null ||
      deviceCondition === null ||
      !sellValue ||
      (sellValue && sellValue < 1000) ||
      !inputName
    ) {
      if (make === null) {
        window.scroll(0, 0);
        setMakeRequired("border-red");
      }
      if (marketingName === null) {
        window.scroll(0, 0);
        setMarketingNameRequired("border-red");
      }
      if (storage === null) {
        window.scroll(0, 0);
        setStorageRequired("border-red");
      }
      if (deviceCondition === null) {
        window.scroll(0, 0);
        setDeviceConditionRequired("border-red");
      }
      if (
        selectedCity === "India" ||
        selectedCity === "" ||
        selectedCity === null ||
        selectedCity === "Select..."
      ) {
        window.scroll(0, 0);
        setLocationRequired("border-red");
      }
      if (!sellValue || sellValue < 1000) {
        setSellValueRequired("border-red");
      }
      if (!inputName || inputName === "") {
        setNameValueRequired("border-red");
      }
    } else if (Cookies.get("userUniqueId") === undefined) {
      setShowLoginPopup(true);
    } else {
      const imgList = [];
      images.map((item) => {
        if (
          item.imagePath !== undefined &&
          item.imagePath !== "" &&
          item.panel !== undefined &&
          item.thumbnailImagePath !== undefined
        ) {
          imgList.push(item);
        }
      });
      console.log("imgList", imgList);

      let payload = {
        charger: charger,
        color: color,
        deviceCondition: deviceCondition,
        deviceStorage: storage.toString().split("/")[0].toString().trim(),
        deviceRam: storage
          .toString()
          .split("/")[1]
          .toString()
          .replace(/GB/g, " GB")
          .replace(/RAM/, "")
          .trim(),
        deviceUniqueId: "",
        earphone: headphone1,
        images: imgList.map((item) => {
          return {
            fullImage: item?.imagePath,
            panel: item.panel,
            thumbImage: item.thumbnailImagePath,
          };
        }),
        imei: "",
        listedBy: name || userInfo?.userdetails?.userName || "",
        listingLocation: selectedCity,
        listingPrice: numberFromString(sellPrice),
        make: make,
        marketingName: marketingName,
        originalbox: originalBox1,
        platform: make === "Apple" ? "iOS" : "Android",
        userUniqueId: Cookies.get("userUniqueId"),
        model: marketingName,
      };
      console.log("SAVE LISTING PAYLOAD ", payload);
      const saveSellNowDeviceInfoRes = await Axios.saveSellNowDeviceInfo(
        payload
      );
      setRefresh((prev) => !prev);
      console.log("saveSellNowDeviceInfoRes ", saveSellNowDeviceInfoRes);
      openPopup();
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-8">Sell Your Phone</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8 ">
          <span>
            <Select
              labelName="Brand*"
              //placeholder=""
              className={makeRequired}
              onFocus={(e) => {
                setMakeRequired("");
              }}
              required
              value={make === null ? "Select.." : { label: make, value: make }}
              //value={data?.make}
              disabled={isFromEdit}
              onChange={(e) => {
                setMake(e.value);
              }}
              options={makeOptions.map((item) => {
                return { label: item.make, value: item.make };
              })}
            ></Select>
            {makeRequired && (
              <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                Please select this field
              </p>
            )}
          </span>
          <span>
            <Select
              value={
                marketingName === null
                  ? "Select.."
                  : { label: marketingName, value: marketingName }
              }
              labelName="Model*"
              disabled={isFromEdit}
              className={marketingNameRequired}
              onFocus={(e) => {
                setMarketingNameRequired("");
              }}
              onChange={(e) => {
                setmarketingName(e.value);
              }}
              options={modelOptions.map((item) => {
                return { label: item.marketingname, value: item.marketingname };
              })}
            ></Select>
            {marketingNameRequired && (
              <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                Please select this field
              </p>
            )}
          </span>
          <span>
            <Select
              value={
                storage === null
                  ? "Select.."
                  : { label: storage, value: storage }
              }
              labelName="Storage*"
              disabled={isFromEdit}
              className={storageRequired}
              onFocus={(e) => {
                setStorageRequired("");
              }}
              onChange={(e) => {
                setStorage(e.value);
              }}
              options={colorAndStorageOption?.storage?.map((item) => {
                return { label: item, value: item };
              })}
            ></Select>
            {storageRequired && (
              <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                Please select this field
              </p>
            )}
          </span>
          <span>
            <Select
              value={
                color === null ? "Select.." : { label: color, value: color }
              }
              labelName="Color"
              disabled={isFromEdit}
              onChange={(e) => {
                setColor(e.value);
              }}
              options={colorAndStorageOption?.color?.map((item) => {
                return { label: item, value: item };
              })}
            ></Select>
          </span>
          <div>
            <span>
              <Select
                labelName="Device Condition*"
                className={deviceConditionRequired}
                onFocus={(e) => {
                  setDeviceConditionRequired("");
                }}
                onChange={(e) => {
                  setDeviceCondition(e.value);
                }}
                options={deviceConditionCheck}
              ></Select>
              {deviceConditionRequired && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                  Please select this field
                </p>
              )}
            </span>
            <span>
              <p
                className="text-sm whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => setConditionInfoPopup(true)}
              >
                What&apos;s this?
              </p>
            </span>
          </div>
          <span />
          <div className="grid gap-8">
            <div className="relative">
              <Input
                id="inputName"
                inputClass={"w-full"}
                defaultValue={userInfo?.userdetails?.userName || ""}
                placeholder="Enter seller name ex: Ram, Mega Traders etc"
                onChange={(e) => {
                  setName(e.target.value);
                  setNameValueRequired("");
                }}
                type="text"
                maxLength="30"
                errorClass={`border ${nameValueRequired}`}
              >
                Name
              </Input>
              {nameValueRequired && (
                <span className="text-red text-sm absolute -bottom-6">
                  Please enter your name first
                </span>
              )}
            </div>
            <span>
              <Select
                labelName="Location*"
                placeholder={selectedCity}
                className={`${locationRequired} mt-4`}
                onChange={(e) => {
                  setSelectedCity(e.value);
                }}
                onFocus={(e) => {
                  setLocationRequired("");
                }}
                options={totalCities?.map((item) => {
                  return { label: item, value: item };
                })}
              ></Select>
              {locationRequired && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                  Please select this field
                </p>
              )}
            </span>
          </div>
        </div>
        <p className="mt-6 mb-4 ml-0.5" style={{ color: "#00000099" }}>
          Upload Photos
        </p>
        <div className="col-span-2 grid grid-cols-4 gap-4 relative">
          {images.map((item, index) => (
            <div key={index} className="flex flex-col gap-y-1">
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
                key={item?.name}
                preview={item?.imagePath}
                name={item?.name}
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
                  { name: "image-5" },
                  { name: "image-6" },
                  { name: "image-7" },
                  { name: "image-8" },
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
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Checkbox
            src={charging}
            text="Charger"
            checked={charger}
            onClick={(e) => {
              e.target.checked ? setCharger("Y") : setCharger("N");
            }}
          />
          <Checkbox
            src={headphone}
            text="Earphones"
            checked={headphone1}
            onClick={(e) => {
              e.target.checked ? setHeadphone1("Y") : setHeadphone1("N");
            }}
          />
          <Checkbox
            src={originalBox}
            text="Original Box"
            checked={originalBox1}
            onClick={(e) => {
              e.target.checked ? setOriginalBox1("Y") : setOriginalBox1("N");
            }}
          />
        </div>
        <div className="grid grid-cols-7 relaive gap-4 ">
          <div className="col-span-4 flex ">
            <div className="w-96 relative">
              <Input
                id="sellValue"
                prefix={"₹"}
                type="number"
                max="999999"
                inputClass="text-3xl font-bold"
                className={`text-3xl font-bold rounded-r-none border-r-0`}
                errorClass={`border ${sellValueRequired}`}
                onChange={(e) => {
                  setSellPrice(e.target.value);
                  setSellValueRequired("");
                }}
              >
                Enter your sell price
              </Input>

              {sellValueRequired && (
                <span className="text-red text-sm absolute">
                  Enter price more than 1000
                </span>
              )}
            </div>
            <div className="text-sm bg-gray-1f text-m-grey-1 py-2 justify-evenly items-center flex flex-col w-full rounded rounded-l-none">
              <span>Recommended Price</span>
              {(leastSellingprice && (
                <p className="font-bold text-base">
                  {"₹ " + numberWithCommas(leastSellingprice)} -{" "}
                  {numberWithCommas(maxsellingprice)}
                </p>
              )) || <p>--</p>}
            </div>
          </div>
        </div>
        <div />
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
            disabled={!formData?.termsAndCondition}
            className="w-full border rounded border-m-green text-m-green px-4 py-2 disabled:cursor-not-allowed"
          >
            SUBMIT
          </button>
        </div>
      </form>
      <ConditionInfoPopup
        open={openConditionInfoPopup}
        setOpen={setConditionInfoPopup}
        data={data}
      />
      <LoginPopup
        open={showLoginPopup}
        setOpen={setShowLoginPopup}
        redirect={false}
      />
    </div>
  );
}

export default AddEditListing;

const Checkbox = ({ src, text, onClick, checked }) => (
  <div
    className={`border rounded px-6 py-4 relative ${
      checked === "Y" && "bg-gray-ef"
    }`}
  >
    <div className="relative w-14 h-14 mx-auto">
      <Image src={src} layout="fill" alt="checkbox" />
    </div>
    <input
      type="checkbox"
      className="absolute top-2 left-2 rounded focus:ring-0 focus:ring-offset-0"
      onClick={onClick}
    />
    <span className="text-xs mt-2 text-center block text-m-grey-1">
      {" "}
      {text}{" "}
    </span>
  </div>
);

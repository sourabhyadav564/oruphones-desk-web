import { useState, useEffect, useContext } from "react";
import Image from "next/image";
// import home_logo from "../../assets/home_logo.svg";
import home_logo from "../../assets/logo_square.svg";
import * as Axios from "../../api/axios";
import Router from "next/router";
import AuthContext from "../../context/AuthContext";
import AppContext from "@/context/ApplicationContext";
import Cookies from "js-cookie";

function VerifyOtpPopup({ setOpen, data, redirect }) {
  const [formData, setFormData] = useState({ ...data });
  const [resentOTP, setResentOTP] = useState(false);
  const [error, setError] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const { setUserUniqueId } = useContext(AuthContext);
  const { setUserLogged } = useContext(AppContext);

  useEffect(() => {
    let timer = null;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setResentOTP(true);
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) {
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.otpValidate(formData);
    if (response.status === "SUCCESS" && response.reason === "OTP validated") {
      setOpen(false);

      const payload = {
        countryCode: "91",
        mobileNumber: formData.mobile.split("-")[1],
      };

      // const resData = await Axios.getUserUniqueId(payload);

      // if (
      //   resData.status === "SUCCESS" ||
      //   (resData.status === "FAIL" &&
      //     resData.reason === "User Already Available")
      // ) {
      //   if (resData.status === "SUCCESS") {
      //     addUserSearchandProfileLocations(resData.dataObject.userUniqueId);
      //   }
      //   Cookies.set("userUniqueId", resData.dataObject.userUniqueId);
      //   Cookies.set(
      //     "mobileNumber",
      //     resData.dataObject.userdetails.mobileNumber
      //   );
      //   setUserUniqueId(resData.dataObject.userUniqueId);

      //   if (redirect !== undefined && redirect === false) {
      //     setOpen(false);
      //   } else {
      //     Router.push(`/`);
      //   }
      //   setUserLogged(true);
      // } else {
      //   setError(true);
      // }
      // Cookies.set("userUniqueId", resData.dataObject.userUniqueId);
      Cookies.set("userUniqueId", response.dataObject.userUniqueId);
      Cookies.set("mobileNumber", response.dataObject.mobileNumber);
      // setUserUniqueId(resData.dataObject.userUniqueId);
      setUserUniqueId(response.dataObject.userUniqueId);

      if (redirect !== undefined && redirect === false) {
        setOpen(false);
      } else {
        Router.push(`/`);
      }
      setUserLogged(true);
    } else {
      setError(true);
    }
  };

  const addUserSearchandProfileLocations = async (data) => {
    const locationPayload = {
      city: "Hyderabad",
      country: "India",
      locationId: 0,
      state: "Telangana",
      userUniqueId: data,
    };

    const addUserSearchLocationResponse = await Axios.addUserSearchLocation(
      locationPayload
    );
    const addUserProfileLocationResponse = await Axios.addUserProfileLocation(
      locationPayload
    );
  };

  const otpResend = async () => {
    const resendResponse = await Axios.signUp(formData.mobile.split("-")[1]);
    if (resendResponse.status === "SUCCESS") {
      setSeconds(30);
      setResentOTP(false);
    }
    setFormData({ ...formData, otp: "" });
    setError(false);
  };

  return (
    <div className="container max-w-xl grid place-items-center">
      <div>
        <Image src={home_logo} alt="ORUphones" width={160} height={40} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="m-16 mt-4 px-6 flex flex-col space-y-6 items-center justify-center w-96"
      >
        <h2
          className="text-xl4FontSize font-Roboto-Bold text-center"
          style={{ color: "#2c2f44" }}
        >
          Verify Mobile No
        </h2>
        <p className="text-regularFontSize font-Roboto-Regular text-m-grey-1">
          {" "}
          Please enter the 4 digit verification code sent to your mobile number{" "}
          {formData?.mobile} via SMS.{" "}
        </p>

        <div className="outline text-mediumFontSize font-Roboto-Light relative w-full focus:outline-none">
          <input
            type="text"
            name="otp"
            // pattern="[0-9]"
            // maxLength="6"
            required
            title="4 digits code"
            className={`text-center text-mediumFontSize font-Roboto-Semibold block p-4 w-full rounded appearance-none border-1  bg-transparent ${error
              ? "ring-2 ring-red-600 focus:ring-2 focus:ring-red-600"
              : "ring-0 focus:ring-0"
              }`}
            style={{ border: "1px solid #0000001F", color: "#00000099" }}
            value={formData?.otp || ""}
            onChange={handleChange}
          />
          <label
            htmlFor="mobile"
            className="absolute top-0 text-xlFontSize font-Roboto-Light bg-white px-4 mt-1 -z-1 duration-300 origin-0"
            style={{ color: "#00000099" }}
          >
            OTP
          </label>
          {error && (
            <span className="text-sm pt-1" style={{ color: "#B00020" }}>
              Invalid OTP. Please try again
            </span>
          )}
        </div>
        <div className="flex justify-center items-center text-xlFontSize font-Roboto-Regular">
          {!resentOTP ? (
            <label className="ml-2 text-m-grey-2">
              Resend OTP in 0:{seconds} Sec{" "}
            </label>
          ) : (
            <label
              className="ml-2 text-m-green cursor-pointer"
              onClick={otpResend}
            >
              RESEND OTP
            </label>
          )}
        </div>

        <button className="w-full bg-m-green p-4 text-white block text-xlFontSize font-Roboto-Regular rounded-lg shadow-2xl">
          VERIFY
        </button>
      </form>
    </div>
  );
}

export default VerifyOtpPopup;

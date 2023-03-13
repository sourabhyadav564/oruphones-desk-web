import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import * as Axios from "../../api/axios";
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
      Cookies.set("userUniqueId", response.dataObject.userUniqueId);
      Cookies.set("mobileNumber", response.dataObject.mobileNumber);
      setUserUniqueId(response.dataObject.userUniqueId);
      if (redirect !== undefined && redirect === false) {
        setOpen(false);
      }
      setUserLogged(true);
    } else {
      setError(true);
    }
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
        <Image
          src={"https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"}
          alt="ORUphones"
          width={160}
          height={40}
          className="md:w-100 w-72"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="md:m-16 sm:m-2 m-4 mt-4  md:px-6 flex flex-col space-y-6 items-center justify-center md:w-96 w-[60vw]"
      >
        <h2
          className="md:text-xl4FontSize text-xlFontSize font-Roboto-Bold text-center"
          style={{ color: "#2c2f44" }}
        >
          Verify Mobile No
        </h2>
        <p className="md:text-regularFontSize text-smallFontSize font-Roboto-Regular text-m-grey-1">
          {" "}
          Please enter the 4 digit verification code sent to your mobile number{" "}
          {formData?.mobile} via SMS.{" "}
        </p>

        <div className="outline text-mediumFontSize font-Roboto-Light relative w-full focus:outline-none">
          <input
            type="text"
            name="otp"
            required
            title="4 digits code"
            className={`text-center text-mediumFontSize font-Roboto-Semibold block p-4 w-full rounded appearance-none border-1  bg-transparent ${
              error
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
              className="ml-2 text-m-green md:text-mediumFontSize text-smallFontSize underline cursor-pointer"
              onClick={otpResend}
            >
              RESEND OTP
            </label>
          )}
        </div>

        <button className="w-full   bg-m-green md:p-4 p-3 text-white block md:text-xlFontSize text-mediumFontSize font-Roboto-Regular rounded-lg shadow-2xl">
          VERIFY
        </button>
      </form>
    </div>
  );
}

export default VerifyOtpPopup;

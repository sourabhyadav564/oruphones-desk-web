import React, { useRef } from "react";
import Input from "../../components/Form/Input";
import UserProfile from "../../components/User/UserProfile";
import * as Axios from "../../api/axios";
import { useState, useContext } from "react";
import AppContext from "@/context/ApplicationContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function Profile() {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const mobileNumber = useRef(Cookies.get("mobileNumber"));
  const [saveChange, setSaveChange] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = {
      // city: seletedCity,
      email: email || userInfo?.userdetails.email,
      mobileNumber: mobileNumber?.current,
      userName: name || userInfo.userdetails.userName,
      userUniqueId: Cookies.get("userUniqueId"),
    };

    Axios.updateUserDetails(payload).then((res) => {
      Axios.getUserProfile("91", mobileNumber?.current).then((resp) => {
        setUserInfo(resp.dataObject);
        toast.info("Profile information saved successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    });
  };

  return (
    <UserProfile className="mb-10">
      <div className="px-12 py-4">
        <h1 className="text-xl2FontSize font-Roboto-Semibold py-3"> Profile Information </h1>
        <form className="mt-4 grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
          <Input
            type="text"
            maxLength="30"
            name="username"
            defaultValue={userInfo?.userdetails?.userName}
            onChange={(e) => {
              setSaveChange(true);
              setName(e.target.value);
            }}
          >
            Name
          </Input>
          <span className="block" />
          <Input type="tel" name="mobile" value={`+91 ${mobileNumber?.current}` || ""} disabled>
            Mobile No
          </Input>
          <Input
            type="email"
            defaultValue={userInfo?.userdetails?.email}
            onChange={(e) => {
              setSaveChange(true);
              setEmail(e.target.value);
            }}
          >
            Email ID
          </Input>
          <div className="row-start-4 flex justify-end col-span-2">
            <button className={`px-12 rounded text-white text-regularFontSize font-Roboto-Semibold uppercase py-2 ${saveChange ? "bg-m-green" : "bg-gray-1"} hover:bg-m-green`}>Save</button>
          </div>
        </form>
      </div>
    </UserProfile>
  );
}

export default Profile;

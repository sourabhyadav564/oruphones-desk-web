import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdNotificationsNone } from "react-icons/md";
import router from "next/router";
// import mob from "@/assets/notification.png";
import mob from "@/assets/logo_square.svg";
import { getAllNotificationByUserd, markAsRead } from "api/axios";
import AppDownloadPopup from "./Popup/AppDownloadPopup";
import Cookies from "js-cookie";

export default function Notifications() {
  const innerRef = useRef();
  const [showNotification, setShowNotification] = React.useState(false);
  const [openAppDownload, setOpenAppDownload] = useState(false);
  const [notifications, setNotifications] = useState();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState();

  useEffect(() => {
    getAllNotificationByUserd(Cookies.get("userUniqueId")).then((response) => {
      setNotifications(response?.dataObject?.notifications);
      setUnreadNotificationsCount(
        response?.dataObject?.totalCount - response?.dataObject?.readCount
      );
    });

    const checkIfClickedOutside = (e) => {
      if (innerRef.current && !innerRef.current.contains(e.target)) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  useEffect(() => {
    if (showNotification) {
      getAllNotificationByUserd(Cookies.get("userUniqueId")).then(
        (response) => {
          setNotifications(response?.dataObject?.notifications);
          setUnreadNotificationsCount(
            response?.dataObject?.totalCount - response?.dataObject?.readCount
          );
        }
      );
    }
  }, [showNotification]);

  function redirectTo(data) {
    setShowNotification(false);
    if (data.webEventAction === "APP_DOWNLOAD") {
      setOpenAppDownload(true);
    } else if (data.webEventAction === "MY_FAVORITES") {
      router.push("/user/favorites");
    } else {
      router.push("/user/listings");
    }
    makeNotificationAsRead(data);
  }

  function makeNotificationAsRead(data) {
    if (data?.isUnRead === 0) {
      markAsRead(data?.notificationId).then((response) =>
        console.log("makeNotificationAsRead -> ", response?.reason)
      );
    }
  }

  return (
    <div className="relative inline-block" ref={innerRef}>
      <div className="relative">
        {/* <span className="absolute right-0 top-0">{unreadCount}</span> */}
        <MdNotificationsNone
          size={30}
          className="text-m-green cursor-pointer"
          onClick={() => setShowNotification((prev) => !prev)}
        />
      </div>

      <div
        className={`absolute z-50 transform -translate-x-1/2 left-1/2 bg-transparent custom-scroll ${
          showNotification ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-10 overflow-hidden inline-block">
            <div className="h-7 w-7 relative bg-white rotate-45 transform origin-bottom-left"></div>
          </div>
          <div className="-mt-1 flex flex-col w-96 h-72 overflow-hidden overflow-y-auto rounded-md shadow-md pb-2 border-t-4 border-transparent bg-white">
            <p className="text-center text-lg pt-4 pb-3 font-semibold text-m-grey-1 h-auto">
              Notification
            </p>
            {notifications && notifications.length > 0 ? (
              notifications.map((items, index) => (
                <NotificationsItem
                  key={items.notificationId}
                  text={items.messageContent}
                  timestamp={items.createdDate}
                  onClick={() => redirectTo(items)}
                  isUnRead={items.isUnRead === 0}
                />
              ))
            ) : (
              <div>No notifications</div>
            )}
          </div>
        </div>
      </div>
      <AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
    </div>
  );
}

const NotificationsItem = ({ text, timestamp, onClick, isUnRead }) => (
  <div
    className={`hover:cursor-pointer flex w-full border-b border-white py-2 px-4 ${
      isUnRead ? "bg-gray-100" : ""
    }`}
    onClick={onClick}
  >
    <div
      className="w-12 h-12 rounded-2xl flex-shrink-0 mr-4 flex justify-center items-center"
      style={{ background: "#EFEFEF" }}
    >
      <Image src={mob} width={30} height={30} alt="ORUphones" />
    </div>
    <div>
      <p className="text-sm text-m-grey-1 break-words"> {text} </p>
      <span className="text-xs" style={{ color: "#C7C7C7" }}>
        {timestamp}
      </span>
    </div>
  </div>
);

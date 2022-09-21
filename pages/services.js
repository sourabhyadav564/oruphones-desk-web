// import UserProfile from "../../components/User/UserProfile";
import Loader from "@/components/Loader/Loader";
import { servicesData } from "@/utils/constant";
import Image from "next/image";
import { useState } from "react";
import AppDownloadPopup from "@/components/Popup/AppDownloadPopup";

function Services() {

    const [openAppDownload, setOpenAppDownload] = useState(false);

    function handleVerifyListing() {
        setOpenAppDownload(true);
    }

    return (
        // <UserProfile>
        <div className="px-60 py-3">
            <h1 className="text-lg py-2"> ORU Services </h1>
            <div className="flex flex-col space-y-4 my-4">
                {servicesData && servicesData.length > 0 ? (
                    servicesData.map((item, index) => (
                        <div
                            key={index}
                            className="border py-2 px-4 pl-0 flex items-center rounded shadow mb-3 hover:cursor-pointer"
                            onClick={handleVerifyListing}
                        >
                            <div className="p-4">
                                <Image
                                    src={item?.imgSrc || "/"}
                                    width={"48"}
                                    height={"30"}
                                    objectFit="contain"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-gray-20">{item.title}</h2>
                                <p className="text-sm text-gray-70">{item.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex h-60 items-center justify-center">
                        <Loader />
                        Please wait, while we are fetching our services...
                    </div>
                )}
            </div>
            <AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
        </div>
        // </UserProfile>
    );
}

export default Services;

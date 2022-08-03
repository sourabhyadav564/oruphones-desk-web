import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import bgImage from "@/assets/app_download.png";
import { GrClose } from "react-icons/gr";
// import QRCode from "qrcode.react";
import { useState, useEffect } from "react";
import * as Axios from "../../api/axios";

function AppDownloadPopup({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  // const [qrValue, setQrValue] = useState();

  // useEffect(() => {
  //   Axios.getTinyUrl().then((response) => {
  //     setQrValue(response?.dataObject.tinyurl);
  //   });
  // }, []);
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
          >
            <div className="relative" style={{ width: 916, minHeight: 475 }}>
              <Image src={bgImage} layout="fill" />
              <GrClose
                onClick={() => setOpen(false)}
                className="cursor-pointer absolute right-3 top-3"
              />
              <div className="z-20 relative px-8 py-4 w-8/12 text-black-20">
                <h1 className="font-bold mb-4"> Just one more step </h1>
                <ul className="list-disc text-sm flex flex-col space-y-4 px-4">
                  <li>
                    Interact directly with the buyers and sellers of latest
                    mobile phones and save yourself the extra commission on
                    ORUphones app.
                  </li>
                  <li>
                    Get a detailed diagnosis of your device and a suitable price
                    you can put on the same to get verified buyers.
                  </li>
                  <li>
                    Hassle-free buying of mobiles with our AI-based tech which
                    gets to you verified and interested buyers for your mobile.
                  </li>
                  <li>
                    Scan the QR code or follow the link to download the
                    ORUphones app on the phone you want to sell.
                  </li>
                  <li>
                    Wondering how to transfer your data from your old phone
                    before selling it? We&apos;ve got you covered here. The
                    ORUphones app also allows you to get access to FREE data
                    transfer feature. Now don&apos;t get missed on transferring
                    your content from your old phone to a new phone.
                  </li>
                </ul>
                <div className="flex space-x-4 justify-start items-center">
                  {/* <QRCode
                    id="qr-gen"
                    value={qrValue}
                    size={130}
                    level={"H"}
                    includeMargin={true}
                  /> */}
                  {/* <div className="flex flex-col justify-end pl-4">
                    <Link href={qrValue}>
                      <a className="w-32 h-8 bg-app-store bg-no-repeat bg-contain"></a>
                    </Link>
                    <Link href={qrValue}>
                      <a className="w-32 mt-4 h-8 bg-play-store bg-no-repeat bg-contain"></a>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AppDownloadPopup;

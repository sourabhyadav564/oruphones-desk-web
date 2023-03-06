import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// import bgImage from "https://d1tl44nezj10jx.cloudfront.net/assets/app_download.png";
// import { GrClose } from "react-icons/gr";
import Close from "@/assets/cross.svg";
// import QRCode from "qrcode.react";
import AppleStore from "@/assets/apple_store.svg";
import PlayStore from "@/assets/playstore.svg";
import { useState, useEffect } from "react";

import * as Axios from "../../api/axios";

function AppDownloadPopup({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );

  const [qrValue2, setQrValue2] = useState(
    "https://play.google.com/store/apps/details?id=com.oruphones.oru"
  );

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
        onClose={() => { setOpen(false) }}
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
            <div className="relative bg-white  rounded-lg mx-10" style={{ width: 916, minHeight: 475 }}>
              <div className="hidden md:block ">
              <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/app_download.png"} alt="ORU close" layout="fill" className=""/>
              </div>  

              <div className="md:absolute md:right-3 md:top-0 text-white flex justify-end mr-4 mt-4 ">
              {/* <GrClose
                onClick={() => setOpen(false)}
                className=""
              /> */}
              <Image src={Close} width={28} height={28} onClick={() => setOpen(false)}/>
              </div>
              <div className="z-20 relative px-8 py-4  md:w-8/12 text-black-20">
                <p className="font-Roboto-Bold text-xl2FontSize mb-4"> Just one more step </p>
                <ul className="list-disc text-mediumFontSize font-Roboto-Regular flex flex-col space-y-4 px-4">
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
                <div className="flex space-x-4 md:justify-start md:py-0 my-4 justify-center items-center">
                  <div className="flex flex-col items-center justify-center pl-4">
                    {/* <QRCode
                      id="qr-gen"
                      value={qrValue1}
                      size={130}
                      level={"H"}
                      includeMargin={true}
                    /> */}
                    <Image src={AppleStore} width={96} height={96} alt=""/>

                    <Link href={qrValue1}>
                      <a className="w-32 h-10 bg-app-store bg-contain"></a>
                    </Link>
                  </div>
                  <div className="flex flex-col items-center justify-center pl-4">
                    {/* <QRCode
                      id="qr-gen"
                      value={qrValue2}
                      size={130}
                      level={"H"}
                      includeMargin={true}
                    /> */}

                     <Image src={PlayStore} width={96} height={96} alt=""/>

                    <Link href={qrValue2}>
                      <a className="w-32 h-10 bg-play-store bg-contain"></a>
                    </Link>
                  </div>
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

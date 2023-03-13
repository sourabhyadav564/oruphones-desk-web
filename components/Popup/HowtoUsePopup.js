import React, { useState } from "react";
import Modal from ".";
import Image from "next/image";
import AppleStore from "@/assets/apple_store.svg";
import PlayStore from "@/assets/playstore.svg";
import Link from "next/link";

function HowtoUsePopup({ open, setOpen }) {
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );

  const [qrValue2, setQrValue2] = useState(
    "https://play.google.com/store/apps/details?id=com.oruphones.oru"
  );

  return (
    <div>
      <Modal open={open} setOpen={setOpen} title={"ORU Guide"}>
        <div className="px-16  m-auto justify-center h-[80vh] overflow-y-scroll mostly-customized-scrollbar ">
          <div className="flex pb-8 justify-start items-center">
            <div className="flex flex-col items-center justify-center m-auto">
              <Image src={AppleStore} width={96} height={96} alt="" />
              <Link href={qrValue1}>
                <a className="w-32 h-10 bg-app-store bg-contain mt-2"></a>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center m-auto">
              <Image src={PlayStore} width={96} height={96} alt="" />
              <Link href={qrValue2}>
                <a className="w-32 h-10 bg-play-store bg-contain mt-2"></a>
              </Link>
            </div>
          </div>
          <div>
            <p className="font-Roboto-Semibold  text-[24px] w-[350px]  text-center">
              Download our App using these QR Codes
            </p>
            <p className="text-[20px] font-semibold py-4">
              1. Device Health Check
            </p>
            <div className="flex items-center">
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/1.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
              <p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-4 text-center">
                ORUphones provides best in industry device health check.
              </p>
            </div>
            <div className="flex items-center">
              <p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-4 text-center">
                Wait till you see this window.
              </p>
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/2.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <p className="text-[20px] font-semibold py-4">2. Bettery Health</p>
            <div className="flex items-center">
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/2.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
              <p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-4 text-center">
                You can check your device bettery health in just one click.
              </p>
            </div>
            <div className="flex items-center">
              <p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-4 text-center">
                Wait for 2-3 min to complete the process.
              </p>
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/4.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-[20px] font-semibold py-4">
              3. Price Comparison
            </p>
            <div className="flex items-center">
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/1.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
              <p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-4 text-center">
                Compare price of your device with other vendors.
              </p>
            </div>
            <div className="flex items-center">
              <p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-4 text-center">
                Fill all the Specification of your device to get accurate price.
              </p>
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/5.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <p className="text-[20px] font-semibold py-4">4. Device Details</p>
            <div className="flex items-center">
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/1.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
              <p className="word-wrap font-Roboto-Semibold md:w-48 w-60 px-4 text-center">
                We also provide your device details in just one click.
              </p>
            </div>
            <div className="items-center py-16 text-center">
              <p className="font-Roboto-Semibold w-80 px-4 ">
                We want our users to do less work so we provide your device
                details like CPU, Hardware, Battery and manu more in just one
                click.
              </p>
              <div className="flex -space-x-12  items-end justify-center py-4">
                <div>
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/6.png"
                    }
                    width={100}
                    height={150}
                    alt=""
                    className="object-contain z-50 "
                  />
                </div>
                <div className="">
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/7.png"
                    }
                    width={120}
                    height={200}
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div>
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/8.png"
                    }
                    width={100}
                    height={150}
                    alt=""
                    className="object-contain z-50"
                  />
                </div>
                <div className="">
                  <Image
                    src={
                      "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/9.png"
                    }
                    width={120}
                    height={200}
                    alt=""
                    className="object-contain "
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[20px] font-semibold py-4">5. Notification</p>
            <div className="flex items-center">
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/10.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
              <p className="word-wrap font-Roboto-Semibold w-48 px-4 text-center">
                You will recieve Notification for verification of your device so
                you don't have to check often.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[20px] font-semibold py-4 ">6. Profile</p>
            <div className="flex items-center">
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/11.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
              <p className="word-wrap font-Roboto-Semibold w-48 px-4 text-center">
                You can always edit your personal details in profile section.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[20px] font-semibold py-4 ">7. Your Listings</p>
            <div className="flex items-center">
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/12.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
              <p className="word-wrap font-Roboto-Semibold w-48 px-4 text-center">
                Once you list your device on ORUphones you can check your
                listings in my listing section.
              </p>
            </div>
            <div className="flex items-center">
              <p className="word-wrap font-Roboto-Semibold w-48 px-4 text-center">
                You can also view your favourite details.
              </p>
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/13.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <p className="text-[20px] font-semibold py-4">8. More Services</p>
            <div className="flex items-center">
              <Image
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/14.png"
                }
                width={150}
                height={300}
                alt=""
                className="object-contain"
              />
              <p className="word-wrap font-Roboto-Semibold w-48 px-4 text-center">
                Our team is working on more services for our users.
              </p>
            </div>
          </div>
          <div>
            <p className=" text-[20px] font-Roboto-Semibold text-center py-4 w-80">
              *ORUphones never take any personal information from our users.
              Your privacy is our priority.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HowtoUsePopup;

import Image from "next/image";

function GuideToSell() {
  return (
    <div>
      <div className="relative w-full h-40">
        <Image src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_your_phone.svg"} alt="ORU devices" layout="fill" />
      </div>
      <div className="px-4 py-6 text-sm">
        <p className="font-semibold capitalize text-m-green py-3">
          Add your device
        </p>
        <span className="text-m-grey-1 mb-4 block">
          To sell your device, the first step is to add your device on the
          platform. For that, you need to fill in all the required details of
          your device. The details include brand, model, storage, color, and
          present condition of the phone according to you. After filling out
          these details, you must submit images of your device. A photo from the
          front and another from the back are compulsory, but you may add as
          many as you want. Then, select the accessories which you are providing
          along with the mobile. After filling in all these details, your device
          will be successfully added, and you will get a dialog box giving you
          the same message.
        </span>
        <p className="font-semibold capitalize text-m-green py-3">
          Device Verification
        </p>
        <span className="text-m-grey-1 mb-4 block">
          After adding your device, the device will be given a listing in the
          &lsquo;My listings&rsquo; option in your account. Reach out to that
          listing and click on the green &lsquo;Verify&rsquo; button at the
          bottom right corner of the listing. After clicking on it, the site
          will ask you to download the &lsquo;ORUphones app&rsquo; on the device
          to proceed with the verification. After installing the ORUphones app,
          a series of automated and manual tests will be performed on your
          device. Following this, the A.I. will ask you some questions regarding
          the performance of the mobile. After successful questionnaire and
          analysis, the device will receive a &lsquo;Verified&rsquo; badge.
        </span>
        <p className="font-semibold capitalize text-m-green py-3">Get Cash</p>
        <span className="text-m-grey-1 mb-4 block">
          After the verification, the A.I. will give your device a grade and a
          price range to you. You can price your mobile based on this range.
          After successful verification, your listing will begin to be shown on
          the platform and will be visible to the buyers. Now, interested buyers
          will themselves contact you through your details given at the time of
          sign-up. Interact with the buyers, set a meeting, and get an amazing
          deal for your old mobile phone.
        </span>
      </div>
    </div>
  );
}

export default GuideToSell;

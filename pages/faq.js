import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import { infoTemplates } from "api/axios";
import fetchStaticHTML from "api/fetchStaticHtml";
import faqImg from "@/assets/faq.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { metaTags } from "@/utils/constant";
import Head from "next/head";

// function faq({ htmlText, error }) {
//   if (error) {
//     return <Error statusCode={404} />;
//   }
function faq() {
  const [htmlText1, setHtmlText1] = useState("");

  useEffect(() => {
    callStaticPages();
  }, []);

  async function callStaticPages() {
    // let staticDataPath;
    // try {
    //   const response = await infoTemplates();
    //   staticDataPath = response?.dataObject;
    // } catch (error) {
    //   console.log(error);
    // }

    var htmlText;
    try {
      // const { serverUrl, templateUrls } = staticDataPath;
      const res = await fetchStaticHTML("/faq.html");
      // const res = await fetchStaticHTML(serverUrl + templateUrls.VERIFICATION);
      const html = res.data;
      const doc = nodeParser(html);
      const body = doc.querySelector("body");
      htmlText = body.innerHTML;
      setHtmlText1(htmlText);
    } catch (err) {
      console.log("getVerificationConent error", err);
    }
  }

  return (
    <>
      <Head>
        <title>{metaTags.FAQ.title}</title>
        <meta name="description" content={metaTags.FAQ.description} />
        <meta property="og:title" content={metaTags.FAQ.title} />
        <meta property="og:description" content={metaTags.FAQ.description} />
      </Head>
      <main className="container my-8">
        <section
          className="bg-white h-52 py-8 pl-12 rounded-md mb-4 flex justify-center"
          style={{ boxShadow: "0px 2px 3px #0000000A" }}
        >
          <div className="flex items-center w-10/12 justify-between">
            <h1 className="text-8xl text-m-green font-bold"> F.A.Q </h1>
            <Image src={faqImg} width={230} height={163} alt="ORU faq "/>
          </div>
        </section>
        {/* {parse(htmlText1)} */}
        <main className="px-6 my-4 ">
          <section class="faq pt-12">
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. What is Oru?</strong><br /><strong className="font-Semibold">Ans.</strong> Oru is India&rsquo;s first and best online
              platform where you can buy and sell a variety of refurbished mobiles from the comfort of your home. Our
              latest A.I. tech and review team gets you the best of deals for your mobile and the best of mobiles in an
              amazing price.</p>
            <p class>ORU is India&rsquo;s first ever online marketplace dedicated for buying &amp; selling old, refurbished and
              used mobiles/smartphones. Our goal is to make used phones trading more profitable, safer, reliable and
              convenient for both buyers and sellers of used phones.&nbsp;</p>
            <p className="font-Roboto-Regular">Used phones/refurbished phones prices are heavily inflated as the device goes through many hands/middleman
              before it reaches you. Most of the online shops/platforms charge heavy commissions &amp; premiums. They try
              to justify the prices by tagging these phones as refurbished. But in most cases these phones are not going
              through the refurbishment process.&nbsp;</p>
            <p className="font-Roboto-Regular">We at ORU will make sure that both buyers and sellers get the best deals available in the market because
              sellers/buyers do not have to pay any commission to anyone.&nbsp;</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Safety and security:</strong></p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How do I buy used phones through Oru?</strong><br /><strong className="font-Semibold">Ans.</strong> You just have to
              follow
              three simple steps to sell your old phone through Oru. Simply Select device, Contact seller, Verify purchase
              and get an amazing deal. All the sellers registered with Oru are well-verified and the phones you&rsquo;ll
              buy are also well tested.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How do I sell my phone through Oru?</strong><br /><strong className="font-Semibold">Ans.</strong> You can sell your phone
              through Oru by following three simple steps. Just Add your device, Verify your device and Get instant cash
              for your mobile. Our best tech will give you a price estimate for your mobile and you can select the price
              of device accordingly. The buyers will themselves contact you for your mobile.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. What is recommended price range?</strong><br /><strong className="font-Semibold">Ans.</strong> After verifying the present
              condition of your mobile, our latest A.I. tech will tell you the recommended price range for which you
              should sell your mobile. Our algorithm tests your device based on several features like battery, display,
              speakers etcetera and then only it gives you a suitable price range.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. What is seller&rsquo;s verification?</strong><br /><strong className="font-Semibold">Ans.</strong> Before displaying any
              device on the platform, Oru verifies both the seller and the device so as to get only verified sellers to
              you. The seller is verified through his contact number as well as mail, so as to get only genuine deals to
              you.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. What is buyer&rsquo;s verification?</strong><br /><strong className="font-Semibold">Ans.</strong> Before registering any
              buyer
              to the platform, Oru verifies him/her through mobile and mail to get genuine buyers for your device.&nbsp;
            </p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How are you different from classified sites like Quikr or
              OLX?</strong><br /><strong className="font-Semibold">Ans.</strong>
              We have your hand held throughout your entire mobile deal. Unlike Quikr and OLX, we ensure that each device
              registered with us is in working condition. We do not act as a third party between your mobile deals, we
              rather act as a free platform where genuine sellers and buyers can interact and get a great deal.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. Why do I need Oru app?</strong><br /><strong className="font-Semibold">Ans.</strong> To sell your mobile through Oru, you
              need
              to verify the condition of your device. For that, you need to install the Oru app on the same device. The
              Oru app will test the device based on its speaker quality, display, Mike and other attributes and then will
              assign a grade to the device.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. What does verified seller mean?</strong><br /><strong className="font-Semibold">Ans.</strong> Oru displays a seller on the
              platform only after verifying him and his device. After successful verification, the seller is badged as a
              verified seller. The verification is done through mail and contact number and his device is verified through
              the Oru app.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. Why should I trust a verified seller?</strong><br /><strong className="font-Semibold">Ans.</strong> The badge of
              &lsquo;verified seller&rsquo; means that the seller and his device, both have been verified by our A.I. tech
              and are truly genuine and you can trust them.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. Can I view information submitted by a verified seller?</strong><br /><strong className="font-Semibold">Ans.</strong> After
              selecting the device, you will be forwarded to the product details page. Here, you can click on
              &lsquo;Contact seller&rsquo; button, on the right side of the screen, to reveal his information. This will
              include all the seller&rsquo;s information along with his contact details.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How do I search for a mobile?</strong><br /><strong className="font-Semibold">Ans.</strong> The best deals are displayed
              on
              the home page only. But, if you wish to explore, then, you can click on the &lsquo;Search Bar&rsquo; and
              look for any mobile. You can also search brand-wise and grade-wise as these options are available right
              below the &lsquo;Search Bar&rsquo; for a better surfing experience.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How can I contact a seller?</strong><br /><strong className="font-Semibold">Ans.</strong> After selecting a device, you
              can
              click on the &lsquo;Contact seller&rsquo; button. There you will be revealed about the seller&rsquo;s
              contact details, through which you can easily contact him.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How to search for an ad based on location?</strong><br /><strong className="font-Semibold">Ans.</strong> On the right side
              of
              the search bar, we have a &lsquo;Location Bar&rsquo; as well. You can select a location of your choice there
              and get ads from that place only.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. Where should I meet the seller?</strong><br /><strong className="font-Semibold">Ans.</strong> Once you get the
              seller&rsquo;s
              credentials by clicking the &lsquo;Contact seller&rsquo; button, you can contact the seller anytime and fix
              a meeting at your desired place.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How can I list my used phone?</strong><br /><strong className="font-Semibold">Ans.</strong> You can easily list your used
              mobile phone on the Oru platform by clicking on the &lsquo;Sell now&rsquo; icon on the top right corner of
              the homepage. For listing your device, you will have to enter the details and verify your device. After a
              successful verification, your device will be listed on Oru as a verified device.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How many listings can I add in a month?</strong><br /><strong className="font-Semibold">Ans.</strong> You can add, as much
              as,
              5 listings in a month. If you are retailer of refurbished mobiles and are willing to list more than 5
              devices in a month, then, you should contact us. The &lsquo;Contact us&rsquo; section is at the bottom right
              corner of the homepage, you can easily get our contact details from there.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. Where can I see the listings that I posted?</strong><br /><strong className="font-Semibold">Ans.</strong> On the top right
              corner of our homepage, we have the &lsquo;Sell now&rsquo; icon and just beside that, we have the &lsquo;My
              Account' icon. You can click on the &lsquo;My Account' icon to see your account details. In your account,
              you will see the option of &lsquo;My Listings' on the left hand side. Click on the same to see your
              listings.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How do I edit/delete an ad?</strong><br /><strong className="font-Semibold">Ans.</strong> Go to &lsquo;My Account' icon at
              the
              top right corner of the homepage. Then, select &lsquo;My listings&rsquo; from the left side of your account.
              There, you will get to see your listings. Click on any one of them to see it. Now, you can easily edit or
              delete that listing by clicking on the &lsquo;Edit listing&rsquo; option at the top right corner of the same
              listing.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How can my device be eligible for the best deals?</strong><br /><strong className="font-Semibold">Ans.</strong> The deals
              which you will be offered for your device solely depend upon the verification and quality of your device.
              Verified devices are preferred by buyers, so make sure to verify your device by downloading the Oru app on
              the device. And the quality of your device will be checked by our A.I. tech, which will give you a clear
              price range of your device.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. How do I know if people are seeing my listings?</strong><br /><strong className="font-Semibold">Ans.</strong> In the
              &lsquo;My
              Account' option of the homepage, click on &lsquo;My listings' option on the left side. There, you will see
              all your listings, click on any of them to view it&rsquo;s details. Now, in that listing, you will see a
              graph like small icon beside the &lsquo;Edit listing' option on the top right corner. Click on that graph
              icon to see the viewership analysis of your listing.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. Why isn&rsquo;t my listing live?</strong><br /><strong className="font-Semibold">Ans.</strong> Any listings made by a
              seller
              may not be made live if it has either of the described issue. The listing might have been paused by you only
              as you have already sold the mobile. The device could also be &lsquo;Under review' of our team and will be
              made live after the review is done. Or the listing has been rejected due to quality issues. In either of
              these cases, you will be informed timely.</p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. Why did my listing get rejected?</strong><br /><strong className="font-Semibold">Ans.</strong> A listing is reviewed by
              our
              team based on various quality and verification related attributes. Any listing may be rejected if it fails
              to pass the review test. It is usually rejected when the listing contains some objectionable or insensitive
              image or the device failed to pass the quality check. In either of these cases, the listing gets rejected.
            </p>
            <p className="font-Roboto-Regular"><strong className="font-Semibold">Que. Why is my account banned?</strong><br /><strong className="font-Semibold">Ans.</strong> Oru has the right to terminate any
              user&rsquo;s account if the user seems not to follow the terms and conditions of Oru. Crossing the
              boundaries of these conditions or posting inappropriate images in a listing may result in the termination of
              your account. If you feel the decision to be wrong, you can contact us through mail.</p>
          </section>
        </main>
      </main>
    </>
  );
}

export default faq;

// export async function getServerSideProps() {
//   let staticDataPath;
//   try {
//     const res = await infoTemplates();
//     staticDataPath = res?.dataObject;
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         error: true,
//       },
//     };
//   }

//   var htmlText;
//   try {
//     const { serverUrl, templateUrls } = staticDataPath;
//     const res = await fetchStaticHTML(serverUrl + templateUrls.FAQ);
//     const html = res.data;
//     const doc = nodeParser(html);
//     const body = doc.querySelector("body");
//     htmlText = body.innerHTML;
//   } catch (err) {
//     console.log("getFAQConent error", err);
//     return {
//       props: {
//         error: true,
//       },
//     };
//   }

//   return {
//     props: {
//       htmlText: htmlText,
//     },
//     // revalidate: 60*60*24, // In seconds
//   };
// }

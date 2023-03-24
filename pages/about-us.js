import { parse as nodeParser } from "node-html-parser";
import fetchStaticHTML from "api/fetchStaticHtml";
import { useEffect, useState } from "react";
import { metaTags } from "@/utils/constant";
import Head from "next/head";

function Aboutus() {
  const [htmlText1, setHtmlText1] = useState("");

  useEffect(() => {
    callStaticPages();
  }, []);

  async function callStaticPages() {
    var htmlText;
    try {
      const res = await fetchStaticHTML("/about-us.html");
      const html = res.data;
      const doc = nodeParser(html);
      const body = doc.querySelector("body");
      htmlText = body.innerHTML;
      setHtmlText1(htmlText);
    } catch (err) {}
  }

  return (
    <>
      <Head>
        <title>{metaTags.ABOUT_US.title}</title>
        <meta name="description" content={metaTags.ABOUT_US.description} />
        <meta property="og:title" content={metaTags.ABOUT_US.title} />
        <meta
          property="og:description"
          content={metaTags.ABOUT_US.description}
        />
      </Head>
      <main className="container my-8 justify-evenly">
        <section className="bg-m-green h-52 py-8 px-12 flex items-center shadow rounded-md mb-4">
          <h1 className="text-6xl font-Roboto-Bold text-m-grey-5">
            {" "}
            About Us{" "}
          </h1>
        </section>
        <div className="content mt-8 text-justify">
          <div className="font-Roboto-Medium mt-6 text-xlFontSize ">
            ORUphones is India's first ever online marketplace exclusively built
            for buying and selling Certified Old, Refurbished & Used phones. Our
            vision is to be a trusted marketplace for every user to buy and sell
            old phones confidently, easily, and for the best price possible. We
            strive to achieve this with a strong base of technology and a
            dedicated team of professionals who are well-seasoned and understand
            the needs of the market.
          </div>
          <h2 className="font-Roboto-Semibold">WHY ORUphones?</h2>
          <div>
            <div className="font-Roboto-Semibold text-xl2FontSize">
              {" "}
              01. Best Prices
            </div>
            <div className="font-Roboto-Light text-xlFontSize">
              The prices of used phones hike as they reach the end-user through
              multiple people. A few online shops and stores justify these
              highly inflated prices by tagging the phones as refurbished. But
              most of these phones are NOT refurbished, but devices with updates
              installed and screen-guards changed. So, many sellers and users
              are not likely to get the best deals. At ORUphones you can buy and
              sell certified used phones for free. No commission is involved, no
              fees and no hidden charges, as transactions take place directly
              between the seller and buyer. ORUphones' AI-driven pricing engine
              curates and presents the most profitable deals to both buyers and
              sellers
            </div>
          </div>
          <div>
            <div className="font-Roboto-Semibold text-xl2FontSize">
              {" "}
              02. Safe & Secure
            </div>
            <div className="font-Roboto-Light text-xlFontSize">
              Fake or counterfeit smartphones are common in the used &
              second-hand phone markets in India. Online markets have a higher
              risk as you cannot personally check out the condition of the
              device. Phones that look brand new in pictures might be
              functioning with an outdated processor; or with cheaper components
              in place of the original parts. It takes extreme precautions and
              precise observation to spot these fake devices from real ones. We
              at ORUphones provide advanced technological tools to ensure that
              the device is branded & genuine. This eliminates any possibility
              of fraud and fake deals at ORUphones, unlike in other
              marketplaces. In addition, our Services like Data Wipe and Data
              Backup/restore helps with data privacy and minimise any risk of
              personal information and data leak.
            </div>
          </div>
          <div>
            <div className="font-Roboto-Semibold text-xl2FontSize">
              {" "}
              03. Convenient
            </div>
            <div className="font-Roboto-Light text-xlFontSize">
              ORUphones is a website that makes selling and buying old phones
              easier. With the provision of the Best Deals section and added
              free services, ORUphones does all the tedious work and puts forth
              verified and authentic deals for buyers and sellers so that you
              can proceed to sell or purchase with assurance and ease.
            </div>
          </div>
          <div className="my-2">
            <div className="font-Roboto-Medium text-xlFontSize">
              That apart, our proprietary algorithm curates <br />
              <span className="underline"> Best Deal for Buyers: </span>Save up
              to 30% on curated offers that provide the best quality-price
              ratio.
              <br />
              <span className="underline">Best Deal for Sellers: </span> Get the
              maximum cash for your old Phone with our "Recommended price"
              algorithm
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Aboutus;
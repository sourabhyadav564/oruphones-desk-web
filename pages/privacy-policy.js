import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import { infoTemplates } from "api/axios";
import fetchStaticHTML from "api/fetchStaticHtml";
import { useEffect, useState } from "react";
import { metaTags } from "@/utils/constant";
import Head from "next/head";

// function PrivacyPolicy({ htmlText, error }) {
//   if (error) {
//     return <Error statusCode={404} />;
//   }
function PrivacyPolicy() {
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
      // const res = await fetchStaticHTML("/privacy-policy.html");
      const res = await fetchStaticHTML("/new_privacy_policy.html");
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
        <title>{metaTags.PRIVACY.title}</title>
        <meta name="description" content={metaTags.PRIVACY.description} />
        <meta property="og:title" content={metaTags.PRIVACY.title} />
        <meta
          property="og:description"
          content={metaTags.PRIVACY.description}
        />
      </Head>
      <main className="container my-8">
        <section className="p-6 mt-12 mb-6 text-black-20 text-center">
          <h1 className="font-bold text-2xl uppercase">
            Mobilicis India Private Limited
          </h1>
          <p>Privacy Policy of www.oruphones.com</p>
        </section>
        {parse(htmlText1)}
      </main>
    </>
  );
}

export default PrivacyPolicy;

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
//     const res = await fetchStaticHTML(serverUrl + templateUrls.PRIVATE_POLICY);
//     const html = res?.data || "";
//     const doc = nodeParser(html);
//     const body = doc.querySelector("body");
//     htmlText = body?.innerHTML || "";
//   } catch (err) {
//     console.log("PRIVATE_POLICY error", err);
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

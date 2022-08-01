import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import { infoTemplates } from "api/axios";
import fetchStaticHTML from "api/fetchStaticHtml";
import { useEffect, useState } from "react";
import { metaTags } from "@/utils/constant";
import { Helmet } from "react-helmet";

// function Aboutus({ htmlText, error }) {
//   if (error) {
//     return <Error statusCode={404} />;
//   }
function Aboutus() {
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
      const res = await fetchStaticHTML("/about-us.html");
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
      <Helmet>
        <title>{metaTags.ABOUT_US.title}</title>
        <meta name="description" content={metaTags.ABOUT_US.description} />
        {/* <meta property="og:url" content={window.location.href} /> */}
        <meta property="og:title" content={metaTags.ABOUT_US.title} />
        <meta property="og:description" content={metaTags.ABOUT_US.description} />
      </Helmet>
      <main className="container my-8">
        <section className="bg-m-green h-52 py-8 px-12 flex items-center shadow rounded-md mb-4">
          <h1 className="text-6xl font-light text-m-grey-5"> About Us </h1>
        </section>
        {parse(htmlText1)}
      </main>
    </>
  );
}

export default Aboutus;

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
//     const {serverUrl,templateUrls} = staticDataPath;
//     const res = await fetchStaticHTML(serverUrl+templateUrls.ABOUT_US);
//     const html = res.data;
//     const doc = nodeParser(html);
//     const body = doc.querySelector("body");
//     htmlText = body.innerHTML;
//   } catch (err) {
//     console.log("getAboutUsContent error", err);
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

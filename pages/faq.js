import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import { infoTemplates } from "api/axios";
import fetchStaticHTML from "api/fetchStaticHtml";
import faqImg from "@/assets/faq.png";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    <main className="container my-8">
      <section className="bg-white h-52 py-8 pl-12 rounded-md mb-4 flex justify-center" style={{ boxShadow: "0px 2px 3px #0000000A" }}>
        <div className="flex items-center w-10/12 justify-between">
          <h1 className="text-8xl text-m-green font-bold"> F.A.Q </h1>
          <Image src={faqImg} width={230} height={163} />
        </div>
      </section>
      {parse(htmlText1)}
    </main>
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

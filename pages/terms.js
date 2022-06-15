// import Header2 from "@/components/Header/header2";
import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import { Fragment } from "react";
import { infoTemplates } from "api/axios";
import fetchStaticHTML from "api/fetchStaticHtml";

function Termscondition({ htmlText, error }) {
  if (error) {
    return <Error statusCode={404} />;
  }
  return (
    <main className="container my-8">
      <section className="mt-12 flex flex-col items-center mb-8 text-m-black">
        <h1 className="uppercase  font-bold" style={{ fontSize: 28 }}>
          Mobilicis India Private Limited
        </h1>
        <p style={{ fontSize: 20 }}>Terms of service</p>
      </section>
      {parse(htmlText)}
    </main>
  );
}

export default Termscondition;

//export const getStatic = async () => {

export async function getServerSideProps() {
  let staticDataPath;
  try {
    const res = await infoTemplates();
    staticDataPath = res?.dataObject;
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: true,
      },
    };
  }

  var htmlText;
  try {
    const { serverUrl, templateUrls } = staticDataPath;
    const res = await fetchStaticHTML(
      serverUrl + templateUrls.TERMS_CONDITIONS
    );
    const html = res.data;
    const doc = nodeParser(html);
    const body = doc.querySelector("body");
    htmlText = body.innerHTML;
  } catch (err) {
    console.log("get TERMS_CONDITIONS error", err);
    return {
      props: {
        error: true,
      },
    };
  }

  return {
    props: {
      htmlText: htmlText,
    },
    // revalidate: 60*60*24, // In seconds
  };
}

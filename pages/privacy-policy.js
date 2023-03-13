import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import fetchStaticHTML from "api/fetchStaticHtml";
import { useEffect, useState } from "react";
import { metaTags } from "@/utils/constant";
import Head from "next/head";

function PrivacyPolicy() {
  const [htmlText1, setHtmlText1] = useState("");

  useEffect(() => {
    callStaticPages();
  }, []);

  async function callStaticPages() {
    var htmlText;
    try {
      const res = await fetchStaticHTML("/new_privacy_policy.html");
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

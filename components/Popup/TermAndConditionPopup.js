import Modal from ".";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import { infoTemplates } from "api/axios";
import fetchStaticHTML from "api/fetchStaticHtml";

function TermsconditionPopup({ open, setOpen }) {
  const [htmlContent, setHtmlContent] = useState("<p></h1>");
  useEffect(() => {
    const apiCall = async () => {
      const { htmlText } = await callFetchStaticHTML();
      setHtmlContent(htmlText);
    };
    apiCall();
  }, []);

  return (
    <Modal open={open} setOpen={setOpen} title={"Terms & Conditions"}>
      <div
        style={{ maxHeight: "80vh" }}
        className="overflow-y-auto grid grid-cols-1 max-w-xl px-6 text-base text-m-grey-1"
      >
        {parse(htmlContent)}
      </div>
    </Modal>
  );
}

export default TermsconditionPopup;

async function callFetchStaticHTML() {
  let staticDataPath;
  var htmlText;
  try {
    const res = await infoTemplates();
    staticDataPath = res?.dataObject;
  } catch (error) {
    return {
      htmlText: "<p></h1>",
    };
  }

  try {
    const res = await fetchStaticHTML("/terms_conditions.html");
    const html = res.data;
    const doc = nodeParser(html);
    const body = doc.querySelector("body");
    htmlText = body.innerHTML;
  } catch (err) {
    return {
      htmlText: "<p></h1>",
    };
  }

  return {
    htmlText: htmlText,
  };
}

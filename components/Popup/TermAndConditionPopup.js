import Modal from ".";

// function TermAndConditionPopup({ open, setOpen }) {
//   return (
//     <Modal open={open} setOpen={setOpen} title={"Terms & Conditions"}>
//       <div className="grid grid-cols-1 max-w-xl px-6 text-base text-m-grey-1">
//         <p className=" font-semibold text-sm text-m-green mb-2">1.Terms</h1>
//         <p className="text-sm py-2 text-m-grey-1">
//           Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry`&apos;`s Standard Dummy Text Ever
//           Since The 1500S, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book It Has Survived Not Only Five
//           Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.
//         </p>
//         <p className=" font-semibold text-sm text-m-green mb-2">2.User Licenses</h1>
//         <p className="text-sm py-2 text-m-grey-1">
//           Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry`&apos;`s Standard Dummy Text Ever
//           Since The 1500S, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book It Has Survived Not Only Five
//           Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.
//         </p>
//         <p className="font-semibold text-sm text-m-green mb-2">3.Conditions</h1>
//         <p className="text-sm py-2 text-m-grey-1">
//           Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry`&apos;`s Standard Dummy Text Ever
//           Since The 1500S, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book It Has Survived Not Only Five
//           Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.
//         </p>
//       </div>
//     </Modal>
//   );
// }

// export default TermAndConditionPopup;

// import Header2 from "@/components/Header/header2";
// import Header2 from "@/components/Header/header2";
import { Fragment, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import Footer from "@/components/Footer";
import { parse as nodeParser } from "node-html-parser";
import { Dialog, Transition } from "@headlessui/react";
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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [open]);

  const cancelButtonRef = useRef(null);
  return (
    <Modal open={open} setOpen={setOpen} title={"Terms & Conditions"}>
      <div style={{maxHeight:"80vh"}} className="overflow-y-auto grid grid-cols-1 max-w-xl px-6 text-base text-m-grey-1">
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
    console.log(error);
    return {
      htmlText: "<p></h1>",
    };
  }

  try {
    const { serverUrl, templateUrls } = staticDataPath;
    // const res = await fetchStaticHTML(serverUrl + templateUrls.TERMS_CONDITIONS);
    const res = await fetchStaticHTML("/terms_conditions.html");
    const html = res.data;
    const doc = nodeParser(html);
    const body = doc.querySelector("body");
    htmlText = body.innerHTML;
  } catch (err) {
    console.log("getTC error", err);
    return {
      htmlText: "<p></h1>",
    };
  }

  return {
    htmlText: htmlText,
  };
}

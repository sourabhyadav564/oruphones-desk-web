import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import fetchStaticHTML from "api/fetchStaticHtml";
import Model2 from "./Model2";

function VerifiedInfoPopup({ open, setOpen }) {
  const [htmlText1, setHtmlText1] = useState("");

  useEffect(() => {
    callStaticPages();
  }, []);

  async function callStaticPages() {
    // /console.log("-->");
    // let staticDataPath;
    // try {
    //   const response = await infoTemplates();
    //   console.log("--> res ", response);
    //   staticDataPath = response?.dataObject;
    //   console.log("--> staticDataPath ", staticDataPath);
    // } catch (error) {
    //   console.log(error);
    // }

    var htmlText;
    try {
      // const { serverUrl, templateUrls } = staticDataPath;
      const res = await fetchStaticHTML("/verification.html");
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
    <Model2 open={open} setOpen={setOpen}>
      <div className="bg-white px-3 py-6 max-w-2xl">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 sm:mt-0 sm:ml-4">
            {/* <Dialog.Title as="h3" className="text-lg leading-6 font-semibold text-gray-900">
              Benefits Of Verification
            </Dialog.Title> */}
            <div className="mt-2">
              <p className="text-sm text-gray-500">{
                parse(htmlText1)
            }</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div> */}
    </Model2>
  );
}

export default VerifiedInfoPopup;


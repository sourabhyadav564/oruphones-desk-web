import fetchStaticHTML from "api/fetchStaticHtml";
import { useEffect, useState } from "react";
import Modal2 from "./Model2";
import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";


function WarrantyInfo({ open, setOpen }) {
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
      // const res = await fetchStaticHTML("/verification.html");
      const res = await fetchStaticHTML("/warranty.html");
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
    <Modal2 open={open} setOpen={setOpen}>
      <div className="bg-white p-5 sm:p-6 sm:pb-4  max-w-lg">
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
    </Modal2>
  );
}

export default WarrantyInfo;

import fetchStaticHTML from "api/fetchStaticHtml";
import { useEffect, useState } from "react";
import Modal2 from "./Model2";
import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";

function BrandWarrantyInfo({ open, setOpen }) {
  const [htmlText1, setHtmlText1] = useState("");

  useEffect(() => {
    callStaticPages();
  }, []);

  async function callStaticPages() {
    var htmlText;
    try {
      const res = await fetchStaticHTML("/brandwarranty.html");
      const html = res.data;
      const doc = nodeParser(html);
      const body = doc.querySelector("body");
      htmlText = body.innerHTML;
      setHtmlText1(htmlText);
    } catch (err) {
    }
  }

  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="bg-white p-5 sm:p-6 sm:pb-4  max-w-lg">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <div className="mt-2">
              <p className="text-sm text-gray-500">{
                parse(htmlText1)
            }</p>
            </div>
          </div>
        </div>
      </div>
    </Modal2>
  );
}

export default BrandWarrantyInfo;

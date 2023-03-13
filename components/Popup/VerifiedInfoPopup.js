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
    var htmlText;
    try {
      const res = await fetchStaticHTML("/verification.html");
      const html = res.data;
      const doc = nodeParser(html);
      const body = doc.querySelector("body");
      htmlText = body.innerHTML;
      setHtmlText1(htmlText);
    } catch (err) {}
  }

  return (
    <Model2 open={open} setOpen={setOpen}>
      <div className="bg-white px-3 py-6 max-w-2xl z-50">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <div className="mt-2">
              <p className="text-sm text-gray-500">{parse(htmlText1)}</p>
            </div>
          </div>
        </div>
      </div>
    </Model2>
  );
}

export default VerifiedInfoPopup;

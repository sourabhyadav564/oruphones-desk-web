import Modal2 from './Model2'
import Check from "@/assets/gcheck.svg";
import Image from 'next/image';
import Link from 'next/link';

function ReportIssuePopup({ open, setOpen }) {
  return (
    <>
      <Modal2 open={open} setOpen={setOpen} title={"This device is unverified"}>
        <div className="flex flex-col items-center max-w-2xl px-6 text-base text-black-4e py-8  ">
          <Image src={Check} width={44} height={44}/>
          <div className="text-md my-2 text-center font-Roboto-Regular">
            <p>
            Your issue has been successfully reported. Our team will review it and take appropriate action.
            We will get back to you within 24 hours.
            </p>
          </div>
          <div className="mb-2 mt-4  flex items-center  border border-m-green font-Roboto-Semibold text-regularFontSize uppercase px-12 py-2 rounded bg-m-green text-white  ">
            
            <div 
            // href="/"
            className=""
              onClick={() => {
                setOpen(false);
              }}
            >
              OK
            </div>
          </div>
        </div>
      </Modal2>
    </>
  );
};
export default ReportIssuePopup;
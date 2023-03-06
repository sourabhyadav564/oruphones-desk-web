import Modal2 from './Model2'
import Alert from "@/assets/alert.svg";
import Image from 'next/image';

function ThisPhonePopup({open,setOpen}) {
    
    return(
    <>
    <Modal2 open={open} setOpen={setOpen} title={"This device is unverified"}>
     <div className="flex flex-col items-center max-w-2xl px-6 text-base text-black-4e py-8  ">
      
        {/* <FiAlertOctagon size={44} color="#f7e17d" /> */}
        <Image src={Alert} width={30} height={30}/>
        {/* <p className="font-Roboto-Bold text-xl mt-1"></p> */}
        <div className="text-md my-2 text-center font-Roboto-Regular">
          <p>
            You are currently viewing the same listing. 
          </p>
        </div>
        <div className="mb-2 mt-4  flex items-center ">
          <button
            className="  w-full shadow-xl border border-m-green font-Roboto-Semibold text-regularFontSize uppercase px-12 bg-m-green text-white py-2 rounded items-end hover:bg-white hover:text-m-green-1 duration-500"
            onClick={() => {
            //   setShowNumber(true);
              setOpen(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
      {/* <RequestVerificationSuccessPopup open={openRequestVerificationSuccessPopup} data={resData} setOpen={setRequestVerificationSuccessPopup}/> */}
    </Modal2>
    </>
);
};
export default ThisPhonePopup;
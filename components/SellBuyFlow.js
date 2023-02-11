import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import Sell from "../assets/sell_step_1.svg";
import HowtoBuyPopup from './Popup/HowtoBuyPopup';

function SellBuyFlow() {

    const [open,setOpen] = useState(false);
    
  return (
    
    <div className='items-center py-8'>
        <p className='flex justify-center font-Roboto-Semibold text-xl3FontSize  py-8 text-m-green'>ORU GUIDE</p>
        <div className='flex justify-center items-center m-auto'>
        <div className='container flex justify-evenly '>
                
                    <div 
                     className="shadow drop-shadow rounded-lg w-32 h-28 px-10 py-2 sm:px-4 bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative"
                     onClick={()=>setOpen(true)}>
                    <Image
                      src={Sell}
                      height={50}
                      width={40}
                      objectFit="contain m-auto justify-center flex"
                    />
                    <span
                      className="text-smallFontSize font-Roboto-Semibold text-center pt-2" >How to Sell</span>
                  </div>

                  {/* <div 
                     className="shadow drop-shadow rounded-lg w-32 h-28 px-10 py-2 sm:px-4 bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative"
                    >
                    <Image
                      src={Sell}
                      height={50}
                      width={40}
                      objectFit="contain m-auto justify-center flex"
                    />
                    <span
                      className="text-smallFontSize font-Roboto-Semibold text-center pt-2" >How to Buy</span>
                  </div>

                  <div 
                     className="shadow drop-shadow rounded-lg w-32 h-28 px-10 py-2 sm:px-4 bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative"
                     >
                    <Image
                      src={Sell}
                      height={50}
                      width={40}
                      objectFit="contain m-auto justify-center flex"
                    />
                    <span
                      className="text-smallFontSize font-Roboto-Semibold text-center pt-2" >Why ORUPhones</span>
                  </div> */}
                  </div>
        <HowtoBuyPopup open={open} setOpen={setOpen}/>
    </div>
    </div>
  )
}

export default SellBuyFlow
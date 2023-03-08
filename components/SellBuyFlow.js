import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
// import Sell from "https://d1tl44nezj10jx.cloudfront.net/assets/sell.png";
// import Buy from "https://d1tl44nezj10jx.cloudfront.net/assets/buy.png";
// import Book from "https://d1tl44nezj10jx.cloudfront.net/assets/Book.png";
import HowtoSellPopup from './Popup/HowtoSellPopup';
import HowtoBuyPopup from "./Popup/HowtoBuyPopup";
import HowtoUsePopup from './Popup/HowtoUsePopup';

function SellBuyFlow() {

    const [openSell,setOpenSell] = useState(false);
    const [openBuy,setOpenBuy] = useState(false);
    const [openUse,setOpenUse] = useState(false);

  return (
    
    <div className='items-center py-8'>
        <p className='flex justify-center font-Roboto-Semibold text-xl3FontSize  py-8 text-m-green'>ORU GUIDE</p>
        <div className='flex justify-center items-center m-auto'>
        <div className='container flex flex-wrap gap-4  md:justify-between justify-evenly px-8 '>
                    <div 
                     className="cursor-pointer hover:bg-gray-100  shadow drop-shadow rounded-lg w-60 h-28  py-4  bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-between relative"
                     onClick={()=>setOpenSell(true)}>
                    <Image
                      src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell.png"}
                      height={50}
                      width={40}
                      objectFit="contain m-auto justify-center flex"
                    />
                    <span
                      className="text-mediumFontSize font-Roboto-Semibold text-center pt-2" >How to Sell</span>
                  </div>
                  <div 
                     className="cursor-pointer shadow hover:bg-gray-100  drop-shadow rounded-lg w-60 h-28  py-2  bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative"
                     onClick={()=>setOpenBuy(true)}>
                    <Image
                      src={"https://d1tl44nezj10jx.cloudfront.net/assets/buy.png"}
                      height={50}
                      width={40}
                      objectFit="contain m-auto justify-center flex"
                    />
                    <span
                      className="text-mediumFontSize font-Roboto-Semibold text-center pt-2" >How to Buy</span>
                  </div>
                  <div 
                     className="cursor-pointer shadow hover:bg-gray-100  drop-shadow rounded-lg w-60 h-28  py-2  bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative"
                     onClick={()=>setOpenUse(true)}>
                    <Image
                      src={"https://d1tl44nezj10jx.cloudfront.net/assets/Book.png"}
                      height={50}
                      width={40}
                      objectFit="contain m-auto justify-center flex"
                    />
                    <span
                      className="text-smallFontSize font-Roboto-Semibold text-center pt-2" >Oru Guide</span>
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
        <HowtoSellPopup open={openSell} setOpen={setOpenSell}/>
        <HowtoBuyPopup open={openBuy} setOpen={setOpenBuy}/>
        <HowtoUsePopup open={openUse} setOpen={setOpenUse}/>
    </div>
    </div>
  )
}

export default SellBuyFlow
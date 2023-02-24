import React, { useState } from 'react'
import Modal from '.';
// import Image1 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/1.png'
// import Image2 from ' https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/2.png'
// import Image3 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/3.png'
// import Image4 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/4.png'
// import Image5 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/5.png'
// import Image6 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/6.png'
// import Image7 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/7.png'
// import Image8 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/8.png'
// import Image9 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/9.png'
// import Image10 from 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/10.png'
import Image from 'next/image';
import QRCode from "qrcode.react";
import Link from 'next/link';


function HowtoSellPopup({ open, setOpen }) {

    const [qrValue1, setQrValue1] = useState(
        "https://apps.apple.com/in/app/oruphones/id1629378420"
    );

    const [qrValue2, setQrValue2] = useState(
        "https://play.google.com/store/apps/details?id=com.oruphones.oru"
    );

    return (
        <div>
            <Modal open={open} setOpen={setOpen} title={"Steps On How to Sell Your Phone"}>
                <div className='px-16  m-auto justify-center h-[80vh] overflow-y-scroll mostly-customized-scrollbar'>
                    <div className="flex pb-8 justify-start items-center">
                        <div className="flex flex-col items-center justify-center m-auto">
                            <QRCode
                                id="qr-gen"
                                value={qrValue1}
                                size={130}
                                level={"H"}
                                includeMargin={true}
                            />
                            <Link href={qrValue1}>
                                <a className="w-32 h-10 bg-app-store bg-contain"></a>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center justify-center m-auto">
                            <QRCode
                                id="qr-gen"
                                value={qrValue2}
                                size={130}
                                level={"H"}
                                includeMargin={true}
                            />
                            <Link href={qrValue2}>
                                <a className="w-32 h-10 bg-play-store bg-contain"></a>
                            </Link>
                        </div>
                    </div>
                    <p className='font-Roboto-Semibold text-center text-[24px] w-[350px] '>Download our App using these QR Codes</p>
                    <div className='flex items-center'>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/1.png'} width={150} height={300} alt="" className='object-contain' />
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Click on Sell Now Button</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Click on this button to sell other phone than above</p>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/2.png'} width={150} height={300} alt="" className='object-contain' />
                    </div>
                    <div className='flex items-center'>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/3.png'} width={150} height={300} alt="" className='object-contain' />
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>After filling all the fields above, click next</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Select Accessories and Mobile Age, click Next</p>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/4.png'} width={150} height={300} alt="" className='object-contain' />
                    </div>
                    <div className='flex items-center'>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/5.png'} width={150} height={300} alt="" className='object-contain' />
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Select working condition of mobile, click Next</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Add pictures of mobile, click Next</p>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/6.png'} width={150} height={300} alt="" className='object-contain' />
                    </div>
                    <div className='flex items-center'>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/7.png'} width={150} height={300} alt="" className='object-contain' />
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Add location, and click Next</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Add price, and click on Take me to Verification</p>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/10.png'} width={150} height={300} alt="" className='object-contain' />
                    </div>
                    <div className='flex items-center'>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/8.png'} width={150} height={300} alt="" className='object-contain' />
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Wait till diagnostic test is completed</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='word-wrap font-Roboto-Semibold md:w-48 w-60 px-8 text-center'>Click on Complete Listing</p>
                        <Image src={'https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/9.png'} width={150} height={300} alt="" className='object-contain' />
                    </div>
                    <div>
                        <p className=' text-[20px] font-Roboto-Semibold text-center py-4'>Congrats Your Mobile is Listed on ORUphones.
                            <br></br> Welcome from Team ORUphones..</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default HowtoSellPopup
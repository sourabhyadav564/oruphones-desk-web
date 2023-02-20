import React from 'react'
import Modal from '.';
import Image1 from '../../assets/design1/1.png'
import Image2 from '../../assets/design1/2.png'
import Image3 from '../../assets/design1/3.png'
import Image4 from '../../assets/design1/4.png'
import Image5 from '../../assets/design1/5.png'
import Image6 from '../../assets/design1/6.png'
import Image7 from '../../assets/design1/7.png'
import Image8 from '../../assets/design1/8.png'
import Image9 from '../../assets/design1/9.png'
import Image10 from '../../assets/design1/10.png'
import Image11 from '../../assets/design1/11.png'
import Image12 from '../../assets/design1/12.png'
import Image13 from '../../assets/design1/13.png'
import Image from 'next/image';


function HowtoBuyPopup({open,setOpen}) {
  return (
    <div>
          <Modal open={open} setOpen={setOpen} title={"Steps On How to Buy Phone"}>
            <div className='px-16  h-[80vh] overflow-y-scroll mostly-customized-scrollbar'>
                <div className='flex items-center'>
                    <Image src={Image1} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Browse in Shop By Brand for specific brand</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>You can buy through search, Buy now and scroll for best deals.</p>
                    <Image src={Image2} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <Image src={Image3} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Select your location from top bar. You can select from this popup.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Click on the filter icon to add specific filters.</p>
                    <Image src={Image4} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <Image src={Image5} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Choose Brand Name, Storage, Ram, Condition and Warranty.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Now open desired deal from all the available products.</p>
                    <Image src={Image6} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <Image src={Image7} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Scroll down to view Device details.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Click on Contact Seller to request verification.</p>
                    <Image src={Image9} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                   
                    <Image src={Image8} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>You can also view other deals of same model.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Go to Home and Click on Three lines on top left corner and click on verification for buyer tile.</p>
                    <Image src={Image10} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <Image src={Image12} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Enter your Mobile Number to get start verification in seller's device.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Wait for Diagnostic check. Once it completes you can contact the seller.</p>
                    <Image src={Image11} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div>
                <p className=' text-[20px] font-Roboto-Semibold text-center py-4'>We wish you a happy ORUing with us.</p>
                </div>
            </div>
          </Modal>
    </div>
  )
}

export default HowtoBuyPopup
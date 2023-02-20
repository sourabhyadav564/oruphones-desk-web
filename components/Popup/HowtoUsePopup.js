import React from 'react'
import Modal from '.';
import Image1 from '../../assets/design2/1.png'
import Image2 from '../../assets/design2/2.png'
import Image4 from '../../assets/design2/4.png'
import Image5 from '../../assets/design2/5.png'
import Image6 from '../../assets/design2/6.png'
import Image7 from '../../assets/design2/7.png'
import Image8 from '../../assets/design2/8.png'
import Image9 from '../../assets/design2/9.png'
import Image10 from '../../assets/design2/10.png'
import Image11 from '../../assets/design2/11.png'
import Image12 from '../../assets/design2/12.png'
import Image13 from '../../assets/design2/13.png'
import Image14 from '../../assets/design2/14.png'
import Image from 'next/image';


function HowtoUsePopup({open,setOpen}) {
  return (
    <div>
          <Modal open={open} setOpen={setOpen} title={"Steps On How to Use ORUphones"}>
            <div className='px-16  h-[80vh] overflow-y-scroll mostly-customized-scrollbar'>
                <div>
            <p className='text-[20px] font-semibold py-4'>1. Device Health Check</p>
                <div className='flex items-center'>
                    <Image src={Image1} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>ORUphones provides best in industry device health check.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>Wait till you see this window.</p>
                    <Image src={Image2} width={150} height={300} alt="" className='object-contain'/>
                </div>
                </div>
                {/* <div className='flex items-center'>
                    <Image src={Image3} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>After filling all the fields above, click next</p>
                </div> */}
                <div>
                 <p className='text-[20px] font-semibold py-4'>2. Bettery Health</p>
                <div className='flex items-center'>
                    <Image src={Image1} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>You can check your device bettery health in just one click.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>Wait for 2-3 min to complete the process.</p>
                    <Image src={Image4} width={150} height={300} alt="" className='object-contain'/>
                </div>
                </div>

                <div>
                <p className='text-[20px] font-semibold py-4'>3. Price Comparison</p>
                <div className='flex items-center'>
                    <Image src={Image1} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>Compare price of your device with other vendors.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>Fill all the Specification of your device to get accurate price.</p>
                    <Image src={Image5} width={150} height={300} alt="" className='object-contain'/>
                </div>
                </div>


                <div>
                <p className='text-[20px] font-semibold py-4'>4. Device Details</p>
                <div className='flex items-center'>
                    <Image src={Image1} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>We also provide your device details in just one click.</p>
                </div>
                <div className='items-center py-16'>
                    <p className='font-Roboto-Semibold w-80 px-4 text-center'>We want our users to do less work so we provide your device details like CPU, Hardware, Battery and manu more in just one click.</p>
                    <div className='flex -space-x-12  items-end justify-center py-4'>
                        <div>
                    <Image src={Image6} width={100} height={150} alt="" className='object-contain z-50 '/>
                    </div>
                    <div className=''>
                    <Image src={Image7} width={120} height={200} alt="" className='object-contain'/>
                    </div>
                    <div>
                    <Image src={Image8} width={100} height={150} alt="" className='object-contain z-50'/>
                    </div>
                    <div className=''>
                    <Image src={Image9} width={120} height={200} alt="" className='object-contain '/>
                    </div>
                    </div>
                </div>
                </div>


                <div>
                <p className='text-[20px] font-semibold py-4'>5. Notification</p>
                <div className='flex items-center'>
                    <Image src={Image10} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>You will recieve Notification for verification of your device so you don't have to check often.</p>
                </div>
                </div>

                <div>
                <p className='text-[20px] font-semibold py-4 mt-4'>6. Profile</p>
                <div className='flex items-center'>
                    <Image src={Image11} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>You can always edit your personal details in profile section.</p>
                </div>
                </div>

                <div>
                <p className='text-[20px] font-semibold py-4 mt-4'>7. Your Listings</p>
                <div className='flex items-center'>
                    <Image src={Image12} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>Once you list your device on ORUphones you can check your listings in my listing section.</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>You can also view your favourite details.</p>
                    <Image src={Image13} width={150} height={300} alt="" className='object-contain'/>
                </div>
                </div>



                
                <div>
                <p className='text-[20px] font-semibold py-4'>8. More Services</p>
                <div className='flex items-center'>
                    <Image src={Image14} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-4 text-center'>Our team is working on more services for our users.</p>
                </div>
                </div>


                <div>
                <p className=' text-[20px] font-Roboto-Semibold text-center py-4 w-80'>ORUphones never take any personal information from our users. Your privacy is our priority.</p>
                </div>
            </div>
          </Modal>
    </div>
  )
}

export default HowtoUsePopup
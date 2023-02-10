import React from 'react'
import Modal from '.';
import Image1 from '../../assets/design/1.png'
import Image2 from '../../assets/design/2.png'
import Image3 from '../../assets/design/3.png'
import Image4 from '../../assets/design/4.png'
import Image5 from '../../assets/design/5.png'
import Image6 from '../../assets/design/6.png'
import Image7 from '../../assets/design/7.png'
import Image8 from '../../assets/design/8.png'
import Image9 from '../../assets/design/9.png'
import Image10 from '../../assets/design/10.png'
import Image from 'next/image';


function HowtoBuyPopup({open,setOpen}) {
  return (
    <div>
          <Modal open={open} setOpen={setOpen} title={"Steps On How to Sell Your Phone"}>
            <div className='px-16  h-[80vh] overflow-y-scroll mostly-customized-scrollbar'>
                <div className='flex items-center'>
                    <Image src={Image1} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Click on Sell Now Button</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Click on this button to sell other phone than above</p>
                    <Image src={Image2} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <Image src={Image3} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>After filling all the fields above, click next</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Select Accessories and Mobile Age, click Next</p>
                    <Image src={Image4} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <Image src={Image5} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Select working condition of mobile, click Next</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Add pictures of mobile, click Next</p>
                    <Image src={Image6} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <Image src={Image7} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Add location, and click Next</p>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Add price, and click on Take me to Verification</p>
                    <Image src={Image10} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Wait till diagnostic test is completed</p>
                    <Image src={Image8} width={150} height={300} alt="" className='object-contain'/>
                </div>
                <div className='flex items-center'>
                    <Image src={Image9} width={150} height={300} alt="" className='object-contain'/>
                    <p className='word-wrap font-Roboto-Semibold w-48 px-8 text-center'>Click on Complete Listing</p>
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

export default HowtoBuyPopup
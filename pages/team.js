import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import TeamCard from '@/components/Cards/teamCard'

const data = [
    {
        imgsrc :"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        name:"Anish Agrwal",
        position:"Founder & CEO",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        name:"Nishant Sharma",
        position:"Project Manager",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        name:"Sourabh",
        position:"Sr. Software Developer",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        name:"Nimit Sharma",
        position:"Software Developer",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        name:"Mohit Rajput",
        position:"Software Developer",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        name:"Ashish",
        position:"DevOps Engineer",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        name:"Harsh Agrawal",
        position:"Marketing",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
    },

]

function team() {
 
  return (
    <div className="container my-28  text-center">
        <p className='text-[14px] font-Roboto-Regular'>Our team</p>
        <p className='text-[36px] font-Roboto-Bold text-m-green opacity-0.6'>Leardership team</p>
        <p className='text-[18px] font-Roboto-Regular text-m-green'>We're building the future of software developement.</p>
        <div className='grid grid-cols-4 my-4 justify-center m-auto'>    
            {data.map((items,index)=>(
                <div key={index}>
                    <TeamCard imgsrc={items.imgsrc} name={items.name} position={items.position} description={items.description}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default team
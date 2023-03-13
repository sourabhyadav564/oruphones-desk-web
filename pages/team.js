import React from 'react'

const data = [
    {
        imgsrc :"https://media.licdn.com/dms/image/C4D03AQEEVcoJmhAJog/profile-displayphoto-shrink_100_100/0/1516281935903?e=1683158400&v=beta&t=NbDW08ItpQXrCoJgz0yyTqdAVTMih2cFprklmxmwGCA",
        name:"Takashi Kido",
        position:"Chairman",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit",
        linkedInsrc :"https://www.linkedin.com/in/takashikido?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAAxPNABCoH1stnEvIGFFSjKJME0t4ezzJc&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BQjSOoqpdR6Woha1jEf9Cjw%3D%3D"
    },
    {
        imgsrc :"https://media.licdn.com/dms/image/C5603AQEBS_JDqJKdeQ/profile-displayphoto-shrink_100_100/0/1517725393448?e=1683158400&v=beta&t=1grGks_t_-gRrqsPKyV8PuBzVZyRnNnfFofzMwrvrZI",
        name:"Anish Agrwal",
        position:"Co-Founder & CEO",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit",
        linkedInsrc :"https://www.linkedin.com/in/anishagarwal2006?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAI3yYcBt72CAHLhopb1VOhM1wzMxmzzHXg&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B8zHiPgS0RRePTFs2fMQzug%3D%3D"
    },
    {
        imgsrc :"https://media.licdn.com/dms/image/D4D03AQF94_FuCIjYNA/profile-displayphoto-shrink_200_200/0/1665984597443?e=1683158400&v=beta&t=cAjQJxtf6P4VStN747JVHidHJah2xGOmf3e1Uplfq7g",
        name:"Manuj Purwar",
        position:"COO",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit",
        twittersrc : "",
        linkedInsrc :"https://www.linkedin.com/in/purwarmanuj/"
    },
    {
        imgsrc :"https://media.licdn.com/dms/image/C5103AQFP9lrVKRc6sA/profile-displayphoto-shrink_100_100/0/1530617216132?e=1683158400&v=beta&t=bMiDpBWDTzuxEzfmALZDU-RvkxNyhJ0TrOnm1-vK2EE",
        name:"Nishant Sharma",
        position:"Project Manager",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
        linkedInsrc :"https://www.linkedin.com/in/projectnishant?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACfYtT8BehCBqWLWEfTvSd67XCVzy2qcncM&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BJr%2BY%2BR7OS2OU3XeXSHQcWg%3D%3D"
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        name:"Ashish",
        position:"DevOps Engineer",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
        linkedInsrc :""
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        name:"Sourabh Yadav",
        position:"Sr. Software Developer",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
        linkedInsrc :"https://www.linkedin.com/in/sourabhyadav100?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADTZqUYB6SjgwTx9U-8vjeFjCDn4tEa0piQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BDDkX9ej%2BQ3Kb5a4u6UbgnQ%3D%3D"
    },
    {
        imgsrc :"https://media.licdn.com/dms/image/D4D03AQEOZXE6So1nWA/profile-displayphoto-shrink_100_100/0/1665980707795?e=1683158400&v=beta&t=1ChbHye3_7UdS2gbf7rEey-_83S3LPyNEd3W9U6JcHs",
        name:"Nimit Sharma",
        position:"Software Developer",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
        linkedInsrc :"https://www.linkedin.com/in/nimitsharmaaa?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADDLL0ABWfaVKgbkeD91OsGNNvhvOvXfBhg&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BvynBAUInQcWSDFSDUb%2Fw3Q%3D%3D"
    },
    {
        imgsrc :"https://media.licdn.com/dms/image/D4D03AQGM8dW_2xnGlQ/profile-displayphoto-shrink_100_100/0/1674991898775?e=1683158400&v=beta&t=MrLNF6EymouCFXntvgLUAovhpQHDfvBxzHtxMgCGJWM",
        name:"Mohit Rajput",
        position:"Software Developer",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
        linkedInsrc :"https://www.linkedin.com/in/ACoAADPO8boBl1YELsxu0yQpuQXJLMolgYqh5Rw?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADPO8boBl1YELsxu0yQpuQXJLMolgYqh5Rw&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BJr%2BY%2BR7OS2OU3XeXSHQcWg%3D%3D"
    },
    {
        imgsrc :"https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        name:"Harsh Agrawal",
        position:"Marketing",
        description:"lorem ipsum dolor sit, lorem ipsum dolor",
        linkedInsrc :""
    },

]

function Team() {
 
  return (
    <div className="container my-28  text-center">
        404 Page not found
        {/* <p className='text-[14px] font-Roboto-Regular'>Our team</p>
        <p className='text-[36px] font-Roboto-Bold text-m-green opacity-0.6'>Leardership team</p>
        <p className='text-[18px] font-Roboto-Regular text-m-green'>We're building the future of software developement.</p>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 my-4 justify-center m-auto'>    
            {/* {data.map((items,index)=>(
                <div key={index}>
                    <TeamCard imgsrc={items.imgsrc} name={items.name} position={items.position} description={items.description} linkedInsrc={items.linkedInsrc}/>
                </div>
            ))}
        </div> */}
    </div>
  )
}

export default Team
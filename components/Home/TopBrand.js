import React from "react";
import BrandCard from "../Cards/BrandCard";
// import Carousel from "../Carousel";
import Title from "../Title";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7.2,
  slidesToScroll: 1,
};

function TopBrand({ brandsList }) {
  brandsList = brandsList?.sort((list1, list2) => list2.isPopular - list1.isPopular);
  brandsList = brandsList?.sort((list1, list2) => parseInt(list1.displayOrder) - parseInt(list2.displayOrder));
  var _bList = brandsList?.slice(0, 13);
 
  return (
    <>
      <div className="bg-m-grey pt-[54px] pb-[57px]">
        <section className="container px-20 pt-0 gap-6 flex justify-center pb-4 font-Roboto-Semibold text-m-green-1 font-bold text-2xl  " data-aos="flip-up">
          <p>Top Brands</p>
        </section>
        <section className="container m-auto py-4 justify-center bg-m-grey top_brand  gap-4 flex flex-wrap   ">
          {/* <Carousel {...settings}> */}
          {_bList && _bList.map((item) => <BrandCard key={item.make} data={item} />)}
          <BrandCard data={{ make: "Show all" }} />
          {/* </Carousel> */}
        </section>
      </div>
    </>
  );
}

export default TopBrand;

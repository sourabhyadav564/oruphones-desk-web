import React from "react";
import BrandCard from "../Cards/BrandCard";
import Carousel from "../Carousel";
import Title from "../Title";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6.2,
  slidesToScroll: 1,
};

function TopBrand({ brandsList }) {
  brandsList = brandsList.sort((list1, list2) => list2.isPopular - list1.isPopular);
  brandsList = brandsList.sort((list1, list2) => parseInt(list1.displayOrder) - parseInt(list2.displayOrder));
  var _bList = brandsList.slice(0, 8);
  // console.log(_bList);
  return (
    <section className="container top_brand">
      <Title text="Top Brands" />
      <Carousel {...settings}>
        {_bList && _bList.map((item) => <BrandCard key={item.make} data={item} />)}
        <BrandCard data={{ make: "Show all" }} />
      </Carousel>
    </section>
  );
}

export default TopBrand;

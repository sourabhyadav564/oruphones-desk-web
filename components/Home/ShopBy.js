import React from "react";
import CategoryCards from "../Cards/CategoryCards";
import Carousel from "../Carousel";
import Title from "../Title";
import bestSelling from "../../assets/cards/bestselling.png";
import likeNew from "../../assets/cards/like_new.png";
import verified from "../../assets/cards/verified.png";
import warranty from "../../assets/cards/warranty.png";

const data = [
  {
    id: 1,
    text: "Best Selling",
    imagePath: bestSelling,
    urlPath: "Bestselling",
  },
  {
    id: 3,
    text: "Verified Phones",
    imagePath: verified,
    urlPath: "Verified",
  },
  {
    id: 2,
    text: "Like New Phones",
    imagePath: likeNew,
    urlPath: "Like New",
  },
  {
    id: 4,
    text: "Warranty Phones",
    imagePath: warranty,
    urlPath: "Warranty",
  },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

function ShowBy() {
  return (
    <>
      <div className="bg-m-grey">
        <section className="container top_brand px-24 pt-[57px] pb-[44px]">
          <Title text="Shop By Categories" />
          <Carousel {...settings}>
            {data &&
              data.map((item, index) => <CategoryCards key={index} data={item} />)}
            <CategoryCards priceRange />
          </Carousel>
        </section>
      </div>
    </>
  );
}

export default ShowBy;

import React from "react";
import CategoryCards from "../Cards/CategoryCards";
import Carousel from "../Carousel";
import Title from "../Title";
import bestSelling from "../../assets/cards/bestSelling.png";
import likeNew from "../../assets/cards/like_new.png";
import verified from "../../assets/cards/verified.png";
import warranty from "../../assets/cards/warranty.png";

const data = [
  {
    id: 1,
    text: "Bestselling Mobiles",
    imagePath: bestSelling,
    urlPath: "bestselling",
  },
  {
    id: 3,
    text: "Verified Mobiles",
    imagePath: verified,
    urlPath: "Verified",
  },
  {
    id: 2,
    text: "Like New Mobiles",
    imagePath: likeNew,
    urlPath: "Like New",
  },
  {
    id: 4,
    text: "Warranty Mobiles",
    imagePath: warranty,
    urlPath: "Warranty",
  },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4.2,
  slidesToScroll: 1,
};

function ShowBy() {
  return (
    <section className="container top_brand pt-4">
      <Title text="Shop By" />
      <Carousel {...settings}>
        {data &&
          data.map((item, index) => <CategoryCards key={index} data={item} />)}
        <CategoryCards priceRange />
      </Carousel>
    </section>
  );
}

export default ShowBy;

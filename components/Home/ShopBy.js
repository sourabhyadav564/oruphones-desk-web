import React from "react";
import CategoryCards from "../Cards/CategoryCards";
import Carousel from "../Carousel";
import Title from "../Title";
// import bestSelling from "https://d1tl44nezj10jx.cloudfront.net/assets/bestselling.png";
// import likeNew from "https://d1tl44nezj10jx.cloudfront.net/assets/like_new.png";
// import verified from "https://d1tl44nezj10jx.cloudfront.net/assets/verified.png";
// import warranty from "https://d1tl44nezj10jx.cloudfront.net/assets/warranty.png";

const data = [
  {
    id: 1,
    text: "BestSelling Mobiles",
    imagePath: "https://d1tl44nezj10jx.cloudfront.net/assets/best-selling-mobiles.png",
    urlPath: "Bestselling",
  },
  {
    id: 3,
    text: "Verified Devices Only",
    imagePath: "https://d1tl44nezj10jx.cloudfront.net/assets/verified-mobils.png",
    urlPath: "Verified",
  },
  {
    id: 2,
    text: "Like New Condition",
    imagePath: "https://d1tl44nezj10jx.cloudfront.net/assets/like-new.png",
    urlPath: "Like New",
  },
  {
    id: 4,
    text: "Phone with Warranty",
    imagePath: "https://d1tl44nezj10jx.cloudfront.net/assets/warranty.png",
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
        <section className="container top_brand lg:px-24 px-10 pt-[57px] pb-[44px] font-bold">
          <Title text="Shop By" />
          <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 pt-4 gap-4 items-center m-auto justify-center">
            {data &&
              data.map((item, index) => <CategoryCards key={index} data={item} />)}
            <CategoryCards priceRange />
          </div>
        </section>
      </div>
    </>
  );
}

export default ShowBy;

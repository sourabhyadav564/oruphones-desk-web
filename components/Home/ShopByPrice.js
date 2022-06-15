import ShopByPriceCard from "../Cards/ShopByPriceCard";
import Carousel from "../Carousel";
import Title from "../Title";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
};

function ShopByPrice({ fetchShopByPrice }) {
  return (
    <section className="container by_price">
      <Title text="Shop By Price" />
      <Carousel {...settings}>
        {fetchShopByPrice &&
          fetchShopByPrice.map((item, index) => (
            <ShopByPriceCard
              key={index}
              min={item.minPrice}
              max={item.maxPrice}
              src={item.imagePath || "https://zenrodevimages.s3-us-west-2.amazonaws.com/mobiru/product/mobiledevices/img/apple/mbr_iphone_5s.png"}
            />
          ))}
      </Carousel>
    </section>
  );
}

export default ShopByPrice;

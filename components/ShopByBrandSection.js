import { SwiperSlide } from "swiper/react";
import ShopByModelCard from "./Cards/ShopByModelCard";
import Carousel from "./Carousel2";
import { getDefaultImage } from "@/utils/util";

const settings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: false,
  arrows: true,
  infinite: false,
  swipeToSlide: true,
};

function ShopByBrandSection({
  shopbymodeldata,
  shopbymakedata,
  setProducts,
  index,
  location,
}) {
  return (
    <section className="m-auto items-center">
      <Carousel {...settings} className="">
        {shopbymodeldata?.map((item) => (
          <SwiperSlide key={item?.make}>
            <ShopByModelCard
              data={item.replace(/"/g, "")}
              src={getDefaultImage(item.replace(/"/g, ""))}
              make={shopbymakedata}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </section>
  );
}

export default ShopByBrandSection;

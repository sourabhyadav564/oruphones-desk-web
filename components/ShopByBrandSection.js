import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";

import ShopByModelCard from "./Cards/ShopByModelCard";
// import BasicCarousel from "./Carousel/BasicCarousel";
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

function ShopByBrandSection({ shopbymodeldata, shopbymakedata, setProducts, index, location }) {



    return (
        <section className="m-auto items-center">
            <Carousel
                {...settings}
            // slidesPerView={3}
            // spaceBetween={1}
            className=""
            >
                {shopbymodeldata?.map((item) => (
                    <SwiperSlide key={item?.make}>
                        <ShopByModelCard
                            data={item.replace(/"/g, "")}
                            // src={`https://zenrodeviceimages.s3.us-west-2.amazonaws.com/allModelsImg/${item?.marketingname?.toString().toLowerCase().replaceAll(" ", "_")}.jpg`}
                            src={getDefaultImage(item.replace(/"/g, ""))}
                            // alt={data?.models?.model_name}
                            // location={location}
                            make={shopbymakedata}
                        />
                    </SwiperSlide>
                ))}
            </Carousel>
        </section>
    )
}

export default ShopByBrandSection

import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";

import ShopByModelCard from "./Cards/ShopByModelCard";
import BasicCarousel from "./Carousel/BasicCarousel";



function ShopByBrandSection({ shopbymodeldata,shopbymakedata ,  setProducts, index, location }) {
 
    console.log("shop by model data", shopbymodeldata);

    return (
        <section className="m-auto items-center">
            <BasicCarousel
                slidesPerView={3}
                spaceBetween={1}
            >
                {shopbymodeldata.map((item) => (
                    <SwiperSlide key={item?.make}>
                        <ShopByModelCard
                            data={item.marketingname}
                            src={`https://zenrodeviceimages.s3.us-west-2.amazonaws.com/mobiru/product/mobiledevices/img/newModels/${item?.marketingname?.toString().toLowerCase().replaceAll(" ", "_")}.jpg`}
                            // alt={data?.models?.model_name}
                            location={location}
                            make={shopbymakedata}
                        />
                    </SwiperSlide>
                ))}
            </BasicCarousel>
        </section>
    )
}

export default ShopByBrandSection

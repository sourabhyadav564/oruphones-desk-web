import Slider from "react-slick";
import styles from "../styles/fullimageview.module.css";

import Chevronleft from "@/assets/chevronleft.svg";
import ChevronRight from "@/assets/chevronright.svg";
import Cross from "@/assets/cross1.svg";


import { useState } from "react";
import Image from "next/image";

const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => (
  // <BiChevronLeft
  //   {...rest}
  //   className={`fullimage_prev prev ${className}`}
  //   size={32}
  // />
  <Image src={Chevronleft} width={32} height={32}  className={`fullimage_prev prev ${className}`}/>
);
const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => (
  // <BiChevronRight
  //   {...rest}
  //   className={`fullimage_next  next ${className}`}
  //   size={32}
  // />
  <Image src={ChevronRight} width={32} height={32}  className={`fullimage_prev prev ${className}`}/>
);

function FullImageView({ open, close, images }) {
  const [imageError, setImageError] = useState(false);
  if (!open) {
    return null;
  }

  if (!Array.isArray(images)) {
    images = [images];
  }

  return (
    <section className={styles.imageview_container}>
      <div className="w-full h-20 flex justify-end p-4 text-white">
        {/* <MdClose className="cursor-pointer" size={32} onClick={() => close()} /> */}
        <Image src={Cross} width={36} height={36} alt="" className="cursor-pointer" onClick={() => close()}/>
      </div>
      {images && (
        <Slider
          speed={500}
          dots={true}
          prevArrow={<ArrowLeft />}
          nextArrow={<ArrowRight />}
          appendDots={(dots) => {
            let temp = 0;
            dots.map((item, index) => {
              if (item.props.className === "slick-active") {
                temp = index + 1;
              }
            });
            return (
              <span style={{ color: "white" }}>
                {images?.length === 1
                  ? `1 / 1 `
                  : `${temp} / ${images?.length}`}
              </span>
            );
          }}
        >
          {images
            .filter((i) => i?.fullImage)
            .map((img, index) => (
              <div key={index} className={styles.image_wrapper}>
                <img
                  src={imageError?"https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png":  img?.fullImage || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
                  alt={index}
                  onError={() => {
                    setImageError(true);
                  }}
                  style={{ maxWidth: "80%", maxHeight: "70vh" }}
                />
              </div>
            ))}
            {console.log("images", images)}
            {images[0]?.fullImage=="" && 
            <div className={styles.image_wrapper}>
              <img
              src={"https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
              // onError={() => {
              //   setImageError(true);
              // }}
              style={{ maxWidth: "40%", maxHeight: "70vh" }}
            />
            </div>
            }
        </Slider>
      )}
    </section>
  );
}

export default FullImageView;

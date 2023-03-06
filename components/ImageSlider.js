import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Slider from "react-slick";
// import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Chevronleft from "@/assets/chevronleft.svg";
import ChevronRight from "@/assets/chevronright.svg";

// import Logo from "@/assets/oru_phones_logo.png"


const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => (
  // <BiChevronLeft {...rest} className={`prev ${className}`} />
  <Image src={Chevronleft} width={32} height={32}   {...rest} className={`prev ${className}`}/>
);
const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => (
  // <BiChevronRight {...rest} className={`next ${className}`} />
  <Image src={ChevronRight} width={32} height={32}   {...rest} className={`prev ${className}`}/>
);

function ImageSlider({data, images, openFullImage }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const[imageError,setImageError]=useState(false);


  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: ".slider-for",
    dots: false,
    infinite: false,
    swipeToSlide: true,
    focusOnSelect: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };

  var type = ["old phone", "used", "refurbished"]
  const alternate_text = (`buy ${type[Math.floor((Math.random() * type.length))]} ${data?.marketingName} ${data?.deviceStorage} ${data?.deviceCondition} `).toLowerCase()
  
  return (
    <React.Fragment>
      {Array.isArray(images) && images && (
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {images
            .filter((i) => i.fullImage)
            .map((img, index) => (
              <Fragment key={index}>
                <Image
                  // src={img?.fullImage || Logo}
                  loading="lazy"
                  placeholder="blur"
                  priority={false}
                  unoptimized={false}
                  blurDataURL={imageError ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : img?.fullImage || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
                  src={imageError ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : img?.fullImage || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
                  onError={()=>setImageError(true)}
                  alt={alternate_text}
                  width={"100%"}
                  height={"90%"}
                  layout="responsive"
                  objectFit="contain"
                  onClick={() => openFullImage && openFullImage()}
                />
              </Fragment>
            ))}
        </Slider>
      )}
      {!Array.isArray(images) && images && (
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          <Fragment>
            <Image
              // src={images?.fullImage || Logo}
              src={imageError ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : images?.fullImage ||"https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
              loading="lazy"
              placeholder="blur"
              priority={false}
              blurDataURL={imageError ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : images?.fullImage || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
              unoptimized={false}
              onError={()=>setImageError(true)}
              alt={alternate_text}
              width={"100%"}
              height={"90%"}
              layout="responsive"
              objectFit="contain"
              onClick={() => openFullImage && openFullImage()}
            />
          </Fragment>
        </Slider>
      )}
      <div className="thumbnail-slider-wrap">
        {Array.isArray(images) && images && (
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
          >
            {images
              .filter((i) => i.fullImage)
              .map((img, index) => (
                <Fragment key={index}>
                  <Image
                    src={imageError?"https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : img?.thumbImage || img.fullImage  || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
                    loading="lazy"
                    placeholder="blur"
                    priority={false}
                    unoptimized={false}
                    blurDataURL={imageError ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : img?.thumbImage || img.fullImage || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
                    // src={imageError ? Logo : img?.fullImage}
                    onError={()=>setImageError(true)}
                    width={"100%"}
                    height={"100%"}
                    layout="responsive"
                    objectFit="contain"
                    alt={alternate_text}
                  />
                </Fragment>
              ))}
          </Slider>
        )}
        {!Array.isArray(images) && images && (
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
          >
            <Image
              src={imageError ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : images?.thumbImage || images?.fullImage || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
              onError={()=>setImageError(true)}
              loading="lazy"
              placeholder="blur"
              priority={false}
              unoptimized={false}
              blurDataURL={imageError ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png" : images?.thumbImage || images?.fullImage || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"}
              width={"100%"}
              height={"100%"}
              layout="responsive"
              objectFit="contain"
              alt={alternate_text}
            />
          </Slider>
        )}
      </div>
    </React.Fragment>
  );
}

export default ImageSlider;

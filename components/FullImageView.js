import Slider from "react-slick";
import styles from "../styles/fullimageview.module.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => (
  <BiChevronLeft
    {...rest}
    className={`fullimage_prev prev ${className}`}
    size={32}
  />
);
const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => (
  <BiChevronRight
    {...rest}
    className={`fullimage_next  next ${className}`}
    size={32}
  />
);

function FullImageView({ open, close, images }) {
  if (!open) {
    return null;
  }

  if (!Array.isArray(images)) {
    images = [images];
  }

  return (
    <section className={styles.imageview_container}>
      <div className="w-full h-20 flex justify-end p-4 text-white">
        <MdClose className="cursor-pointer" size={32} onClick={() => close()} />
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
            .filter((i) => i.fullImage)
            .map((img, index) => (
              <div key={index} className={styles.image_wrapper}>
                <img
                  src={img?.fullImage}
                  alt={index}
                  style={{ maxWidth: "80%", maxHeight: "70vh" }}
                />
              </div>
            ))}
        </Slider>
      )}
    </section>
  );
}

export default FullImageView;

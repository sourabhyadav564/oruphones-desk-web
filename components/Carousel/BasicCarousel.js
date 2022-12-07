import { Swiper } from "swiper/react"; 
import "../../node_modules/swiper/swiper-bundle.css";

function BasicCarousel({ children, ...rest }) {
  return (
    <Swiper
      id="main"
      tag="div"
      wrapperTag="ul"
      // spaceBetween={0}
      // slidesPerView={1}
      // onInit={(swiper) => console.log("Swiper initialized!", swiper)}
      // onSlideChange={(swiper) => {
      //   console.log("Slide index changed to: ", swiper.activeIndex);
      // }}
      // onReachEnd={() => console.log("Swiper end reached")}
      {...rest}
    >
      {children}
    </Swiper>
  );
}

export default BasicCarousel;

import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => <BiChevronLeft {...rest} className={`prev ${className}`} />;
const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => <BiChevronRight {...rest} className={`next ${className}`} />;

export default function Carousel({ children, className, ...rest }) {
  const settings = {
    arrows: true,
    ...rest,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };
  return (
    <Slider className={`carousel ${className ? className : ""}`} {...settings}>
      {children}
    </Slider>
  );
}

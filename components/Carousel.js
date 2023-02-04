import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => <BiChevronLeft {...rest} className={`prev ${className}`} />;
const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => <BiChevronRight {...rest} className={`next ${className}`} />;

export default function Carousel({ children, className, ...rest }) {

  var settings = {
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    ...rest,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };
  return (
    <Slider className={`carousel  ${className ? className : ""} z-0`} {...settings}>
      {children}
    </Slider>
  );
}

import Slider from "react-slick";
import Chevronleft from "@/assets/chevronleft.svg"
import Chevronright from "@/assets/chevronright.svg"
import Image from "next/image";

const ArrowLeft = ({ className, currentSlide, slideCount,top, ...rest }) =>( 
  <div className={`absolute z-10 top-32 left-2 ${top} bg-gray-400 rounded-full p-1 flex`}>
<Image src={Chevronleft} width={10} height={10} alt="" {...rest} />
</div>
)
const ArrowRight = ({ className, currentSlide, slideCount,top, ...rest }) => (
  <div className={`absolute z-10 top-32 right-2 ${top} bg-gray-400 flex p-1 rounded-full`}>
<Image src={Chevronright} width={10} height={10} alt="" {...rest} />
</div>
)

export default function Carousel({ children, className,top, ...rest }) {

  var settings = {
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    ...rest,
    prevArrow: <ArrowLeft top={top}/>,
    nextArrow: <ArrowRight top={top}/>,
  };
  return (
    <Slider className={`carousel ${className ? className : ""} z-0`} {...settings}>
      {children}
    </Slider>
  );
}

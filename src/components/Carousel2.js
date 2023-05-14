import { Swiper } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Chevronleft from '@/assets/chevronleft.svg';
import Chevronright from '@/assets/chevronright.svg';
import Image from 'next/image';

const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => (
	<div className="absolute z-10 top-14 left-2  bg-gray-200  rounded-full p-1 flex ">
		<Image src={Chevronleft} width={10} height={10} alt="" {...rest} />
	</div>
);
const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => (
	<div className="absolute z-10 top-14 right-2  bg-gray-200 flex p-1 rounded-full">
		<Image src={Chevronright} width={10} height={10} alt="" {...rest} />
	</div>
);

export default function Carousel2({ children, className, ...rest }) {
	var settings = {
		arrows: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		...rest,
		prevArrow: <ArrowLeft />,
		nextArrow: <ArrowRight />,
	};
	return (
		<Swiper
			className={`carousel ${className ? className : ''} z-0`}
			{...settings}
		>
			{children}
		</Swiper>
	);
}

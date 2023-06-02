import { Swiper } from 'swiper/react';
import {
	Autoplay,
	Navigation,
	Pagination,
} from 'swiper';
import '@/node_modules/swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const swiperOptions = {
	slidesPerView: 1,
	spaceBetween: 10,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	pagination: {
		clickable: true,
	},
	navigation: {
		arrows: true,
	},
	modules: [Pagination, Navigation, Autoplay],
};

export default function Carousel({ children, className, ...rest }) {
	return (
		<Swiper
			{...swiperOptions}
			{...rest}
			className={`w-full h-5/6 ${className}`}
		>
			{children}
		</Swiper>
	);
}

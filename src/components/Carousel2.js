import { Swiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import '@/node_modules/swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function Carousel2({ children, className, ...rest }) {
	var settings = {
		...rest,
		navigation: {
			arrows: true,
		},
		modules: [Pagination, Navigation, Autoplay],
		style: { marginLeft: '20px', marginRight: '20px' },
	};
	return (
		<Swiper
			className={`carousel2 ${className ? className : ''} z-0 w-full`}
			{...settings}
			grabCursor={true}
		>
			{children}
		</Swiper>
	);
}

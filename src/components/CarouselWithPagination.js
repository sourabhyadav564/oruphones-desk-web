import { Swiper } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import '../../node_modules/swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);

function CarouselWithPagination({ children, ...rest }) {
	return (
		<Swiper
			pagination={{ clickable: true }}
			navigation={true}
			modules={[Pagination, Navigation, Autoplay]}
			className="mySwiper select-none"
			loop={true}
			{...rest}
		>
			{children}
		</Swiper>
	);
}

export default CarouselWithPagination;

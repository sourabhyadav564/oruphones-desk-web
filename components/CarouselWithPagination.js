import { Swiper } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import '../node_modules/swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);

function CarouselWithPagination({ children, autoplay, ...rest }) {
	return (
		<Swiper
			autoplay={autoplay}
			id="main"
			tag="div"
			wrapperTag="ul"
			//   pagination={{ clickable: true }}
			navigation={true}
			modules={[Pagination, Navigation, Autoplay]}
			className="mySwiper "
			{...rest}
		>
			{children}
		</Swiper>
	);
}

export default CarouselWithPagination;

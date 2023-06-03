import { Swiper } from 'swiper/react';
import '@/node_modules/swiper/swiper-bundle.css';

function BasicCarousel({ children, ...rest }) {
	return (
		<Swiper id="main" tag="div" wrapperTag="ul" {...rest}>
			{children}
		</Swiper>
	);
}

export default BasicCarousel;

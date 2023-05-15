import { SwiperSlide } from 'swiper/react';
import ShopByModelCard from './Cards/ShopByModelCard';
import Carousel from './Carousel2';
import { getDefaultImage } from '@/utils/util';

const settings = {
	slidesToShow: 3,
	slidesToScroll: 3,
	slidesPerView: 3,
	dots: false,
	arrows: true,
	infinite: false,
	swipeToSlide: true,
};

function ShopByBrandSection({
	shopbymodeldata,
	shopbymakedata,
}) {
	return (
		<section className="m-auto items-center">
			<Carousel {...settings} className="">
				{shopbymodeldata?.map((item) => (
					<SwiperSlide key={item?.model}>
						<ShopByModelCard
							data={item.model}
							src={item.image}
							make={shopbymakedata}
						/>
					</SwiperSlide>
				))}
			</Carousel>
		</section>
	);
}

export default ShopByBrandSection;

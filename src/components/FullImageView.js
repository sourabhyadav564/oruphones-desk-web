import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import styles from '../styles/fullimageview.module.css';
import Chevronleft from '@/assets/chevronleft.svg';
import ChevronRight from '@/assets/chevronright.svg';
import Cross from '@/assets/cross1.svg';
import { useState } from 'react';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper';

const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => (
	<div className="absolute z-10 top-60 left-2  bg-gray-400  rounded-full p-1 flex ">
		<Image src={Chevronleft} width={24} height={24} alt="" {...rest} />
	</div>
);
const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => (
	<div className="absolute z-10 top-60 right-2  bg-gray-400 flex p-1 rounded-full">
		<Image src={ChevronRight} width={24} height={24} alt="" {...rest} />
	</div>
);

function shiftArray(arr, n) {
	const shiftAmount = n % arr.length; // ensure n is within range of array length
	const shiftedArray = arr.slice(shiftAmount).concat(arr.slice(0, shiftAmount));
	return shiftedArray;
}

function FullImageView({ open, close, images, currentslide }) {
	const [imageError, setImageError] = useState(false);
	// const t = useContext(MyContext)

	if (!open) {
		return null;
	}

	if (!Array.isArray(images)) {
		images = [images];
	}

	images = shiftArray(images, currentslide);

	const settingsMain = {
		autoplay: false,
		autoplaySpeed: 3000,
		navigation: {
			ArrowLeft,
			ArrowRight,
		},
		fade: true,
		slidesPerView: 1,
		dots: true,
		pagination: {
			clickable: true,
		},
		navigation: {
			ArrowLeft,
			ArrowRight,
		},
		modules: [Pagination, Navigation],
	};

	return (
		<section className={styles.imageview_container}>
			<div className="w-full h-20 flex justify-end p-4 text-white">
				<Image
					src={Cross}
					width={36}
					height={36}
					alt=""
					className="cursor-pointer"
					onClick={() => close()}
				/>
			</div>
			{images && (
				<Swiper {...settingsMain} className="w-full h-[80%]">
					{images
						.filter((i) => i?.fullImage)
						.map((img, index) => (
							<SwiperSlide key={index}>
								<Image
									alt="ORU Phones Logo"
									src={
										imageError
											? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
											: img?.fullImage ||
											  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
									}
									onError={() => {
										setImageError(true);
									}}
									layout="fill"
									className="object-contain hover:cursor-pointer p-20"
								/>
							</SwiperSlide>
						))}
					{images[0]?.fullImage == '' && (
						<div>
							<Image
								alt="ORU Phones Logo"
								src={
									'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								layout="fill"
								objectFit="contain"
								className="w-full h-full object-contain hover:cursor-pointer p-20"
							/>
						</div>
					)}
				</Swiper>
			)}
		</section>
	);
}

export default FullImageView;

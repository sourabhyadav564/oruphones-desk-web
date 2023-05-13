import React, { useState, useEffect, Fragment, createContext } from 'react';
import Image from 'next/image';
import Chevronleft from '@/assets/chevronleft.svg';
import ChevronRight from '@/assets/chevronright.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function ImageSlider({ data, images, openFullImage, onDataContext }) {
	const [slider1, setSlider1] = useState(null);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		let MyContext = createContext(slider1?.innerSlider?.asNavForIndex);
		MyContext = MyContext?._currentValue;

		if (MyContext == undefined) {
			onDataContext(0);
		} else {
			onDataContext(MyContext);
		}
	}, [onDataContext, slider1]);

	const settingsMain = {
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 3000,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav',
		slidesPerView: 1,
	};

	var type = ['old phone', 'used', 'refurbished'];
	const alternate_text = `buy ${
		type[Math.floor(Math.random() * type.length)]
	} ${data?.marketingName} ${data?.deviceStorage} ${
		data?.deviceCondition
	} `.toLowerCase();

	return (
		<SwiperSlide>
			{Array.isArray(images) && images && (
				<Swiper {...settingsMain} onSwiper={setSlider1}>
					{images
						.filter((i) => i.fullImage)
						.map((img, index) => (
							<Fragment key={index}>
								<Image
									loading="lazy"
									placeholder="blur"
									priority={false}
									unoptimized={false}
									quality={100}
									blurDataURL={
										imageError
											? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
											: img?.fullImage ||
											  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
									}
									src={
										imageError
											? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
											: img?.fullImage ||
											  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
									}
									onError={() => setImageError(true)}
									alt={alternate_text}
									layout="fill"
									objectFit="contain"
									onClick={() => openFullImage && openFullImage()}
									className="w-full h-full"
								/>
							</Fragment>
						))}
				</Swiper>
			)}
			{!Array.isArray(images) && images && (
				<Swiper {...settingsMain} onSwiper={setSlider1}>
					<Fragment>
						<Image
							src={
								imageError
									? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
									: images?.fullImage ||
									  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
							}
							loading="lazy"
							placeholder="blur"
							priority={false}
							quality={100}
							blurDataURL={
								imageError
									? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
									: images?.fullImage ||
									  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
							}
							unoptimized={false}
							onError={() => setImageError(true)}
							alt={alternate_text}
							layout="fill"
							objectFit="contain"
							onClick={() => openFullImage && openFullImage()}
							className="w-full h-full"
						/>
					</Fragment>
				</Swiper>
			)}
			<div className="thumbnail-slider-wrap">
				{Array.isArray(images) && images && (
					<Swiper {...settingsMain} onSwiper={setSlider1}>
						{images
							.filter((i) => i.fullImage)
							.map((img, index) => (
								<Fragment key={index}>
									<Image
										src={
											imageError
												? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
												: img?.thumbImage ||
												  img.fullImage ||
												  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										}
										loading="lazy"
										placeholder="blur"
										quality={100}
										priority={false}
										unoptimized={false}
										blurDataURL={
											imageError
												? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
												: img?.thumbImage ||
												  img.fullImage ||
												  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
										}
										onError={() => setImageError(true)}
										layout="fill"
										objectFit="contain"
										alt={alternate_text}
										className="w-full h-full"
									/>
								</Fragment>
							))}
					</Swiper>
				)}
				{!Array.isArray(images) && images && (
					<Swiper {...settingsMain} onSwiper={setSlider1}>
						<Image
							src={
								imageError
									? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
									: images?.thumbImage ||
									  images?.fullImage ||
									  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
							}
							onError={() => setImageError(true)}
							loading="lazy"
							placeholder="blur"
							priority={false}
							quality={100}
							unoptimized={false}
							blurDataURL={
								imageError
									? 'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
									: images?.thumbImage ||
									  images?.fullImage ||
									  'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
							}
							layout="fill"
							objectFit="contain"
							alt={alternate_text}
							className="w-full h-full"
						/>
					</Swiper>
				)}
			</div>
		</SwiperSlide>
	);
}

export default ImageSlider;

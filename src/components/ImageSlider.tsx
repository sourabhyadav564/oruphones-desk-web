import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import '@/node_modules/swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import type { TListingReturnFilter } from '@/types/ListingFilter';
import type { Swiper as TSwiper } from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper';

function ImageSlider({
	data,
	images,
	openFullImage,
}: {
	data: TListingReturnFilter;
	images: any;
	openFullImage?: any;
}) {
	const [controlledSwiper, setControlledSwiper] = useState<
		TSwiper | undefined
	>();
	const [imageError, setImageError] = useState(false);

	const settingsMain = {
		autoplay: {
			delay: 5000,
		},
		navigation: true,
		pagination: {
			dot: true,
			clickable: true,
		},
		slidesPerView: 1,
		fadeEffect: {
			crossFade: true,
		},
		modules: [Pagination, Navigation, EffectFade],
	};

	var type = ['old phone', 'used', 'refurbished'];
	const alternate_text = `buy ${
		type[Math.floor(Math.random() * type.length)]
	} ${data?.marketingName} ${data?.deviceStorage} ${
		data?.deviceCondition
	} `.toLowerCase();

	return (
		<SwiperSlide className="w-full h-full flex flex-col items-center justify-center">
			{Array.isArray(images) && images && (
				<Swiper
					{...settingsMain}
					className="c0 w-full h-[75%]"
					effect="fade"
					onSwiper={setControlledSwiper}
				>
					{images
						.filter((i) => i.fullImage)
						.map((img, index) => (
							<SwiperSlide key={index}>
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
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										openFullImage && openFullImage();
									}}
									className="w-full h-full object-contain hover:cursor-pointer"
								/>
							</SwiperSlide>
						))}
				</Swiper>
			)}
			{!Array.isArray(images) && images && (
				<Swiper {...settingsMain} className="c1 w-full h-[75%]">
					<SwiperSlide>
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
							className="w-full h-full object-contain hover:cursor-pointer"
						/>
					</SwiperSlide>
				</Swiper>
			)}
			<div className="thumbnail-slider-wrap w-full h-[20%] col-span-1">
				{Array.isArray(images) && images && (
					<Swiper
						{...settingsMain}
						slidesPerView={5}
						spaceBetween={10}
						centeredSlides={false}
						centerInsufficientSlides={true}
						className="mt-4 c2 w-[75%] h-full"
					>
						{images
							.filter((i) => i.fullImage)
							.map((img, index) => (
								<SwiperSlide
									key={index}
									onClick={() => controlledSwiper?.slideTo(index)}
								>
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
										className="w-[90%] h-[90%] object-contain cursor-pointer"
									/>
								</SwiperSlide>
							))}
					</Swiper>
				)}
				{!Array.isArray(images) && images && (
					<Swiper
						{...settingsMain}
						slidesPerView={5}
						spaceBetween={10}
						centeredSlides={false}
						centerInsufficientSlides={true}
						className="mt-4 c3 w-[75%] h-full"
					>
						<SwiperSlide>
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
								className="w-full h-full object-contain"
							/>
						</SwiperSlide>
					</Swiper>
				)}
			</div>
		</SwiperSlide>
	);
}

export default ImageSlider;

import React, { useState, useEffect, Fragment, createContext } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Chevronleft from '@/assets/chevronleft.svg';
import ChevronRight from '@/assets/chevronright.svg';

// const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => (
//   <div className="absolute">
//   <Image
//     src={Chevronleft}
//     width={32}
//     height={32}
//     {...rest}
//     className={`prev ${className}`}
//   />
//   </div>
// );
// const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => (
//   <Image
//     src={ChevronRight}
//     width={32}
//     height={32}
//     {...rest}
//     className={`prev ${className}`}
//   />
// );

const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => (
	<div className="absolute z-10 top-16  left-2  bg-gray-300  rounded-full p-1 flex ">
		<Image src={Chevronleft} width={14} height={14} alt="" {...rest} />
	</div>
);
const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => (
	<div className="absolute z-10 top-16 right-2  bg-gray-300 flex p-1 rounded-full">
		<Image src={ChevronRight} width={14} height={14} alt="" {...rest} />
	</div>
);

function ImageSlider({ data, images, openFullImage, onDataContext }) {
	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);
	const [slider1, setSlider1] = useState(null);
	const [slider2, setSlider2] = useState(null);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		setNav1(slider1);
		setNav2(slider2);
		let MyContext = createContext(slider1?.innerSlider?.asNavForIndex);
		MyContext = MyContext?._currentValue;

		if (MyContext == undefined) {
			onDataContext(0);
		} else {
			onDataContext(MyContext);
		}
	},[onDataContext, slider1, slider2]);

	const settingsMain = {
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 3000,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav',
	};

	const settingsThumbs = {
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		asNavFor: '.slider-for',
		dots: false,
		infinite: false,
		swipeToSlide: true,
		focusOnSelect: true,
		prevArrow: <ArrowLeft />,
		nextArrow: <ArrowRight />,
	};

	var type = ['old phone', 'used', 'refurbished'];
	const alternate_text = `buy ${
		type[Math.floor(Math.random() * type.length)]
	} ${data?.marketingName} ${data?.deviceStorage} ${
		data?.deviceCondition
	} `.toLowerCase();

	return (
		<React.Fragment>
			{Array.isArray(images) && images && (
				<Slider
					{...settingsMain}
					asNavFor={nav2}
					ref={(slider) => setSlider1(slider)}
				>
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
									width={'100%'}
									height={'90%'}
									layout="responsive"
									objectFit="contain"
									onClick={() => openFullImage && openFullImage()}
								/>
							</Fragment>
						))}
				</Slider>
			)}
			{!Array.isArray(images) && images && (
				<Slider
					{...settingsMain}
					asNavFor={nav2}
					ref={(slider) => setSlider1(slider)}
				>
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
							width={'100%'}
							height={'90%'}
							layout="responsive"
							objectFit="contain"
							onClick={() => openFullImage && openFullImage()}
						/>
					</Fragment>
				</Slider>
			)}
			<div className="thumbnail-slider-wrap">
				{Array.isArray(images) && images && (
					<Slider
						{...settingsThumbs}
						asNavFor={nav1}
						ref={(slider) => setSlider2(slider)}
					>
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
										width={'100%'}
										height={'100%'}
										layout="responsive"
										objectFit="contain"
										alt={alternate_text}
									/>
								</Fragment>
							))}
					</Slider>
				)}
				{!Array.isArray(images) && images && (
					<Slider
						{...settingsThumbs}
						asNavFor={nav1}
						ref={(slider) => setSlider2(slider)}
					>
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
							width={'100%'}
							height={'100%'}
							layout="responsive"
							objectFit="contain"
							alt={alternate_text}
						/>
					</Slider>
				)}
			</div>
		</React.Fragment>
	);
}

export default ImageSlider;

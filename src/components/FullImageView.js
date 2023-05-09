import Slider from 'react-slick';
import styles from '../styles/fullimageview.module.css';
import Chevronleft from '@/assets/chevronleft.svg';
import ChevronRight from '@/assets/chevronright.svg';
import Cross from '@/assets/cross1.svg';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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

	let dotes = images;

	images = shiftArray(images, currentslide);

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
				<Slider
					speed={500}
					dots={true}
					prevArrow={<ArrowLeft />}
					nextArrow={<ArrowRight />}
					appendDots={(dots) => {
						let temp = 0;
						dots.map((item, index) => {
							if (item.props.className === 'slick-active') {
								temp = index + 1;
							}
						});
						return (
							<span style={{ color: 'white' }}>
								{dotes?.length === 1
									? `1 / 1 `
									: `${currentslide + temp} / ${images?.length}`}
							</span>
						);
					}}
				>
					{images
						.filter((i) => i?.fullImage)
						.map((img, index) => (
							<div key={index} className={styles.image_wrapper}>
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
									style={{ maxWidth: '80%', maxHeight: '70vh' }}
								/>
							</div>
						))}
					{images[0]?.fullImage == '' && (
						<div className={styles.image_wrapper}>
							<Image
								alt="ORU Phones Logo"
								src={
									'https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg'
								}
								style={{ maxWidth: '40%', maxHeight: '70vh' }}
							/>
						</div>
					)}
				</Slider>
			)}
		</section>
	);
}

export default FullImageView;

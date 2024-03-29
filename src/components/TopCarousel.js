import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import AppDownloadPopup from './Popup/AppDownloadPopup';
import Banner_2 from '@/assets/banner_web_2.png';
import Banner_3 from '@/assets/banner_web_3.png';
import CarouselWithPagination from '@/components/CarouselWithPagination';
import LoginPopup from '@/components/Popup/LoginPopup';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const settings = {
	slidesPerView: 1,
	autoplay: {
		delay: 5000,
		pauseOnHover: true,
	},
	navigation: {
		arrows: true,
	},
	pagination: {
		dots: true,
		clickable: true,
	},
	loop: true,
};

const slides = [
	{
		name: 'GIF',
		link: '#jaja',
		src: 'https://d1tl44nezj10jx.cloudfront.net/web/assets/banner_4.webp',
		id: 1,
	},
	{
		name: 'article_image',
		link: 'https://www.oruphones.com/blog/',
		src: Banner_2,
		id: 2,
	},
	{
		name: 'prc_comp_bnr',
		link: 'https://www.oruphones.com/user/services/price-comparison',
		src: Banner_3,
		id: 3,
	},
];

const TopCarousel = () => {
	const router = useRouter();
	const [loadingState, setLoadingState] = useState(false);
	const [openLoginPopup, setOpenLoginPopup] = useState(false);
	const [performAction, setPerformAction] = useState(false);
	const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);

	useEffect(() => {
		setLoadingState(false);
	}, [router.pathname]);

	const handleClick = () => {
		if (Cookies.get('userUniqueId') == undefined) {
			setOpenLoginPopup(true);
			setPerformAction(true);
		} else {
			router.push('/user/services/price-comparison');
		}
	};
	useEffect(() => {
		const interval = setInterval(() => {
			if (
				openLoginPopup == false &&
				performAction == true &&
				Cookies.get('userUniqueId') != undefined
			) {
				clearInterval(interval);
				router.push('/user/services/price-comparison');
			}
		}, 1000);
	}, [openLoginPopup, performAction, router]);
	return (
		<section>
			<CarouselWithPagination {...settings}>
				{slides.map((item) => (
					<SwiperSlide key={item.id}>
						{item.link && item.id == 1 ? (
							<div
								className="flex justify-center relative"
								onClick={() => {
									setShowAppDownloadPopup(true);
								}}
							>
								<div style={{ margin: '0px 0px 0px 0px' }} className="">
									<Image
										src={item.src}
										alt={item.name}
										width={'7680px'}
										height={'1920px'}
										className="bannerShadow object-contain"
										data-aos="fade-down"
										priority={true}
									/>
								</div>
							</div>
						) : (
							<Link
								className="flex justify-center relative mix-blend-overlay cursor-pointer"
								href={item.id != 3 ? item.link : '#'}
								key={item.id}
								passHref
							>
								<div className="flex justify-center items-center">
									<Image
										src={item.src}
										alt={item.name}
										width={'7680px'}
										height={'1920px'}
										className="bannerShadow"
										data-aos="fade-down"
									/>
									{item.id == 3 && (
										<div
											className="w-full absolute left-0 right-0 md:bottom-16 -bottom-2 px-5 flex items-center justify-center"
											style={{ fontSize: 10 }}
										>
											<div
												className="w-full flex rounded-[5px] h-12 justify-center "
												data-aos="zoom-out-up"
											>
												<div>
													<div className="px-4 py-7 rounded-[5px]">
														<a
															className="flex h-7 text-mediumFontSize font-Roboto-Semibold justify-center py-7 items-center px-16 rounded-[5px] bg-gradient-to-b from-[#FFDe59] to-[#FFDE59] cursor-pointer"
															onClick={() => handleClick()}
														>
															{item.id == 3 && <p>COMPARE PRICE</p>}
														</a>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</Link>
						)}
					</SwiperSlide>
				))}
			</CarouselWithPagination>
			<LoginPopup open={openLoginPopup} setOpen={setOpenLoginPopup} />
			<AppDownloadPopup
				open={showAppDownloadPopup}
				setOpen={setShowAppDownloadPopup}
			/>
		</section>
	);
};

export default TopCarousel;

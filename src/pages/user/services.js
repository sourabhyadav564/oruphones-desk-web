import { useState } from 'react';
import Loader from '@/components/Loader/Loader';
import AppDownloadPopup from '@/components/Popup/AppDownloadPopup';
import UserProfile from '@/components/User/UserProfile';
import { servicesData } from '@/utils/constant';
import Image from 'next/image';

function Services() {
	const [openAppDownload, setOpenAppDownload] = useState(false);
	const handleClick = () => {
		setOpenAppDownload(true);
	};

	return (
		<UserProfile>
			<div className="px-4 py-3">
				<h1 className="text-xl2FontSize font-Roboto-Bold py-2">
					{' '}
					ORU Services{' '}
				</h1>
				<div className="flex flex-col space-y-4 my-4 text-xlFontSize font-Roboto-Regular">
					{servicesData && servicesData.length > 0 ? (
						servicesData.map((item, index) => (
							<div>
								{index < 1 ? (
									<div>
										<a
											href={item.link}
											key={index}
											className={`${
												index <= 1 ? 'bg-gray-200 bg-opacity-60' : 'bg-white'
											} border py-2 px-4 pl-0 flex items-center rounded shadow mb-3 hover:cursor-pointer`}
										>
											<div className="p-4">
												<Image
													src={item?.imgSrc || '/'}
													width={'48'}
													height={'30'}
													objectFit="contain"
													alt={item.title}
												/>
											</div>
											<div className="flex-1">
												<h2 className="text-gray-20">{item.title}</h2>
												<p className="text-sm text-gray-70">
													{item.description}
												</p>
											</div>
										</a>
									</div>
								) : (
									<div>
										<a
											key={index}
											className={`${
												index < 1 ? 'bg-gray-200 ' : 'bg-white'
											} opacity-70 border py-2 px-4 pl-0 flex items-center rounded shadow mb-3 hover:cursor-pointer`}
											onClick={handleClick}
										>
											<div className="p-4">
												<Image
													src={item?.imgSrc || '/'}
													width={'48'}
													height={'30'}
													objectFit="contain"
													alt={item.title}
												/>
											</div>
											<div className="flex-1 ">
												<h2 className="text-black opacity-80">{item.title}</h2>
												<p className="text-sm text-black opacity-80">
													{item.description}
												</p>
											</div>
										</a>
									</div>
								)}
							</div>
						))
					) : (
						<div className="flex h-60 items-center justify-center text-xlFontSize font-Roboto-Regular">
							<Loader />
							Please wait, while we are fetching our services...
						</div>
					)}
				</div>
				<AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
			</div>
		</UserProfile>
	);
}

export default Services;

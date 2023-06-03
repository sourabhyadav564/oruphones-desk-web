import React, { useState } from 'react';
import HowtoBuyPopup from './Popup/HowtoBuyPopup';
import HowtoSellPopup from './Popup/HowtoSellPopup';
import HowtoUsePopup from './Popup/HowtoUsePopup';
import Image from 'next/image';

function SellBuyFlow() {
	const [openSell, setOpenSell] = useState(false);
	const [openBuy, setOpenBuy] = useState(false);
	const [openUse, setOpenUse] = useState(false);

	return (
		<div className="items-center py-8">
			<p className="flex justify-center font-Roboto-Semibold text-xl3FontSize  py-8 text-m-green">
				ORU GUIDE
			</p>
			<div className="flex justify-center items-center m-auto">
				<div className="container flex flex-wrap gap-4  md:justify-between justify-evenly px-8 ">
					<div
						className="cursor-pointer hover:bg-gray-100  shadow drop-shadow rounded-lg w-60 h-28  py-4  bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-between relative"
						onClick={() => setOpenSell(true)}
					>
						<Image
							src={'https://d1tl44nezj10jx.cloudfront.net/web/assets/sell.svg'}
							height={50}
							width={40}
							objectFit="contain m-auto justify-center flex"
						/>
						<span className="text-mediumFontSize font-Roboto-Semibold text-center pt-2">
							How to Sell
						</span>
					</div>
					<div
						className="cursor-pointer shadow hover:bg-gray-100  drop-shadow rounded-lg w-60 h-28  py-2  bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative"
						onClick={() => setOpenBuy(true)}
					>
						<Image
							src={'https://d1tl44nezj10jx.cloudfront.net/web/assets/buy.svg'}
							height={50}
							width={40}
							objectFit="contain m-auto justify-center flex"
						/>
						<span className="text-mediumFontSize font-Roboto-Semibold text-center pt-2">
							How to Buy
						</span>
					</div>
					<div
						className="cursor-pointer shadow hover:bg-gray-100  drop-shadow rounded-lg w-60 h-28  py-2  bg-m-white text-m-grey-7 text-xs  flex flex-col items-center self-center justify-center relative"
						onClick={() => setOpenUse(true)}
					>
						<Image
							src={'https://d1tl44nezj10jx.cloudfront.net/web/assets/Book.svg'}
							height={50}
							width={40}
							objectFit="contain m-auto justify-center flex"
						/>
						<span className="text-smallFontSize font-Roboto-Semibold text-center pt-2">
							Oru Guide
						</span>
					</div>
				</div>
				<HowtoSellPopup open={openSell} setOpen={setOpenSell} />
				<HowtoBuyPopup open={openBuy} setOpen={setOpenBuy} />
				<HowtoUsePopup open={openUse} setOpen={setOpenUse} />
			</div>
		</div>
	);
}

export default SellBuyFlow;

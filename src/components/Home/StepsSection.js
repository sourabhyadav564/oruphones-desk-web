import React from 'react';
import Carousel from '@/Carousel';
import Image from 'next/image';
import Link from 'next/link';

const sellStepsData = [
	{
		id: 1,
		heading: 'Add your device',
		description: (
			<span>
				Go to the &lsquo;Sell Now&rsquo; option, enter your details and expected
				price for your device.
			</span>
		),
		src: 'https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_step_1.svg',
		alt: 'Add your device',
		link: '#how_to_sell',
	},
	{
		id: 2,
		heading: 'Device verification',
		description: (
			<span>
				Download ORUphones App on the same device, complete verification of the
				device and get verified.
			</span>
		),
		src: 'https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_step_2.svg',
		alt: 'Device verification',
		link: '#how_to_sell',
	},
	{
		id: 3,
		heading: 'Get cash',
		description: (
			<span>
				Get approached by a verified buyer, bargain, negotiate and get yourself
				a great deal.
			</span>
		),
		src: 'https://d1tl44nezj10jx.cloudfront.net/assets/sell_step_3.svg',
		alt: 'Get cash',
		link: '#how_to_sell',
	},
];

const BuyStepsData = [
	{
		id: 1,
		heading: 'Select device',
		description: (
			<span>
				Choose your desired brand and model from the homepage and select the
				device.
			</span>
		),
		src: 'https://d1tl44nezj10jx.cloudfront.net/assets/buy_step_1.svg',
		alt: 'Select device',
		link: '#how_to_buy',
	},
	{
		id: 2,
		heading: 'Contact Seller',
		description: (
			<span>
				Click on &lsquo;Contact seller&rsquo; in the device description, get
				details of the seller and setup a meet.
			</span>
		),
		src: 'https://d1tl44nezj10jx.cloudfront.net/assets/buy_step_2.svg',
		alt: 'Contact Seller',
		link: '#how_to_buy',
	},
	{
		id: 3,
		heading: 'Verify Your Purchase',
		description: (
			<span>
				Meet the seller, go to the ORUphones app on your mobile, fill your
				credentials and verify the device.
			</span>
		),
		src: 'https://d1tl44nezj10jx.cloudfront.net/assets/buy_step_3.svg',
		alt: 'Verify Your Purchase',
		link: '#how_to_buy',
	},
];

function StepsSection() {
	return (
		<section className="container pt-4">
			<Carousel>
				<StepComp data={sellStepsData} title={'How to sell your phone'} />
				<StepComp data={BuyStepsData} title={'How to buy securely'} />
			</Carousel>
		</section>
	);
}

export default StepsSection;

const StepComp = ({ title, data }) => (
	<div className="bg-sell-step mb-4 py-4 rounded-md shadow text-center text-gray-600">
		<p className="text-xl pb-6 leading-normal font-semibold"> {title} </p>
		<div className="flex items-center md:items-stretch justify-center flex-col md:flex-row gap-y-6">
			{data &&
				data.map((item, index) => (
					<div key={index} className="flex items-baseline justify-evenly">
						<div className="max-w-sm h-full flex flex-col">
							<div className="mx-auto mb-2">
								<Image width={80} height={80} src={item.src} alt={item.alt} />
							</div>
							<div
								className="max-w-xs flex-1 flex flex-col"
								style={{ minWidth: 320 }}
							>
								<h2 className="text-lg">{item.heading}</h2>
								<p
									className="p-2 text-sm flex-1 py-2.5 mx-auto"
									style={{ maxWidth: 250 }}
								>
									{item.description}
								</p>
								<Link href={item.link} passHref>
									<a className="text-m-black font-bold">Learn more...</a>
								</Link>
							</div>
						</div>
						{index === 0 || index === 1 ? (
							<div className="hidden md:flex flex-shrink-0 w-8 h-8">
								<div className="bg-arrow-left bg-contain bg-no-repeat w-full h-auto" />
							</div>
						) : (
							''
						)}
					</div>
				))}
		</div>
	</div>
);

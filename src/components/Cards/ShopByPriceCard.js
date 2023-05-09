import Link from 'next/link';
import Image from 'next/image';
import Rupee1 from '@/assets/rupee1.svg';

function ShopByPriceCard({ src, min, max }) {
	if (max && max.toString().toLowerCase().includes('above')) {
		return (
			<Link
				href={`/product/buy-old-refurbished-used-mobiles/pricerange/${min}/${max}`}
			>
				<a className="w-full h-full py-2 rounded-md shadow hover:shadow-md flex flex-col items-center bg-m-white">
					<div>
						<Image src={src} alt={`${min}-${max}`} width={150} height={150} />
					</div>
					<div className="text-m-grey-1 text-lg sm:text-base py-1 font-bold flex items-center justify-center w-full">
						<p className="flex items-center">
							<Image src={Rupee1} width={20} height={20} alt="" /> {min}
						</p>
						<p className="w-10 inline-flex justify-center items-center">
							{' '}
							and{' '}
						</p>
						<p className="flex items-center">above</p>
					</div>
				</a>
			</Link>
		);
	}
	return (
		<Link
			href={`/product/buy-old-refurbished-used-mobiles/pricerange/${min}/${max}`}
		>
			<a className="w-full h-full py-2 rounded-md shadow hover:shadow-md flex flex-col items-center bg-m-white">
				<div>
					<Image src={src} alt={`${min}-${max}`} width={150} height={150} />
				</div>
				<div className="text-m-grey-1 text-lg sm:text-base py-1 font-bold flex items-center justify-center w-full">
					<p className="flex items-center">
						<Image src={Rupee1} width={20} height={20} alt="" /> {min}
					</p>
					<p className="w-4 inline-flex justify-center items-center"> {'-'} </p>
					<p className="flex items-center">
						<Image src={Rupee1} width={20} height={20} alt="" /> {max}
					</p>
				</div>
			</a>
		</Link>
	);
}

export default ShopByPriceCard;

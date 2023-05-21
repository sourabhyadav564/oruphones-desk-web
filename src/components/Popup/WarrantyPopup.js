import Link from 'next/link';
import Model3 from './Model3';

function WarrantyPopup({ open, setOpen, data, redirect }) {
	const warrantycarddata = [
		{
			id: 1,
			Link: 'product/buy-old-refurbished-used-mobiles/bestdealnearyou?warranty=Brand%20Warranty',
			text: 'Brand Warranty',
		},
		{
			id: 2,
			Link: 'product/buy-old-refurbished-used-mobiles/bestdealnearyou?warranty=Seller%20Warranty',
			text: 'Seller Warranty',
		},
	];

	return (
		<>
			<Model3 open={open} setOpen={setOpen}>
				<div className="h-full w-full  px-16 pt-12 pb-10 cardShadow1 rounded-lg space-y-5 gap-5">
					<div className="grid grid-cols-2 gap-5">
						{warrantycarddata.map((item, index) => (
							<Link href={item.Link} key={index} passHref>
								<p className=" bg-gray-200 text-center flex flex-col items-center justify center px-5 py-2 rounded-md hover:cursor-pointer hover:bg-gray-300 active:bg-gray-400 duration-300">
									{item.bracket}{' '}
									<span className=" font-Roboto-Semibold">{item.text}</span>
								</p>
							</Link>
						))}
					</div>
					<div>
						<Link
							href={`product/buy-old-refurbished-used-mobiles/bestdealnearyou`}
							key={3}
							passHref
						>
							<p className=" bg-gray-200  flex flex-col items-center justify center px-5 py-2 rounded-md hover:cursor-pointer hover:bg-gray-300 active:bg-gray-400 duration-300">
								<span className="font-Roboto-Semibold">Both</span>
							</p>
						</Link>
					</div>
				</div>
			</Model3>
		</>
	);
}

export default WarrantyPopup;

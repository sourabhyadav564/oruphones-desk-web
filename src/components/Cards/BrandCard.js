import Link from 'next/link';
import Image from 'next/image';
import { atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';

const makeAtom = atomWithStorage('makeState', '');
function BrandCard({ data }) {
	const [_, setMake] = useAtom(makeAtom);
	if (data?.make.toLowerCase().includes('show')) {
		return (
			<Link href={`/brands`}>
				<a className="w-36 h-[91px] rounded opacity-100 bg-no-repeat p-4 bg-m-white flex justify-center hover:bg-gray-100 group items-center shadow-md">
					<p className="block text-m-grey-2 font-Roboto-Regular text-regularFontSize w-[89px] pl-2.5 h-5 group-hover:scale-110">
						View All &gt;
					</p>
				</a>
			</Link>
		);
	}
	return (
		data.imagePath && (
			<Link
				href={{
					pathname: `/product/buy-old-refurbished-used-mobiles/${data?.make?.toLowerCase()}`,
				}}
			>
				<a className="bg-no-repeat rounded w-36  sm:px-4 bg-m-white flex justify-center opacity-100 relative shadow-md group hover:bg-gray-100">
					<Image
						src={data?.imagePath}
						loading="lazy"
						placeholder="blur"
						priority={false}
						unoptimized={false}
						blurDataURL={data?.imagePath}
						alt={`buy online refurbished ${data?.make}`}
						onClick={() => setMake(data?.make)}
						height={80}
						width={80}
						objectFit="contain"
						className="group-hover:scale-105"
					/>
				</a>
			</Link>
		)
	);
}

export default BrandCard;

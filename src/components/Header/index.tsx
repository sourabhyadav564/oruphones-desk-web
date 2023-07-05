import React from 'react';
import DesktopMenu from './DesktopMenu';
import LoginOrProfile from './LoginOrProfile';
import SearchBar from './SearchBar';
import SellNowBtn from './SellNowBtn';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
	return (
		<header>
			<div className=" container lg:w-10/12 w-full h-16 bg-m-white bg-no-repeat  flex justify-center items-center opacity-100 px-0 py-0 ">
				<Link href="/">
					<a className="h-9 md:w-[75px] px-32 pr-0 py-[14px] mr-4 lg:mr-8 block relative">
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg'
							}
							alt="ORUphones"
							layout="fill"
							priority
						/>
					</a>
				</Link>
				<div className="flex justify-center mx-12 flex-1 text-sm">
					<SearchBar />
				</div>

				<div className="flex space-x-2 flex-shrink-0 text-sm">
					<SellNowBtn />
					<LoginOrProfile />
				</div>
			</div>
			<DesktopMenu />
		</header>
	);
}

export default Header;

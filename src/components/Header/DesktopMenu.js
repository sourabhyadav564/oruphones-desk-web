import { Popover } from '@headlessui/react';
import { useEffect, useState } from 'react';
import Location from '@/assets/location.svg';
import LocationPopup from '@/components/Popup/LocationPopup';
import LoginPopup from '@/components/Popup/LoginPopup';
import readLocationAtom from '@/store/location';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menus = [
	{
		name: 'Popular Models',
		options: [],
		chlink: '/product/models',
	},
	{
		name: 'Apple',
		options: [],
		make: 'apple',
		chlink: '/product/buy-old-refurbished-used-mobiles/apple',
	},
	{
		name: 'Samsung',
		options: [],
		make: 'samsung',
		chlink: '/product/buy-old-refurbished-used-mobiles/samsung',
	},
	{
		name: 'OnePlus',
		options: [],
		make: 'oneplus',
		chlink: '/product/buy-old-refurbished-used-mobiles/oneplus',
	},
	{ name: 'Blog', href: 'https://www.oruphones.com/blog' },
	{
		name: 'Best Deals',
		options: [],
		chlink: '/product/buy-old-refurbished-used-mobiles/bestdealnearyou',
	},
];

function DesktopMenu() {
	const router = useRouter();
	const [openLocationPopup, setOpenLocationPopup] = useState(false);
	const [authenticated, setauthenticated] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [ItemLink, setItemLink] = useState('');
	const [performAction, setPerformAction] = useState(false);
	const [location] = useAtom(readLocationAtom);

	useEffect(() => {
		if (Cookies.get('userUniqueId') !== undefined) {
			setauthenticated(true);
		} else {
			setauthenticated(false);
		}
		return () => {};
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (
				showLogin == false &&
				ItemLink !== '' &&
				Cookies.get('userUniqueId') !== undefined
			) {
				setPerformAction(false);
				clearInterval(interval);
				router.push(ItemLink);
			}
		}, 1000);
	}, [showLogin]);

	return (
		<nav
			className="px-0 h-12 bg-m-green-1 bg-no-repeat items-center flex flex-row justify-between "
			data-aos="fade-down"
		>
			<span
				className="text-white  lg:pl-52 pl-8  flex flex-row justify-start items-center space-x-1 hover:cursor-pointer hover:underline hover:opacity-70"
				onClick={() => setOpenLocationPopup(true)}
			>
				<Image src={Location} width={14} height={15} alt="" />
				<span
					className="text-white font-Roboto-Semibold items-center text-mediumFontSize"
					color={'white'}
				>{`${location}`}</span>
			</span>
			<span>
				<Popover.Group className=" container hidden lg:flex items-center pt-[7px] text-mediumFontSize font-Roboto-Light justify-end text-m-white pr-40">
					{menus.map((item, index) =>
						item && item.options ? (
							<Popover key={item.name}>
								{({ open, close }) => (
									<>
										<Popover.Button
											className={`${
												open ? '' : 'text-opacity-90'
											}text-m-white px-4 opacity-100 hover:opacity-60  font-light `}
										>
											<Link key={index} href={{ pathname: item.chlink }}>
												<span> {item.name} </span>
											</Link>
										</Popover.Button>
									</>
								)}
							</Popover>
						) : (
							<Link href={item.href} key={item.name} passHref>
								<a className="px-4 hover:opacity-60">{item.name}</a>
							</Link>
						)
					)}

					{authenticated ? (
						<div>
							<div className="animate-pulse absolute  ml-14 -mt-2  bg-red-600 text-right rounded items-center px-1 text-xs2FontSize   text-white">
								NEW
							</div>
							<NavListItem text="Services" link="/user/services" />
							{/* <div className=></div> */}
						</div>
					) : (
						<div>
							<div className="animate-pulse absolute  ml-14 -mt-2  bg-red-600 text-right rounded items-center px-1 text-xs2FontSize   text-white">
								NEW
							</div>

							<NavListItem
								text="Services"
								onClick={() => {
									setShowLogin(true);
									setPerformAction(true);
									setItemLink('/user/services');
								}}
							/>
						</div>
					)}
				</Popover.Group>
			</span>
			<LoginPopup open={showLogin} setOpen={setShowLogin} />
			<LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
		</nav>
	);
}

export default DesktopMenu;

const NavListItem = ({ text, link, onClick }) => (
	<Link href={link || '#'} passHref>
		<a
			className="text-m-white opacity-100  hover:opacity-60 font-light px-2"
			onClick={onClick}
		>
			{text}
		</a>
	</Link>
);

import React, { useContext, useEffect, useState } from 'react';
import RegUser from '@/assets/user1.svg';
import Notifications from '@/components/Notifications';
import LoginPopup from '@/components/Popup/LoginPopup';
import AppContext from '@/context/ApplicationContext';
import AuthContext from '@/context/AuthContext';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function LoginOrProfile() {
	const router = useRouter();
	const [showLogin, setShowLogin] = React.useState(false);
	const [userAuthenticated, setUserAuthenticated] = useState(false);
	const [performAction, setPerformAction] = useState(false);
	const { logout } = useContext(AuthContext);
	const { setUserInfo } = useContext(AppContext);
	const [ItemLink, setItemLink] = useState('');

	useEffect(() => {
		if (Cookies.get('userUniqueId') !== undefined) {
			setUserAuthenticated(true);
		} else {
			setUserAuthenticated(false);
		}
		return () => {};
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (
				performAction == true &&
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

	if (userAuthenticated) {
		return (
			<div className="flex space-x-1 items-center h-full w-20 mt-1 z-50">
				<Notifications />
				<div className="relative inline-block group ">
					<Image
						src={RegUser}
						width={30}
						height={30}
						alt=""
						className="hover:scale-110 hover:bg-gray-100  rounded-full   cursor-pointer"
					/>
					<div className="absolute z-50 hidden group-hover:block transform -translate-x-1/2 left-1/2 bg-transparent">
						<div className="flex flex-col items-center">
							<div className="w-10 overflow-hidden inline-block">
								<div className="h-7 w-7 bg-white rotate-45 transform origin-bottom-left"></div>
							</div>
							<div className="-mt-1 grid grid-cols-1 w-48 rounded px-4 shadow-md pb-2 bg-white border-t-4 border-transparent">
								<p className="text-center text-regularFontSize pt-4 pb-2 font-Roboto-Semibold text-m-grey-1">
									My Account
								</p>
								<NavListItem text="My Profile" link="/user/profile" />
								<NavListItem text="My Listings" link="/user/listings" />
								<NavListItem text="My Favorites" link="/user/favorites" />
								<div className=" absolute  ml-24 mt-44  bg-red-600 text-right rounded items-center px-1 text-xs2FontSize   text-white">
									NEW
								</div>
								<NavListItem text="ORU Services" link="/user/services" />
								<NavListItem
									text="Logout"
									link="/"
									onClick={() => {
										logout();
										setUserInfo();
									}}
								/>
								<NavListItem text="Report a problem" link="/reportIssue" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<React.Fragment>
				<div className="flex space-x-1 items-center h-full w-20 z-50">
					<Notifications />
					<div className="relative inline-block group">
						<Image
							src={RegUser}
							width={30}
							height={30}
							alt=""
							className="hover:scale-110 hover:bg-gray-100  rounded-full  cursor-pointer "
						/>
						<div className="absolute z-50 hidden group-hover:block transform -translate-x-1/2 left-1/2 bg-transparent">
							<div className="flex flex-col items-center">
								<div className="w-10 overflow-hidden inline-block">
									<div className="h-7 w-7 bg-white rotate-45 transform origin-bottom-left"></div>
								</div>
								<div className="-mt-1 grid grid-cols-1 w-48 rounded px-4 shadow-md pb-2 bg-white border-t-4 border-transparent">
									<p className="text-center text-regularFontSize pt-4 pb-2 font-Roboto-Semibold text-m-grey-1">
										My Account
									</p>
									<NavListItem
										text="My Profile"
										onClick={() => {
											setShowLogin(true);
											setPerformAction(true);
											setItemLink('/user/profile');
										}}
									/>
									<NavListItem
										text="My Listings"
										onClick={() => {
											setShowLogin(true);
											setPerformAction(true);
											setItemLink('/user/listings');
										}}
									/>
									<NavListItem
										text="My Favorites"
										onClick={() => {
											setShowLogin(true);
											setPerformAction(true);
											setItemLink('/user/favorites');
										}}
									/>
									<NavListItem
										text="ORU Services"
										onClick={() => {
											setShowLogin(true);
											setPerformAction(true);
											setItemLink('/user/services');
										}}
									/>
									<NavListItem
										text="Login"
										onClick={() => {
											setShowLogin(true);
										}}
									/>

									<NavListItem text="Report a problem" link="/reportIssue" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<LoginPopup open={showLogin} setOpen={setShowLogin} />
			</React.Fragment>
		);
	}
}

export default LoginOrProfile;

const NavListItem = ({ text, link, onClick }) => (
	<Link href={link || '#'} passHref>
		<a
			className="px-4 py-2 my-1 font-Roboto-Regular hover:bg-gray-100 rounded text-black-60"
			onClick={onClick}
		>
			{text}
		</a>
	</Link>
);

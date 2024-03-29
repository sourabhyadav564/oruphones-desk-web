import React, { useEffect, useRef, useState } from 'react';
import AppDownloadPopup from './Popup/AppDownloadPopup';
import {
	deleteNotification,
	getAllNotificationByUserd,
	markAsRead,
} from '@/api/axios';
import Notification from '@/assets/notification.svg';
import Trash from '@/assets/trash.svg';
import Cookies from 'js-cookie';
import Image from 'next/image';
import router from 'next/router';

export default function Notifications() {
	const innerRef = useRef();
	const [showNotification, setShowNotification] = useState(false);
	const [openAppDownload, setOpenAppDownload] = useState(false);
	const [notifications, setNotifications] = useState(0);
	const [unreadNotificationsCount, setUnreadNotificationsCount] = useState();

	useEffect(() => {
		getAllNotificationByUserd(Cookies.get('userUniqueId')).then((response) => {
			setNotifications(response?.dataObject?.notifications);
			setUnreadNotificationsCount(response?.dataObject?.unReadCount);
		});
		const checkIfClickedOutside = (e) => {
			if (innerRef.current && !innerRef.current.contains(e.target)) {
				setShowNotification(false);
			}
		};
		document.addEventListener('mousedown', checkIfClickedOutside);
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, []);

	useEffect(() => {
		if (showNotification) {
			getAllNotificationByUserd(Cookies.get('userUniqueId')).then(
				(response) => {
					setNotifications(response?.dataObject?.notifications);
					setUnreadNotificationsCount(response?.dataObject?.unReadCount);
				}
			);
		}
	}, [showNotification]);

	function redirectTo(data) {
		setShowNotification(false);
		if (data.webEventAction === 'APP_DOWNLOAD') {
			setOpenAppDownload(true);
		} else if (data.webEventAction === 'MY_FAVORITES') {
			router.push('/user/favorites');
		} else {
			router.push('/user/listings');
		}
		makeNotificationAsRead(data);
	}

	function makeNotificationAsRead(data) {
		if (data?.isUnRead === 0) {
			markAsRead(data?.notificationId);
		}
	}

	return (
		<div className="relative inline-block mx-2" ref={innerRef}>
			<div className="relative">
				<Image
					src={Notification}
					width={30}
					height={30}
					className="hover:bg-gray-200 hover:rounded-full cursor-pointer "
					onClick={() => setShowNotification((prev) => !prev)}
				/>
				{
					<span className="absolute -top-1 ml-5 bg-yellow2 w-6 text-xs2FontSize text-m-green font-Roboto-Bold rounded-full flex items-center justify-center">
						{notifications?.length == 0 ? <></> : notifications?.length}
					</span>
				}
			</div>

			<div
				className={`absolute z-50 transform -translate-x-1/2 left-1/2 bg-transparent custom-scroll ${
					showNotification ? 'block' : 'hidden'
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="w-10 overflow-hidden inline-block">
						<div className="h-7 w-7 relative bg-white rotate-45 transform origin-bottom-left"></div>
					</div>
					<div className="-mt-1 flex flex-col w-72  h-72  overflow-hidden overflow-y-auto rounded-md shadow-md pb-2 border-t-4 border-transparent bg-white">
						<p className="text-center text-xlFontSize pt-4 pb-3 font-Roboto-Semibold text-m-grey-1 h-auto ">
							Notification
						</p>
						<div className="py-[0.5px] bg-gray-700 mx-1"></div>

						{notifications && notifications.length > 0 ? (
							notifications.map((items, index) => (
								<NotificationsItem
									id={items.notificationId}
									key={items.notificationId}
									text={items.messageContent}
									timestamp={items.createdDate}
									onClick={() => redirectTo(items)}
									isUnRead={items.isUnRead === 0}
									notifications={notifications}
									setNotifications={setNotifications}
								/>
							))
						) : (
							<div className="uppercase text-regularFontSize font-Roboto-Bold flex justify-center items-center text-center h-full w-full">
								No notifications
							</div>
						)}
					</div>
				</div>
			</div>
			<AppDownloadPopup open={openAppDownload} setOpen={setOpenAppDownload} />
		</div>
	);
}

const NotificationsItem = ({
	id,
	text,
	timestamp,
	onClick,
	isUnRead,
	notifications,
	setNotifications,
}) => (
	<div
		className={`hover:cursor-pointer flex w-full border-b border-white py-2 px-4 ${
			isUnRead ? 'bg-gray-100' : ''
		}`}
	>
		<div
			className="w-12 h-12 rounded-2xl flex-shrink-0 mr-4 flex justify-center items-center"
			style={{ background: '#EFEFEF' }}
			onClick={onClick}
		>
			<Image
				src={'https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg'}
				width={30}
				height={30}
				alt="ORUphones notification"
			/>
		</div>
		<div>
			<div className="flex flex-row ">
				<p
					className="text-sm text-m-grey-1 break-words text-mediumFontSize font-Roboto-Semibold pr-2"
					onClick={onClick}
				>
					{' '}
					{text}{' '}
				</p>
				<div
					className="flex  w-20  items-center hover:text-m-green "
					onClick={() => {
						setNotifications(
							notifications.filter((item) => item.notificationId !== id),
							notifications?.length - 1
						);
						deleteNotification(id, Cookies.get('userUniqueId')).then(
							(response) => {},
							(error) => {}
						);
					}}
				>
					<div className=" hover:rounded-full hover:shadow-md p-0.5 hover:bg-opacity-20">
						<Image src={Trash} width={36} height={36} />
					</div>
				</div>
			</div>
			<span
				className="text-smallFontSize font-Roboto-Semibold"
				style={{ color: '#C7C7C7' }}
			>
				{timestamp}
			</span>
		</div>
	</div>
);

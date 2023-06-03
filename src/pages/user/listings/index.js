import { useEffect, useState } from 'react';
import * as Axios from '@/api/axios';
import Loader from '@/components/Loader/Loader';
import ProfileListingTile from '@/components/User/ProfileListingTile';
import UserListingTab from '@/components/User/UserListingTab';
import UserProfile from '@/components/User/UserProfile';
import Cookies from 'js-cookie';
import Head from 'next/head';
import router from 'next/router';

function Listings() {
	const [currentTab, setCurrentTab] = useState(0);
	const [userListings, setUserListing] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const fetchUserListings = await Axios.fetchUserListings(
				Cookies.get('userUniqueId'),
				Cookies.get('sessionId') || localStorage.getItem('sessionId')
			);
			console.log(fetchUserListings);
			setUserListing(fetchUserListings?.dataObject);
			setLoading(false);
		};
		if (Cookies.get('userUniqueId') !== undefined) {
			fetchData();
		} else {
			router.push('/');
		}
	}, []);

	return (
		<>
			<Head>
				<title>My Listings | Oruphones</title>
				<meta name="description" content="My Listings | Oruphones" />
			</Head>
			<UserProfile>
				<UserListingTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
				<div className="lg:flex lg:flex-col grid grid-cols-2 gap-4 lg:space-y-4 px-4 my-4">
					{currentTab === 0
						? userListings &&
						  userListings
								.filter((item) => {
									if (item.status === 'Active') {
										return item;
									}
								})
								.map((item, index) => (
									<div key={index}>
										<a>
											<ProfileListingTile data={item} />
										</a>
									</div>
								))
						: userListings &&
						  userListings
								.filter((item) => {
									if (item.status === 'Paused' || item.status === 'InActive') {
										return item;
									}
								})
								.map((item, index) => (
									<div key={index}>
										<a>
											<ProfileListingTile data={item} />
										</a>
									</div>
								))}

					{isLoading && (
						<div className="flex gap-4 col-span-2 h-60  items-center justify-center text-xlFontSize font-Roboto-Regular">
							<Loader />
							Please wait, while we are fetching your listings...
						</div>
					)}

					{!isLoading && userListings?.length == 0 && (
						<div className="flex h-60 items-center justify-center text-xlFontSize font-Roboto-Regular">
							Listings Not Found
						</div>
					)}
				</div>
			</UserProfile>
		</>
	);
}

export default Listings;

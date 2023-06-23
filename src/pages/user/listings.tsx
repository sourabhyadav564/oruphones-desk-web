import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';
import ProfileListingTile from '@/components/User/ProfileListingTile';
import UserListingTab from '@/components/User/UserListingTab';
import UserProfile from '@/components/User/UserProfile';
import useUser from '@/hooks/useUser';
import getListings from '@/utils/fetchers/getListings';
import Head from 'next/head';

function Listings() {
	const [currentTab, setCurrentTab] = useState(0);
	const { isLoggedIn, user } = useUser();

	const { data: userListings, isLoading } = useQuery({
		queryKey: ['userListings', user?.userName],
		queryFn: () => getListings(user?.userListings!),
		enabled: !!user?.userName,
	});

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
						? userListings && (
								<>
									{userListings
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
										))}
									{userListings.filter((item) => {
										if (item.status === 'Active') {
											return item;
										}
									}).length === 0 && (
										<div className="flex h-60 items-center justify-center text-xlFontSize font-Roboto-Regular">
											Active Listings Not Found
										</div>
									)}
								</>
						  )
						: userListings && (
								<>
									{userListings
										.filter((item) => {
											if (
												item.status === 'Paused' ||
												item.status === 'InActive'
											) {
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
									{userListings.filter((item) => {
										if (item.status !== 'Active') {
											return item;
										}
									}).length === 0 && (
										<div className="flex h-60 items-center justify-center text-xlFontSize font-Roboto-Regular">
											Inactive listings Not Found
										</div>
									)}
								</>
						  )}

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

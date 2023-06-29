import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Loader from '@/components/Loader/Loader';
import FavListingTile from '@/components/User/FavListingTile';
import UserProfile from '@/components/User/UserProfile';
import useUser from '@/hooks/useUser';
import getListings from '@/utils/fetchers/getListings';
import toggleFav from '@/utils/fetchers/user/toggleFav';
import Head from 'next/head';
import Link from 'next/link';

function Favorites() {
	const { isLoggedIn, user, setUser } = useUser();
	const queryClient = useQueryClient();

	const { data: myFavList, isLoading } = useQuery({
		queryKey: ['favListings', user?.userName],
		queryFn: () => getListings(user?.favListings!),
		enabled: !!user?.userName,
	});
	// mutate is used to update the data in the cache
	const setFavList = useMutation({
		mutationKey: ['favListings', user?.userName],
		mutationFn: async (paramData: string) => {
			await toggleFav({
				isFav: false,
				listingId: paramData,
			});
			setUser({
				...user,
				favListings: user?.favListings?.filter((item) => item !== paramData),
			});
		},
		onMutate: async (paramData: string) => {
			await queryClient.cancelQueries(['favListings', user?.userName!]);
			const previousData = queryClient.getQueryData([
				'favListings',
				user?.favListings!,
			]);
			queryClient.setQueryData(
				['favListings', user?.userName!],
				(old: any) => {
					return old?.filter((item: any) => item.listingId !== paramData);
				}
			);
			return { previousData };
		},
		onError: (error, paramData, ctx) => {
			queryClient.setQueryData(
				['favListings', user?.favListings!],
				ctx?.previousData
			);
		},
	});

	useEffect(() => {
		queryClient.invalidateQueries(['favListings', user?.userName!]);
	}, [queryClient, user?.userName]);

	return (
		<>
			<Head>
				<title>My Favorites | Oruphones</title>
			</Head>
			<UserProfile>
				<div className="px-4 py-3">
					<h1 className="text-lg py-2"> My Favorites </h1>
					<div className="lg:flex lg:flex-col grid grid-cols-2 gap-8 lg:space-y-4 my-4">
						{myFavList &&
							myFavList.length > 0 &&
							myFavList.map((item, index) => (
								<Link
									key={index}
									href={{
										pathname: `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}`,
									}}
								>
									<a>
										<FavListingTile
											data={{ ...item, favourite: true }}
											key={index}
											setProducts={setFavList}
										/>
									</a>
								</Link>
							))}

						{isLoading && (
							<div className="flex h-60 items-center justify-center text-xlFontSize font-Roboto-Regular">
								<Loader />
								Please wait, while we are fetching your favorites...
							</div>
						)}

						{myFavList?.length === 0 && (
							<div className="flex h-60 items-center justify-center">
								Favourites Not Found
							</div>
						)}
					</div>
				</div>
			</UserProfile>
		</>
	);
}

export default Favorites;

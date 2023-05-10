import { useState, useEffect } from 'react';
import Link from 'next/link';
import UserProfile from '../../components/User/UserProfile';
import * as Axios from '@/api/axios';
import FavListingTile from '@/components/User/FavListingTile';
import Cookies from 'js-cookie';
import Loader from '@/components/Loader/Loader';

function Favorites() {
	const [myFavList, setMyFavList] = useState();
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		Axios.fetchMyFavorites(Cookies.get('userUniqueId')).then((response) => {
			setMyFavList(response?.dataObject);
			setLoading(false);
		});
	}, []);

	return (
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
									query: { isOtherVendor: 'N' },
								}}
							>
								<a>
									<FavListingTile
										data={{ ...item, favourite: true }}
										key={index}
										fromMyFav={true}
										setProducts={setMyFavList}
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
	);
}

export default Favorites;

import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import OutlineHeartBlack from '@/assets/heart_black.svg';
import FillHeart from '@/assets/heartfill.svg';
import OutlineHeart from '@/assets/heartoutline.svg';
import useUser from '@/hooks/useUser';
import { TListingReturnFilter } from '@/types/ListingFilter';
import toggleFav from '@/utils/fetchers/user/toggleFav';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const DynamicLoginPopup = dynamic(() => import('./Popup/LoginPopup'), {
	ssr: false,
});

function AddFav({
	data,
}: {
	data: TListingReturnFilter;
}) {
	const { user, isLoggedIn, setUser } = useUser();
	const [showLoginPopup, setShowLoginPopup] = useState(false);

	const favMutator = useMutation({
		mutationKey: ['addFav', data.listingId],
		mutationFn: async (isFav: boolean) => {
			await toggleFav({
				listingId: data.listingId!,
				isFav,
			});
		},
		onMutate: async (isFav: boolean) => {
			setUser({
				...user,
				favListings: isFav
					? [...user?.favListings!, data?.listingId!]
					: user?.favListings?.filter((item) => item !== data.listingId),
			});
		},
		onError: (error, isFav, ctx) => {
			setUser({
				...user,
				favListings: isFav
					? user?.favListings?.filter((item) => item !== data.listingId)
					: [...user?.favListings!, data?.listingId!],
			});
		},
	});

	function handleFavoties() {
		const addFavorite = async () => {
			favMutator.mutate(true);
		};
		const removeFavorite = async () => {
			favMutator.mutate(false);
		};

		if (user?.favListings?.includes(data?.listingId!)) {
			data?.status == 'Active'
				? removeFavorite()
				: toast.warning('This device is sold out');
		} else {
			data?.status == 'Active'
				? addFavorite()
				: toast.warning('This device is sold out');
		}
	}

	if (!isLoggedIn) {
		return (
			<div>
				<Image
					src={OutlineHeartBlack}
					width={20}
					height={20}
					onClick={(e) => {
						e.preventDefault();
						setShowLoginPopup(true);
					}}
					className="hover:scale-110 "
					alt="Outline Heart Black"
				/>
				<DynamicLoginPopup
					open={showLoginPopup}
					setOpen={setShowLoginPopup}
					redirect={undefined}
				/>
			</div>
		);
	}

	return user?.favListings?.includes(data?.listingId!) ? (
		<Image
			src={FillHeart}
			width={24}
			height={24}
			onClick={(e) => {
				e.preventDefault();
				handleFavoties();
			}}
			className="hover:scale-110"
			alt="Fill Heart"
		/>
	) : (
		<Image
			src={OutlineHeart}
			width={24}
			height={24}
			onClick={(e) => {
				e.preventDefault();
				handleFavoties();
			}}
			className="hover:scale-110 "
			alt="Outline Heart"
		/>
	);
}

export default AddFav;

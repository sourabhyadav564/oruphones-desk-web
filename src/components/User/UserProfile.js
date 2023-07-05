import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import { updateProfilePic } from '@/utils/fetchers/user/update';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function UserProfile({ children, className = '' }) {
	const { user, logout, setUser } = useUser();
	const authUserData = { name: user?.userName };

	async function handleChange(e) {
		e.preventDefault();
		let data = new FormData();
		data.append('image', e.target.files[0]);
		const resp = await updateProfilePic(data);
		console.log('image uploaded:', resp);
		setUser({
			...user,
			profilePicPath: resp?.profilePicPath,
		});
	}

	return (
		<main className="min-h-screen">
			<hr />
			<section className="relative h-40 mb-20 bg-m-green">
				<div className="container absolute h-32 bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2">
					<div className="flex w-full h-full">
						<div className="w-28 h-28 p-1 bg-white rounded-full">
							<label
								htmlFor="IMG"
								className="block w-full h-full relative rounded-full"
							>
								<Image
									src={
										user?.profilePicPath ||
										'https://d1tl44nezj10jx.cloudfront.net/assets/profile.svg'
									}
									loading="lazy"
									placeholder="blur"
									priority={false}
									unoptimized={false}
									blurDataURL={
										user?.profilePicPath ||
										'https://d1tl44nezj10jx.cloudfront.net/assets/profile.svg'
									}
									alt="ORU Account"
									layout="fill"
									objectFit="contain"
									className={`hover:cursor-pointer ${
										'https://d1tl44nezj10jx.cloudfront.net/assets/profile.svg' &&
										'rounded-full'
									}`}
								/>
							</label>
							<input
								className="hidden"
								type="file"
								id="IMG"
								accept="image/*"
								onChange={handleChange}
							/>
						</div>
						<p className="text-m-white my-2.5 ml-10" style={{ fontSize: 32 }}>
							<span className="font-Roboto-Light text-xl5FontSize">
								{' '}
								Welcome{' '}
							</span>{' '}
							<span className="font-Roboto-Bold text-xl5FontSize">
								{' '}
								{authUserData?.name}{' '}
							</span>
						</p>
					</div>
				</div>
			</section>
			<section
				className={`container grid grid-cols-4 py-4 gap-4 ${className || ''}`}
			>
				<div className="bg-white shadow rounded text-black-60 p-4 flex flex-col h-96">
					<p className="py-2 px-4 uppercase font-Roboto-Regular text-regularFontSize">
						{' '}
						Account{' '}
					</p>
					<NavListItem text="My Profile" link="/user/profile" />
					<NavListItem text="My Listings" link="/user/listings" />
					<NavListItem text="My Favorites" link="/user/favorites" />
					<div className=" absolute mt-48 md:ml-28 ml-24   bg-red-600 text-right rounded items-center px-1 text-xs2FontSize   text-white">
						NEW
					</div>
					<NavListItem text="ORU Services" link="/user/services" />
					<NavListItem
						text="Logout"
						link="/"
						onClick={() => {
							logout();
						}}
					/>
				</div>
				<div className="col-span-3 bg-white shadow rounded">{children}</div>
			</section>
		</main>
	);
}

export default UserProfile;

const NavListItem = ({ text, link, onClick }) => {
	const router = useRouter();
	return (
		<Link href={link} passHref>
			<a
				className={`px-4 py-2 my-1 font-Roboto-Light  text-mediumFontSize hover:bg-gray-100 rounded text-black-60 ${
					router.pathname == link && 'bg-gray-100'
				}`}
				onClick={onClick}
			>
				{text}
			</a>
		</Link>
	);
};

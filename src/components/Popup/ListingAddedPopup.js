import Image from 'next/image';
import Link from 'next/link';
import Modal from '.';

function ListingAddedPopup({ open, setOpen, data }) {
	return (
		<Modal open={open} setOpen={setOpen} title={'Success'}>
			<div className="flex flex-col justify-center items-center max-w-xl px-6 text-base text-m-grey-1">
				<Image
					src={'https://d1tl44nezj10jx.cloudfront.net/assets/patch-check.svg'}
					alt="image"
					height={50}
					width={50}
				/>
				<p className=" font-bold p-2">Congratulations!</p>
				<p className="text-sm px-6 py-2 text-center">
					Your device has been submitted for listing. We recommend that you
					verify the device in order to sell it quickly.
				</p>
				<div className="mb-4 mt-8 flex justify-center w-full">
					<Link href="/user/listings" passHref>
						<a>
							<button className="border border-m-green w-52 px-4 py-2 rounded text-m-green">
								{' '}
								OK{' '}
							</button>
						</a>
					</Link>
				</div>
			</div>
		</Modal>
	);
}

export default ListingAddedPopup;

import { useState } from 'react';
import * as Axios from '@/api/axios';
import Select from '@/components/Form/Select';
import Cookies from 'js-cookie';
import router from 'next/router';
import Modal from '.';

function DeleteListingPopup({ open, setOpen, data }) {
	const [deleteReason, setDeleteReason] = useState();
	const reasonsForDelete = [
		{ value: 'Sold my mobile', label: 'Sold my mobile' },
		{
			value: 'I did not receive any offers',
			label: 'I did not receive any offers',
		},
		{ value: 'Other reasons', label: 'Other reasons' },
	];

	function handleDelete() {
		let payload = {
			listingId: data?.listingId,
			userUniqueId: Cookies.get('userUniqueId') || 'Guest',
		};
		const fetchData = async () => {
			const deteleListedDevice = await Axios.deteleListedDevice(payload);
			if (deteleListedDevice.status === 'SUCCESS') {
				setOpen(false);
				router.reload();
			}
		};
		fetchData();
	}

	return (
		<Modal open={open} setOpen={setOpen} title={'Delete'}>
			<div className="flex flex-col space-y-3 text-base text-m-grey-1">
				<div className="my-6 px-20 flex flex-col space-y-10">
					<p className="mb-2">Are you sure you want to Delete the listing?</p>
					<span>
						<Select
							labelName="Reason for deletion"
							onChange={(e) => {
								setDeleteReason(e.value);
							}}
							options={reasonsForDelete}
						></Select>
					</span>
				</div>
				<div className="flex space-x-8 justify-end text-white items-center">
					<span
						className="font-semibold text-m-green rounded uppercase cursor-pointer"
						onClick={() => setOpen(false)}
					>
						Cancel
					</span>
					<span
						className="font-semibold px-4 py-2 bg-m-green rounded uppercase cursor-pointer"
						onClick={handleDelete}
					>
						{' '}
						OK{' '}
					</span>
				</div>
			</div>
		</Modal>
	);
}

export default DeleteListingPopup;

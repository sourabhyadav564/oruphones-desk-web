import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import Close from '@/assets/cross.svg';
import Image from 'next/image';

export default function Model2({ open, setOpen, children, title }) {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root appear={true} show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0"
				initialFocus={cancelButtonRef}
				onClose={setOpen}
			>
				<div className="items-end justify-center md:mt-0 mt-28 text-center sm:block">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-50"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-300"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-50"
					>
						<div className="relative inline-block bg-white rounded-lg text-left shadow-xl align-middle custom-scroll mx-8">
							<div className="absolute right-0 pt-5 px-6 sm:flex justify-between items-center hover:cursor-pointer">
								<Image
									src={Close}
									width={28}
									height={28}
									onClick={() => setOpen(false)}
								/>
							</div>
							<div
								className="bg-white overflow-y-auto rounded-lg "
								style={{ maxHeight: '80vh' }}
							>
								{children}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

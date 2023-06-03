import termsConditionsString from '@/assets/html/terms_conditions';
import Modal from '.';

function TermsconditionPopup({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Function;
}) {
	return (
		<Modal open={open} setOpen={setOpen} title={'Terms & Conditions'}>
			<div
				style={{ maxHeight: '80vh' }}
				className="overflow-y-auto grid grid-cols-1 max-w-xl px-6 text-base text-m-grey-1"
				dangerouslySetInnerHTML={{ __html: termsConditionsString }}
			/>
		</Modal>
	);
}

export default TermsconditionPopup;

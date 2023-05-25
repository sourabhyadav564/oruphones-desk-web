import Model2 from './Model2';
import conditionString from '@/public/assets/html/condition';

function ConditionInfoPopup({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Function;
}) {
	return (
		<Model2 open={open} setOpen={setOpen} title={'Condition Info'}>
			<div className="bg-white px-3 py-6 max-w-2xl z-50">
				<div className="sm:flex sm:items-start">
					<div className="mt-3 sm:mt-0 sm:ml-4">
						<div className="mt-2">
							<p
								className="text-sm text-gray-500"
								dangerouslySetInnerHTML={{ __html: conditionString }}
							/>
						</div>
					</div>
				</div>
			</div>
		</Model2>
	);
}

export default ConditionInfoPopup;

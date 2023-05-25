import Modal2 from './Model2';
import brandWarranty from '@/public/assets/html/brandwarranty';

function BrandWarrantyInfo({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Function;
}) {
	return (
		<Modal2 open={open} setOpen={setOpen} title={`Brand Warranty`}>
			<div className="bg-white p-5 sm:p-6 sm:pb-4  max-w-lg">
				<div className="sm:flex sm:items-start">
					<div className="mt-3 sm:mt-0 sm:ml-4">
						<div className="mt-2">
							<p
								className="text-sm text-gray-500"
								dangerouslySetInnerHTML={{ __html: brandWarranty }}
							/>
						</div>
					</div>
				</div>
			</div>
		</Modal2>
	);
}

export default BrandWarrantyInfo;

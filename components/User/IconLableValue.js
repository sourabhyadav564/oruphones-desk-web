import Image from 'next/image';

function LabelAndValue({ label, value }) {
	if (label) {
		return (
			<div className="flex items-center flex-wrap">
				<div className="flex-1 flex items-center flex-nowrap">
					{label.toUpperCase().includes('CONDITION') ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/quality.svg'
							}
							width={13}
							height={13}
							layout="fixed"
							alt={label}
						/>
					) : label.toUpperCase().includes('COLOR') ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/color.svg'
							}
							width={13}
							height={13}
							layout="fixed"
							alt={label}
						/>
					) : label.toUpperCase().includes('STORAGE') ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/micro-sd.svg'
							}
							width={13}
							height={13}
							layout="fixed"
							alt={label}
						/>
					) : label.toUpperCase().includes('ACCESSORIES') ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/charger2.svg'
							}
							width={13}
							height={13}
							layout="fixed"
							alt={label}
						/>
					) : label.toUpperCase().includes('WARRANTY') ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/warranty.svg'
							}
							width={13}
							height={13}
							layout="fixed"
							alt={label}
						/>
					) : label.toUpperCase().includes('VERIFIED') ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/web/assets/calendar-1.svg'
							}
							width={13}
							height={13}
							layout="fixed"
							alt={label}
						/>
					) : label.toUpperCase().includes('LISTED') ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/calendar.svg'
							}
							width={13}
							height={13}
							layout="fixed"
							alt={label}
						/>
					) : label.toUpperCase().includes('REPORT') ? (
						<Image
							src={
								'https://d1tl44nezj10jx.cloudfront.net/assets/icons/location.svg'
							}
							width={13}
							height={13}
							layout="fixed"
							alt={label}
						/>
					) : (
						''
					)}
					<span
						className="text-smallFontSize font-Roboto-Light whitespace-nowrap ml-2"
						style={{ color: '#7E7E7E' }}
					>
						{label}
					</span>
				</div>
				<div className="flex-1 text-black-60">
					<p className="text-mediumFontSize font-Roboto-Regular whitespace-nowrap">
						{value}
					</p>
				</div>
			</div>
		);
	}
	return null;
}

export default LabelAndValue;

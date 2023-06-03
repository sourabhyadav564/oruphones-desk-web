import { toast } from 'react-toastify';
import { prepareShareLink } from '@/api/axios';

export default function ShareIcon({ data, ...rest }) {
	function shareListingInfo(data) {
		prepareShareLink(data.listingId, 'Guest').then((response) => {
			data?.status != 'Active'
				? toast.warning('This device is sold out')
				: sharePopupInfo(
						response?.dataObject.url,
						response?.dataObject.content
				  );
		});
	}

	function sharePopupInfo(url, content) {
		if (navigator.share) {
			navigator
				.share({
					title: 'Share link',
					url: url,
					text: content[1]?.shareContent,
				})
				.then(() => console.log('Successful share'))
				.catch((error) => console.log('Error sharing', error));
		}
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 19.497 21"
			{...rest}
			onClick={(e) => {
				e.preventDefault();
				shareListingInfo(data);
			}}
			className="hover:cursor-pointer"
		>
			<path
				id="share"
				d="M17.972,15.723a3.746,3.746,0,0,0-2.914,1.416L9.582,13.715a3.342,3.342,0,0,0,0-1.978l5.476-3.423a3.746,3.746,0,1,0-.832-2.33,3.589,3.589,0,0,0,.15.989L8.9,10.4a3.746,3.746,0,1,0,0,4.659l5.476,3.423a3.589,3.589,0,0,0-.15.99,3.746,3.746,0,1,0,3.746-3.746Zm0-11.986a2.247,2.247,0,1,1-2.247,2.247,2.247,2.247,0,0,1,2.247-2.247ZM5.986,14.973a2.247,2.247,0,1,1,2.247-2.247,2.247,2.247,0,0,1-2.247,2.247Zm11.986,6.742a2.247,2.247,0,1,1,2.247-2.247,2.247,2.247,0,0,1-2.247,2.247Z"
				transform="translate(-2.221 -2.214)"
				fill="#606060"
			/>
		</svg>
	);
}

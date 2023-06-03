import { createContext, useEffect, useState } from 'react';
import * as Axios from '@/api/axios';
import Cookies from 'js-cookie';

const AppContext = createContext();

export const ApplicationContext = ({ children }) => {
	const [cities, setCities] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [userLogged, setUserLogged] = useState();
	const [getSearchLocation, setSearchLocation] = useState('India');

	useEffect(() => {
		const fetchUserProfileData = async () => {
			if (Cookies.get('mobileNumber') !== undefined) {
				const userProfile = await Axios.getUserProfile(
					'91',
					Cookies.get('mobileNumber')
				);

				setUserInfo(userProfile?.dataObject);
			}
		};
		fetchUserProfileData();
	}, [userLogged, refresh]);

	useEffect(() => {
		localStorage.getItem('usedLocation');
	}, [userInfo]);

	return (
		<AppContext.Provider
			value={{
				cities,
				setCities,
				userInfo,
				setUserInfo,
				getSearchLocation,
				setUserLogged,
				setSearchLocation,
				setRefresh,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;

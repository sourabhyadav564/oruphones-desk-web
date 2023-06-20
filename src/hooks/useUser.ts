import userAtom from '@/store/user';
import logoutFunc from '@/utils/fetchers/user/logout';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';

function useUser() {
	const [user, setUser] = useAtom(userAtom);
	const logout = async () => {
		await logoutFunc();
		setUser(RESET);
	};
	return {
		user,
		isLoggedIn: !!user,
		logout,
	};
}

export default useUser;

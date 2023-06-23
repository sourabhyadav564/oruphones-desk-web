import userAtom from '@/store/user';
import logoutFunc from '@/utils/fetchers/user/logout';
import { atom, useAtom, useAtomValue } from 'jotai';

const isLoggedInAtom = atom((get) => !!get(userAtom));
function useUser() {
	const [user, setUser] = useAtom(userAtom);
	const isLoggedIn = useAtomValue(isLoggedInAtom);
	const logout = async () => {
		await logoutFunc();
		setUser(undefined);
	};
	return {
		user,
		setUser,
		isLoggedIn: isLoggedIn,
		logout,
	};
}

export default useUser;

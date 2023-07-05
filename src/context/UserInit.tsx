import userAtom from "@/store/user";
import isLoggedIn from "@/utils/fetchers/user/isLoggedIn";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

const UserInit = () => {
  const userSetter = useSetAtom(userAtom);
	useEffect(() => {
		// Check if local user is valid
		const loggedInCheck = async () => {
			const result = await isLoggedIn();
			if (result.isLoggedIn) {
				userSetter(result.user!);
			}
		};
		loggedInCheck();
	}, [userSetter]);
  return null;
}

export default UserInit
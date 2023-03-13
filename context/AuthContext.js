import { createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userUniqueId, setUserUniqueId] = useState(null);
  const logout = async () => {
    localStorage.removeItem("userUniqueId");
    localStorage.removeItem("mobileNumber");
    Cookies.remove("userUniqueId");
    Cookies.remove("isUserLogged");
    Cookies.remove("mobileNumber");
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        userUniqueId,
        setUserUniqueId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

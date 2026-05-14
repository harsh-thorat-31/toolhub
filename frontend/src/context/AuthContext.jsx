import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));
    }

    setAuthLoading(false);

  }, []);

  const login = (userData) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      userData.access
    );

    setUser(userData);
  };

  const logout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authLoading
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export default AuthProvider;
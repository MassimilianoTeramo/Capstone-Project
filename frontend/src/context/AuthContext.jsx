import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};  

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=> {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(()=> {
    return localStorage.getItem("token");
  });

 const login = async (userData, userToken) => {
    try {
        await Promise.all([
            localStorage.setItem("user", JSON.stringify(userData)),
            localStorage.setItem("token", userToken),
            setUser(userData),
            setToken(userToken),
        ]);
    } catch (error) {
        console.error("Error during login:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Something wrong during the log out', error);
      throw error;
    }
  };




useEffect(() => {
    const initAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        
        if (savedUser && savedToken) {
         await setUser(JSON.parse(savedUser));
         await  setToken(savedToken);
        }
      } catch (error) {
        console.error('Error during the initialization', error);
       await logout();
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


// unsuscribe
//   useEffect(() => {
//     const unsubscribe = () => {
//       setCurrentUser(null);
//       setLoading(false);
//     };

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     setCurrentUser,
//   };
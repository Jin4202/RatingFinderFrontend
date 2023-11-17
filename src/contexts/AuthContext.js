import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const init = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  const [user, setUser] = useState(init);

  useEffect(() => {
    console.log("this");
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

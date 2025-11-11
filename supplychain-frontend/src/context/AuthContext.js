import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  };

  const register = async (details) => {
    const data = await registerUser(details);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

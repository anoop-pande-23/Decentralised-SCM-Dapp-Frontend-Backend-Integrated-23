// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface AuthContextType {
//   token: string | null;
//   role: string | null;
//   isAuthenticated: boolean;
//   login: (token: string, role: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(null);
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     // Load auth data from localStorage on mount
//     const storedToken = localStorage.getItem('token');
//     const storedRole = localStorage.getItem('role');
//     if (storedToken && storedRole) {
//       setToken(storedToken);
//       setRole(storedRole);
//     }
//   }, []);

//   const login = (newToken: string, newRole: string) => {
//     localStorage.setItem('token', newToken);
//     localStorage.setItem('role', newRole);
//     setToken(newToken);
//     setRole(newRole);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setToken(null);
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         role,
//         isAuthenticated: !!token,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🔁 Auto-load token & role from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  // 🧠 Login saves token & role in both state and localStorage
  const login = (newToken: string, newRole: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
  };

  // 🚪 Logout clears token & redirects to login
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/login"); // redirect on logout
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // optional: for role-based protection
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  // ❌ Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role-based check (optional)
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Authorized user → render content
  return children;
};

export default ProtectedRoute;

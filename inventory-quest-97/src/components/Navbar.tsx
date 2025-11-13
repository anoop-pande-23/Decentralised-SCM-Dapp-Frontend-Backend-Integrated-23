// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '@/context/AuthContext';
// // import { Button } from '@/components/ui/button';
// // import { Package, LogOut, LogIn, UserPlus } from 'lucide-react';

// // const Navbar = () => {
// //   const { isAuthenticated, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   return (
// //     <nav className="glass-card sticky top-0 z-50 border-b">
// //       <div className="container mx-auto px-4 py-4">
// //         <div className="flex items-center justify-between">
// //           <Link to="/" className="flex items-center gap-2 text-xl font-bold transition-smooth hover:text-primary">
// //             <Package className="h-6 w-6" />
// //             <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
// //               ProductHub
// //             </span>
// //           </Link>

// //           <div className="flex items-center gap-3">
// //             {isAuthenticated ? (
// //               <>
// //                 <Button
// //                   variant="ghost"
// //                   onClick={() => navigate('/dashboard')}
// //                   className="gap-2"
// //                 >
// //                   Dashboard
// //                 </Button>
// //                 <Button
// //                   variant="destructive"
// //                   onClick={handleLogout}
// //                   className="gap-2"
// //                 >
// //                   <LogOut className="h-4 w-4" />
// //                   Logout
// //                 </Button>
// //               </>
// //             ) : (
// //               <>
// //                 <Button
// //                   variant="ghost"
// //                   onClick={() => navigate('/login')}
// //                   className="gap-2"
// //                 >
// //                   <LogIn className="h-4 w-4" />
// //                   Login
// //                 </Button>
// //                 <Button
// //                   onClick={() => navigate('/register')}
// //                   className="gap-2"
// //                 >
// //                   <UserPlus className="h-4 w-4" />
// //                   Register
// //                 </Button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
// import { Button } from "@/components/ui/button";
// import {
//   Package,
//   LogOut,
//   LogIn,
//   UserPlus,
//   Activity,
//   PlusCircle,
//   Clock,
// } from "lucide-react";

// const Navbar = () => {
//   const { isAuthenticated, logout, role } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="glass-card sticky top-0 z-50 border-b">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* ===== Logo Section ===== */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-xl font-bold transition-smooth hover:text-primary"
//           >
//             <Package className="h-6 w-6" />
//             <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//               ProductHub
//             </span>
//           </Link>

//           {/* ===== Navigation & Auth Section ===== */}
//           <div className="flex items-center gap-3">
//             {isAuthenticated ? (
//               <>
//                 {/* Dashboard */}
//                 <Button
//                   variant="ghost"
//                   onClick={() => navigate("/dashboard")}
//                   className="gap-2"
//                 >
//                   Dashboard
//                 </Button>

//                 {/* ✅ Vendor/Admin can Add Products */}
//                 {(role === "vendor" || role === "admin") && (
//                   <Button
//                     variant="ghost"
//                     onClick={() => navigate("/add-product")}
//                     className="gap-2"
//                   >
//                     <PlusCircle className="h-4 w-4" />
//                     Add Product
//                   </Button>
//                 )}

//                 {/* ✅ All users can view Events */}
//                 <Button
//                   variant="ghost"
//                   onClick={() => navigate("/events")}
//                   className="gap-2"
//                 >
//                   <Activity className="h-4 w-4" />
//                   Events
//                 </Button>

//                 {/* ✅ All users can view History */}
//                 <Button
//                   variant="ghost"
//                   onClick={() => navigate("/history")}
//                   className="gap-2"
//                 >
//                   <Clock className="h-4 w-4" />
//                   History
//                 </Button>

//                 {/* ✅ Display User Role */}
//                 <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
//                   {role}
//                 </span>

//                 {/* Logout */}
//                 <Button
//                   variant="destructive"
//                   onClick={handleLogout}
//                   className="gap-2"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   variant="ghost"
//                   onClick={() => navigate("/login")}
//                   className="gap-2"
//                 >
//                   <LogIn className="h-4 w-4" />
//                   Login
//                 </Button>
//                 <Button onClick={() => navigate("/register")} className="gap-2">
//                   <UserPlus className="h-4 w-4" />
//                   Register
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Package,
  LogOut,
  LogIn,
  UserPlus,
  Activity,
  PlusCircle,
  Clock,
  ShoppingCart,
  FileText,
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="glass-card sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ===== Logo Section ===== */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold transition-smooth hover:text-primary"
          >
            <Package className="h-6 w-6" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ProductHub
            </span>
          </Link>

          {/* ===== Navigation & Auth Section ===== */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Common for all logged-in users */}
                <Button
                  variant="ghost"
                  onClick={() => navigate("/dashboard")}
                  className="gap-2"
                >
                  Dashboard
                </Button>

                {/* ✅ Vendor/Admin can Add Products */}
                {(role === "vendor" || role === "admin") && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/add-product")}
                    className="gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Product
                  </Button>
                )}

                {/* ✅ Vendor can view and approve buy requests */}
                {role === "vendor" && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/vendor-dashboard")}
                    className="gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Requests
                  </Button>
                )}

                {/* ✅ Customer can view My Requests */}
                {role === "customer" && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/my-requests")}
                    className="gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    My Requests
                  </Button>
                )}

                {/* ✅ Events and History - visible to all */}
                <Button
                  variant="ghost"
                  onClick={() => navigate("/events")}
                  className="gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Events
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => navigate("/history")}
                  className="gap-2"
                >
                  <Clock className="h-4 w-4" />
                  History
                </Button>

                {/* ✅ Display Role */}
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
                  {role}
                </span>

                {/* ✅ Logout */}
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* ===== If not authenticated ===== */}
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

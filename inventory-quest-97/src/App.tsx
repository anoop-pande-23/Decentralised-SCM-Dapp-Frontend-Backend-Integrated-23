// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/context/AuthContext";
// import ProtectedRoute from "@/components/ProtectedRoute";

// // Pages
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import AddProduct from "./pages/AddProduct";
// import UpdateProduct from "./pages/UpdateProduct";
// import ProductDetails from "./pages/ProductDetails";
// import Events from "./pages/Events";
// import History from "./pages/History";
// import VendorRequests from "./pages/VendorRequests"; // ✅ New page
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             {/* ===== Public Routes ===== */}
//             <Route path="/" element={<Home />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />

//             {/* ===== Common Protected Routes ===== */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/product/:id"
//               element={
//                 <ProtectedRoute>
//                   <ProductDetails />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/events"
//               element={
//                 <ProtectedRoute>
//                   <Events />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/history"
//               element={
//                 <ProtectedRoute>
//                   <History />
//                 </ProtectedRoute>
//               }
//             />

//             {/* ===== Vendor/Admin Routes ===== */}
//             <Route
//               path="/add-product"
//               element={
//                 <ProtectedRoute allowedRoles={["vendor", "admin"]}>
//                   <AddProduct />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/update-product/:id"
//               element={
//                 <ProtectedRoute allowedRoles={["vendor", "admin"]}>
//                   <UpdateProduct />
//                 </ProtectedRoute>
//               }
//             />

//             {/* ===== Vendor Requests Page ===== */}
//             <Route
//               path="/vendor/requests"
//               element={
//                 <ProtectedRoute allowedRoles={["vendor"]}>
//                   <VendorRequests />
//                 </ProtectedRoute>
//               }
//             />

//             // App.tsx (add this inside <Routes> alongside your other routes)
//             <Route
//             path="/vendor-dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["vendor"]}>
//               <VendorRequests />
//               </ProtectedRoute>
//             }
//             />


//             {/* ===== Fallback ===== */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// ===== Pages =====
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";
import Events from "./pages/Events";
import History from "./pages/History";
import VendorRequests from "./pages/VendorRequests"; // ✅ Vendor Request Page
import NotFound from "./pages/NotFound";
import MyRequests from "@/pages/MyRequests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* ===== Public Routes ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* ===== Common Protected Routes ===== */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />

            {/* ===== Vendor/Admin Routes ===== */}
            <Route
              path="/add-product"
              element={
                <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/update-product/:id"
              element={
                <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />

            {/* ===== Vendor Requests Page ===== */}
            <Route
              path="/vendor/requests"
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorRequests />
                </ProtectedRoute>
              }
            />

            {/* ===== Optional alias for convenience ===== */}
            <Route
              path="/vendor-dashboard"
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorRequests />
                </ProtectedRoute>
              }
            />
            <Route path="/my-requests" element={<MyRequests />} />

            {/* ===== Catch-All (404) ===== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

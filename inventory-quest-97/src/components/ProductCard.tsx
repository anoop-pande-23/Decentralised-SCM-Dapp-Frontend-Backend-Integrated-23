// // import { useNavigate } from 'react-router-dom';
// // import { Button } from '@/components/ui/button';
// // import { Card } from '@/components/ui/card';
// // import { Edit, Trash2, Eye, Package } from 'lucide-react';

// // interface ProductCardProps {
// //   product: {
// //     _id: string;
// //     name: string;
// //     price: number;
// //     quantity: number;
// //   };
// //   isVendor: boolean;
// //   onDelete: (id: string) => void;
// // }

// // const ProductCard: React.FC<ProductCardProps> = ({ product, isVendor, onDelete }) => {
// //   const navigate = useNavigate();

// //   return (
// //     <Card className="glass-card group overflow-hidden transition-smooth hover:shadow-glow hover:-translate-y-1">
// //       <div className="p-6">
// //         <div className="mb-4 flex items-center gap-3">
// //           <div className="rounded-lg bg-primary/10 p-3">
// //             <Package className="h-6 w-6 text-primary" />
// //           </div>
// //           <div className="flex-1">
// //             <h3 className="text-lg font-semibold text-card-foreground">{product.name}</h3>
// //             <p className="text-sm text-muted-foreground">ID: {product._id.slice(-6)}</p>
// //           </div>
// //         </div>

// //         <div className="mb-4 space-y-2">
// //           <div className="flex justify-between items-center">
// //             <span className="text-sm text-muted-foreground">Price</span>
// //             <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <span className="text-sm text-muted-foreground">Quantity</span>
// //             <span className={`text-lg font-semibold ${product.quantity > 10 ? 'text-green-500' : 'text-orange-500'}`}>
// //               {product.quantity}
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex gap-2">
// //           <Button
// //             variant="outline"
// //             size="sm"
// //             onClick={() => navigate(`/product/${product._id}`)}
// //             className="flex-1 gap-2"
// //           >
// //             <Eye className="h-4 w-4" />
// //             View
// //           </Button>
// //           {isVendor && (
// //             <>
// //               <Button
// //                 variant="default"
// //                 size="sm"
// //                 onClick={() => navigate(`/update-product/${product._id}`)}
// //                 className="flex-1 gap-2"
// //               >
// //                 <Edit className="h-4 w-4" />
// //                 Edit
// //               </Button>
// //               <Button
// //                 variant="destructive"
// //                 size="sm"
// //                 onClick={() => onDelete(product._id)}
// //                 className="gap-2"
// //               >
// //                 <Trash2 className="h-4 w-4" />
// //               </Button>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default ProductCard;


// // import { useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Edit, Trash2, Eye, Package } from "lucide-react";

// // interface ProductCardProps {
// //   product: {
// //     id: number; // ✅ changed from _id → id
// //     name: string;
// //     price: number;
// //     quantity: number;
// //   };
// //   isVendor: boolean;
// //   onDelete: (id: number) => void;
// // }

// // const ProductCard: React.FC<ProductCardProps> = ({ product, isVendor, onDelete }) => {
// //   const navigate = useNavigate();

// //   return (
// //     <Card className="glass-card group overflow-hidden transition-smooth hover:shadow-glow hover:-translate-y-1">
// //       <div className="p-6">
// //         <div className="mb-4 flex items-center gap-3">
// //           <div className="rounded-lg bg-primary/10 p-3">
// //             <Package className="h-6 w-6 text-primary" />
// //           </div>
// //           <div className="flex-1">
// //             <h3 className="text-lg font-semibold text-card-foreground">{product.name}</h3>
// //             {/* ✅ use id, not _id */}
// //             <p className="text-sm text-muted-foreground">ID: {String(product.id).slice(-6)}</p>
// //           </div>
// //         </div>

// //         <div className="mb-4 space-y-2">
// //           <div className="flex justify-between items-center">
// //             <span className="text-sm text-muted-foreground">Price</span>
// //             <span className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</span>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <span className="text-sm text-muted-foreground">Quantity</span>
// //             <span
// //               className={`text-lg font-semibold ${
// //                 product.quantity > 10 ? "text-green-500" : "text-orange-500"
// //               }`}
// //             >
// //               {product.quantity}
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex gap-2">
// //           <Button
// //             variant="outline"
// //             size="sm"
// //             onClick={() => navigate(`/product/${product.id}`)} // ✅ changed to id
// //             className="flex-1 gap-2"
// //           >
// //             <Eye className="h-4 w-4" />
// //             View
// //           </Button>

// //           {isVendor && (
// //             <>
// //               <Button
// //                 variant="default"
// //                 size="sm"
// //                 onClick={() => navigate(`/update-product/${product.id}`)} // ✅ changed to id
// //                 className="flex-1 gap-2"
// //               >
// //                 <Edit className="h-4 w-4" />
// //                 Edit
// //               </Button>

// //               <Button
// //                 variant="destructive"
// //                 size="sm"
// //                 onClick={() => onDelete(product.id)} // ✅ changed to id
// //                 className="gap-2"
// //               >
// //                 <Trash2 className="h-4 w-4" />
// //               </Button>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default ProductCard;


// // import { useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Edit, Trash2, Eye, Package, ShoppingCart } from "lucide-react";
// // import { useAuth } from "@/context/AuthContext";
// // import { toast } from "sonner";
// // import axios from "axios";

// // interface ProductCardProps {
// //   product: {
// //     id: number;
// //     name: string;
// //     price: number;
// //     quantity: number;
// //     vendorId?: string; // optional, if product data includes it
// //   };
// //   isVendor: boolean;
// //   onDelete: (id: number) => void;
// // }

// // const ProductCard: React.FC<ProductCardProps> = ({ product, isVendor, onDelete }) => {
// //   const navigate = useNavigate();
// //   const { role, token } = useAuth();

// //   const handleApplyToBuy = async () => {
// //     try {
// //       if (!token) return toast.error("Please login first.");
// //       await axios.post(
// //         "http://localhost:5000/buy-requests/apply",
// //         {
// //           productId: product.id,
// //           vendorId: product.vendorId, // replace when backend sends vendor info
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       toast.success("Buy request sent successfully!");
// //     } catch (error: any) {
// //       console.error(error);
// //       toast.error(error.response?.data?.message || "Failed to send request");
// //     }
// //   };

// //   return (
// //     <Card className="glass-card group overflow-hidden transition-smooth hover:shadow-glow hover:-translate-y-1">
// //       <div className="p-6">
// //         {/* Product Header */}
// //         <div className="mb-4 flex items-center gap-3">
// //           <div className="rounded-lg bg-primary/10 p-3">
// //             <Package className="h-6 w-6 text-primary" />
// //           </div>
// //           <div className="flex-1">
// //             <h3 className="text-lg font-semibold text-card-foreground">
// //               {product.name}
// //             </h3>
// //             <p className="text-sm text-muted-foreground">
// //               ID: {String(product.id).slice(-6)}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Product Info */}
// //         <div className="mb-4 space-y-2">
// //           <div className="flex justify-between items-center">
// //             <span className="text-sm text-muted-foreground">Price</span>
// //             <span className="text-lg font-bold text-primary">
// //               ₹{product.price.toFixed(2)}
// //             </span>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <span className="text-sm text-muted-foreground">Quantity</span>
// //             <span
// //               className={`text-lg font-semibold ${
// //                 product.quantity > 10 ? "text-green-500" : "text-orange-500"
// //               }`}
// //             >
// //               {product.quantity}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Actions */}
// //         <div className="flex gap-2">
// //           <Button
// //             variant="outline"
// //             size="sm"
// //             onClick={() => navigate(`/product/${product.id}`)}
// //             className="flex-1 gap-2"
// //           >
// //             <Eye className="h-4 w-4" />
// //             View
// //           </Button>

// //           {isVendor ? (
// //             <>
// //               <Button
// //                 variant="default"
// //                 size="sm"
// //                 onClick={() => navigate(`/update-product/${product.id}`)}
// //                 className="flex-1 gap-2"
// //               >
// //                 <Edit className="h-4 w-4" />
// //                 Edit
// //               </Button>

// //               <Button
// //                 variant="destructive"
// //                 size="sm"
// //                 onClick={() => onDelete(product.id)}
// //                 className="gap-2"
// //               >
// //                 <Trash2 className="h-4 w-4" />
// //               </Button>
// //             </>
// //           ) : (
// //             role === "customer" && (
// //               <Button
// //                 variant="default"
// //                 size="sm"
// //                 onClick={handleApplyToBuy}
// //                 className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
// //               >
// //                 <ShoppingCart className="h-4 w-4" />
// //                 Apply to Buy
// //               </Button>
// //             )
// //           )}
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default ProductCard;


// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Edit, Trash2, Eye, Package, ShoppingCart } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { toast } from "sonner";
// import axios from "axios";

// interface ProductCardProps {
//   product: {
//     id: number;
//     name: string;
//     price: number;
//     quantity: number;
//     vendorId: string; // ✅ now required (not optional)
//   };
//   isVendor: boolean;
//   onDelete?: (id: number) => void;
// }

// const handleApplyToBuy = async () => {
//   try {
//     if (!token) return toast.error("Please login first.");
//     if (!product.vendorId) return toast.error("This product has no vendor assigned.");

//     console.log("📦 Sending buy request:", {
//       productId: product.id,
//       vendorId: product.vendorId,
//     });

//     const res = await axios.post(
//       "http://localhost:5000/buy-requests/apply",
//       {
//         productId: product.id,
//         vendorId: product.vendorId,
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     toast.success(res.data.message || "Buy request sent successfully!");
//   } catch (error: any) {
//     console.error("❌ Buy request error:", error);
//     toast.error(error.response?.data?.message || "Failed to send request");
//   }
// };


//   return (
//     <Card className="glass-card group overflow-hidden transition-smooth hover:shadow-glow hover:-translate-y-1">
//       <div className="p-6">
//         {/* Product Header */}
//         <div className="mb-4 flex items-center gap-3">
//           <div className="rounded-lg bg-primary/10 p-3">
//             <Package className="h-6 w-6 text-primary" />
//           </div>
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold text-card-foreground">{product.name}</h3>
//             <p className="text-sm text-muted-foreground">ID: {String(product.id).slice(-6)}</p>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="mb-4 space-y-2">
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-muted-foreground">Price</span>
//             <span className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-muted-foreground">Quantity</span>
//             <span
//               className={`text-lg font-semibold ${
//                 product.quantity > 10 ? "text-green-500" : "text-orange-500"
//               }`}
//             >
//               {product.quantity}
//             </span>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => navigate(`/product/${product.id}`)}
//             className="flex-1 gap-2"
//           >
//             <Eye className="h-4 w-4" />
//             View
//           </Button>

//           {isVendor ? (
//             <>
//               <Button
//                 variant="default"
//                 size="sm"
//                 onClick={() => navigate(`/update-product/${product.id}`)}
//                 className="flex-1 gap-2"
//               >
//                 <Edit className="h-4 w-4" />
//                 Edit
//               </Button>

//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => onDelete?.(product.id)}
//                 className="gap-2"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </>
//           ) : (
//             role === "customer" && (
//               <Button
//                 variant="default"
//                 size="sm"
//                 onClick={handleApplyToBuy}
//                 className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
//               >
//                 <ShoppingCart className="h-4 w-4" />
//                 Apply to Buy
//               </Button>
//             )
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default ProductCard;


// ✅ src/components/ProductCard.tsx

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Eye, Package, ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    vendorId: string; // ✅ must exist (backend provides this)
  };
  isVendor: boolean;
  onDelete?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isVendor, onDelete }) => {
  const navigate = useNavigate();
  const { role, token } = useAuth();

  // ✅ Inline handler (so it can access product/token)
  const handleApplyToBuy = async () => {
    try {
      if (!token) return toast.error("Please login first.");
      if (!product.vendorId) return toast.error("This product has no vendor assigned.");

      console.log("📦 Sending buy request:", {
        productId: product.id,
        vendorId: product.vendorId,
      });

      const res = await axios.post(
        "http://localhost:5000/buy-requests/apply",
        {
          productId: product.id,
          vendorId: product.vendorId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Buy request sent successfully!");
    } catch (error: any) {
      console.error("❌ Buy request error:", error);
      toast.error(error.response?.data?.message || "Failed to send request");
    }
  };

  return (
    <Card className="glass-card group overflow-hidden transition-smooth hover:shadow-glow hover:-translate-y-1">
      <div className="p-6">
        {/* Product Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              ID: {String(product.id).slice(-6)}
            </p>
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="text-lg font-bold text-primary">
              ₹{product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Quantity</span>
            <span
              className={`text-lg font-semibold ${
                product.quantity > 10 ? "text-green-500" : "text-orange-500"
              }`}
            >
              {product.quantity}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex-1 gap-2"
          >
            <Eye className="h-4 w-4" />
            View
          </Button>

          {isVendor ? (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate(`/update-product/${product.id}`)}
                className="flex-1 gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete?.(product.id)}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            role === "customer" && (
              <Button
                variant="default"
                size="sm"
                onClick={handleApplyToBuy}
                className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="h-4 w-4" />
                Apply to Buy
              </Button>
            )
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;

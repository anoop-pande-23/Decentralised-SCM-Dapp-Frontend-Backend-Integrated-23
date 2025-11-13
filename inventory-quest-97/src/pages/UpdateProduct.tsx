// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getProductById, updateProduct } from '@/api/api';
// import { Button } from '@/components/ui/button';
// import ProductForm from '@/components/ProductForm';
// import Navbar from '@/components/Navbar';
// import { toast } from 'sonner';
// import { ArrowLeft, Edit, RefreshCw } from 'lucide-react';

// const UpdateProduct = () => {
//   const [product, setProduct] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!id) return;
//       try {
//         const data = await getProductById(id);
//         setProduct(data);
//       } catch (error: any) {
//         toast.error(error || 'Failed to fetch product');
//         navigate('/dashboard');
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchProduct();
//   }, [id, navigate]);

//   const handleSubmit = async (data: { name: string; price: number; quantity: number }) => {
//     if (!id) return;
//     setIsLoading(true);
//     try {
//       await updateProduct(id, data);
//       toast.success('Product updated successfully!');
//       navigate('/dashboard');
//     } catch (error: any) {
//       toast.error(error || 'Failed to update product');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="flex h-[calc(100vh-80px)] items-center justify-center">
//           <div className="text-center">
//             <RefreshCw className="mx-auto h-12 w-12 animate-spin text-primary" />
//             <p className="mt-4 text-muted-foreground">Loading product...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="mx-auto max-w-2xl">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/dashboard')}
//             className="mb-6 gap-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </Button>

//           <div className="mb-6 text-center">
//             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//               <Edit className="h-8 w-8 text-primary" />
//             </div>
//             <h1 className="text-3xl font-bold">Update Product</h1>
//             <p className="mt-2 text-muted-foreground">Edit product details</p>
//           </div>

//           {product && (
//             <ProductForm
//               initialData={{
//                 name: product.name,
//                 price: product.price,
//                 quantity: product.quantity,
//               }}
//               onSubmit={handleSubmit}
//               isLoading={isLoading}
//               submitButtonText="Update Product"
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "@/api/api";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/ProductForm";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { ArrowLeft, Edit, RefreshCw } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const UpdateProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>(); // id from route (string)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        toast.error("Invalid product id");
        navigate("/dashboard");
        return;
      }

      setIsFetching(true);
      try {
        const data = await getProductById(id);

        // Defensive formatting: backend should return { id, name, price, quantity }
        const formatted: Product = {
          id: typeof data.id === "number" ? data.id : Number(data.id),
          name: data.name ?? "Unnamed product",
          price: Number(data.price) || 0,
          quantity: Number(data.quantity) || 0,
        };

        setProduct(formatted);
      } catch (error: any) {
        console.error("Fetch product error:", error);
        toast.error(error || "Failed to fetch product");
        navigate("/dashboard");
      } finally {
        setIsFetching(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (data: { name: string; price: number; quantity: number }) => {
    if (!id) {
      toast.error("Product id not found");
      return;
    }

    setIsLoading(true);
    try {
      // Ensure numeric values (avoid NaN)
      const payload = {
        name: data.name.trim(),
        price: Number(data.price),
        quantity: Number(data.quantity),
      };

      if (isNaN(payload.price) || isNaN(payload.quantity)) {
        toast.error("Price and quantity must be valid numbers");
        setIsLoading(false);
        return;
      }

      await updateProduct(id, payload); // backend expects id param and numeric body
      toast.success("Product updated successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Update product error:", error);
      toast.error(error || "Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[calc(100vh-80px)] items-center justify-center">
          <div className="text-center">
            <RefreshCw className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[calc(100vh-80px)] items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Product not found.</p>
            <Button onClick={() => navigate("/dashboard")} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Edit className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Update Product</h1>
            <p className="mt-2 text-muted-foreground">Edit product details</p>
          </div>

          <ProductForm
            initialData={{
              name: product.name,
              price: product.price,
              quantity: product.quantity,
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText="Update Product"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

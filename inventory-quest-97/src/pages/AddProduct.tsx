// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addProduct } from '@/api/api';
// import { Button } from '@/components/ui/button';
// import ProductForm from '@/components/ProductForm';
// import Navbar from '@/components/Navbar';
// import { toast } from 'sonner';
// import { ArrowLeft, PackagePlus } from 'lucide-react';

// const AddProduct = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (data: { name: string; price: number; quantity: number }) => {
//     setIsLoading(true);
//     try {
//       await addProduct(data);
//       toast.success('Product added successfully!');
//       navigate('/dashboard');
//     } catch (error: any) {
//       toast.error(error || 'Failed to add product');
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//               <PackagePlus className="h-8 w-8 text-primary" />
//             </div>
//             <h1 className="text-3xl font-bold">Add New Product</h1>
//             <p className="mt-2 text-muted-foreground">Create a new product listing</p>
//           </div>

//           <ProductForm
//             onSubmit={handleSubmit}
//             isLoading={isLoading}
//             submitButtonText="Add Product"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { addProduct } from "@/api/api";
// import { Button } from "@/components/ui/button";
// import ProductForm from "@/components/ProductForm";
// import Navbar from "@/components/Navbar";
// import { toast } from "sonner";
// import { ArrowLeft, PackagePlus } from "lucide-react";

// const AddProduct = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (data: { name: string; price: number; quantity: number }) => {
//     setIsLoading(true);

//     try {
//       // ✅ Generate a unique product ID (using timestamp)
//       const uniqueId = Date.now();

//       // ✅ Send complete payload including id
//       await addProduct({
//         id: uniqueId,
//         name: data.name,
//         price: Number(data.price), // ✅ ensure numeric
//         quantity: Number(data.quantity), // ✅ ensure numeric
//   });


//       toast.success("Product added successfully!");
//       navigate("/dashboard");
//     } catch (error: any) {
//       console.error("Error adding product:", error);
//       toast.error(error || "Failed to add product");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="mx-auto max-w-2xl">
//           <Button
//             variant="ghost"
//             onClick={() => navigate("/dashboard")}
//             className="mb-6 gap-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </Button>

//           <div className="mb-6 text-center">
//             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//               <PackagePlus className="h-8 w-8 text-primary" />
//             </div>
//             <h1 className="text-3xl font-bold">Add New Product</h1>
//             <p className="mt-2 text-muted-foreground">
//               Create a new product listing
//             </p>
//           </div>

//           {/* ✅ Pass onSubmit handler to reusable ProductForm */}
//           <ProductForm
//             onSubmit={handleSubmit}
//             isLoading={isLoading}
//             submitButtonText="Add Product"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "@/api/api";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/ProductForm";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { ArrowLeft, PackagePlus } from "lucide-react";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Backend now auto-assigns blockchain product ID
  const handleSubmit = async (data: { name: string; price: number; quantity: number }) => {
    setIsLoading(true);

    try {
      await addProduct({
        name: data.name,
        price: Number(data.price), // ensure numeric
        quantity: Number(data.quantity), // ensure numeric
      });

      toast.success("Product added successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("❌ Error adding product:", error);
      toast.error(error?.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <PackagePlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="mt-2 text-muted-foreground">
              Create a new product listing
            </p>
          </div>

          {/* ✅ Pass onSubmit handler to reusable ProductForm */}
          <ProductForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText="Add Product"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

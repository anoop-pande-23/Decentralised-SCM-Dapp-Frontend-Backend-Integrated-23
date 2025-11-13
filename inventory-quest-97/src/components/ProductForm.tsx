// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';

// interface ProductFormProps {
//   initialData?: {
//     name: string;
//     price: number;
//     quantity: number;
//   };
//   onSubmit: (data: { name: string; price: number; quantity: number }) => void;
//   isLoading?: boolean;
//   submitButtonText: string;
// }

// const ProductForm: React.FC<ProductFormProps> = ({
//   initialData,
//   onSubmit,
//   isLoading = false,
//   submitButtonText,
// }) => {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || '',
//     price: initialData?.price || 0,
//     quantity: initialData?.quantity || 0,
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Card className="glass-card p-6">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <Label htmlFor="name">Product Name</Label>
//           <Input
//             id="name"
//             type="text"
//             placeholder="Enter product name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             required
//             className="transition-smooth"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="price">Price ($)</Label>
//           <Input
//             id="price"
//             type="number"
//             placeholder="0.00"
//             step="0.01"
//             min="0"
//             value={formData.price}
//             onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
//             required
//             className="transition-smooth"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="quantity">Quantity</Label>
//           <Input
//             id="quantity"
//             type="number"
//             placeholder="0"
//             min="0"
//             value={formData.quantity}
//             onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
//             required
//             className="transition-smooth"
//           />
//         </div>

//         <Button
//           type="submit"
//           className="w-full"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Processing...' : submitButtonText}
//         </Button>
//       </form>
//     </Card>
//   );
// };

// export default ProductForm;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ProductFormProps {
  initialData?: {
    name: string;
    price: number;
    quantity: number;
  };
  onSubmit: (data: { name: string; price: number; quantity: number }) => void;
  isLoading?: boolean;
  submitButtonText: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitButtonText,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price?.toString() || "",
    quantity: initialData?.quantity?.toString() || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price.toString(),
        quantity: initialData.quantity.toString(),
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation Checks
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    const priceNum = Number(formData.price);
    const qtyNum = Number(formData.quantity);

    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price greater than 0");
      return;
    }

    if (isNaN(qtyNum) || qtyNum < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    // ✅ Call parent onSubmit
    onSubmit({
      name: formData.name.trim(),
      price: priceNum,
      quantity: qtyNum,
    });
  };

  return (
    <Card className="glass-card p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="transition-smooth"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter price"
            min="1"
            step="1"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
            className="transition-smooth"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            placeholder="Enter quantity"
            min="1"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
            className="transition-smooth"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : submitButtonText}
        </Button>
      </form>
    </Card>
  );
};

export default ProductForm;

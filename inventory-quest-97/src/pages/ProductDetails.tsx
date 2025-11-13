import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import {
  ArrowLeft,
  Package,
  DollarSign,
  Archive,
  Edit,
  RefreshCw,
} from "lucide-react";

const ProductDetails = () => {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { role } = useAuth();
  const isVendor = role === "vendor";

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(id);
        setProduct({
          id: Number(data.id),
          name: data.name,
          price: Number(data.price),
          quantity: Number(data.quantity),
          vendorId: data.vendorId || null,
        });
      } catch (error: any) {
        console.error("❌ Fetch error:", error);
        toast.error(error || "Failed to fetch product");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (isLoading) {
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

  if (!product)
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[calc(100vh-80px)] items-center justify-center">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <Card className="glass-card overflow-hidden">
            <div className="gradient-primary p-8 text-center text-white">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <Package className="h-10 w-10" />
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-white/80">Product ID: {product.id}</p>
            </div>

            <div className="p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-lg bg-secondary p-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-2xl font-bold text-primary">
                        ₹{product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-lg bg-secondary p-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Archive className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p
                        className={`text-2xl font-bold ${
                          product.quantity > 10
                            ? "text-green-500"
                            : "text-orange-500"
                        }`}
                      >
                        {product.quantity} units
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-lg bg-secondary p-4">
                    <h3 className="mb-2 font-semibold">Product Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span
                          className={`font-medium ${
                            product.quantity > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Value
                        </span>
                        <span className="font-medium">
                          ₹{(product.price * product.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isVendor && (
                    <Button
                      onClick={() =>
                        navigate(`/update-product/${product.id}`)
                      }
                      className="w-full gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Product
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

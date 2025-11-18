import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { Plus, Package, RefreshCw } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  vendorId: string | null;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { role } = useAuth();
  const navigate = useNavigate();

  const isVendor = role === "vendor" || role === "admin";

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();

      const formatted: Product[] = (Array.isArray(data) ? data : []).map((p) => ({
        id: Number(p.id),
        name: p.name || "Unnamed Product",
        price: Number(p.price) || 0,
        quantity: Number(p.quantity) || 0,
        vendorId: p.vendorId || (p.vendor?.id ? String(p.vendor.id) : null),
      }));

      setProducts(formatted);
    } catch (error: any) {
      console.error("Fetch error:", error);
      toast.error(error?.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(String(id));
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error?.message || "Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              {isVendor ? "Manage your products" : "Browse available products"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={fetchProducts}
              className="gap-2"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            {isVendor && (
              <Button onClick={() => navigate("/add-product")} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            )}
          </div>
        </div>

        {/* Product List */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <RefreshCw className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <Package className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No products found</h3>
              <p className="mt-2 text-muted-foreground">
                {isVendor
                  ? "Start by adding your first product"
                  : "Check back later for new products"}
              </p>
              {isVendor && (
                <Button onClick={() => navigate("/add-product")} className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Product
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isVendor={isVendor}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { CheckCircle, XCircle, Download, RefreshCw, ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "@/api/api"; // ✅ your configured axios instance (frontend/api/api.ts)

interface BuyRequest {
  _id: string;
  productId: number;
  customerId: string;
  vendorId: string;
  status: string;
  receiptUrl?: string;
  createdAt: string;
}

const VendorDashboard = () => {
  const [requests, setRequests] = useState<BuyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, role } = useAuth();
  const navigate = useNavigate();

  // ✅ Fetch all buy requests for this vendor
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/buy-requests/vendor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role !== "vendor") navigate("/dashboard");
    fetchRequests();
  }, []);

  // ✅ Approve or Reject request
  const handleAction = async (id: string, action: "Approved" | "Rejected") => {
    try {
      await api.put(
        `/buy-requests/${id}/approve`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Request ${action}`);
      fetchRequests();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Action failed");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShoppingCart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage incoming product purchase requests</p>
        </div>

        {requests.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <p className="text-muted-foreground text-lg">No requests yet</p>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <Card key={req._id} className="glass-card p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Product #{req.productId}</h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">Request ID: {req._id}</p>
                <p className="text-sm text-muted-foreground">
                  Customer: <span className="font-medium">{req.customerId}</span>
                </p>

                {req.status === "Pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleAction(req._id, "Approved")}
                      className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4" /> Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleAction(req._id, "Rejected")}
                      className="flex-1 gap-2"
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                )}

                {req.status === "Approved" && req.receiptUrl && (
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() =>
                        window.open(`http://localhost:5000${req.receiptUrl}`, "_blank")
                      }
                    >
                      <Download className="h-4 w-4" /> Download Receipt
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;

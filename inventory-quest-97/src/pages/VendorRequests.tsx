import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { getVendorBuyRequests, approveBuyRequest } from "@/api/api";
import { toast } from "sonner";
import { RefreshCw, CheckCircle, XCircle, Download } from "lucide-react";

interface BuyRequest {
  _id: string;
  productId: number;
  customerId: string;
  vendorId: string;
  status: "Pending" | "Approved" | "Rejected";
  receiptUrl?: string;
  createdAt: string;
}

const VendorRequests = () => {
  const [requests, setRequests] = useState<BuyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // ✅ Fetch all buy requests for the vendor
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await getVendorBuyRequests();
      setRequests(data);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Handle Approve / Reject actions
  const handleAction = async (id: string, action: "Approved" | "Rejected") => {
    if (!confirm(`Are you sure you want to ${action.toLowerCase()} this request?`)) return;
    setProcessingId(id);
    try {
      const res = await approveBuyRequest(id, action);
      toast.success(res.message);
      await fetchRequests();
    } catch (err: any) {
      toast.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Vendor Buy Requests</h1>
          <Button
            variant="outline"
            onClick={fetchRequests}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <RefreshCw className="h-10 w-10 animate-spin text-primary mb-2" />
            <p className="text-muted-foreground">Loading buy requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            No buy requests found
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <Card key={req._id} className="p-6 shadow-md">
                {/* Product & Customer Info */}
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    Product #{req.productId}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Customer ID: {req.customerId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Requested on: {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
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

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {req.status === "Pending" ? (
                    <>
                      <Button
                        className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                        onClick={() => handleAction(req._id, "Approved")}
                        disabled={!!processingId}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1 gap-2"
                        onClick={() => handleAction(req._id, "Rejected")}
                        disabled={!!processingId}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  ) : req.status === "Approved" && req.receiptUrl ? (
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() =>
                        window.open(`http://localhost:5000${req.receiptUrl}`, "_blank")
                      }
                    >
                      <Download className="h-4 w-4" />
                      Download Receipt
                    </Button>
                  ) : (
                    <div className="flex-1 text-sm text-muted-foreground">
                      No receipt available
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorRequests;

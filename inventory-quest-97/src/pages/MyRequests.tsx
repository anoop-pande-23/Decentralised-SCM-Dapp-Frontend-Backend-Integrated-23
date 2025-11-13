import { useEffect, useState } from "react";
import {
  getCustomerBuyRequests,
  verifyReceiptHash,
  verifyReceiptFile,
} from "@/api/api";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { FileText, RefreshCw, ShieldCheck, Upload } from "lucide-react";

interface BuyRequest {
  _id: string;
  productId: string;
  vendorId: string;
  status: string;
  receiptUrl?: string;
  receiptHash?: string;
  createdAt: string;
}

const MyRequests = () => {
  const [requests, setRequests] = useState<BuyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);

  // Fetch customer’s requests
  const fetchRequests = async () => {
    try {
      const data = await getCustomerBuyRequests();
      setRequests(data);
    } catch (err: any) {
      toast.error(err || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Existing hash-based verification
  const handleVerify = async (req: BuyRequest) => {
    if (!req.receiptHash || !req.productId) {
      toast.error("No receipt or product ID found for verification");
      return;
    }

    setVerifying(req._id);
    try {
      const isValid = await verifyReceiptHash(req.productId, req.receiptHash);
      if (isValid) toast.success("✅ Receipt verified on blockchain!");
      else toast.error("❌ Receipt hash mismatch — invalid document!");
    } catch (err: any) {
      toast.error(err || "Verification failed");
    } finally {
      setVerifying(null);
    }
  };

  // ✅ New: File upload verification
  const handleFileVerify = async (req: BuyRequest, file: File | null) => {
    if (!file) {
      toast.error("Please select a PDF receipt first.");
      return;
    }

    setVerifying(req._id);
    try {
      const result = await verifyReceiptFile(req.productId, file);
      if (result.valid) {
        toast.success(result.message || "✅ Receipt verified successfully!");
      } else {
        toast.error(result.message || "❌ Uploaded receipt does not match blockchain record!");
      }
    } catch (err: any) {
      console.error("File verification failed:", err);
      toast.error(err || "Verification failed");
    } finally {
      setVerifying(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[calc(100vh-80px)] items-center justify-center">
          <div className="text-center">
            <RefreshCw className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">
              Loading your requests...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          My Purchase Requests
        </h1>

        {requests.length === 0 ? (
          <p className="text-center text-muted-foreground">No requests found.</p>
        ) : (
          <div className="grid gap-4 max-w-3xl mx-auto">
            {requests.map((req) => (
              <div
                key={req._id}
                className="border rounded-xl p-4 shadow-sm bg-card hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="font-semibold text-lg">
                      Product ID: {req.productId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vendor: {req.vendorId}
                    </p>
                    <p
                      className={`mt-1 font-medium ${
                        req.status === "Approved"
                          ? "text-green-600"
                          : req.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      Status: {req.status}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Requested on: {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {req.status === "Approved" && req.receiptUrl && (
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      {/* View Receipt */}
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                        <a
                          href={`http://localhost:5000${req.receiptUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" /> Receipt
                        </a>
                      </Button>

                      {/* Verify (Hash-based) */}
                      <Button
                        onClick={() => handleVerify(req)}
                        disabled={verifying === req._id}
                        variant="secondary"
                        className="flex items-center gap-2 w-full sm:w-auto"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        {verifying === req._id ? "Verifying..." : "Verify"}
                      </Button>

                      {/* Upload & Verify PDF */}
                      <label className="cursor-pointer flex items-center gap-2 border rounded-md px-3 py-2 hover:bg-muted transition">
                        <Upload className="h-4 w-4 text-primary" />
                        <span className="text-sm">Upload PDF</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) =>
                            handleFileVerify(req, e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;

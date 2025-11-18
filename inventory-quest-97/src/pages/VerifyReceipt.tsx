import { useState } from "react";
import Navbar from "@/components/Navbar";
import { verifyQR, verifyReceiptFile } from "@/api/api";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VerifyReceipt = () => {
  const [qrText, setQrText] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleVerifyQR = async () => {
    try {
      const parsed = JSON.parse(qrText);

      if (!parsed.productId || !parsed.receiptHash) {
        toast.error("QR must include productId and receiptHash");
        return;
      }

      const res = await verifyQR({
        productId: Number(parsed.productId),
        receiptHash: String(parsed.receiptHash),
      });

      setResult(res);
    } catch {
      toast.error("Invalid QR JSON");
    }
  };

  const handleFileVerify = async () => {
    if (!uploadFile) return toast.error("Select a file");

    const pid = id;

    if (!pid) return toast.error("Product ID missing");

    try {
      const res = await verifyReceiptFile(Number(pid), uploadFile);
      setResult(res);
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-3xl">

        <h1 className="text-2xl font-bold mb-6">Verify Receipt / QR</h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* QR Verify */}
          <div className="bg-secondary p-4 rounded">
            <h3 className="font-semibold mb-2">Paste QR JSON</h3>

            <textarea
              rows={6}
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              className="w-full p-2 rounded border bg-background"
              placeholder='{"productId":5,"receiptHash":"xxxx"}'
            />

            <Button className="mt-3 w-full" onClick={handleVerifyQR}>Verify QR</Button>
          </div>

          {/* File Verify */}
          <div className="bg-secondary p-4 rounded">
            <h3 className="font-semibold mb-2">Upload Receipt File</h3>

            <p className="text-sm mb-2">
              Product ID: <b>{id}</b>
            </p>

            <input
              type="file"
              accept=".pdf,image/png,image/jpeg"
              className="mb-3"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            />

            <Button className="w-full" onClick={handleFileVerify}>Verify File</Button>
          </div>

        </div>

        {/* Result */}
        <div className="mt-6">
          {result ? (
            <div className={`p-4 rounded ${result.valid ? "bg-green-100" : "bg-red-100"}`}>
              <h4 className="font-bold">{result.message}</h4>

              {result.uploadedHash && (
                <p className="mt-2 text-sm">Uploaded Hash: {result.uploadedHash}</p>
              )}

              {result.onChainHash && (
                <p className="mt-1 text-sm">On-chain Hash: {result.onChainHash}</p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No verification performed yet.</p>
          )}
        </div>

        <Button className="mt-6" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>

      </div>
    </div>
  );
};

export default VerifyReceipt;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReceiptQRByProduct } from "@/api/api";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const QRPage = () => {
  const { id } = useParams<{ id: string }>();
  const [qr, setQr] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    const loadQR = async () => {
      try {
        const data = await getReceiptQRByProduct(id!);
        setQr(data.qr);
        setPayload(data.payload);
      } catch (err: any) {
        toast.error(err || "Failed to fetch QR");
      }
    };

    loadQR();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold">Product Authenticity QR</h1>

          {qr ? (
            <div className="mt-6">
              <img src={qr} alt="QR Code" className="mx-auto border p-4 bg-white" />
              <p className="mt-4 text-sm text-muted-foreground">
                You can share this QR with customers — it encodes productId and receiptHash.
              </p>

              <div className="mt-4">
                <Button
                  onClick={() => {
                    // download the image
                    const a = document.createElement("a");
                    a.href = qr;
                    a.download = `product_${id}_qr.png`;
                    a.click();
                  }}
                >
                  Download QR
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-muted-foreground">Generating QR...</p>
          )}

          {payload && (
            <div className="mt-6 text-left bg-secondary p-4 rounded">
              <h4 className="font-semibold">QR Payload</h4>
              <pre className="text-xs">{JSON.stringify(payload, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRPage;

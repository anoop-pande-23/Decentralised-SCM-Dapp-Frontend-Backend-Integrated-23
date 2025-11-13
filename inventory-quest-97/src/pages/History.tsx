// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import Navbar from '@/components/Navbar';
// import { ArrowLeft, Database, Lock } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const History = () => {
//   const navigate = useNavigate();

//   // Mock blockchain-style transaction data
//   const transactions = [
//     {
//       id: 1,
//       block: 'BLK-001',
//       hash: '0x7a3f9e2b8c1d4f6e...',
//       action: 'PRODUCT_ADDED',
//       product: 'Laptop Pro',
//       timestamp: new Date().toISOString(),
//     },
//     {
//       id: 2,
//       block: 'BLK-002',
//       hash: '0x4b8c9e1f3a7d2e6c...',
//       action: 'PRODUCT_UPDATED',
//       product: 'Wireless Mouse',
//       timestamp: new Date(Date.now() - 3600000).toISOString(),
//     },
//     {
//       id: 3,
//       block: 'BLK-003',
//       hash: '0x2e6f1a4b9c8d3e7f...',
//       action: 'PRODUCT_DELETED',
//       product: 'Old Keyboard',
//       timestamp: new Date(Date.now() - 7200000).toISOString(),
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="mx-auto max-w-4xl">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/dashboard')}
//             className="mb-6 gap-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </Button>

//           <div className="mb-8 text-center">
//             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//               <Database className="h-8 w-8 text-primary" />
//             </div>
//             <h1 className="text-3xl font-bold">Transaction History</h1>
//             <p className="mt-2 text-muted-foreground">Blockchain-style immutable record of all transactions</p>
//           </div>

//           <div className="space-y-4">
//             {transactions.map((tx, index) => (
//               <Card key={tx.id} className="glass-card overflow-hidden transition-smooth hover:shadow-glow">
//                 <div className="gradient-primary p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Lock className="h-5 w-5" />
//                       <span className="font-mono font-semibold">{tx.block}</span>
//                     </div>
//                     <span className="text-sm text-white/80">#{transactions.length - index}</span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-sm text-muted-foreground">Transaction Hash</span>
//                       <span className="font-mono text-sm">{tx.hash}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-muted-foreground">Action</span>
//                       <span className="font-semibold">{tx.action.replace('_', ' ')}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-muted-foreground">Product</span>
//                       <span className="font-medium">{tx.product}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-muted-foreground">Timestamp</span>
//                       <span className="text-sm">{new Date(tx.timestamp).toLocaleString()}</span>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {transactions.length === 0 && (
//             <Card className="glass-card p-12 text-center">
//               <Database className="mx-auto h-16 w-16 text-muted-foreground" />
//               <h3 className="mt-4 text-xl font-semibold">No transactions yet</h3>
//               <p className="mt-2 text-muted-foreground">
//                 Transaction history will be recorded here once actions are performed
//               </p>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default History;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Database, Lock, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

interface Transaction {
  id: number;
  blockNumber: number;
  txHash: string;
  action: string;
  timestamp: number;
}

const History = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:5000"; // backend URL

  const fetchHistory = async () => {
    if (!productId.trim()) {
      toast.error("Please enter a product ID");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/events/products/${productId}/history`
      );
      const data = response.data;

      if (data.length === 0) {
        toast.info("No blockchain history found for this product");
        setTransactions([]);
      } else {
        // Sort by time
        data.sort((a: any, b: any) => a.timestamp - b.timestamp);
        setTransactions(data);
        toast.success(`Fetched ${data.length} transaction(s)!`);
      }
    } catch (error) {
      toast.error("Failed to fetch blockchain history");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Product History</h1>
            <p className="mt-2 text-muted-foreground">
              Enter a Product ID to view its on-chain history
            </p>
          </div>

          {/* Input + Button */}
          <div className="mb-8 flex items-center gap-4">
            <Input
              placeholder="Enter Product ID (e.g. 101)"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button onClick={fetchHistory} disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                "Fetch History"
              )}
            </Button>
          </div>

          {/* Transactions List */}
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <RefreshCw className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : transactions.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <Database className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No transactions yet</h3>
              <p className="mt-2 text-muted-foreground">
                Enter a product ID to load blockchain activity
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <Card
                  key={tx.txHash + index}
                  className="glass-card overflow-hidden transition-smooth hover:shadow-glow"
                >
                  <div className="gradient-primary p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5" />
                        <span className="font-mono font-semibold">
                          Block #{tx.blockNumber}
                        </span>
                      </div>
                      <span className="text-sm text-white/80">
                        #{transactions.length - index}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Transaction Hash
                      </span>
                      <a
                        href={`https://etherscan.io/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-primary hover:underline"
                      >
                        {tx.txHash.slice(0, 12)}...
                      </a>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Action</span>
                      <span className="font-semibold capitalize">
                        {tx.action}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Timestamp</span>
                      <span className="text-sm">
                        {new Date(tx.timestamp * 1000).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;

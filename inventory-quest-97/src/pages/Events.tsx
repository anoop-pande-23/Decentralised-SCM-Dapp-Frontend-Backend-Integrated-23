// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import Navbar from '@/components/Navbar';
// import { ArrowLeft, Activity, Plus, Edit, Trash2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Events = () => {
//   const navigate = useNavigate();

//   // Mock event data for demonstration
//   const events = [
//     {
//       id: 1,
//       type: 'add',
//       product: 'Laptop Pro',
//       timestamp: new Date().toISOString(),
//       user: 'vendor@example.com',
//     },
//     {
//       id: 2,
//       type: 'update',
//       product: 'Wireless Mouse',
//       timestamp: new Date(Date.now() - 3600000).toISOString(),
//       user: 'vendor@example.com',
//     },
//     {
//       id: 3,
//       type: 'delete',
//       product: 'Old Keyboard',
//       timestamp: new Date(Date.now() - 7200000).toISOString(),
//       user: 'vendor@example.com',
//     },
//   ];

//   const getEventIcon = (type: string) => {
//     switch (type) {
//       case 'add':
//         return <Plus className="h-5 w-5 text-green-500" />;
//       case 'update':
//         return <Edit className="h-5 w-5 text-blue-500" />;
//       case 'delete':
//         return <Trash2 className="h-5 w-5 text-red-500" />;
//       default:
//         return <Activity className="h-5 w-5" />;
//     }
//   };

//   const getEventColor = (type: string) => {
//     switch (type) {
//       case 'add':
//         return 'border-l-green-500';
//       case 'update':
//         return 'border-l-blue-500';
//       case 'delete':
//         return 'border-l-red-500';
//       default:
//         return 'border-l-gray-500';
//     }
//   };

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
//               <Activity className="h-8 w-8 text-primary" />
//             </div>
//             <h1 className="text-3xl font-bold">Event History</h1>
//             <p className="mt-2 text-muted-foreground">Track all product-related activities</p>
//           </div>

//           <div className="space-y-4">
//             {events.map((event) => (
//               <Card key={event.id} className={`glass-card border-l-4 ${getEventColor(event.type)} p-6 transition-smooth hover:shadow-glow`}>
//                 <div className="flex items-start gap-4">
//                   <div className="rounded-lg bg-secondary p-3">
//                     {getEventIcon(event.type)}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="font-semibold capitalize">{event.type} Product</h3>
//                         <p className="mt-1 text-sm text-muted-foreground">{event.product}</p>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         {new Date(event.timestamp).toLocaleString()}
//                       </span>
//                     </div>
//                     <div className="mt-2 text-sm text-muted-foreground">
//                       By: {event.user}
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {events.length === 0 && (
//             <Card className="glass-card p-12 text-center">
//               <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
//               <h3 className="mt-4 text-xl font-semibold">No events yet</h3>
//               <p className="mt-2 text-muted-foreground">
//                 Activity history will appear here once products are added, updated, or deleted
//               </p>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Activity, Plus, Edit, Trash2, RefreshCw, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

interface EventData {
  id: number;
  name?: string;
  price?: number;
  quantity?: number;
  action?: string;
  txHash: string;
  blockNumber: number;
  timestamp: number;
}

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000";

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const [added, updated, deleted] = await Promise.all([
        axios.get(`${API_BASE_URL}/events/product-added`),
        axios.get(`${API_BASE_URL}/events/product-updated`),
        axios.get(`${API_BASE_URL}/events/product-deleted`)
      ]);

      // Merge all event arrays into one with consistent structure
      const merged = [
        ...added.data.map((e: any) => ({ ...e, action: "Added" })),
        ...updated.data.map((e: any) => ({ ...e, action: "Updated" })),
        ...deleted.data.map((e: any) => ({ ...e, action: "Deleted" }))
      ];

      // Sort by timestamp descending
      merged.sort((a, b) => b.timestamp - a.timestamp);

      setEvents(merged);
    } catch (error: any) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getEventIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case "added":
        return <Plus className="h-5 w-5 text-green-500" />;
      case "updated":
        return <Edit className="h-5 w-5 text-blue-500" />;
      case "deleted":
        return <Trash2 className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getEventColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "added":
        return "border-l-green-500";
      case "updated":
        return "border-l-blue-500";
      case "deleted":
        return "border-l-red-500";
      default:
        return "border-l-gray-500";
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Blockchain Event Log</h1>
            <p className="mt-2 text-muted-foreground">
              Track all blockchain-based product activities
            </p>
            <Button
              variant="outline"
              onClick={fetchEvents}
              disabled={loading}
              className="mt-4 gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <RefreshCw className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Loading blockchain events...</p>
              </div>
            </div>
          ) : events.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No events yet</h3>
              <p className="mt-2 text-muted-foreground">
                Blockchain activity will appear here once products are added, updated, or deleted
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {events.map((event, index) => (
                <Card
                  key={`${event.txHash}-${index}`}
                  className={`glass-card border-l-4 ${getEventColor(event.action!)} p-6 transition-smooth hover:shadow-glow`}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-secondary p-3">
                      {getEventIcon(event.action!)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold capitalize">
                            {event.action} Product
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {event.name || `ID: ${event.id}`}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(event.timestamp)}
                        </span>
                      </div>

                      <div className="mt-3 text-sm text-muted-foreground space-y-1">
                        <p>
                          <strong>Price:</strong> ${event.price ?? "—"}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {event.quantity ?? "—"}
                        </p>
                        <p>
                          <strong>Block:</strong> {event.blockNumber}
                        </p>
                        <a
                          href={`https://etherscan.io/tx/${event.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          View Transaction <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
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

export default Events;

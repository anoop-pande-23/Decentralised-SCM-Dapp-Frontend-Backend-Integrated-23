import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Auth
export const registerUser = async (data: { username: string; password: string; role?: string }) => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (data: { username: string; password: string }) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Login failed";
  }
};

// Product APIs
export const getAllProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch products";
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch product";
  }
};

export const addProduct = async (data: { name: string; price: number; quantity: number }) => {
  const response = await api.post("/products", data);
  return response.data;
};

export const updateProduct = async (id: string, data: { name: string; price: number; quantity: number }) => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to update product";
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to delete product";
  }
};

// Vendor Buy Requests
export const getVendorBuyRequests = async () => {
  try {
    const res = await api.get("/buy-requests/vendor");
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to fetch vendor requests";
  }
};

export const approveBuyRequest = async (id: string, action: "Approved" | "Rejected") => {
  try {
    const res = await api.put(`/buy-requests/${id}/approve`, { action });
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to approve/reject request";
  }
};

// Customer Buy Requests
export const getCustomerBuyRequests = async () => {
  try {
    const res = await api.get("/buy-requests/customer");
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to fetch customer requests";
  }
};

// Verify uploaded receipt hash (existing)
export const verifyReceiptHash = async (productId: string, uploadedHash: string) => {
  try {
    const res = await api.post("/buy-requests/validate", { productId, uploadedHash });
    return res.data.valid;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to verify receipt";
  }
};

// Verify uploaded receipt file (new feature)
export const verifyReceiptFile = async (productId: string | number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("productId", String(productId));
    formData.append("receipt", file);

    const response = await api.post("/buy-requests/validate-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // The backend returns:
    // { valid, message, onChainHash?, uploadedHash? }
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to verify receipt file";
  }
};

// Apply
export const applyToBuyProduct = async (productId: number | string) => {
  try {
    const res = await api.post("/buy-requests/apply", { productId });
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to apply for product";
  }
};

// Update product status (existing)
export const updateProductStatus = async (id: number | string, status: string) => {
  try {
    const response = await api.put(`/products/${id}/status`, { status });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to update status";
  }
};

// ==================== QR APIs (NEW) ====================

// Get QR by buyRequest id
export const getReceiptQR = async (requestId: string | number) => {
  try {
    const res = await api.get(`/buy-requests/${requestId}/qr`);
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to fetch QR code";
  }
};

// Get QR by product id (uses vendor's latest approved request)
export const getReceiptQRByProduct = async (productId: string | number) => {
  try {
    const res = await api.get(`/buy-requests/product/${productId}/qr`);
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to fetch QR code by product";
  }
};

// Verify QR payload (customer pastes decoded QR JSON)
export const verifyQR = async (payload: { productId: number; receiptHash: string }) => {
  try {
    const res = await api.post("/buy-requests/verify-qr", payload);
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "QR verification failed";
  }
};

export default api;

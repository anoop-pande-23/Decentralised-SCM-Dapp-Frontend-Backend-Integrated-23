import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Updated to match backend (username instead of email)
export const registerUser = async (data: { username: string; password: string; role?: string }) => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// ✅ Updated to use username (backend expects username, not email)
export const loginUser = async (data: { username: string; password: string }) => {
  try {
    const response = await api.post('/login', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Login failed';
  }
};

// Product APIs
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to fetch products';
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to fetch product';
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
    throw error.response?.data?.message || 'Failed to update product';
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to delete product';
  }
};

// ✅ Vendor Buy Requests
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

// ✅ Fetch all requests for current customer
export const getCustomerBuyRequests = async () => {
  try {
    const res = await api.get("/buy-requests/customer");
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to fetch customer requests";
  }
};

// ✅ Verify uploaded receipt hash
export const verifyReceiptHash = async (productId: string, uploadedHash: string) => {
  try {
    const res = await api.post("/buy-requests/validate", { productId, uploadedHash });
    return res.data.valid;
  } catch (err: any) {
    throw err.response?.data?.message || "Failed to verify receipt";
  }
};

// ✅ Verify uploaded receipt file (new feature)
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



export default api;

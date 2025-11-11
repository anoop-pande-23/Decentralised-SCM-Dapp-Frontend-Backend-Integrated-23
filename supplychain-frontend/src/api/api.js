// src/api/api.js
import axios from "axios";

const API_BASE = "http://localhost:3001"; // Update if your backend runs on a different port

// User Authentication
export const registerUser = async (data) => {
  const res = await axios.post(`${API_BASE}/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_BASE}/login`, data);
  return res.data;
};

// Product CRUD
export const getAllProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
};

export const addProduct = async (data) => {
  const res = await axios.post(`${API_BASE}/products`, data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API_BASE}/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_BASE}/products/${id}`);
  return res.data;
};

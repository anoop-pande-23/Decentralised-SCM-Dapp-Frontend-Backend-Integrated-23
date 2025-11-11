import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // your backend URL

export const registerUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/login`, userData);
};

import React, { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "", role: "customer" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <select name="role" value={formData.role} onChange={handleChange} className="border p-2">
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Register</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

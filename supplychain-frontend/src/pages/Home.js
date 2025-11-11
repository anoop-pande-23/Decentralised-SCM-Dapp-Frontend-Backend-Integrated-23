import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl text-center">
          <h1 className="text-4xl font-bold mb-6 text-purple-800">
            Welcome to Blockchain DApp
          </h1>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
            >
              Register
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

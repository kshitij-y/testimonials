"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" // Dark theme to match bg-gray-800
      toastStyle={{
        backgroundColor: "#1F2937", // Tailwind bg-gray-800 alternative
        color: "#F3F4F6", // Tailwind text-gray-200 for contrast
        borderRadius: "8px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)", // Deeper shadow for depth
        padding: "14px",
        fontSize: "14px",
        border: "1px solid #374151", // Slight border for definition (Tailwind bg-gray-700)
      }}
    />
  );
}

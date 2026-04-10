import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/Dashboard";
import Stake from "./pages/Stake";
import Profile from "./pages/Profile"; // ✅ Re-enabled import
import SilkBackground from "./components/SilkBackground";

function App() {
  return (
    <>
      {/* 🌌 Global Silk Background */}
      <SilkBackground />

      {/* 🌐 App Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/profile" element={<Profile />} /> {/* ✅ Re-enabled Route */}
        </Routes>
      </div>
    </>
  );
}

export default App;
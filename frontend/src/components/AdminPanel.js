import React, { useState, useEffect } from "react";
import AddSweetForm from "./AddSweetForm";
import SweetList from "./SweetList";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("is_admin") === "true";
    console.log("ADMIN CHECK:", isAdmin); // 🔍 ADD THIS TEMP
    if (!isAdmin) {
      alert("Access denied. Admin only.");
      navigate("/");
    }
  }, [navigate]);

  const handleSweetAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {/* ✅ Admin-only */}
      <AddSweetForm onSweetAdded={handleSweetAdded} />

      {/* ✅ Force refresh on add/delete/restock */}
      <SweetList refresh={refresh} />
    </div>
  );
}

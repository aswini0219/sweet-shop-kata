import React, { useEffect, useState } from "react";
import API from "../api";
import SweetCard from "./SweetCard";
import SearchBar from "./SearchBar";

export default function SweetList({ refreshTrigger }) {
  const [sweets, setSweets] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const fetchSweets = async () => {
    try {
      const res = await API.get("/sweets", { params: searchParams });
      setSweets(res.data);
    } catch (err) {
      alert("Failed to load sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [searchParams, refreshTrigger]);

  const handlePurchase = async (id) => {
    await API.post(`/sweets/${id}/purchase`);
    fetchSweets();
  };

  const handleRestock = async (id) => {
    const qty = prompt("Restock amount:", "10");
    if (!qty || isNaN(qty) || qty <= 0) return;
    await API.post(`/sweets/${id}/restock`, null, { params: { amount: qty } });
    fetchSweets();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sweet permanently?")) return;
    await API.delete(`/sweets/${id}`);
    fetchSweets();
  };

  return (
    <div>
      <SearchBar onSearch={setSearchParams} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {sweets.length === 0 ? (
          <p>No sweets found.</p>
        ) : (
          sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              isAdmin={isAdmin}
              onPurchase={handlePurchase}
              onRestock={handleRestock}
              onDelete={handleDelete}
              onUpdateSuccess={fetchSweets}
            />
          ))
        )}
      </div>
    </div>
  );
}

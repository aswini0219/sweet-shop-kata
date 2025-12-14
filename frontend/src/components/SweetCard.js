import React from "react";
import API from "../api";

export default function SweetCard({
  sweet,
  isAdmin,
  onPurchase,
  onRestock,
  onDelete,
  onUpdateSuccess, // Pass fetchSweets from SweetList
}) {
  const handleEdit = async () => {
    const newName = prompt("Edit name:", sweet.name);
    if (newName === null) return;

    const newCategory = prompt("Edit category:", sweet.category);
    if (newCategory === null) return;

    const newPriceStr = prompt("Edit price:", sweet.price);
    if (newPriceStr === null) return;
    const newPrice = parseFloat(newPriceStr);
    if (isNaN(newPrice)) {
      alert("Invalid price");
      return;
    }

    const newQuantityStr = prompt("Edit quantity:", sweet.quantity);
    if (newQuantityStr === null) return;
    const newQuantity = parseInt(newQuantityStr);
    if (isNaN(newQuantity) || newQuantity < 0) {
      alert("Invalid quantity");
      return;
    }

    try {
      await API.put(`/sweets/${sweet.id}`, {
        name: newName,
        category: newCategory,
        price: newPrice,
        quantity: newQuantity,
      });
      alert("Sweet updated!");
      onUpdateSuccess(); // Refresh list
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        margin: "12px",
        maxWidth: "300px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        background: sweet.quantity === 0 ? "#ffebee" : "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 8px" }}>{sweet.name}</h3>
      <p>
        <strong>Category:</strong> {sweet.category}
      </p>
      <p>
        <strong>Price:</strong> ₹{sweet.price.toFixed(2)}
      </p>
      <p>
        <strong>Stock:</strong>
        <span style={{ color: sweet.quantity === 0 ? "red" : "green" }}>
          {sweet.quantity > 0 ? sweet.quantity : "Out of Stock"}
        </span>
      </p>

      <div style={{ marginTop: "12px" }}>
        {!isAdmin && (
          <button
            onClick={() => onPurchase(sweet.id)}
            disabled={sweet.quantity === 0}
            style={{
              padding: "8px 16px",
              background: sweet.quantity === 0 ? "#ccc" : "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Purchase
          </button>
        )}

        {isAdmin && (
          <>
            <button
              onClick={() => onRestock(sweet.id)}
              style={{ marginRight: "8px", padding: "6px 12px" }}
            >
              Restock
            </button>
            <button
              onClick={handleEdit}
              style={{
                marginRight: "8px",
                padding: "6px 12px",
                background: "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(sweet.id)}
              style={{
                padding: "6px 12px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

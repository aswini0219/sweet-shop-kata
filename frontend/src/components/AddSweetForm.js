import React, { useState } from "react";
import API from "../api";

export default function AddSweetForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/sweets", {
        ...form,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
      });
      alert("Sweet added!");
      setForm({ name: "", category: "", price: "", quantity: "" });
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to add sweet");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff3e0",
        borderRadius: "10px",
      }}
    >
      <h3>Add New Sweet</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g., Indian, Chocolate)"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Initial Quantity"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#d81b60",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1.1em",
          }}
        >
          Add Sweet
        </button>
      </form>
    </div>
  );
}

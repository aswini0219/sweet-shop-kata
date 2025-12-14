import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      name,
      category,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
    });
  };

  const handleReset = () => {
    setName("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    onSearch({});
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "0 20px" }}>
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          alignItems: "center",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <input
          type="text"
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: "1 1 200px",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            flex: "1 1 150px",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{
            width: "120px",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            width: "120px",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 24px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "12px 24px",
            background: "#666",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

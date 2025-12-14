import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", {
        username,
        password,
      });

      const loginRes = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("access_token", loginRes.data.access_token);
      localStorage.setItem(
        "is_admin",
        loginRes.data.is_admin ? "true" : "false"
      );
      localStorage.setItem("username", username);

      alert("Registered and logged in successfully!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ color: "#d81b60", marginBottom: "20px" }}>
        🍬 Register for Sweet Shop
      </h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#d81b60",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
      <p style={{ marginTop: "20px", color: "#666" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#d81b60" }}>
          Login here
        </a>
      </p>
    </div>
  );
}

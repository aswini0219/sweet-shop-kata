import React, { useEffect, useState } from "react";
import AddSweetForm from "./AddSweetForm";
import SweetList from "./SweetList";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("is_admin") === "true";
    const user = localStorage.getItem("username") || "";
    setIsAdmin(admin);
    setUsername(user);
  }, []);

  const triggerRefresh = () => setRefresh((p) => !p);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9fb",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {" "}
        {/* ← Centers everything */}
        <h1
          style={{
            textAlign: "center",
            color: "#d81b60",
            marginBottom: "10px",
          }}
        >
          🍬 Sweet Shop 🍬
        </h1>
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "1.3em",
          }}
        >
          {isAdmin ? "👑 Welcome back, Admin" : "👋 Welcome"}{" "}
          {username && `– ${username}`}
        </div>
        {isAdmin && (
          <div style={{ maxWidth: "600px", margin: "0 auto 40px auto" }}>
            {" "}
            {/* Center Add form */}
            <AddSweetForm onSuccess={triggerRefresh} />
          </div>
        )}
        {/* SweetList (includes SearchBar) will now be centered because of maxWidth above */}
        <SweetList refreshTrigger={refresh} />
      </div>
    </div>
  );
}

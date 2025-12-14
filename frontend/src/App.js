import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Router>
      <nav
        style={{
          padding: "15px",
          background: "#d81b60",
          color: "white",
          textAlign: "center",
        }}
      >
        {localStorage.getItem("access_token") ? (
          <>
            <span style={{ marginRight: "20px" }}>
              Hello, {localStorage.getItem("username")}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                background: "white",
                color: "#d81b60",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", margin: "0 10px" }}>
              Login
            </Link>{" "}
            |
            <Link to="/register" style={{ color: "white", margin: "0 10px" }}>
              Register
            </Link>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("access_token") ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem("access_token") ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            localStorage.getItem("access_token") ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

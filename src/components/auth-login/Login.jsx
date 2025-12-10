import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "./AuthService";
import { ClipLoader } from "react-spinners";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleLoginUser = (e) => {
    e.preventDefault();
    const response = loginUser(email, password);
    if (!email || !password) {
      setSnackbarType("error");
      setSnackbarMessage("Both fields are required.");
      setSnackbarOpen(true);
      return;
    }
    
    if (response.success) {
      setSnackbarType("success");
      setSnackbarMessage("Login successful!");
      setSnackbarOpen(true);
      setLoading(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setSnackbarType("error");
      setSnackbarMessage("Invalid email or password");
      setSnackbarOpen(true);
      setError(response.message);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLoginUser} className="login-box">
        {loading && (
          <div className="overlay">
            <ClipLoader size={50} />
          </div>
        )}

        <h2>Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouchedEmail(true)}
          />
          <p className="error">
            {touchedEmail && !email ? "Email is required" : ""}
          </p>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouchedPassword(true)}
          />
          <p className="error">
            {touchedPassword && !password ? "Password is required" : ""}
          </p>
        </div>
        {error && <p style={{ color: "red" }}> {error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

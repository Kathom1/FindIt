import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  // Optional: lightweight strength indicator (no blocking)
  const checkPasswordStrength = (pwd) => {
    if (pwd.length >= 8) {
      setPasswordStrength("Strong");
    } else if (pwd.length >= 5) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we log you in...");
    setError("");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);

      const respond = await axios.post(
        "http://stacykiboko.alwaysdata.net/api/signin",
        data
      );

      setLoading("");

      if (respond.data.user) {
        localStorage.setItem("user", JSON.stringify(respond.data.user));
        navigate("/");
      } else {
        setError(respond.data.message);
      }
    } catch (err) {
      setLoading("");
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="card login-card shadow-lg p-4">
        <h3 className="text-center text-success mb-3">Log In</h3>

        {loading && <div className="alert alert-info">{loading}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Username"
            className="form-control mb-3"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* 🔐 Password with eye */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control pe-5"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
            />

            {/* 👁️ Eye toggle */}
            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>

            {/* Optional strength indicator */}
            {password && (
              <small
                className={
                  passwordStrength === "Strong"
                    ? "text-success"
                    : passwordStrength === "Medium"
                    ? "text-warning"
                    : "text-danger"
                }
              >
                Strength: {passwordStrength}
              </small>
            )}
          </div>

          <button className="btn btn-success w-100">
            Log In
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-success fw-bold">
              Sign Up
            </Link>
          </small>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff, #e8f5e9);
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          border-radius: 15px;
        }

        .form-control:focus {
          border-color: #198754;
          box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
        }

        .toggle-eye {
          position: absolute;
          right: 15px;
          top: 10px;
          cursor: pointer;
          font-size: 18px;
          color: #198754;
        }

        .toggle-eye:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default LogIn;
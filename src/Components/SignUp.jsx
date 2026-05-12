import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 Password strength checker
  const checkPasswordStrength = (pwd) => {
    let strength = "Weak";

    const hasLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);

    if (hasLength && hasUpper && hasLower && hasNumber && hasSymbol) {
      strength = "Strong";
      setPasswordError("");
    } else if (hasLength && (hasUpper || hasNumber)) {
      strength = "Medium";
      setPasswordError("Include uppercase, number, and symbol.");
    } else {
      strength = "Weak";
      setPasswordError("Min 8 chars + mix letters, numbers & symbols.");
    }

    setPasswordStrength(strength);
  };

  // 🚀 Submit
    const submit = async (e) => {
  e.preventDefault();

  setLoading("Please wait as we upload your data...");
  setError("");
  setSuccess("");

  // BLOCK WEAK PASSWORDS
  if (passwordStrength !== "Strong") {
    setLoading("");
    setError("Please choose a stronger password.");
    return;
  }

  try {
    const data = new FormData();

    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("phone", phone);

    const response = await axios.post(
      "https://stacykiboko.alwaysdata.net/api/signup",
      data
    );

    console.log("SIGNUP RESPONSE:", response.data);

    setLoading("");

    // SUCCESS
    if (
      response.data.success ||
      response.data.message
    ) {

      setSuccess(
        response.data.success ||
        "Account created successfully"
      );

      // CREATE USER OBJECT MANUALLY
      const user = {
        username,
        email,
        phone,
      };

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // UPDATE NAVBAR IMMEDIATELY
      window.dispatchEvent(
        new Event("userChanged")
      );

      // CLEAR FORM
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      // REDIRECT
      setTimeout(() => {
        navigate("/browse");
      }, 1000);

    } else {
      setError(
        response.data.message ||
        "Signup failed"
      );
    }

  } catch (err) {
    console.log(err);

    setLoading("");

    setError(
      err.response?.data?.message ||
      err.message ||
      "Something went wrong"
    );
  }
};

      

      
  return (
    <div className="signup-page d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 signup-card">
        <h3 className="text-center mb-4 text-success">Create Account</h3>

        {loading && <div className="alert alert-info">{loading}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Username"
            className="form-control mb-3"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 🔐 Password with eye + strength */}
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

            {/* Strength text */}
            {password && (
              <>
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

                {passwordError && (
                  <div>
                    <small className="text-danger">{passwordError}</small>
                  </div>
                )}

                {/* Progress bar */}
                <div className="progress mt-1" style={{ height: "5px" }}>
                  <div
                    className={`progress-bar ${
                      passwordStrength === "Strong"
                        ? "bg-success"
                        : passwordStrength === "Medium"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                    style={{
                      width:
                        passwordStrength === "Strong"
                          ? "100%"
                          : passwordStrength === "Medium"
                          ? "60%"
                          : "30%",
                    }}
                  ></div>
                </div>
              </>
            )}
          </div>

          <input
            type="text"
            placeholder="Phone"
            className="form-control mb-3"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={passwordStrength !== "Strong"}
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-success fw-bold">
              Login
            </Link>
          </small>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .signup-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff, #e8f5e9);
        }

        .signup-card {
          width: 100%;
          max-width: 400px;
          border-radius: 15px;
          background: #ffffff;
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

export default SignUp;
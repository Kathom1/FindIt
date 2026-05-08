import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user") {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (err) {
          setUser(null);
        }
      }
    };

    const onUserChanged = () => {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch (err) {
        setUser(null);
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("userChanged", onUserChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("userChanged", onUserChanged);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    // notify other listeners in this tab
    window.dispatchEvent(new Event("userChanged"));
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          FINDORA
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/browse">
                Browse
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/post">
                Post
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/signup">
                    Sign Up
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-light text-success ms-3 px-3" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">
                    Profile
                  </Link>
                </li>
                

                <li className="nav-item">
                  <button className="btn btn-light text-danger ms-3 px-3" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .custom-navbar {
          background: linear-gradient(90deg, #198754, #0d6efd);
        }

        .nav-link {
          transition: 0.3s;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #d1e7dd !important;
          transform: translateY(-1px);
        }

        .navbar-brand {
          letter-spacing: 1px;
        }

        .btn-light {
          border-radius: 20px;
          font-weight: 500;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
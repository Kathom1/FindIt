import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // CHECK USER
  // =========================
  const checkUser = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  // =========================
  // LOAD USER
  // =========================
  useEffect(() => {
    checkUser();

    // listen for login/signup changes
    window.addEventListener(
      "userChanged",
      checkUser
    );

    return () => {
      window.removeEventListener(
        "userChanged",
        checkUser
      );
    };
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);

    window.dispatchEvent(
      new Event("userChanged")
    );

    navigate("/login");
  };

  // =========================
  // ACTIVE LINK
  // =========================
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar sticky-top shadow">

        <div className="container">

          {/* LOGO */}
          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="/"
          >
            <div className="logo-circle me-2">
              🔍
            </div>

            <span className="brand-text">
              FINDORA
            </span>
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NAV LINKS */}
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >

            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

              {/* HOME */}
              <li className="nav-item">
                <Link
                  className={`nav-link nav-custom-link ${
                    isActive("/")
                      ? "active-link"
                      : ""
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* BROWSE */}
              <li className="nav-item">
                <Link
                  className={`nav-link nav-custom-link ${
                    isActive("/browse")
                      ? "active-link"
                      : ""
                  }`}
                  to="/browse"
                >
                  Browse
                </Link>
              </li>

              {/* POST */}
              <li className="nav-item">
                <Link
                  className={`nav-link nav-custom-link ${
                    isActive("/post")
                      ? "active-link"
                      : ""
                  }`}
                  to="/post"
                >
                  Post Item
                </Link>
              </li>

              {/* LOGGED IN */}
              {user ? (
                <>
                  <li className="nav-item ms-lg-3 my-2 my-lg-0">
                    <div className="welcome-badge">
                      👋 Welcome,{" "}
                      <span className="fw-bold">
                        {user.username ||
                          "User"}
                      </span>
                    </div>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn logout-btn"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* LOGIN */}
                  <li className="nav-item ms-lg-3">
                    <Link
                      className="btn login-btn"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>

                  {/* SIGNUP */}
                  <li className="nav-item">
                    <Link
                      className="btn signup-btn"
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

            </ul>

          </div>

        </div>

      </nav>

      {/* STYLES */}
      <style>{`
        .custom-navbar {
          background: linear-gradient(
            90deg,
            #0d6efd 0%,
            #198754 100%
          );
          padding: 14px 0;
        }

        .navbar-brand {
          color: white !important;
          font-size: 1.4rem;
        }

        .brand-text {
          color: white;
        }

        .logo-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-custom-link {
          color: rgba(255,255,255,0.9) !important;
          font-weight: 500;
          padding: 8px 16px !important;
          border-radius: 10px;
          transition: 0.3s;
        }

        .nav-custom-link:hover {
          background: rgba(255,255,255,0.15);
          color: white !important;
        }

        .active-link {
          background: rgba(255,255,255,0.2);
          color: white !important;
        }

        .welcome-badge {
          background: white;
          color: #198754;
          padding: 10px 18px;
           border-radius: 30px;
        }

        .login-btn {
          border: 2px solid white;
          color: white;
          border-radius: 30px;
          padding: 8px 20px;
        }

        .login-btn:hover {
          background: white;
          color: #0d6efd;
        }

        .signup-btn {
          background: white;
          color: #198754;
          border-radius: 30px;
           padding: 8px 22px;
          font-weight: 700;
        }

        .logout-btn {
          background: white;
           color: #dc3545;
           border-radius: 30px;
        }

        @media (max-width: 991px) {
          .navbar-nav {
            margin-top: 15px;
            gap: 10px;
          }

          .login-btn,
          .signup-btn,
          .logout-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
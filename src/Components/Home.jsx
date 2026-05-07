import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");

  const handleProtectedRoute = (path) => {
    if (!isLoggedIn) {
      setMessage("Please log in to continue");
      setTimeout(() => {
        navigate("/login");
      }, 1500); // wait 1.5s so user sees message
    } else {
      navigate(path);
    }
  };

  return (
    <div className="container py-5">

      {/* Message */}
      {message && (
        <div className="alert alert-warning text-center">
          {message}
        </div>
      )}

      <div className="row align-items-center">

        {/* Left Side */}
        <div className="col-md-6">

          <div className="info-bubble mb-4">
            <p className="mb-0 text-dark">
              Welcome to <strong>FINDORA</strong> 👋
              <br />
              This platform helps you easily report lost items and claim found ones in a safe and fast way.
              <br /><br />
              <b>How It Works</b>
            </p>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 flex-wrap">
            <button
              onClick={() => handleProtectedRoute("/post")}
              className="btn btn-danger px-4 py-2"
            >
              Report Lost Item
            </button>

            <button
              onClick={() => handleProtectedRoute("/browse")}
              className="btn btn-success px-4 py-2"
            >
              Claim Lost Item
            </button>
          </div>

        </div>

        {/* Right Side */}
        <div className="col-md-6 text-center mt-4 mt-md-0 ">
          <img
            src="/lof/8611501.jpg"
            alt="Illustration"
            className="img-fluid hero-img"
          />
        </div>

      </div>

      {/* Styles */}
      <style>{`
        .info-bubble {
          background: #ffffff;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          border-left: 4px solid #198754;
          max-width: 420px;
        }

        .hero-img {
          max-height: 320px;
        }
      `}</style>
    </div>
  );
};

export default Hero;
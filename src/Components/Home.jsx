import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* Left Side */}
        <div className="col-md-6">

          {/* Info Bubble */}
          <div className="info-bubble mb-4">
            <p className="mb-0 text-dark">
              Welcome to <strong>FINDORA</strong> 👋
               <br />
              This platform helps you easily report lost items and claim found ones in a safe and fast way.
              <br /><br />
              <b>How It Works</b>
             <br />
            </p>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 flex-wrap">
            <Link to="/report" className="btn btn-danger px-4 py-2">
              Report Lost Item
            </Link>

            <Link to="/claim" className="btn btn-success px-4 py-2">
              Claim Lost Item
            </Link>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            src="https://illustrations.popsy.co/green/lost-and-found.svg"
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
          border-left: 4px solid #198754; /* green accent */
          max-width: 420px;
        }

        .hero-img {
          max-height: 320px;
        }

        .btn-success {
          background-color: #198754;
          border: none;
        }

        .btn-success:hover {
          background-color: #157347;
        }

        .btn-danger {
          background-color: #dc3545;
          border: none;
        }

        .btn-danger:hover {
          background-color: #bb2d3b;
        }
      `}</style>
    </div>
  );
};

export default Hero;
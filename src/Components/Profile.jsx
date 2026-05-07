import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Example user data (replace with real auth data / context / backend)
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="container text-center py-5">
        <h4>You are not logged in</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="profile-card mx-auto">

        {/* Avatar */}
        <div className="text-center mb-3">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Profile"
            className="profile-avatar"
          />
        </div>

        {/* Info */}
        <h3 className="text-center">{user.name}</h3>
        <p className="text-center text-muted">{user.email}</p>

        <hr />

        <div className="profile-info">
          <p><b>Username:</b> {user.username}</p>
          <p><b>Phone:</b> {user.phone || "Not set"}</p>
          <p><b>Account Type:</b> User</p>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>

      {/* Styles */}
      <style>{`
        .profile-card {
          max-width: 420px;
          background: #fff;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #198754;
        }

        .profile-info p {
          margin: 6px 0;
        }
      `}</style>
    </div>
  );
};

export default Profile;
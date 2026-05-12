import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ user }) => {
  // prefer prop, but fall back to localStorage so the component works when not passed a user prop
  const storedUser = user || (() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  })();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Posting...");

    try {
      const data = new FormData();

      data.append("title", title);
      data.append("category", category);
      data.append("description", description);
      data.append("location", location);
      data.append("date", date);
      data.append("photo", photo);

      // If user is logged in, use their details
      if (storedUser) {
        data.append("user_id", storedUser.id);
      } else {
        setLoading("");
        setError('Please log in to post an item');
        return;
      }

      const response = await axios.post(
        "https://stacykiboko.alwaysdata.net/api/add_product",
        data
      );

      setLoading("");
      setSuccess(response.data.success);

      // reset form
      setTitle("");
      setCategory("");
      setDescription("");
      setLocation("");
      setDate("");
      setPhoto("");

    } catch (err) {
      setLoading("");
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card post-card p-4 shadow-lg">
        <h3 className="text-center mb-3 text-success">Create a Post</h3>

        {loading && <div className="text-warning">{loading}</div>}
        {error && <div className="text-danger">{error}</div>}
        {success && <div className="text-success">{success}</div>}

        <form onSubmit={submit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Category (e.g Lost,Found)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <input
            type="date"
            className="form-control mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* If NOT logged in - show a note */}
          {!storedUser && (
            <div className="alert alert-info text-center">Please log in to post an item</div>
          )}

          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />

          <button className="btn btn-success w-100" disabled={!storedUser}>
            Post Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
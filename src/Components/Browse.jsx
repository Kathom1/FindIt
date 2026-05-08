import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getPosts = async () => {
    setLoading("Loading posts...");
    try {
      const response = await axios.get(
        "https://stacykiboko.alwaysdata.net/api/get_product_details"
      );
      setPosts(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // 🔍 FILTER + SEARCH + SORT
  const processedPosts = posts
    .filter((post) => {
      const title = (post.title || post.product_name || "").toLowerCase();
      const desc = (post.description || post.product_description || "").toLowerCase();
      const category = (post.category || "").toLowerCase();
      const location = (post.location || "").toLowerCase();

      const matchesSearch =
        title.includes(search.toLowerCase()) ||
        desc.includes(search.toLowerCase()) ||
        location.includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || category === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);

      if (sort === "newest") return dateB - dateA;
      if (sort === "oldest") return dateA - dateB;

      if (sort === "az") {
        return (a.title || "").localeCompare(b.title || "");
      }

      return 0;
    });

  // 📄 Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPosts = processedPosts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(processedPosts.length / itemsPerPage);

  return (
    <div className="container mt-4">

      {/* Header */}
      <h2 className="text-center text-success mb-4">
        Available Posts
      </h2>

      {/* 🔍 SEARCH + SORT + FILTER */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-10 d-flex flex-wrap gap-2">

          {/* Search */}
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Sort */}
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A - Z</option>
          </select>

          {/* Filter */}
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
            <option value="sale">Sale</option>
          </select>

        </div>
      </div>

      {loading && <div className="text-center text-warning">{loading}</div>}
      {error && <div className="text-center text-danger">{error}</div>}

      {/* 📦 POSTS */}
      <div className="row">
        {currentPosts.map((post, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">

            <div className="card post-card shadow-sm h-100">

              <div className="card-body d-flex flex-column">

                {/* Title */}
                <h5 className="text-success fw-bold">
                  {post.title || post.product_name}
                </h5>

                {/* Category */}
                <span className="badge bg-success mb-2 w-fit">
                  {post.category || "General"}
                </span>

                {/* Description */}
                <p className="text-muted small">
                  {post.description || post.product_description}
                </p>

                {/* Location */}
                <div className="small mb-1">
                  📍 {post.location || "Unknown"}
                </div>

                {/* Date */}
                <div className="small text-secondary mb-2">
                  📅 {post.date || "No date"}
                </div>

                {/* Verification hint */}
                <div className="alert alert-light border small py-2">
                  🔒 Verification required to claim
                </div>

                {/* Button */}
                <button
                  className="btn btn-success mt-auto w-100"
                  onClick={() => {
                    const user = localStorage.getItem("user");
                    if (user) {
                      navigate("/mpesapayment", { state: { post } });
                    } else {
                      // Not logged in -> send to login and ask to return to browse after auth
                      navigate("/login", { state: { from: "/browse" } });
                    }
                  }}
                >
                  View / Claim
                </button>

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 📄 PAGINATION */}
      <div className="d-flex justify-content-center mt-4 gap-2">

        <button
          className="btn btn-outline-success"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-success"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>

      {/* 🎨 Styling */}
      <style>{`
        .search-bar {
          border-radius: 25px;
        }

        .post-card {
          border-radius: 12px;
          border-left: 4px solid #198754;
          transition: 0.3s ease;
        }

        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .w-fit {
          width: fit-content;
        }
      `}</style>

    </div>
  );
};

export default Browse;
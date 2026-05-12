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

  const IMAGE_BASE =
    "https://stacykiboko.alwaysdata.net/static/images/";

  // =========================
  // FETCH POSTS
  // =========================
  const getPosts = async () => {
    setLoading("Loading posts...");

    try {
      const response = await axios.get(
        "https://stacykiboko.alwaysdata.net/api/get_products_details"
      );

      const payload =
        response.data?.data ?? response.data ?? [];

      const items = Array.isArray(payload)
        ? payload
        : [];

      const normalized = items.map((p) => ({
        ...p,
        title:
          p.title ||
          p.product_name ||
          p.name ||
          "",

        category:
          p.category || "",

        description:
          p.description ||
          p.product_description ||
          "",

        location:
          p.location || "",

        date:
          p.date || "",

        photo:
          p.photo ||
          p.image ||
          p.product_image ||
          "",
      }));

      setPosts(normalized);
      setLoading("");
    } catch (err) {
      setError("Failed to load posts");
      setLoading("");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // =========================
  // IMAGE HANDLER
  // =========================
  const getImageUrl = (photo) => {
    if (!photo) {
      return "https://via.placeholder.com/300x200?text=No+Image";
    }

    if (photo.startsWith("http")) {
      return photo;
    }

    return IMAGE_BASE + photo;
  };

  // =========================
  // FILTER + SEARCH + SORT
  // =========================
  const processedPosts = posts
    .filter((post) => {
      const title = (post.title || "").toLowerCase();
      const desc = (post.description || "").toLowerCase();
      const location = (post.location || "").toLowerCase();
      const category = (post.category || "").toLowerCase();

      const matchesSearch =
        title.includes(search.toLowerCase()) ||
        desc.includes(search.toLowerCase()) ||
        location.includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        category === filter.toLowerCase();

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

  const indexOfLast =
    currentPage * itemsPerPage;

  const indexOfFirst =
    indexOfLast - itemsPerPage;

  const currentPosts =
    processedPosts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(
    processedPosts.length / itemsPerPage
  );

  // =========================
  // VIEW BUTTON LOGIC
  // =========================
  const handleView = (post) => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login", {
        state: {
          from: "/browse",
          message: "Please log in to view item details",
        },
      });
      return;
    }

    // simple view page (you can create later)
    navigate("/post-details", {
      state: { post },
    });
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <h2 className="text-center text-primary fw-bold mb-4">
        Available Posts
      </h2>

      {/* SEARCH / FILTER / SORT */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-10 d-flex flex-wrap gap-2">

          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search posts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="form-select"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A - Z</option>
          </select>

          <select
            className="form-select"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="all">All</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
            <option value="sale">Sale</option>
          </select>

        </div>
      </div>

      {loading && (
        <div className="text-center text-warning">
          {loading}
        </div>
      )}

      {error && (
        <div className="text-center text-danger">
          {error}
        </div>
      )}

      {/* CARDS */}
      <div className="row">

        {currentPosts.map((post, index) => (
          <div
            key={index}
            className="col-md-4 col-sm-6 mb-4"
          >

            <div className="card shadow-lg border-0 h-100 post-card">

              {/* IMAGE */}
              <img
                src={getImageUrl(post.photo)}
                alt={post.title}
                className="card-img-top post-image"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=Image+Not+Found";
                }}
              />

              <div className="card-body d-flex flex-column">

                <h5 className="text-primary fw-bold">
                  {post.title}
                </h5>

                <span className="badge bg-success mb-2 w-fit">
                  {post.category || "General"}
                </span>

                <p className="text-muted small">
                  {post.description}
                </p>

                <div className="small text-secondary">
                  📍 {post.location || "Unknown"}
                </div>

                <div className="small text-secondary mb-2">
                  📅 {post.date || "No date"}
                </div>

                {/* VIEW BUTTON ONLY */}
                <button
                  className="btn btn-primary w-100 mt-auto view-btn"
                  onClick={() => handleView(post)}
                >
                  Claim Item
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center mt-4 gap-2">

        <button
          className="btn btn-outline-success"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-success"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>

      </div>

      {/* STYLES */}
      <style>{`
        .search-bar {
          border-radius: 25px;
        }

        .post-card {
          border-radius: 15px;
          transition: 0.3s ease;
          border-top: 3px solid #0d6efd;
        }

        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(13,110,253,0.2);
        }

        .post-image {
          height: 200px;
          object-fit: cover;
        }

        .view-btn {
          background: linear-gradient(90deg, #0d6efd, #198754);
          border: none;
          font-weight: 600;
        }

        .view-btn:hover {
          opacity: 0.9;
        }

        .w-fit {
          width: fit-content;
        }
      `}</style>

    </div>
  );
};

export default Browse;
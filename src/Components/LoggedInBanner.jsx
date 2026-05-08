import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LoggedInBanner = () => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'user') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
          setVisible(true);
        } catch (err) {
          setUser(null);
        }
      }
    };

    const onUserChanged = () => {
      try {
        const raw = localStorage.getItem('user');
        setUser(raw ? JSON.parse(raw) : null);
        setVisible(true);
      } catch (err) {
        setUser(null);
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('userChanged', onUserChanged);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('userChanged', onUserChanged);
    };
  }, []);

  if (!user || !visible) return null;

  const getDisplay = (u) => {
    if (!u) return 'you';
    if (typeof u === 'string') return u;
    return (
      u.username || u.name || u.email || (u.data && (u.data.username || u.data.name)) || 'you'
    );
  };

  const display = getDisplay(user);

  return (
    <div className="container mt-3">
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Logged in as {display}</strong>
        <span className="ms-2">— Welcome back!</span>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setVisible(false)}></button>
        <div className="mt-2 small">
          <Link to="/profile" className="text-decoration-underline text-success">View profile</Link>
        </div>
      </div>
    </div>
  );
};

export default LoggedInBanner;

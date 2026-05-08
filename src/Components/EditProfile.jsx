import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    avatar: ''
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      const parsed = raw ? JSON.parse(raw) : null;
      setUser(parsed);
      if (parsed) {
        setForm({
          name: parsed.name || '',
          username: parsed.username || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          avatar: parsed.avatar || ''
        });
      }
    } catch (e) {
      setUser(null);
    }
  }, []);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h4>Please log in to edit your profile</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/login')}>
          Go to Login
        </button>
      </div>
    );
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading('Saving...');
    setError('');
    setSuccess('');

    // Basic validation
    if (!form.username || !form.email) {
      setError('Username and email are required');
      setLoading('');
      return;
    }

    try {
      // Optional: attempt to send update to server if endpoint exists
      // await axios.post('http://stacykiboko.alwaysdata.net/api/update_profile', form);

      const updated = { ...user, ...form };
      localStorage.setItem('user', JSON.stringify(updated));
      // notify other UI pieces
      window.dispatchEvent(new Event('userChanged'));

      setSuccess('Profile updated');
      setLoading('');

      setTimeout(() => navigate('/profile'), 800);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      setLoading('');
    }
  };

  return (
    <div className="container py-5">
      <div className="card mx-auto p-4" style={{ maxWidth: 600 }}>
        <h4 className="mb-3">Edit Profile</h4>

        {loading && <div className="alert alert-info">{loading}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input name="name" value={form.name} onChange={onChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input name="username" value={form.username} onChange={onChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input name="phone" value={form.phone} onChange={onChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Avatar URL</label>
            <input name="avatar" value={form.avatar} onChange={onChange} className="form-control" />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success" type="submit">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/profile')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

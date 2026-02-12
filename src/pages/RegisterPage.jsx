import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../services/api/authApi';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2 || form.name.trim().length > 15) errs.name = 'Name must be 2–15 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password.trim()) errs.password = 'Password is required';
    else if (form.password.length < 8 || form.password.length > 20) errs.password = 'Password must be 8–20 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await registerUser(form);
      toast.success('Account created! Please check your email to verify.');
      navigate('/login');
      
    } catch (err) {
      console.error('Registration error:', err);
      if (!err.response) {
        // Network error — backend not running
        toast.error('Cannot connect to server. Make sure the backend is running on port 8080.');
        return;
      }
      const data = err.response.data;
      const status = err.response.status;
      if (status === 400 && data?.errors && typeof data.errors === 'object') {
        // Validation errors — show under each field
        setErrors(data.errors);
        toast.error(data.message || 'Please fix the errors below');
      } else if (status === 409) {
        // Email already exists
        toast.error(data?.errors || data?.message || 'Email already exists');
      } else {
        // Generic server error
        toast.error(data?.message || data?.errors || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <div style={{ position: 'relative' }}>
            <HiOutlineUser style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className={`form-input ${errors.name ? 'error' : ''}`}
              value={form.name}
              onChange={handleChange}
              style={{ paddingLeft: 36 }}
            />
          </div>
          <span className="form-error">{errors.name || ''}</span>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <div style={{ position: 'relative' }}>
            <HiOutlineMail style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={form.email}
              onChange={handleChange}
              style={{ paddingLeft: 36 }}
            />
          </div>
          <span className="form-error">{errors.email || ''}</span>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <HiOutlineLockClosed style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Min 8 characters"
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={form.password}
              onChange={handleChange}
              style={{ paddingLeft: 36, paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 10, top: 8, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
            </button>
          </div>
          <span className="form-error">{errors.password || ''}</span>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
          {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Create Account'}
        </button>
      </form>

      <div className="auth-footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;

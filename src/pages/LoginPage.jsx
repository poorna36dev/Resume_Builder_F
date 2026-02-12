import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, resendVerification } from '../services/api/authApi';
import { useAuth } from '../context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password.trim()) errs.password = 'Password is required';
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
      const res = await loginUser(form);
      login(res.data);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors || 'Login failed';

      // If the user hasn't verified their email, auto-resend verification email
      if (typeof msg === 'string' && msg.toLowerCase().includes('verify')) {
        try {
          await resendVerification(form.email);
          toast.info('📧 Your email is not verified. A new verification link has been sent to your inbox!');
        } catch (resendErr) {
          // If resend also fails (e.g. already verified race condition), show original error
          toast.error('Email not verified. Please check your inbox or try again later.');
        }
      } else {
        toast.error(typeof msg === 'string' ? msg : 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
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
              placeholder="••••••••"
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
          {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Sign In'}
        </button>
      </form>

      <div className="auth-footer">
        Don't have an account? <Link to="/register">Create one</Link>
      </div>
    </div>
  );
};

export default LoginPage;

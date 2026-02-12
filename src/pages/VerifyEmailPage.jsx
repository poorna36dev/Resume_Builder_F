import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyEmail } from '../services/api/authApi';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('No verification token provided.');
        return;
      }
      try {
        const res = await verifyEmail(token);
        setStatus('success');
        setMessage(res.data?.message || 'Email verified successfully!');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || err.response?.data?.errors || 'Verification failed. The link may be expired.');
      }
    };
    verify();
  }, [token]);

  return (
    <div className="verify-email-page">
      {status === 'loading' && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Verifying your email...</p>
        </div>
      )}

      {status === 'success' && (
        <>
          <div className="verify-icon success">
            <HiOutlineCheckCircle />
          </div>
          <h2 style={{ marginBottom: 12 }}>Email Verified!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{message}</p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Continue to Login
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="verify-icon error">
            <HiOutlineXCircle />
          </div>
          <h2 style={{ marginBottom: 12 }}>Verification Failed</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{message}</p>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Go to Login
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;

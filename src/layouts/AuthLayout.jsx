import { Outlet } from 'react-router-dom';

/**
 * AuthLayout — centered card layout for login/register/verify pages.
 */
const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>ResumeForge</h1>
          <p>Build stunning resumes in minutes</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

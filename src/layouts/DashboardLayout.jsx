import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineDocumentText, HiOutlineUser, HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';

/**
 * DashboardLayout — sidebar + topbar + main content area.
 */
const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Derive page title from route
  const getPageTitle = () => {
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname === '/profile') return 'Profile';
    return 'ResumeForge';
  };

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">ResumeForge</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <HiOutlineViewGrid />
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <HiOutlineUser />
            Profile
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt={user.name} />
              ) : (
                getInitials(user?.name)
              )}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-email">{user?.email || ''}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={logout} style={{ width: '100%', marginTop: '8px' }}>
            <HiOutlineLogout /> Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="topbar">
          <h1 className="topbar-title">{getPageTitle()}</h1>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

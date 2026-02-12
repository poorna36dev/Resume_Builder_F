import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/api/authApi';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

/* Safely parse stored user JSON */
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  // On mount — try to refresh user data from the backend,
  // but NEVER logout automatically. Just use cached data if it fails.
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await getProfile();
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch {
          // Silently ignore — keep whatever user data is in localStorage.
          // The user stays logged in with cached data.
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** Login — persist token + user to localStorage and state */
  const login = (authResponse) => {
    const { token: jwt, ...userData } = authResponse;
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
  };

  /** Logout — only called when user clicks "Log Out" */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  /** Update user data in state + localStorage */
  const updateUser = (userData) => {
    setUser((prev) => {
      const updated = { ...prev, ...userData };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="loading-overlay" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

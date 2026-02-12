import { useAuth } from '../context/AuthContext';
import { HiOutlineShieldCheck, HiOutlineClock, HiOutlineStar } from 'react-icons/hi';

const ProfilePage = () => {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="profile-page animate-fade-in">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} alt={user.name} />
          ) : (
            getInitials(user?.name)
          )}
        </div>
        <h2 className="profile-name">{user?.name}</h2>
        <p className="profile-email">{user?.email}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {user?.emailVerified ? (
            <span className="badge badge-success"><HiOutlineShieldCheck /> Verified</span>
          ) : (
            <span className="badge badge-warning">Unverified</span>
          )}
          <span className="badge badge-info"><HiOutlineStar /> {user?.subscriptionPlan || 'Basic'}</span>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <div className="profile-info-label">Subscription</div>
            <div className="profile-info-value" style={{ textTransform: 'capitalize' }}>
              {user?.subscriptionPlan || 'Basic'}
            </div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">Email Status</div>
            <div className="profile-info-value">
              {user?.emailVerified ? 'Verified ✓' : 'Pending'}
            </div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">Member Since</div>
            <div className="profile-info-value">
              <HiOutlineClock style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {formatDate(user?.createdAt)}
            </div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">Last Updated</div>
            <div className="profile-info-value">
              {formatDate(user?.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

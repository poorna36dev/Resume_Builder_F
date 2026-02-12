import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserResumes, createResume, deleteResume } from '../services/api/resumeApi';
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineDocumentText } from 'react-icons/hi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await getUserResumes();
      setResumes(res.data);
    } catch {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) { toast.error('Please enter a title'); return; }
    setCreating(true);
    try {
      const res = await createResume(newTitle);
      toast.success('Resume created!');
      setShowCreateModal(false);
      setNewTitle('');
      navigate(`/resume/${res.data._id}/edit`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create resume');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this resume?')) return;
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success('Resume deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="dashboard-header">
        <h1>My Resumes</h1>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <HiOutlinePlus /> New Resume
        </button>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{resumes.length}</div>
          <div className="stat-label">Total Resumes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{resumes.filter((r) => r.updatedAt).length}</div>
          <div className="stat-label">Recently Updated</div>
        </div>
      </div>

      {/* Resume Grid */}
      {loading ? (
        <div className="resume-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="resume-card">
              <div className="resume-card-thumbnail skeleton" />
              <div className="resume-card-body">
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-text" style={{ width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><HiOutlineDocumentText /></div>
          <div className="empty-state-title">No Resumes Yet</div>
          <p className="empty-state-description">Create your first resume and start building your professional profile.</p>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            <HiOutlinePlus /> Create Your First Resume
          </button>
        </div>
      ) : (
        <div className="resume-grid">
          {/* Create new card */}
          <div className="create-resume-card" onClick={() => setShowCreateModal(true)}>
            <HiOutlinePlus />
            <span style={{ fontWeight: 600 }}>Create New Resume</span>
          </div>

          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="resume-card"
              onClick={() => navigate(`/resume/${resume._id}/edit`)}
            >
              <div className="resume-card-thumbnail">
                {resume.thumbnailLink ? (
                  <img src={resume.thumbnailLink} alt={resume.title} />
                ) : (
                  <div className="resume-card-thumbnail-placeholder">
                    <HiOutlineDocumentText />
                  </div>
                )}
              </div>
              <div className="resume-card-body">
                <div className="resume-card-title">{resume.title}</div>
                <div className="resume-card-date">
                  Updated {formatDate(resume.updatedAt || resume.createdAt)}
                </div>
              </div>
              <div className="resume-card-actions">
                <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); navigate(`/resume/${resume._id}/edit`); }}>
                  <HiOutlinePencil /> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, resume._id)}>
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Resume</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Resume Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Software Engineer Resume"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={creating}>
                {creating ? 'Creating...' : 'Create Resume'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

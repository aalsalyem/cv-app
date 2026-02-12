import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  type CvData,
  fetchCv,
  updatePersonalInfo,
  updateWorkExperience,
  deleteWorkExperience,
  updateSkill,
  deleteSkill,
  updateCertificate,
  deleteCertificate,
} from '../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

function ConsolePage() {
  const { user, loading, login, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      login(token);
      navigate('/console', { replace: true });
    }
  }, [searchParams, login, navigate]);

  useEffect(() => {
    if (!loading && user?.authenticated && user?.isAdmin) {
      loadCvData();
    }
  }, [loading, user]);

  const loadCvData = async () => {
    try {
      const response = await fetchCv();
      setCvData(response.data);
    } catch (error) {
      console.error('Failed to load CV data:', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSavePersonalInfo = async () => {
    if (!cvData?.personalInfo) return;
    setSaving(true);
    try {
      await updatePersonalInfo(cvData.personalInfo);
      showMessage('Personal info saved!');
    } catch (error) {
      showMessage('Failed to save');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateExperience = async (index: number) => {
    if (!cvData?.workExperience[index]) return;
    setSaving(true);
    try {
      const exp = cvData.workExperience[index];
      await updateWorkExperience(exp.id, exp);
      showMessage('Experience updated!');
    } catch (error) {
      showMessage('Failed to update');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await deleteWorkExperience(id);
      setCvData((prev) =>
        prev ? { ...prev, workExperience: prev.workExperience.filter((e) => e.id !== id) } : prev
      );
      showMessage('Experience deleted!');
    } catch (error) {
      showMessage('Failed to delete');
      console.error(error);
    }
  };

  const handleUpdateSkill = async (index: number) => {
    if (!cvData?.skills[index]) return;
    setSaving(true);
    try {
      const skill = cvData.skills[index];
      await updateSkill(skill.id, skill);
      showMessage('Skill updated!');
    } catch (error) {
      showMessage('Failed to update');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await deleteSkill(id);
      setCvData((prev) =>
        prev ? { ...prev, skills: prev.skills.filter((s) => s.id !== id) } : prev
      );
      showMessage('Skill deleted!');
    } catch (error) {
      showMessage('Failed to delete');
      console.error(error);
    }
  };

  const handleUpdateCertificate = async (index: number) => {
    if (!cvData?.certificates[index]) return;
    setSaving(true);
    try {
      const cert = cvData.certificates[index];
      await updateCertificate(cert.id, cert);
      showMessage('Certificate updated!');
    } catch (error) {
      showMessage('Failed to update');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    if (!confirm('Delete this certificate?')) return;
    try {
      await deleteCertificate(id);
      setCvData((prev) =>
        prev ? { ...prev, certificates: prev.certificates.filter((c) => c.id !== id) } : prev
      );
      showMessage('Certificate deleted!');
    } catch (error) {
      showMessage('Failed to delete');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="console-container">
        <div className="console-loading">Loading...</div>
      </div>
    );
  }

  if (!user?.authenticated) {
    return (
      <div className="console-container">
        <div className="console-login">
          <h1>Admin Console</h1>
          <p>Sign in to manage your CV</p>
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
          <a href="/" className="back-link">Back to CV</a>
        </div>
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div className="console-container">
        <div className="console-login">
          <h1>Access Denied</h1>
          <p>You don't have admin access.</p>
          <button onClick={logout}>Sign Out</button>
          <a href="/" className="back-link">Back to CV</a>
        </div>
      </div>
    );
  }

  return (
    <div className="console-container">
      <header className="console-header">
        <h1>Admin Console</h1>
        <div className="console-header-actions">
          <span>{user.email}</span>
          <button onClick={logout}>Sign Out</button>
          <a href="/" className="back-link">View CV</a>
        </div>
      </header>

      {message && <div className="console-message">{message}</div>}

      <nav className="console-tabs">
        <button className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>
          Personal Info
        </button>
        <button className={activeTab === 'experience' ? 'active' : ''} onClick={() => setActiveTab('experience')}>
          Experience
        </button>
        <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>
          Skills
        </button>
        <button className={activeTab === 'certificates' ? 'active' : ''} onClick={() => setActiveTab('certificates')}>
          Certificates
        </button>
      </nav>

      <main className="console-content">
        {activeTab === 'personal' && cvData?.personalInfo && (
          <div className="console-section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={cvData.personalInfo.name || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, name: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={cvData.personalInfo.email || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, email: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={cvData.personalInfo.phone || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, phone: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={cvData.personalInfo.location || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, location: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                type="text"
                value={cvData.personalInfo.linkedinUrl || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, linkedinUrl: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Objective</label>
              <textarea
                rows={4}
                value={cvData.personalInfo.objective || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, objective: e.target.value } })
                }
              />
            </div>
            <button className="save-btn" onClick={handleSavePersonalInfo} disabled={saving}>
              {saving ? 'Saving...' : 'Save Personal Info'}
            </button>
          </div>
        )}

        {activeTab === 'experience' && cvData?.workExperience && (
          <div className="console-section">
            <h2>Work Experience</h2>
            {cvData.workExperience.map((exp, index) => (
              <div key={exp.id} className="console-card">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={exp.title || ''}
                    onChange={(e) => {
                      const updated = [...cvData.workExperience];
                      updated[index] = { ...exp, title: e.target.value };
                      setCvData({ ...cvData, workExperience: updated });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => {
                      const updated = [...cvData.workExperience];
                      updated[index] = { ...exp, company: e.target.value };
                      setCvData({ ...cvData, workExperience: updated });
                    }}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate || ''}
                      onChange={(e) => {
                        const updated = [...cvData.workExperience];
                        updated[index] = { ...exp, startDate: e.target.value };
                        setCvData({ ...cvData, workExperience: updated });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="text"
                      value={exp.endDate || ''}
                      onChange={(e) => {
                        const updated = [...cvData.workExperience];
                        updated[index] = { ...exp, endDate: e.target.value };
                        setCvData({ ...cvData, workExperience: updated });
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Projects</label>
                  <input
                    type="text"
                    value={exp.projects || ''}
                    onChange={(e) => {
                      const updated = [...cvData.workExperience];
                      updated[index] = { ...exp, projects: e.target.value };
                      setCvData({ ...cvData, workExperience: updated });
                    }}
                  />
                </div>
                <div className="card-actions">
                  <button className="save-btn" onClick={() => handleUpdateExperience(index)} disabled={saving}>
                    Save
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteExperience(exp.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && cvData?.skills && (
          <div className="console-section">
            <h2>Skills</h2>
            <div className="console-grid">
              {cvData.skills.map((skill, index) => (
                <div key={skill.id} className="console-card compact">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={skill.name || ''}
                      onChange={(e) => {
                        const updated = [...cvData.skills];
                        updated[index] = { ...skill, name: e.target.value };
                        setCvData({ ...cvData, skills: updated });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={skill.category || ''}
                      onChange={(e) => {
                        const updated = [...cvData.skills];
                        updated[index] = { ...skill, category: e.target.value };
                        setCvData({ ...cvData, skills: updated });
                      }}
                    />
                  </div>
                  <div className="card-actions">
                    <button className="save-btn small" onClick={() => handleUpdateSkill(index)} disabled={saving}>
                      Save
                    </button>
                    <button className="delete-btn small" onClick={() => handleDeleteSkill(skill.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certificates' && cvData?.certificates && (
          <div className="console-section">
            <h2>Certificates</h2>
            {cvData.certificates.map((cert, index) => (
              <div key={cert.id} className="console-card">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={cert.name || ''}
                    onChange={(e) => {
                      const updated = [...cvData.certificates];
                      updated[index] = { ...cert, name: e.target.value };
                      setCvData({ ...cvData, certificates: updated });
                    }}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Issuer</label>
                    <input
                      type="text"
                      value={cert.issuer || ''}
                      onChange={(e) => {
                        const updated = [...cvData.certificates];
                        updated[index] = { ...cert, issuer: e.target.value };
                        setCvData({ ...cvData, certificates: updated });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="text"
                      value={cert.date || ''}
                      onChange={(e) => {
                        const updated = [...cvData.certificates];
                        updated[index] = { ...cert, date: e.target.value };
                        setCvData({ ...cvData, certificates: updated });
                      }}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  <button className="save-btn" onClick={() => handleUpdateCertificate(index)} disabled={saving}>
                    Save
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteCertificate(cert.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ConsolePage;

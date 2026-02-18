import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  type CvData,
  fetchCv,
  updatePersonalInfo,
  updateWorkExperience,
  deleteWorkExperience,
  createWorkExperience,
  updateEducation,
  deleteEducation,
  createEducation,
} from '../services/api';

const API_URL = import.meta.env.VITE_API_URL || '';

interface PortfolioItem {
  title: string;
  description: string;
}

interface ExpertiseItem {
  category: string;
  skills: string[];
}

function ConsolePage() {
  const { user, loading, login, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('site');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>('');

  // Parsed JSON states
  const [leadershipPoints, setLeadershipPoints] = useState<string[]>([]);
  const [productPortfolio, setProductPortfolio] = useState<PortfolioItem[]>([]);
  const [expertiseAreas, setExpertiseAreas] = useState<ExpertiseItem[]>([]);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      login(token);
      // Clear the token from URL without full reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams, login]);

  useEffect(() => {
    if (!loading && user?.authenticated && user?.isAdmin) {
      loadCvData();
    }
  }, [loading, user]);

  useEffect(() => {
    if (cvData?.personalInfo) {
      // Parse JSON fields
      try {
        setLeadershipPoints(cvData.personalInfo.leadershipPoints ? JSON.parse(cvData.personalInfo.leadershipPoints) : []);
      } catch { setLeadershipPoints([]); }
      try {
        setProductPortfolio(cvData.personalInfo.productPortfolio ? JSON.parse(cvData.personalInfo.productPortfolio) : []);
      } catch { setProductPortfolio([]); }
      try {
        setExpertiseAreas(cvData.personalInfo.expertiseAreas ? JSON.parse(cvData.personalInfo.expertiseAreas) : []);
      } catch { setExpertiseAreas([]); }
    }
  }, [cvData]);

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
      const updatedInfo = {
        ...cvData.personalInfo,
        leadershipPoints: JSON.stringify(leadershipPoints),
        productPortfolio: JSON.stringify(productPortfolio),
        expertiseAreas: JSON.stringify(expertiseAreas),
      };
      await updatePersonalInfo(updatedInfo);
      showMessage('Saved successfully!');
    } catch (error) {
      showMessage('Failed to save');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Leadership Points handlers
  const addLeadershipPoint = () => {
    setLeadershipPoints([...leadershipPoints, '']);
  };

  const updateLeadershipPoint = (index: number, value: string) => {
    const updated = [...leadershipPoints];
    updated[index] = value;
    setLeadershipPoints(updated);
  };

  const removeLeadershipPoint = (index: number) => {
    setLeadershipPoints(leadershipPoints.filter((_, i) => i !== index));
  };

  // Portfolio handlers
  const addPortfolioItem = () => {
    setProductPortfolio([...productPortfolio, { title: '', description: '' }]);
  };

  const updatePortfolioItem = (index: number, field: keyof PortfolioItem, value: string) => {
    const updated = [...productPortfolio];
    updated[index] = { ...updated[index], [field]: value };
    setProductPortfolio(updated);
  };

  const removePortfolioItem = (index: number) => {
    setProductPortfolio(productPortfolio.filter((_, i) => i !== index));
  };

  // Expertise handlers
  const addExpertiseArea = () => {
    setExpertiseAreas([...expertiseAreas, { category: '', skills: [] }]);
  };

  const updateExpertiseCategory = (index: number, value: string) => {
    const updated = [...expertiseAreas];
    updated[index] = { ...updated[index], category: value };
    setExpertiseAreas(updated);
  };

  const updateExpertiseSkills = (index: number, value: string) => {
    const updated = [...expertiseAreas];
    updated[index] = { ...updated[index], skills: value.split(',').map(s => s.trim()).filter(s => s) };
    setExpertiseAreas(updated);
  };

  const removeExpertiseArea = (index: number) => {
    setExpertiseAreas(expertiseAreas.filter((_, i) => i !== index));
  };

  // Experience handlers
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

  const handleAddExperience = async () => {
    try {
      const newExp = await createWorkExperience({
        title: 'New Position',
        company: 'Company Name',
        startDate: '2024',
        endDate: 'Present',
        responsibilities: [],
        sortOrder: (cvData?.workExperience?.length || 0) + 1,
      });
      setCvData((prev) =>
        prev ? { ...prev, workExperience: [...prev.workExperience, newExp.data] } : prev
      );
      showMessage('Experience added!');
    } catch (error) {
      showMessage('Failed to add');
      console.error(error);
    }
  };

  // Education handlers
  const handleUpdateEducation = async (index: number) => {
    if (!cvData?.education[index]) return;
    setSaving(true);
    try {
      const edu = cvData.education[index];
      await updateEducation(edu.id, edu);
      showMessage('Education updated!');
    } catch (error) {
      showMessage('Failed to update');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEducation = async (id: number) => {
    if (!confirm('Delete this education?')) return;
    try {
      await deleteEducation(id);
      setCvData((prev) =>
        prev ? { ...prev, education: prev.education.filter((e) => e.id !== id) } : prev
      );
      showMessage('Education deleted!');
    } catch (error) {
      showMessage('Failed to delete');
      console.error(error);
    }
  };

  const handleAddEducation = async () => {
    try {
      const newEdu = await createEducation({
        degree: 'Degree',
        field: 'Field of Study',
        school: 'University Name',
        startDate: '2020',
        endDate: '2024',
        sortOrder: (cvData?.education?.length || 0) + 1,
      });
      setCvData((prev) =>
        prev ? { ...prev, education: [...prev.education, newEdu.data] } : prev
      );
      showMessage('Education added!');
    } catch (error) {
      showMessage('Failed to add');
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
          <a href="//" className="back-link" onClick={(e) => { e.preventDefault(); window.location.href = window.location.protocol + '//cv.' + window.location.host.replace(/^admin\./, ''); }}>Back to CV</a>
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
          <a href="//" className="back-link" onClick={(e) => { e.preventDefault(); window.location.href = window.location.protocol + '//cv.' + window.location.host.replace(/^admin\./, ''); }}>Back to CV</a>
        </div>
      </div>
    );
  }

  return (
    <div className="console-container">
      <header className="console-header">
        <div className="console-header-left">
          <h1>Admin Console</h1>
        </div>
        <div className="console-header-right">
          <span className="console-user">{user.email}</span>
          <a href="//" className="console-btn secondary" onClick={(e) => { e.preventDefault(); window.location.href = window.location.protocol + '//cv.' + window.location.host.replace(/^admin\./, ''); }}>View CV</a>
          <button onClick={logout} className="console-btn">Sign Out</button>
        </div>
      </header>

      {message && <div className="console-message">{message}</div>}

      <nav className="console-tabs">
        <button className={activeTab === 'site' ? 'active' : ''} onClick={() => setActiveTab('site')}>
          Site Settings
        </button>
        <button className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}>
          Hero Section
        </button>
        <button className={activeTab === 'leadership' ? 'active' : ''} onClick={() => setActiveTab('leadership')}>
          Leadership
        </button>
        <button className={activeTab === 'portfolio' ? 'active' : ''} onClick={() => setActiveTab('portfolio')}>
          Portfolio
        </button>
        <button className={activeTab === 'experience' ? 'active' : ''} onClick={() => setActiveTab('experience')}>
          Experience
        </button>
        <button className={activeTab === 'expertise' ? 'active' : ''} onClick={() => setActiveTab('expertise')}>
          Expertise
        </button>
        <button className={activeTab === 'education' ? 'active' : ''} onClick={() => setActiveTab('education')}>
          Education
        </button>
        <button className={activeTab === 'vision' ? 'active' : ''} onClick={() => setActiveTab('vision')}>
          Vision
        </button>
      </nav>

      <main className="console-content">
        {/* Site Settings Tab */}
        {activeTab === 'site' && cvData?.personalInfo && (
          <div className="console-section">
            <h2>Site Settings</h2>
            <p className="section-description">Configure browser tab title and SEO metadata.</p>
            <div className="form-group">
              <label>Site Title (Browser Tab)</label>
              <input
                type="text"
                value={cvData.personalInfo.siteTitle || ''}
                placeholder="e.g., Abdulaziz Alsalyem | Director"
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, siteTitle: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Site Description (SEO)</label>
              <textarea
                rows={2}
                value={cvData.personalInfo.siteDescription || ''}
                placeholder="Description shown in search engine results"
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, siteDescription: e.target.value } })
                }
              />
            </div>
            <button className="save-btn" onClick={handleSavePersonalInfo} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Hero Section Tab */}
        {activeTab === 'hero' && cvData?.personalInfo && (
          <div className="console-section">
            <h2>Hero Section</h2>
            <p className="section-description">Edit your name, title, taglines, and contact information.</p>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={cvData.personalInfo.name || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, name: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={cvData.personalInfo.title || ''}
                placeholder="e.g., Director of Product Integration"
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, title: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Primary Tagline</label>
              <textarea
                rows={3}
                value={cvData.personalInfo.tagline || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, tagline: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Secondary Tagline</label>
              <textarea
                rows={3}
                value={cvData.personalInfo.taglineSecondary || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, taglineSecondary: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Executive Summary</label>
              <textarea
                rows={5}
                value={cvData.personalInfo.executiveSummary || ''}
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, executiveSummary: e.target.value } })
                }
              />
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Contact Information</h3>
            <div className="form-row">
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
            </div>
            <div className="form-row">
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
            </div>
            <button className="save-btn" onClick={handleSavePersonalInfo} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Leadership Tab */}
        {activeTab === 'leadership' && (
          <div className="console-section">
            <h2>Leadership & Strategic Impact</h2>
            <p className="section-description">Edit the bullet points that highlight your leadership achievements.</p>

            {leadershipPoints.map((point, index) => (
              <div key={index} className="console-card">
                <div className="form-group">
                  <label>Point {index + 1}</label>
                  <textarea
                    rows={2}
                    value={point}
                    onChange={(e) => updateLeadershipPoint(index, e.target.value)}
                  />
                </div>
                <button className="delete-btn small" onClick={() => removeLeadershipPoint(index)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="card-actions" style={{ marginTop: '1rem' }}>
              <button className="save-btn secondary" onClick={addLeadershipPoint}>
                + Add Point
              </button>
              <button className="save-btn" onClick={handleSavePersonalInfo} disabled={saving}>
                {saving ? 'Saving...' : 'Save All'}
              </button>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="console-section">
            <h2>Product Portfolio</h2>
            <p className="section-description">Showcase your key products and initiatives.</p>

            {productPortfolio.map((item, index) => (
              <div key={index} className="console-card">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updatePortfolioItem(index, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    value={item.description}
                    onChange={(e) => updatePortfolioItem(index, 'description', e.target.value)}
                  />
                </div>
                <button className="delete-btn small" onClick={() => removePortfolioItem(index)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="card-actions" style={{ marginTop: '1rem' }}>
              <button className="save-btn secondary" onClick={addPortfolioItem}>
                + Add Product
              </button>
              <button className="save-btn" onClick={handleSavePersonalInfo} disabled={saving}>
                {saving ? 'Saving...' : 'Save All'}
              </button>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && cvData?.workExperience && (
          <div className="console-section">
            <h2>Work Experience</h2>
            <p className="section-description">Manage your work history and responsibilities.</p>

            {cvData.workExperience.map((exp, index) => (
              <div key={exp.id} className="console-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title</label>
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
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate || ''}
                      placeholder="e.g., 2020"
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
                      placeholder="e.g., Present"
                      onChange={(e) => {
                        const updated = [...cvData.workExperience];
                        updated[index] = { ...exp, endDate: e.target.value };
                        setCvData({ ...cvData, workExperience: updated });
                      }}
                    />
                  </div>
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
            <button className="save-btn secondary" onClick={handleAddExperience} style={{ marginTop: '1rem' }}>
              + Add Experience
            </button>
          </div>
        )}

        {/* Expertise Tab */}
        {activeTab === 'expertise' && (
          <div className="console-section">
            <h2>Expertise Areas</h2>
            <p className="section-description">Define your areas of expertise with associated skills.</p>

            {expertiseAreas.map((area, index) => (
              <div key={index} className="console-card">
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={area.category}
                    onChange={(e) => updateExpertiseCategory(index, e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={area.skills.join(', ')}
                    placeholder="e.g., Platform strategy, Product governance, Enterprise integration"
                    onChange={(e) => updateExpertiseSkills(index, e.target.value)}
                  />
                </div>
                <button className="delete-btn small" onClick={() => removeExpertiseArea(index)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="card-actions" style={{ marginTop: '1rem' }}>
              <button className="save-btn secondary" onClick={addExpertiseArea}>
                + Add Expertise
              </button>
              <button className="save-btn" onClick={handleSavePersonalInfo} disabled={saving}>
                {saving ? 'Saving...' : 'Save All'}
              </button>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && cvData?.education && (
          <div className="console-section">
            <h2>Education</h2>
            <p className="section-description">Manage your educational background.</p>

            {cvData.education.map((edu, index) => (
              <div key={edu.id} className="console-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      placeholder="e.g., Bachelor of Science"
                      onChange={(e) => {
                        const updated = [...cvData.education];
                        updated[index] = { ...edu, degree: e.target.value };
                        setCvData({ ...cvData, education: updated });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Field of Study</label>
                    <input
                      type="text"
                      value={edu.field || ''}
                      placeholder="e.g., Computer Science"
                      onChange={(e) => {
                        const updated = [...cvData.education];
                        updated[index] = { ...edu, field: e.target.value };
                        setCvData({ ...cvData, education: updated });
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>School/University</label>
                  <input
                    type="text"
                    value={edu.school || ''}
                    onChange={(e) => {
                      const updated = [...cvData.education];
                      updated[index] = { ...edu, school: e.target.value };
                      setCvData({ ...cvData, education: updated });
                    }}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="text"
                      value={edu.startDate || ''}
                      placeholder="e.g., 2007"
                      onChange={(e) => {
                        const updated = [...cvData.education];
                        updated[index] = { ...edu, startDate: e.target.value };
                        setCvData({ ...cvData, education: updated });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="text"
                      value={edu.endDate || ''}
                      placeholder="e.g., 2012"
                      onChange={(e) => {
                        const updated = [...cvData.education];
                        updated[index] = { ...edu, endDate: e.target.value };
                        setCvData({ ...cvData, education: updated });
                      }}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  <button className="save-btn" onClick={() => handleUpdateEducation(index)} disabled={saving}>
                    Save
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteEducation(edu.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button className="save-btn secondary" onClick={handleAddEducation} style={{ marginTop: '1rem' }}>
              + Add Education
            </button>
          </div>
        )}

        {/* Vision Tab */}
        {activeTab === 'vision' && cvData?.personalInfo && (
          <div className="console-section">
            <h2>Vision Statement</h2>
            <p className="section-description">Your professional vision and aspirations.</p>

            <div className="form-group">
              <label>Vision</label>
              <textarea
                rows={4}
                value={cvData.personalInfo.vision || ''}
                placeholder="Your vision statement..."
                onChange={(e) =>
                  setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, vision: e.target.value } })
                }
              />
            </div>
            <button className="save-btn" onClick={handleSavePersonalInfo} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ConsolePage;

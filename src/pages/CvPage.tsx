import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchCv, type CvData } from '../services/api';
import profilePhoto from '../assets/profile.jpg';

interface PortfolioItem {
  title: string;
  description: string;
}

interface ExpertiseItem {
  category: string;
  skills: string[];
}

const defaultLeadershipPoints = [
  'Lead and oversee multiple departments including Engineering, Automation, Product Tools, and Design, ensuring alignment with organizational technology and product strategy.',
  'Define and execute enterprise product integration roadmap to enable seamless interoperability and platform scalability.',
  'Establish unified design systems and engineering governance frameworks to ensure consistency, quality, and efficiency across all products.',
  'Govern product lifecycle, release readiness, and deployment standards to ensure reliability and operational stability.',
  'Drive automation and quality engineering strategy to enhance platform resilience and accelerate product delivery.',
  'Align product and platform architecture with strategic objectives to support digital transformation initiatives.',
  'Enable scalable, secure, and maintainable platform ecosystems supporting cross-organizational integration.'
];

const defaultPortfolio: PortfolioItem[] = [
  {
    title: 'Enterprise Product Integration Platform',
    description: 'Led the strategic direction and governance of product integration platforms to enable seamless interoperability across organizational systems, improving operational efficiency and platform scalability.'
  },
  {
    title: 'Unified Design System',
    description: 'Established a centralized design system to standardize user experience, strengthen visual identity, and ensure consistency across all digital products.'
  },
  {
    title: 'Quality Automation Framework',
    description: 'Directed implementation of automation and quality governance frameworks to enhance product reliability, improve release confidence, and accelerate delivery cycles.'
  },
  {
    title: 'Platform Enablement and Engineering Governance',
    description: 'Defined and implemented engineering governance standards, ensuring platform stability, scalability, and alignment with long-term strategic goals.'
  }
];

const defaultExpertise: ExpertiseItem[] = [
  {
    category: 'Product Strategy and Integration',
    skills: ['Enterprise product integration', 'Platform strategy', 'Product lifecycle governance']
  },
  {
    category: 'Engineering Leadership and Governance',
    skills: ['Department leadership', 'Engineering standards', 'Platform governance']
  },
  {
    category: 'Platform Architecture and Integration',
    skills: ['System interoperability', 'Platform scalability', 'Enterprise integration']
  },
  {
    category: 'Design Systems Leadership',
    skills: ['Unified design systems', 'UX governance', 'Visual identity consistency']
  },
  {
    category: 'Quality Engineering and Automation Strategy',
    skills: ['Automation governance', 'Quality frameworks', 'Release readiness']
  }
];

const defaultVision = 'To build scalable, intelligent, and integrated product ecosystems that enable seamless interoperability, accelerate digital transformation, and support sustainable innovation at enterprise and national scale.';

function CvPage() {
  const { user } = useAuth();
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    loadCvData();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (cvData?.personalInfo) {
      const { siteTitle, siteDescription } = cvData.personalInfo;
      if (siteTitle) {
        document.title = siteTitle;
      }
      if (siteDescription) {
        const metaDesc = document.getElementById('meta-description');
        if (metaDesc) {
          metaDesc.setAttribute('content', siteDescription);
        }
      }
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

  // Parse JSON data safely
  const parseJSON = <T,>(jsonString: string | undefined, defaultValue: T): T => {
    if (!jsonString) return defaultValue;
    try {
      return JSON.parse(jsonString);
    } catch {
      return defaultValue;
    }
  };

  const leadershipPoints = parseJSON<string[]>(cvData?.personalInfo?.leadershipPoints, defaultLeadershipPoints);
  const productPortfolio = parseJSON<PortfolioItem[]>(cvData?.personalInfo?.productPortfolio, defaultPortfolio);
  const expertiseAreas = parseJSON<ExpertiseItem[]>(cvData?.personalInfo?.expertiseAreas, defaultExpertise);
  const vision = cvData?.personalInfo?.vision || defaultVision;

  return (
    <div className="cv-container executive">
      <div className="top-buttons">
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
          {isDark ? 'Light' : 'Dark'}
        </button>
        {user?.isAdmin && (
          <a href="//" className="admin-button" onClick={(e) => { e.preventDefault(); window.location.href = window.location.protocol + '//admin.' + window.location.host.replace(/^cv\./, ''); }}>Admin</a>
        )}
      </div>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-top">
          <div className="hero-photo-container">
            <img src={profilePhoto} alt={cvData?.personalInfo?.name || 'Profile'} className="hero-photo" />
          </div>
          <div className="hero-content">
            <h1 className="hero-name">{cvData?.personalInfo?.name || 'Abdulaziz Alsalyem'}</h1>
            <h2 className="hero-title">{cvData?.personalInfo?.title || 'Director of Product Integration, Engineering, and Design'}</h2>
            <p className="hero-tagline">
              {cvData?.personalInfo?.tagline || 'Leading enterprise product integration, platform engineering, and design systems to enable scalable, reliable, and unified digital ecosystems.'}
            </p>
            <p className="hero-tagline-secondary">
              {cvData?.personalInfo?.taglineSecondary || 'Driving strategic technology alignment, platform governance, and product integration initiatives to support national-level digital transformation and operational excellence.'}
            </p>
          </div>
        </div>
        <div className="hero-contact">
          <span>{cvData?.personalInfo?.location || 'Riyadh, Saudi Arabia'}</span>
          <span className="separator">|</span>
          <a href={`tel:${cvData?.personalInfo?.phone?.replace(/\s/g, '') || '+966569191119'}`}>{cvData?.personalInfo?.phone || '+966 56 919 1119'}</a>
          <span className="separator">|</span>
          <a href={`mailto:${cvData?.personalInfo?.email || 'aalsalyem@gmail.com'}`}>{cvData?.personalInfo?.email || 'aalsalyem@gmail.com'}</a>
          <span className="separator">|</span>
          <a href={cvData?.personalInfo?.linkedinUrl || 'https://www.linkedin.com/in/aalsalyem/'} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="section executive-summary">
        <h2>Executive Summary</h2>
        <p>
          {cvData?.personalInfo?.executiveSummary || 'Director of Product Integration with executive leadership over Engineering, Automation, Product Tools, and Design functions. Responsible for defining and executing enterprise product integration strategy, establishing unified engineering and design governance, and enabling scalable, high-quality digital platforms. Proven track record in building integrated product ecosystems, aligning technology initiatives with organizational strategy, and driving operational excellence across mission-critical environments.'}
        </p>
      </section>

      {/* Leadership & Strategic Impact */}
      <section className="section leadership-section">
        <h2>Leadership & Strategic Impact</h2>
        <ul className="leadership-list">
          {leadershipPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Product Portfolio */}
      <section className="section portfolio-section">
        <h2>Product Portfolio</h2>
        <div className="portfolio-grid">
          {productPortfolio.map((product, index) => (
            <div key={index} className="portfolio-card">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="section experience-section">
        <h2>Experience</h2>
        {cvData?.workExperience && cvData.workExperience.length > 0 ? (
          cvData.workExperience.map((exp) => (
            <div key={exp.id} className="experience-item executive-role">
              <div className="experience-header">
                <div>
                  <h3>{exp.title}</h3>
                  <p className="company">{exp.company}</p>
                </div>
                <div className="date">{exp.startDate} — {exp.endDate || 'Present'}</div>
              </div>
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="leadership-list">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <div className="experience-item executive-role">
            <div className="experience-header">
              <div>
                <h3>Director of Product Integration</h3>
                <p className="company">National Center for Artificial Intelligence (NCAI) — SDAIA</p>
              </div>
              <div className="date">2020 — Present</div>
            </div>
            <p className="role-description">
              Lead enterprise product integration, engineering governance, and platform strategy initiatives across multiple departments.
            </p>
          </div>
        )}
      </section>

      {/* Expertise */}
      <section className="section expertise-section">
        <h2>Expertise</h2>
        <div className="expertise-grid">
          {expertiseAreas.map((area, index) => (
            <div key={index} className="expertise-card">
              <h3>{area.category}</h3>
              <div className="expertise-skills">
                {area.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="expertise-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="section education-section">
        <h2>Education</h2>
        {cvData?.education && cvData.education.length > 0 ? (
          cvData.education.map((edu) => (
            <div key={edu.id} className="education-item">
              <div className="experience-header">
                <div>
                  <h3>{edu.degree} in {edu.field}</h3>
                  <p className="company">{edu.school}</p>
                </div>
                <div className="date">{edu.startDate} — {edu.endDate}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="education-item">
            <div className="experience-header">
              <div>
                <h3>Bachelor of Science in Computer Science</h3>
                <p className="company">King Saud University</p>
              </div>
              <div className="date">2007 — 2012</div>
            </div>
          </div>
        )}
      </section>

      {/* Vision */}
      <section className="section vision-section">
        <h2>Vision</h2>
        <blockquote>{vision}</blockquote>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {cvData?.personalInfo?.name || 'Abdulaziz Alsalyem'}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CvPage;

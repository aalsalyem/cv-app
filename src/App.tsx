import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <div className="cv-container">
      <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
        {isDark ? 'Light' : 'Dark'}
      </button>

      <header className="header">
        <h1>Abdulaziz Mohammed Alsalyem</h1>
        <div className="contact-info">
          <span>Riyadh, Saudi Arabia</span>
          <span className="separator">|</span>
          <a href="mailto:ams.8@msn.com">ams.8@msn.com</a>
          <span className="separator">|</span>
          <a href="https://www.linkedin.com/in/aalsalyem/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </header>

      <section className="section">
        <h2>Objective</h2>
        <p>
          Currently working as Quality Assurance Manager at SDAIA (Saudi Data & AI Authority),
          professionally qualified in software engineering and quickly grasp complex issues.
          I am seeking a challenging management position in the area of software testing and
          automation to be able to develop my abilities and my skills, and contribute for the
          development of the organization.
        </p>
      </section>

      <section className="section">
        <h2>Work Experience</h2>

        <div className="experience-item">
          <div className="experience-header">
            <div>
              <h3>Quality Assurance Manager</h3>
              <p className="company">Saudi Data & AI Authority (SDAIA)</p>
            </div>
            <div className="date">07/2020 - Present</div>
          </div>
          <ul>
            <li>Build quality team</li>
            <li>Create quality assurance policies and procedures</li>
            <li>Work with the team to reverse engineering the product for helping the business team to write the business document, and write the test scenarios then test it</li>
            <li>Understand and analysis of business requirements</li>
            <li>Design test plans</li>
            <li>Maintain quality for software development projects</li>
            <li>Plan to automate the scenarios to perform full regression and functional automation testing using Selenium</li>
            <li>Providing comprehensive weekly report on current status and expectations</li>
            <li>Make sure the content of the product is working properly in the production by building the needed automating tools</li>
          </ul>
          <p className="projects"><strong>Projects:</strong> Classified projects (2)</p>
        </div>

        <div className="experience-item">
          <div className="experience-header">
            <div>
              <h3>Software Engineer</h3>
              <p className="company">Saudi Data & AI Authority (SDAIA)</p>
            </div>
            <div className="date">05/2018 - 07/2020</div>
          </div>
          <ul>
            <li>Work as back-end developer using Java</li>
            <li>Investigate, diagnose, and resolve software defects</li>
            <li>Understand and analysis of business requirements</li>
            <li>Estimate, performed feasibility analysis and plan the delivery for new requirements</li>
            <li>Contribute to each project delivery phase (analysis, development, test and operations) in different roles</li>
            <li>Deliver new features in Agile life-cycle</li>
          </ul>
          <p className="projects"><strong>Projects:</strong> Classified project, Tawakkalna</p>
        </div>

        <div className="experience-item">
          <div className="experience-header">
            <div>
              <h3>Senior Software Engineer</h3>
              <p className="company">Elm Company</p>
            </div>
            <div className="date">02/2013 - 04/2018</div>
          </div>
          <ul>
            <li>Work as back-end developer using Java</li>
            <li>Estimate, performed feasibility analysis and plan the delivery for new requirements</li>
            <li>Contribute to build Yakeen generator tool to minimize the development time</li>
            <li>Deliver new features in Agile life-cycle</li>
          </ul>
          <p className="projects"><strong>Projects:</strong> Yakeen, Yakeen Generator, Fingerprint, Mobile Number Online Transfer (MNOT), Zawil</p>
        </div>
      </section>

      <section className="section">
        <h2>Education</h2>
        <div className="education-item">
          <div className="experience-header">
            <div>
              <h3>Computer Science | Bachelor</h3>
              <p className="company">King Saud University</p>
            </div>
            <div className="date">08/2007 - 06/2012</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Technical Skills</h2>
        <div className="skills-container">
          <span className="skill-tag">Java</span>
          <span className="skill-tag">Python</span>
          <span className="skill-tag">SQL</span>
          <span className="skill-tag">NoSQL</span>
          <span className="skill-tag">Git</span>
          <span className="skill-tag">Spring Boot</span>
          <span className="skill-tag">Selenium</span>
          <span className="skill-tag">Postman</span>
          <span className="skill-tag">SoapUI</span>
        </div>
      </section>

      <section className="section">
        <h2>Certificates</h2>
        <div className="certificate-item">
          <h3>Selenium Test Foundation</h3>
          <p className="company">iSQI | 10/2022</p>
        </div>
      </section>

      <section className="section">
        <h2>Strengths</h2>
        <div className="skills-container">
          <span className="strength-tag">Social skills</span>
          <span className="strength-tag">Accuracy</span>
          <span className="strength-tag">Communication skills</span>
          <span className="strength-tag">Adapting</span>
          <span className="strength-tag">Supportive</span>
          <span className="strength-tag">Teamwork</span>
          <span className="strength-tag">Leadership</span>
          <span className="strength-tag">Working under pressure</span>
        </div>
      </section>

      <section className="section">
        <h2>Languages</h2>
        <div className="skills-container">
          <span className="language-tag">Arabic</span>
          <span className="language-tag">English</span>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Abdulaziz Mohammed Alsalyem</p>
      </footer>
    </div>
  )
}

export default App

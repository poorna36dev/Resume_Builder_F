/**
 * Template 02 — Modern Split
 * Dark left sidebar + white right content area.
 */
const Template02 = ({ resume }) => {
  const r = resume || {};
  const palette = r.template?.colorPallete || ['#a855f7', '#c084fc', '#9333ea'];
  const accentColor = palette[0];

  return (
    <div className="resume-template template-02">
      {/* Left Sidebar */}
      <div className="template-left">
        {/* Profile */}
        <div className="template-name">{r.profileInfo?.fullName || 'Your Name'}</div>
        <div className="template-designation" style={{ color: accentColor }}>
          {r.profileInfo?.designation || 'Your Title'}
        </div>

        {/* Contact */}
        <div className="section" style={{ marginTop: 20 }}>
          <h2>Contact</h2>
          {r.contactInfo?.email && <p>{r.contactInfo.email}</p>}
          {r.contactInfo?.phone && <p>{r.contactInfo.phone}</p>}
          {r.contactInfo?.location && <p>{r.contactInfo.location}</p>}
          {r.contactInfo?.github && <p>{r.contactInfo.github}</p>}
          {r.contactInfo?.linkedIn && <p>{r.contactInfo.linkedIn}</p>}
          {r.contactInfo?.website && <p>{r.contactInfo.website}</p>}
        </div>

        {/* Skills */}
        {r.skills?.length > 0 && (
          <div className="section">
            <h2>Skills</h2>
            {r.skills.map((skill, i) => (
              <div className="skill-bar-container" key={i}>
                <div className="skill-bar-label" style={{ color: '#cbd5e1' }}>
                  <span>{skill.name}</span>
                  <span>{skill.progress}%</span>
                </div>
                <div className="skill-bar" style={{ background: '#334155' }}>
                  <div className="skill-bar-fill" style={{ width: `${skill.progress}%`, background: accentColor }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {r.languages?.length > 0 && (
          <div className="section">
            <h2>Languages</h2>
            {r.languages.map((lang, i) => (
              <div className="skill-bar-container" key={i}>
                <div className="skill-bar-label" style={{ color: '#cbd5e1' }}>
                  <span>{lang.name}</span>
                  <span>{lang.progress}%</span>
                </div>
                <div className="skill-bar" style={{ background: '#334155' }}>
                  <div className="skill-bar-fill" style={{ width: `${lang.progress}%`, background: accentColor }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hobbies */}
        {r.hobbies?.length > 0 && (
          <div className="section">
            <h2>Interests</h2>
            <div className="hobbies-list">
              {r.hobbies.map((hobby, i) => (
                <span key={i} style={{ background: '#334155', color: '#cbd5e1', padding: '3px 10px', borderRadius: 4, fontSize: '9pt', display: 'inline-block', marginBottom: 4 }}>
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="template-right">
        {/* Summary */}
        {r.profileInfo?.summary && (
          <div className="section">
            <h2 style={{ borderColor: accentColor, color: accentColor }}>Profile</h2>
            <p>{r.profileInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {r.workExperiences?.length > 0 && (
          <div className="section">
            <h2 style={{ borderColor: accentColor, color: accentColor }}>Experience</h2>
            {r.workExperiences.map((exp, i) => (
              <div className="experience-item" key={i}>
                <div className="experience-header">
                  <h3>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</h3>
                  <span className="experience-date">{exp.startDate} — {exp.endDate || 'Present'}</span>
                </div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {r.education?.length > 0 && (
          <div className="section">
            <h2 style={{ borderColor: accentColor, color: accentColor }}>Education</h2>
            {r.education.map((edu, i) => (
              <div className="education-item" key={i}>
                <div className="education-header">
                  <h3>{edu.degree}{edu.institution ? ` — ${edu.institution}` : ''}</h3>
                  <span className="education-date">{edu.startDate} — {edu.endDate || 'Present'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {r.projects?.length > 0 && (
          <div className="section">
            <h2 style={{ borderColor: accentColor, color: accentColor }}>Projects</h2>
            {r.projects.map((proj, i) => (
              <div className="project-item" key={i}>
                <h3>{proj.title}</h3>
                {proj.description && <p>{proj.description}</p>}
                <div className="project-links">
                  {proj.github && <a href={proj.github} target="_blank" rel="noreferrer">GitHub</a>}
                  {proj.liveDemo && <a href={proj.liveDemo} target="_blank" rel="noreferrer">Demo</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {r.certifications?.length > 0 && (
          <div className="section">
            <h2 style={{ borderColor: accentColor, color: accentColor }}>Certifications</h2>
            {r.certifications.map((cert, i) => (
              <div className="certification-item" key={i}>
                <h3>{cert.title}</h3>
                <p>{cert.issuer}{cert.year ? ` • ${cert.year}` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template02;

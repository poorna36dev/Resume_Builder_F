/**
 * Template 10 — Two-Column
 * Equal 50/50 split with left for info and right for experience.
 */
const Template10 = ({ resume }) => {
  const r = resume || {};
  const palette = r.template?.colorPallete || ['#0d9488', '#2dd4bf', '#0f766e'];
  const accentColor = palette[0];

  return (
    <div className="resume-template template-10">
      <div className="template-header">
        <div className="template-name">{r.profileInfo?.fullName || 'Your Name'}</div>
        <div className="template-designation" style={{ color: accentColor }}>{r.profileInfo?.designation || 'Your Title'}</div>
        <div className="template-contact">
          {r.contactInfo?.email && <span>{r.contactInfo.email}</span>}
          {r.contactInfo?.phone && <span>•  {r.contactInfo.phone}</span>}
          {r.contactInfo?.location && <span>•  {r.contactInfo.location}</span>}
          {r.contactInfo?.github && <span>•  {r.contactInfo.github}</span>}
          {r.contactInfo?.linkedIn && <span>•  {r.contactInfo.linkedIn}</span>}
          {r.contactInfo?.website && <span>•  {r.contactInfo.website}</span>}
        </div>
      </div>
      <div className="template-divider" style={{ background: accentColor }} />

      {r.profileInfo?.summary && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Profile</h2>
          <p>{r.profileInfo.summary}</p>
        </div>
      )}

      <div className="template-columns">
        <div className="template-col-left">
          {r.workExperiences?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Experience</h2>
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

          {r.projects?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Projects</h2>
              {r.projects.map((proj, i) => (
                <div className="project-item" key={i}>
                  <h3>{proj.title}</h3>
                  {proj.description && <p>{proj.description}</p>}
                  <div className="project-links">
                    {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: accentColor }}>GitHub</a>}
                    {proj.liveDemo && <a href={proj.liveDemo} target="_blank" rel="noreferrer" style={{ color: accentColor }}>Demo</a>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="template-col-right">
          {r.education?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Education</h2>
              {r.education.map((edu, i) => (
                <div className="education-item" key={i}>
                  <h3>{edu.degree}</h3>
                  <p style={{ color: '#64748b', fontSize: '9pt' }}>{edu.institution}</p>
                  <p style={{ color: accentColor, fontSize: '8pt' }}>{edu.startDate} — {edu.endDate || 'Present'}</p>
                </div>
              ))}
            </div>
          )}

          {r.skills?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Skills</h2>
              {r.skills.map((skill, i) => (
                <div className="skill-bar-container" key={i}>
                  <div className="skill-bar-label"><span>{skill.name}</span><span>{skill.progress}%</span></div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{ width: `${skill.progress}%`, background: accentColor }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {r.certifications?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Certifications</h2>
              {r.certifications.map((cert, i) => (
                <div className="certification-item" key={i}>
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer}{cert.year ? ` • ${cert.year}` : ''}</p>
                </div>
              ))}
            </div>
          )}

          {r.languages?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Languages</h2>
              {r.languages.map((lang, i) => (
                <span className="skill-tag" key={i}>{lang.name} — {lang.progress}%</span>
              ))}
            </div>
          )}

          {r.hobbies?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Interests</h2>
              <p>{r.hobbies.join(' • ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template10;

/**
 * Template 06 — Developer
 * Dark header with monospace accents, code-inspired design.
 */
const Template06 = ({ resume }) => {
  const r = resume || {};
  const palette = r.template?.colorPallete || ['#10b981', '#34d399', '#059669'];
  const accentColor = palette[0];

  return (
    <div className="resume-template template-06">
      {/* Dark Top Header */}
      <div className="template-header">
        <div className="template-name">&lt;{r.profileInfo?.fullName || 'Your Name'} /&gt;</div>
        <div className="template-designation" style={{ color: accentColor }}>{r.profileInfo?.designation || 'Developer'}</div>
        <div className="template-contact">
          {r.contactInfo?.email && <span>{r.contactInfo.email}</span>}
          {r.contactInfo?.phone && <span>{r.contactInfo.phone}</span>}
          {r.contactInfo?.location && <span>{r.contactInfo.location}</span>}
          {r.contactInfo?.github && <span>{r.contactInfo.github}</span>}
          {r.contactInfo?.linkedIn && <span>{r.contactInfo.linkedIn}</span>}
          {r.contactInfo?.website && <span>{r.contactInfo.website}</span>}
        </div>
      </div>

      <div className="template-body">
        {r.profileInfo?.summary && (
          <div className="section">
            <h2 style={{ color: accentColor }}><span className="code-comment">// </span>About</h2>
            <p>{r.profileInfo.summary}</p>
          </div>
        )}

        {r.skills?.length > 0 && (
          <div className="section">
            <h2 style={{ color: accentColor }}><span className="code-comment">// </span>Tech Stack</h2>
            <div className="skills-grid">
              {r.skills.map((skill, i) => (
                <span className="skill-tag" key={i} style={{ background: '#0f172a', color: '#ffffff', border: `1px solid ${accentColor}`, fontFamily: 'monospace' }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {r.workExperiences?.length > 0 && (
          <div className="section">
            <h2 style={{ color: accentColor }}><span className="code-comment">// </span>Experience</h2>
            {r.workExperiences.map((exp, i) => (
              <div className="experience-item" key={i}>
                <div className="experience-header">
                  <h3>{exp.role}{exp.company ? ` @ ${exp.company}` : ''}</h3>
                  <span className="experience-date">{exp.startDate} — {exp.endDate || 'Present'}</span>
                </div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {r.projects?.length > 0 && (
          <div className="section">
            <h2 style={{ color: accentColor }}><span className="code-comment">// </span>Projects</h2>
            {r.projects.map((proj, i) => (
              <div className="project-item" key={i}>
                <h3>{proj.title}</h3>
                {proj.description && <p>{proj.description}</p>}
                <div className="project-links">
                  {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: accentColor }}>GitHub</a>}
                  {proj.liveDemo && <a href={proj.liveDemo} target="_blank" rel="noreferrer" style={{ color: accentColor }}>Live</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {r.education?.length > 0 && (
          <div className="section">
            <h2 style={{ color: accentColor }}><span className="code-comment">// </span>Education</h2>
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

        {r.certifications?.length > 0 && (
          <div className="section">
            <h2 style={{ color: accentColor }}><span className="code-comment">// </span>Certifications</h2>
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
            <h2 style={{ color: accentColor }}><span className="code-comment">// </span>Languages</h2>
            <div className="skills-grid">
              {r.languages.map((lang, i) => (
                <span className="skill-tag" key={i} style={{ background: '#0f172a', color: '#ffffff', fontFamily: 'monospace' }}>{lang.name}: {lang.progress}%</span>
              ))}
            </div>
          </div>
        )}

        {r.hobbies?.length > 0 && (
          <div className="section">
            <h2 style={{ color: accentColor }}><span className="code-comment">// </span>Interests</h2>
            <div className="hobbies-list">
              {r.hobbies.map((hobby, i) => (
                <span className="hobby-tag" key={i}>{hobby}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template06;

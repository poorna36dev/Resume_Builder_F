/**
 * Template 09 — Compact
 * Dense two-column layout, maximum information per page.
 */
const Template09 = ({ resume }) => {
  const r = resume || {};
  const palette = r.template?.colorPallete || ['#0891b2', '#22d3ee', '#0e7490'];
  const accentColor = palette[0];

  return (
    <div className="resume-template template-09">
      {/* Compact Header */}
      <div className="template-header">
        <div className="template-header-left">
          <div className="template-name">{r.profileInfo?.fullName || 'Your Name'}</div>
          <div className="template-designation" style={{ color: accentColor }}>{r.profileInfo?.designation || 'Your Title'}</div>
        </div>
        <div className="template-header-right">
          {r.contactInfo?.email && <span>{r.contactInfo.email}</span>}
          {r.contactInfo?.phone && <span>{r.contactInfo.phone}</span>}
          {r.contactInfo?.location && <span>{r.contactInfo.location}</span>}
          {r.contactInfo?.github && <span>{r.contactInfo.github}</span>}
          {r.contactInfo?.linkedIn && <span>{r.contactInfo.linkedIn}</span>}
          {r.contactInfo?.website && <span>{r.contactInfo.website}</span>}
        </div>
      </div>
      <div style={{ height: 3, background: accentColor, marginBottom: 16 }} />

      {r.profileInfo?.summary && (
        <div className="section">
          <p style={{ fontSize: '9pt', lineHeight: 1.5 }}>{r.profileInfo.summary}</p>
        </div>
      )}

      <div className="template-columns">
        {/* Left Column */}
        <div className="template-col-left">
          {r.workExperiences?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Experience</h2>
              {r.workExperiences.map((exp, i) => (
                <div className="experience-item" key={i} style={{ marginBottom: 8 }}>
                  <h3 style={{ fontSize: '9pt' }}>{exp.role}</h3>
                  <p style={{ fontSize: '8pt', color: accentColor }}>{exp.company} | {exp.startDate} — {exp.endDate || 'Present'}</p>
                  {exp.description && <p style={{ fontSize: '8pt' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {r.projects?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Projects</h2>
              {r.projects.map((proj, i) => (
                <div className="project-item" key={i} style={{ marginBottom: 8 }}>
                  <h3 style={{ fontSize: '9pt' }}>{proj.title}</h3>
                  {proj.description && <p style={{ fontSize: '8pt' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="template-col-right">
          {r.skills?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Skills</h2>
              <div className="skills-grid" style={{ gap: 4 }}>
                {r.skills.map((skill, i) => (
                  <span className="skill-tag" key={i} style={{ fontSize: '8pt', padding: '2px 8px' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {r.education?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Education</h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <h3 style={{ fontSize: '9pt' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '8pt', color: '#64748b' }}>{edu.institution}</p>
                  <p style={{ fontSize: '8pt', color: accentColor }}>{edu.startDate} — {edu.endDate || 'Present'}</p>
                </div>
              ))}
            </div>
          )}

          {r.certifications?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Certifications</h2>
              {r.certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  <h3 style={{ fontSize: '8pt' }}>{cert.title}</h3>
                  <p style={{ fontSize: '8pt', color: '#64748b' }}>{cert.issuer} {cert.year}</p>
                </div>
              ))}
            </div>
          )}

          {r.languages?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Languages</h2>
              {r.languages.map((lang, i) => (
                <div className="skill-bar-container" key={i} style={{ marginBottom: 4 }}>
                  <div className="skill-bar-label" style={{ fontSize: '8pt' }}><span>{lang.name}</span><span>{lang.progress}%</span></div>
                  <div className="skill-bar" style={{ height: 4 }}>
                    <div className="skill-bar-fill" style={{ width: `${lang.progress}%`, background: accentColor }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {r.hobbies?.length > 0 && (
            <div className="section">
              <h2 style={{ color: accentColor }}>Interests</h2>
              <p style={{ fontSize: '8pt', color: '#475569' }}>{r.hobbies.join(' • ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template09;

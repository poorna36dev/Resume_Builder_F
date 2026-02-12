/**
 * Template 05 — Creative
 * Wide colored sidebar with playful design.
 */
const Template05 = ({ resume }) => {
  const r = resume || {};
  const palette = r.template?.colorPallete || ['#e11d48', '#fb7185', '#be123c'];
  const accentColor = palette[0];

  return (
    <div className="resume-template template-05">
      {/* Colored Sidebar */}
      <div className="template-left" style={{ background: accentColor }}>
        <div className="template-name">{r.profileInfo?.fullName || 'Your Name'}</div>
        <div className="template-designation">{r.profileInfo?.designation || 'Your Title'}</div>

        <div className="section" style={{ marginTop: 24 }}>
          <h2>Contact</h2>
          {r.contactInfo?.email && <p>{r.contactInfo.email}</p>}
          {r.contactInfo?.phone && <p>{r.contactInfo.phone}</p>}
          {r.contactInfo?.location && <p>{r.contactInfo.location}</p>}
          {r.contactInfo?.github && <p>{r.contactInfo.github}</p>}
          {r.contactInfo?.linkedIn && <p>{r.contactInfo.linkedIn}</p>}
          {r.contactInfo?.website && <p>{r.contactInfo.website}</p>}
        </div>

        {r.skills?.length > 0 && (
          <div className="section">
            <h2>Skills</h2>
            {r.skills.map((skill, i) => (
              <div className="skill-bar-container" key={i}>
                <div className="skill-bar-label"><span>{skill.name}</span><span>{skill.progress}%</span></div>
                <div className="skill-bar" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <div className="skill-bar-fill" style={{ width: `${skill.progress}%`, background: '#fff' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {r.languages?.length > 0 && (
          <div className="section">
            <h2>Languages</h2>
            {r.languages.map((lang, i) => (
              <div className="skill-bar-container" key={i}>
                <div className="skill-bar-label"><span>{lang.name}</span><span>{lang.progress}%</span></div>
                <div className="skill-bar" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <div className="skill-bar-fill" style={{ width: `${lang.progress}%`, background: '#fff' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {r.hobbies?.length > 0 && (
          <div className="section">
            <h2>Interests</h2>
            <div className="hobbies-list">
              {r.hobbies.map((hobby, i) => (
                <span key={i} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '3px 10px', borderRadius: 4, fontSize: '9pt', display: 'inline-block', marginBottom: 4 }}>{hobby}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="template-right">
        {r.profileInfo?.summary && (
          <div className="section">
            <h2 style={{ color: accentColor }}>About Me</h2>
            <p>{r.profileInfo.summary}</p>
          </div>
        )}

        {r.workExperiences?.length > 0 && (
          <div className="section">
            <h2 style={{ color: accentColor }}>Work Experience</h2>
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

        {r.education?.length > 0 && (
          <div className="section">
            <h2 style={{ color: accentColor }}>Education</h2>
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
      </div>
    </div>
  );
};

export default Template05;

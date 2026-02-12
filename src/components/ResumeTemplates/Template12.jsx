/**
 * Template 12 — Infographic
 * Visual skill indicators, icon-style sections, modern grid layout.
 */
const Template12 = ({ resume }) => {
  const r = resume || {};
  const palette = r.template?.colorPallete || ['#f97316', '#fb923c', '#ea580c'];
  const accentColor = palette[0];

  // html2canvas doesn't support conic-gradient, so we use an SVG for the circle
  const SkillCircle = ({ value, label }) => {
    const radius = 26;
    const circumference = 2 * Math.PI * 20; // r=20
    const offset = circumference - (value / 100) * circumference;
    
    return (
      <div style={{ textAlign: 'center', width: 72 }}>
        <div style={{ width: 52, height: 52, position: 'relative', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <svg width="52" height="52" viewBox="0 0 52 52" style={{ transform: 'rotate(-90deg)' }}>
             <circle cx="26" cy="26" r="20" stroke="#f1f5f9" strokeWidth="4" fill="none" />
             <circle cx="26" cy="26" r="20" stroke={accentColor} strokeWidth="4" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
           </svg>
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8pt', fontWeight: 700, color: accentColor, lineHeight: 1 }}>
             {value}%
           </div>
        </div>
        <div style={{ fontSize: '7pt', marginTop: 8, color: '#334155', lineHeight: 1.2 }}>{label}</div>
      </div>
    );
  };

  return (
    <div className="resume-template template-12">
      <div className="template-header" style={{ borderLeft: `5px solid ${accentColor}` }}>
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

      {r.profileInfo?.summary && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Profile</h2>
          <p>{r.profileInfo.summary}</p>
        </div>
      )}

      {r.skills?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {r.skills.map((skill, i) => (
              <SkillCircle key={i} value={skill.progress} label={skill.name} />
            ))}
          </div>
        </div>
      )}

      {r.workExperiences?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Experience</h2>
          {r.workExperiences.map((exp, i) => (
            <div className="experience-item" key={i} style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: 12, marginBottom: 12 }}>
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
            <div className="education-item" key={i} style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: 12 }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {r.projects.map((proj, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: 10, borderRadius: 6 }}>
                <h3>{proj.title}</h3>
                {proj.description && <p style={{ fontSize: '8pt' }}>{proj.description}</p>}
                <div className="project-links">
                  {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: accentColor, fontSize: '8pt' }}>GitHub</a>}
                  {proj.liveDemo && <a href={proj.liveDemo} target="_blank" rel="noreferrer" style={{ color: accentColor, fontSize: '8pt' }}>Demo</a>}
                </div>
              </div>
            ))}
          </div>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {r.languages.map((lang, i) => (
              <SkillCircle key={i} value={lang.progress} label={lang.name} />
            ))}
          </div>
        </div>
      )}

      {r.hobbies?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Interests</h2>
          <div className="hobbies-list" style={{ justifyContent: 'center', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {r.hobbies.map((hobby, i) => (
              <span className="hobby-tag" key={i} style={{ background: `${accentColor}15`, color: accentColor }}>{hobby}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template12;

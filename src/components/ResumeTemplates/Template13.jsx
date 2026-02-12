/**
 * Template 13 — Corporate
 * Traditional, conservative layout favored in banking and enterprise.
 */
const Template13 = ({ resume }) => {
  const r = resume || {};
  const palette = r.template?.colorPallete || ['#1e40af', '#3b82f6', '#1e3a8a'];
  const accentColor = palette[0];

  return (
    <div className="resume-template template-13">
      <div className="template-header">
        <div className="template-name">{r.profileInfo?.fullName || 'Your Name'}</div>
        <div className="template-designation">{r.profileInfo?.designation || 'Your Title'}</div>
        <div className="template-divider" style={{ background: accentColor }} />
        <div className="template-contact">
          {r.contactInfo?.email && <span>{r.contactInfo.email}</span>}
          {r.contactInfo?.phone && <span>|  {r.contactInfo.phone}</span>}
          {r.contactInfo?.location && <span>|  {r.contactInfo.location}</span>}
          {r.contactInfo?.github && <span>|  {r.contactInfo.github}</span>}
          {r.contactInfo?.linkedIn && <span>|  {r.contactInfo.linkedIn}</span>}
          {r.contactInfo?.website && <span>|  {r.contactInfo.website}</span>}
        </div>
      </div>

      {r.profileInfo?.summary && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Professional Summary</h2>
          <p>{r.profileInfo.summary}</p>
        </div>
      )}

      {r.workExperiences?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Professional Experience</h2>
          {r.workExperiences.map((exp, i) => (
            <div className="experience-item" key={i}>
              <div className="experience-header">
                <h3>{exp.role}{exp.company ? `, ${exp.company}` : ''}</h3>
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
                <h3>{edu.degree}{edu.institution ? `, ${edu.institution}` : ''}</h3>
                <span className="education-date">{edu.startDate} — {edu.endDate || 'Present'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {r.skills?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Technical Skills</h2>
          <p>{r.skills.map(s => s.name).join('  •  ')}</p>
        </div>
      )}

      {r.projects?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Key Projects</h2>
          {r.projects.map((proj, i) => (
            <div className="project-item" key={i}>
              <h3>{proj.title}</h3>
              {proj.description && <p>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {r.certifications?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Certifications & Awards</h2>
          {r.certifications.map((cert, i) => (
            <div className="certification-item" key={i}>
              <h3>{cert.title}</h3>
              <p>{cert.issuer}{cert.year ? ` — ${cert.year}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {r.languages?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Languages</h2>
          <p>{r.languages.map(l => `${l.name} (${l.progress}%)`).join('  •  ')}</p>
        </div>
      )}

      {r.hobbies?.length > 0 && (
        <div className="section">
          <h2 style={{ color: accentColor }}>Interests</h2>
          <p>{r.hobbies.join('  •  ')}</p>
        </div>
      )}
    </div>
  );
};

export default Template13;

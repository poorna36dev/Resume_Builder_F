/**
 * Template 15 — ATS-Friendly
 * Plain, text-heavy, no graphics. Optimized for ATS parsers.
 */
const Template15 = ({ resume }) => {
  const r = resume || {};
  const palette = r.template?.colorPallete || ['#111827', '#374151', '#1f2937'];
  const accentColor = palette[0];

  return (
    <div className="resume-template template-15">
      <div className="template-header">
        <div className="template-name">{r.profileInfo?.fullName || 'Your Name'}</div>
        <div className="template-designation">{r.profileInfo?.designation || 'Your Title'}</div>
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
          <h2>Summary</h2>
          <p>{r.profileInfo.summary}</p>
        </div>
      )}

      {r.workExperiences?.length > 0 && (
        <div className="section">
          <h2>Work Experience</h2>
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
          <h2>Education</h2>
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

      {r.skills?.length > 0 && (
        <div className="section">
          <h2>Skills</h2>
          <p>{r.skills.map(s => s.name).join(', ')}</p>
        </div>
      )}

      {r.projects?.length > 0 && (
        <div className="section">
          <h2>Projects</h2>
          {r.projects.map((proj, i) => (
            <div className="project-item" key={i}>
              <h3>{proj.title}</h3>
              {proj.description && <p>{proj.description}</p>}
              <div className="project-links">
                {proj.github && <a href={proj.github} target="_blank" rel="noreferrer">GitHub</a>}
                {proj.liveDemo && <a href={proj.liveDemo} target="_blank" rel="noreferrer">Live Demo</a>}
              </div>
            </div>
          ))}
        </div>
      )}

      {r.certifications?.length > 0 && (
        <div className="section">
          <h2>Certifications</h2>
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
          <h2>Languages</h2>
          <p>{r.languages.map(l => `${l.name} (${l.progress}%)`).join(', ')}</p>
        </div>
      )}

      {r.hobbies?.length > 0 && (
        <div className="section">
          <h2>Interests</h2>
          <p>{r.hobbies.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default Template15;

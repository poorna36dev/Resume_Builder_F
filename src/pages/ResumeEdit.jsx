import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getResumeById, updateResume } from '../services/api/resumeApi';
import { sendResumeEmail } from '../services/api/emailApi';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  HiOutlineArrowLeft, HiOutlineSave, HiOutlineDownload, HiOutlineMail,
  HiOutlinePlus, HiOutlineTrash, HiOutlineUser, HiOutlinePhone,
  HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineCode, HiOutlineStar,
  HiOutlineGlobe, HiOutlineHeart, HiOutlineTemplate, HiOutlineColorSwatch,
} from 'react-icons/hi';

/* Resume template rendering components */
import Template01 from '../components/ResumeTemplates/Template01';
import Template02 from '../components/ResumeTemplates/Template02';
import Template03 from '../components/ResumeTemplates/Template03';
import Template04 from '../components/ResumeTemplates/Template04';
import Template05 from '../components/ResumeTemplates/Template05';
import Template06 from '../components/ResumeTemplates/Template06';
import Template07 from '../components/ResumeTemplates/Template07';
import Template08 from '../components/ResumeTemplates/Template08';
import Template09 from '../components/ResumeTemplates/Template09';
import Template10 from '../components/ResumeTemplates/Template10';
import Template11 from '../components/ResumeTemplates/Template11';
import Template12 from '../components/ResumeTemplates/Template12';
import Template13 from '../components/ResumeTemplates/Template13';
import Template14 from '../components/ResumeTemplates/Template14';
import Template15 from '../components/ResumeTemplates/Template15';

const TABS = [
  { id: 'template', label: 'Template', icon: <HiOutlineTemplate /> },
  { id: 'profile', label: 'Profile', icon: <HiOutlineUser /> },
  { id: 'contact', label: 'Contact', icon: <HiOutlinePhone /> },
  { id: 'experience', label: 'Experience', icon: <HiOutlineBriefcase /> },
  { id: 'education', label: 'Education', icon: <HiOutlineAcademicCap /> },
  { id: 'skills', label: 'Skills', icon: <HiOutlineCode /> },
  { id: 'projects', label: 'Projects', icon: <HiOutlineGlobe /> },
  { id: 'certifications', label: 'Certs', icon: <HiOutlineStar /> },
  { id: 'languages', label: 'Languages', icon: <HiOutlineGlobe /> },
  { id: 'hobbies', label: 'Hobbies', icon: <HiOutlineHeart /> },
];

const TEMPLATE_OPTIONS = [
  { id: '01', label: 'Classic', color: '#6366f1' },
  { id: '02', label: 'Modern', color: '#a855f7' },
  { id: '03', label: 'Minimal', color: '#0f172a' },
  { id: '04', label: 'Executive', color: '#1e3a5f' },
  { id: '05', label: 'Creative', color: '#e11d48' },
  { id: '06', label: 'Developer', color: '#10b981' },
  { id: '07', label: 'Elegant', color: '#b45309' },
  { id: '08', label: 'Bold', color: '#7c3aed' },
  { id: '09', label: 'Compact', color: '#0891b2' },
  { id: '10', label: 'Two-Column', color: '#0d9488' },
  { id: '11', label: 'Timeline', color: '#2563eb' },
  { id: '12', label: 'Infographic', color: '#f97316' },
  { id: '13', label: 'Corporate', color: '#1e40af' },
  { id: '14', label: 'Gradient', color: '#8b5cf6' },
  { id: '15', label: 'ATS-Friendly', color: '#111827' },
];

const COLOR_PALETTES = [
  ['#6366f1', '#818cf8', '#4f46e5'],
  ['#a855f7', '#c084fc', '#9333ea'],
  ['#ec4899', '#f472b6', '#db2777'],
  ['#14b8a6', '#2dd4bf', '#0d9488'],
  ['#f59e0b', '#fbbf24', '#d97706'],
  ['#0f172a', '#334155', '#1e293b'],
];

const ResumeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('template');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({ recipientEmail: '', subject: '', message: '' });
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getResumeById(id);
        setResume(res.data);
      } catch {
        toast.error('Failed to load resume');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  /* ── Save ── */
  const handleSave = useCallback(async () => {
    if (!resume) return;
    setSaving(true);
    try {
      const res = await updateResume(id, resume);
      setResume(res.data);
      toast.success('Resume saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }, [resume, id]);

  /* ── Helper: generate multi-page PDF with smart page breaks ── */
  const generatePDF = async ({ scale = 3 } = {}) => {
    const el = previewRef.current;
    if (!el) return null;

    // Get actual resume node only
    const resumeEl = el.querySelector(".resume-template") || el;

    // CLONE ONLY RESUME
    const clone = resumeEl.cloneNode(true);
    clone.classList.add("pdf-mode");
    clone.style.width = "794px";
    clone.style.background = "#ffffff";
    clone.style.padding = "40px";
    clone.style.boxSizing = "border-box";

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.zIndex = "-1";
    container.appendChild(clone);
    document.body.appendChild(container);

    await new Promise((r) => setTimeout(r, 300));

    // Measure block boundaries BEFORE capture (in CSS px, relative to clone top)
    const blocks = clone.querySelectorAll(
      ".section, .template-header, .template-body > div, .experience-item, .education-item, .project-item, .certification-item"
    );
    const blockEdges = [];
    const cloneRect = clone.getBoundingClientRect();
    blocks.forEach((b) => {
      const r = b.getBoundingClientRect();
      blockEdges.push({
        top: r.top - cloneRect.top,
        bottom: r.bottom - cloneRect.top,
      });
    });

    // CAPTURE at high resolution
    const canvas = await html2canvas(clone, {
      scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // PDF constants
    const pdfWidthMM = 210;
    const pdfHeightMM = 297;
    const pxPerMm = canvas.width / pdfWidthMM;           // canvas-px per mm
    const pageHeightPx = pdfHeightMM * pxPerMm;           // one A4 page in canvas-px
    const totalHeightPx = canvas.height;

    // Scale block edges from CSS-px to canvas-px
    const scaledEdges = blockEdges.map((e) => ({
      top: e.top * scale,
      bottom: e.bottom * scale,
    }));

    // Find safe page break positions (never cut through a block)
    const pageBreaks = [0]; // start of first page
    let cursor = 0;

    while (cursor + pageHeightPx < totalHeightPx) {
      let idealBreak = cursor + pageHeightPx;

      // Find the last block that starts before idealBreak but ends after it (i.e. would be cut)
      let safeBreak = idealBreak;
      for (const edge of scaledEdges) {
        if (edge.top < idealBreak && edge.bottom > idealBreak) {
          // This block would be cut — break before it starts
          safeBreak = Math.min(safeBreak, edge.top);
        }
      }

      // Safety: if safeBreak didn't move past cursor, force it to idealBreak
      // (block is taller than a full page — can't avoid splitting it)
      if (safeBreak <= cursor + 10) {
        safeBreak = idealBreak;
      }

      pageBreaks.push(safeBreak);
      cursor = safeBreak;
    }
    pageBreaks.push(totalHeightPx); // end of last page

    // Build PDF, one page per break interval
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < pageBreaks.length - 1; i++) {
      if (i > 0) pdf.addPage();

      const yStart = pageBreaks[i];
      const yEnd = pageBreaks[i + 1];
      const sliceHeight = yEnd - yStart;

      // Create a canvas for this page slice
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeight;
      const ctx = pageCanvas.getContext("2d");

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      // Draw the relevant slice from the full canvas
      ctx.drawImage(
        canvas,
        0, yStart, canvas.width, sliceHeight,   // source
        0, 0, canvas.width, sliceHeight          // destination
      );

      const pageImgData = pageCanvas.toDataURL("image/png");
      const sliceHeightMM = sliceHeight / pxPerMm;

      // Add top margin on continuation pages so content doesn't start at the edge
      const topMarginMM = i > 0 ? 10 : 0;
      pdf.addImage(pageImgData, "PNG", 0, topMarginMM, pdfWidthMM, sliceHeightMM);
    }

    document.body.removeChild(container);
    return pdf;
  };


  /* ── PDF Download ── */
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    toast.info('Generating PDF...');
    try {
      const pdf = await generatePDF({ scale: 2, format: 'PNG' });
      if (pdf) {
        pdf.save(`${resume?.title || 'resume'}.pdf`);
        toast.success('PDF downloaded!');
      }
    } catch {
      toast.error('PDF generation failed');
    }
  };

  /* ── Email Resume ── */
  const handleSendEmail = async () => {
    if (!emailForm.recipientEmail.trim()) { toast.error('Recipient email is required'); return; }
    if (!previewRef.current) return;

    // Show loading toast that persists
    const toastId = toast.loading('Sending email... Please wait while we generate the PDF.', { autoClose: false });
    
    setSendingEmail(true);
    try {
      // Use lower scale + JPEG compression to keep PDF under Brevo's 20MB email limit
      const pdf = await generatePDF({ scale: 1.5, format: 'JPEG', quality: 0.8 });
      
      if (!pdf) {
        toast.dismiss(toastId);
        return;
      }

      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], `${resume?.title || 'resume'}.pdf`, { type: 'application/pdf' });

      // Check size before sending (Brevo limit is 20MB)
      if (file.size > 18 * 1024 * 1024) {
        toast.update(toastId, { render: 'Resume PDF is too large to email. Try downloading instead.', type: 'error', isLoading: false, autoClose: 5000 });
        return;
      }

      // Update toast progress
      toast.update(toastId, { render: 'PDF generated! Sending email now...', isLoading: true });

      await sendResumeEmail(emailForm.recipientEmail, emailForm.subject, emailForm.message, file);
      
      // Update toast to success
      toast.update(toastId, { render: 'Resume sent successfully! Recipient will receive it shortly.', type: 'success', isLoading: false, autoClose: 3000 });
      
      setShowEmailModal(false);
      setEmailForm({ recipientEmail: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to send email';
      const userMsg = typeof msg === 'string' && msg.includes('size') ? 'Resume too large to email.' : msg;
      
      // Update toast to error
      toast.update(toastId, { render: userMsg, type: 'error', isLoading: false, autoClose: 5000 });
    } finally {
      setSendingEmail(false);
    }
  };

  /* ── Field Update Helpers ── */
  const updateField = (path, value) => {
    setResume((prev) => {
      const updated = { ...prev };
      const keys = path.split('.');
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (obj[keys[i]] === undefined || obj[keys[i]] === null) obj[keys[i]] = {};
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const updateListItem = (listName, index, field, value) => {
    setResume((prev) => {
      const list = [...(prev[listName] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listName]: list };
    });
  };

  const addListItem = (listName, template) => {
    setResume((prev) => ({
      ...prev,
      [listName]: [...(prev[listName] || []), template],
    }));
  };

  const removeListItem = (listName, index) => {
    setResume((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  };

  /* ── Template Selection ── */
  const getTemplateComponent = () => {
    const theme = resume?.template?.theme || '01';
    const props = { resume };
    switch (theme) {
      case '02': return <Template02 {...props} />;
      case '03': return <Template03 {...props} />;
      case '04': return <Template04 {...props} />;
      case '05': return <Template05 {...props} />;
      case '06': return <Template06 {...props} />;
      case '07': return <Template07 {...props} />;
      case '08': return <Template08 {...props} />;
      case '09': return <Template09 {...props} />;
      case '10': return <Template10 {...props} />;
      case '11': return <Template11 {...props} />;
      case '12': return <Template12 {...props} />;
      case '13': return <Template13 {...props} />;
      case '14': return <Template14 {...props} />;
      case '15': return <Template15 {...props} />;
      default: return <Template01 {...props} />;
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
        <p>Loading resume...</p>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="resume-editor">
      {/* ── Editor Sidebar ── */}
      <div className="editor-sidebar">
        <div className="editor-sidebar-header">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')}>
            <HiOutlineArrowLeft /> Back
          </button>
          <h2>{resume.title}</h2>
        </div>

        {/* Tabs */}
        <div className="editor-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`editor-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form content */}
        <div className="editor-form">
          {/* Template Tab */}
          {activeTab === 'template' && (
            <>
              <div className="editor-section-title">Choose Template</div>
              <div className="template-selector">
                {TEMPLATE_OPTIONS.map((t) => (
                  <div
                    key={t.id}
                    className={`template-option ${resume.template?.theme === t.id ? 'active' : ''}`}
                    onClick={() => updateField('template.theme', t.id)}
                  >
                    <div style={{ width: 40, height: 52, background: t.color, borderRadius: 4, margin: '0 auto' }} />
                    <div className="template-option-label">{t.label}</div>
                  </div>
                ))}
              </div>

              <div className="editor-section-title" style={{ marginTop: 16 }}>Color Palette</div>
              <div className="color-palette-selector">
                {COLOR_PALETTES.map((palette, i) => (
                  <div
                    key={i}
                    className={`color-swatch ${JSON.stringify(resume.template?.colorPallete) === JSON.stringify(palette) ? 'active' : ''}`}
                    style={{ background: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})` }}
                    onClick={() => updateField('template.colorPallete', palette)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <>
              <div className="editor-section-title">Profile Information</div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={resume.profileInfo?.fullName || ''} onChange={(e) => updateField('profileInfo.fullName', e.target.value)} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Designation</label>
                <input className="form-input" value={resume.profileInfo?.designation || ''} onChange={(e) => updateField('profileInfo.designation', e.target.value)} placeholder="Senior Software Engineer" />
              </div>
              <div className="form-group">
                <label className="form-label">Summary</label>
                <textarea className="form-textarea" value={resume.profileInfo?.summary || ''} onChange={(e) => updateField('profileInfo.summary', e.target.value)} placeholder="A brief summary about yourself..." rows={4} />
              </div>
            </>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <>
              <div className="editor-section-title">Contact Information</div>
              {['email', 'phone', 'location', 'github', 'linkedIn', 'website'].map((field) => (
                <div className="form-group" key={field}>
                  <label className="form-label" style={{ textTransform: 'capitalize' }}>{field === 'linkedIn' ? 'LinkedIn' : field}</label>
                  <input className="form-input" value={resume.contactInfo?.[field] || ''} onChange={(e) => updateField(`contactInfo.${field}`, e.target.value)} placeholder={field} />
                </div>
              ))}
            </>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <>
              <div className="editor-section-title">Work Experience</div>
              {(resume.workExperiences || []).map((exp, i) => (
                <div className="editor-list-item" key={i}>
                  <div className="editor-list-item-header">
                    <span className="editor-list-item-title">{exp.company || `Experience ${i + 1}`}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => removeListItem('workExperiences', i)}><HiOutlineTrash /></button>
                  </div>
                  <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={exp.company || ''} onChange={(e) => updateListItem('workExperiences', i, 'company', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Role</label><input className="form-input" value={exp.role || ''} onChange={(e) => updateListItem('workExperiences', i, 'role', e.target.value)} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" value={exp.startDate || ''} onChange={(e) => updateListItem('workExperiences', i, 'startDate', e.target.value)} placeholder="Jan 2022" /></div>
                    <div className="form-group"><label className="form-label">End Date</label><input className="form-input" value={exp.endDate || ''} onChange={(e) => updateListItem('workExperiences', i, 'endDate', e.target.value)} placeholder="Present" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={exp.description || ''} onChange={(e) => updateListItem('workExperiences', i, 'description', e.target.value)} /></div>
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addListItem('workExperiences', { company: '', role: '', startDate: '', endDate: '', description: '' })}>
                <HiOutlinePlus /> Add Experience
              </button>
            </>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <>
              <div className="editor-section-title">Education</div>
              {(resume.education || []).map((edu, i) => (
                <div className="editor-list-item" key={i}>
                  <div className="editor-list-item-header">
                    <span className="editor-list-item-title">{edu.institution || `Education ${i + 1}`}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => removeListItem('education', i)}><HiOutlineTrash /></button>
                  </div>
                  <div className="form-group"><label className="form-label">Degree</label><input className="form-input" value={edu.degree || ''} onChange={(e) => updateListItem('education', i, 'degree', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Institution</label><input className="form-input" value={edu.institution || ''} onChange={(e) => updateListItem('education', i, 'institution', e.target.value)} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" value={edu.startDate || ''} onChange={(e) => updateListItem('education', i, 'startDate', e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">End Date</label><input className="form-input" value={edu.endDate || ''} onChange={(e) => updateListItem('education', i, 'endDate', e.target.value)} /></div>
                  </div>
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addListItem('education', { degree: '', institution: '', startDate: '', endDate: '' })}>
                <HiOutlinePlus /> Add Education
              </button>
            </>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <>
              <div className="editor-section-title">Skills</div>
              {(resume.skills || []).map((skill, i) => (
                <div className="editor-list-item" key={i}>
                  <div className="editor-list-item-header">
                    <span className="editor-list-item-title">{skill.name || `Skill ${i + 1}`}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => removeListItem('skills', i)}><HiOutlineTrash /></button>
                  </div>
                  <div className="form-group"><label className="form-label">Skill Name</label><input className="form-input" value={skill.name || ''} onChange={(e) => updateListItem('skills', i, 'name', e.target.value)} /></div>
                  <div className="form-group">
                    <label className="form-label">Proficiency ({skill.progress || 0}%)</label>
                    <input type="range" min="0" max="100" value={skill.progress || 0} onChange={(e) => updateListItem('skills', i, 'progress', parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addListItem('skills', { name: '', progress: 70 })}>
                <HiOutlinePlus /> Add Skill
              </button>
            </>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <>
              <div className="editor-section-title">Projects</div>
              {(resume.projects || []).map((proj, i) => (
                <div className="editor-list-item" key={i}>
                  <div className="editor-list-item-header">
                    <span className="editor-list-item-title">{proj.title || `Project ${i + 1}`}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => removeListItem('projects', i)}><HiOutlineTrash /></button>
                  </div>
                  <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={proj.title || ''} onChange={(e) => updateListItem('projects', i, 'title', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={proj.description || ''} onChange={(e) => updateListItem('projects', i, 'description', e.target.value)} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">GitHub URL</label><input className="form-input" value={proj.github || ''} onChange={(e) => updateListItem('projects', i, 'github', e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Live Demo</label><input className="form-input" value={proj.liveDemo || ''} onChange={(e) => updateListItem('projects', i, 'liveDemo', e.target.value)} /></div>
                  </div>
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addListItem('projects', { title: '', description: '', github: '', liveDemo: '' })}>
                <HiOutlinePlus /> Add Project
              </button>
            </>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <>
              <div className="editor-section-title">Certifications</div>
              {(resume.certifications || []).map((cert, i) => (
                <div className="editor-list-item" key={i}>
                  <div className="editor-list-item-header">
                    <span className="editor-list-item-title">{cert.title || `Certification ${i + 1}`}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => removeListItem('certifications', i)}><HiOutlineTrash /></button>
                  </div>
                  <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={cert.title || ''} onChange={(e) => updateListItem('certifications', i, 'title', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Issuer</label><input className="form-input" value={cert.issuer || ''} onChange={(e) => updateListItem('certifications', i, 'issuer', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Year</label><input className="form-input" value={cert.year || ''} onChange={(e) => updateListItem('certifications', i, 'year', e.target.value)} /></div>
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addListItem('certifications', { title: '', issuer: '', year: '' })}>
                <HiOutlinePlus /> Add Certification
              </button>
            </>
          )}

          {/* Languages Tab */}
          {activeTab === 'languages' && (
            <>
              <div className="editor-section-title">Languages</div>
              {(resume.languages || []).map((lang, i) => (
                <div className="editor-list-item" key={i}>
                  <div className="editor-list-item-header">
                    <span className="editor-list-item-title">{lang.name || `Language ${i + 1}`}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => removeListItem('languages', i)}><HiOutlineTrash /></button>
                  </div>
                  <div className="form-group"><label className="form-label">Language</label><input className="form-input" value={lang.name || ''} onChange={(e) => updateListItem('languages', i, 'name', e.target.value)} /></div>
                  <div className="form-group">
                    <label className="form-label">Proficiency ({lang.progress || 0}%)</label>
                    <input type="range" min="0" max="100" value={lang.progress || 0} onChange={(e) => updateListItem('languages', i, 'progress', parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addListItem('languages', { name: '', progress: 70 })}>
                <HiOutlinePlus /> Add Language
              </button>
            </>
          )}

          {/* Hobbies Tab */}
          {activeTab === 'hobbies' && (
            <>
              <div className="editor-section-title">Hobbies & Interests</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {(resume.hobbies || []).map((hobby, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--bg-tertiary)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-sm)' }}>
                    {hobby}
                    <button className="btn btn-ghost btn-sm" style={{ padding: 2, minWidth: 'auto' }} onClick={() => removeListItem('hobbies', i)}><HiOutlineTrash size={12} /></button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="form-input"
                  placeholder="Add a hobby..."
                  id="hobbyInput"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      addListItem('hobbies', e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
                <button className="btn btn-secondary" onClick={() => {
                  const input = document.getElementById('hobbyInput');
                  if (input.value.trim()) {
                    addListItem('hobbies', input.value.trim());
                    input.value = '';
                  }
                }}>Add</button>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="editor-sidebar-footer">
          <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            <HiOutlineSave /> {saving ? 'Saving...' : 'Save'}
          </button>
          <button className="btn btn-secondary" onClick={handleDownloadPDF} title="Download PDF">
            <HiOutlineDownload />
          </button>
          <button className="btn btn-secondary" onClick={() => setShowEmailModal(true)} title="Email Resume">
            <HiOutlineMail />
          </button>
        </div>
      </div>

      {/* ── Preview Panel ── */}
      <div className="editor-preview">
        <div className="preview-container" ref={previewRef}>
          {getTemplateComponent()}
        </div>
      </div>

      {/* ── Email Modal ── */}
      {showEmailModal && (
        <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
          <div className="modal-content email-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Send Resume via Email</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowEmailModal(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Recipient Email *</label>
              <input className="form-input" type="email" placeholder="recruiter@company.com" value={emailForm.recipientEmail} onChange={(e) => setEmailForm({ ...emailForm, recipientEmail: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input className="form-input" placeholder="Resume Application" value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" placeholder="Hello, please find my resume attached..." value={emailForm.message} onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })} rows={4} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowEmailModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSendEmail} disabled={sendingEmail}>
                {sendingEmail ? 'Sending...' : <><HiOutlineMail /> Send Resume</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeEdit;

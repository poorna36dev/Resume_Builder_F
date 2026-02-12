import axiosInstance from './axiosInstance';

/** Send resume PDF via email */
export const sendResumeEmail = (recipientEmail, subject, message, pdfFile) => {
  const formData = new FormData();
  formData.append('recipientEmail', recipientEmail);
  formData.append('subject', subject);
  formData.append('message', message);
  formData.append('pdfFile', pdfFile);
  return axiosInstance.post('/api/email/send-email', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

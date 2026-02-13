import axiosInstance from "./axiosInstance";

/** Send resume PDF via email */
export const sendResumeEmail = (recipientEmail, subject, message, pdfFile) => {
  const formData = new FormData();
  formData.append("recipientEmail", recipientEmail);
  formData.append("subject", subject);
  formData.append("message", message);
  formData.append("pdfFile", pdfFile);
  // Set a longer timeout for email sending (e.g., 60 seconds)
  return axiosInstance.post("/api/email/send-email", formData, {
    timeout: 60000,
  });
};

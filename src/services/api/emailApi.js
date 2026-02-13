import axiosInstance from "./axiosInstance";

/** Send resume PDF download link via email */
export const sendResumeEmail = (email, downloadUrl, subject, message) => {
  const payload = {
    email,
    downloadUrl,
    subject,
    message
  };
  
  // Set a timeout
  return axiosInstance.post("/api/email/send-email", payload, {
    timeout: 30000,
  });
};

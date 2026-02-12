import axiosInstance from './axiosInstance';

/** Register a new user */
export const registerUser = (data) =>
  axiosInstance.post('/api/auth/register', data);

/** Login user — returns token + user data */
export const loginUser = (data) =>
  axiosInstance.post('/api/auth/login', data);

/** Verify email with token from URL */
export const verifyEmail = (token) =>
  axiosInstance.get(`/api/auth/verify-email?token=${token}`);

/** Resend verification email */
export const resendVerification = (email) =>
  axiosInstance.post('/api/auth/resend-verfication', { email });

/** Get authenticated user profile */
export const getProfile = () =>
  axiosInstance.get('/api/auth/profile');

/** Upload profile image (multipart) */
export const uploadProfileImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return axiosInstance.post('/api/auth/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
